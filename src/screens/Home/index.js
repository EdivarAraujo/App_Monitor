import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Svg, Line} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CountDown from 'react-native-countdown-component';
import background from '../../assets/image/background.jpeg';
import FabButton from '../../components/FabButton/FabButton';
import ModalVisible from '../../components/Modal';

import RenderConditional from '../../components/RenderConditional';
import ping from '../../services/ping';
import api from '../../services/api';

// useEffect (função quando renderiza os componentes)
const Equipamento = ({equipamento, refresh}) => {
  const [isActive, setIsActive] = useState(false);
  const [pingando, setPingando] = useState(false);
  const [iconName, setIconName] = useState('printer');

  // função responsavel por pingar no equipamento
  useEffect(() => {
    renderIcon();
    if (!pingando) {
      setPingando(true);
      ping(equipamento.ip).then(resposta => {
        setIsActive(resposta);
        setPingando(false);
      });
    }
  }, [refresh]);
  //esse switch faz com que, quando buscar os equipamentos, renderize o icone de cada equipamento, se é printer(1), cellphone(2), tablet(3)
  function renderIcon() {
    switch (equipamento.tipoEquipamento) {
      case '1':
        setIconName('printer');
        break;
      case '2':
        setIconName('cellphone');
        break;
      case '3':
        setIconName('tablet-android');
        break;
      default:
        setIconName('cellphone');
        break;
    }
  }

  return (
    //Caracteristas dos equipamentos renderizados na tela(nome, ip, linhas, icones)
    <View style={styles.pai}>
      <View style={styles.filho}>
        <Text style={styles.title}>{equipamento.ip}</Text>
        <Text style={styles.title}>{equipamento.label}</Text>
      </View>
      {/* Codigo da linha verde, apace quando o item tiver isActive(true)*/}
      <View style={styles.filho}>
        <RenderConditional isTrue={isActive}>
          <Svg height="100" width="100">
            <Line
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              stroke="green"
              strokeWidth="2"
            />
          </Svg>
        </RenderConditional>
        {/*Codigo da linha vermelha, é apresentado quando o iten estiver !isActive(false) */}
        <RenderConditional isTrue={!isActive}>
          <Svg height="100" width="100">
            <Line
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              stroke="red"
              strokeWidth="2"
            />
            <Line
              x1="30"
              y1="35"
              x2="70"
              y2="65"
              stroke="red"
              strokeWidth="3"
            />
            <Line
              x1="70"
              y1="35"
              x2="30"
              y2="65"
              stroke="red"
              strokeWidth="3"
            />
          </Svg>
        </RenderConditional>
      </View>
      {/* Icones que são renderizados de acordo com o equipamento que é apresentado na tela) */}
      <View style={[styles.filho, {flex: 0.5}]}>
        <Icon name={iconName} size={40} color={isActive ? 'green' : 'red'} />
      </View>
    </View>
  );
};
//A home é a segunda parte a ser renderizada logo após, ser renderizada todas as informações dos equipamentos a home é apresentada na tela
const Home = () => {
  const [count, setCount] = useState();
  const [segundos, setSegundos] = useState(60); //Alterador do valor do contador, após a primeira contagem de 60s, que é assim inicia o App, passa um novo valor para as demais contagem para atualização, sendo o novo valor de 10s
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [atualizando, setAtualizando] = useState(true);

  useEffect(() => {
    init();
  }, []);

  //Função que chama todos os equipamentos da apiAdminCpo(192.168.0.10)
  async function init() {
    await api
      .post('estoqueExpedicao.php', {route: 'findEquipamentsCpo'})
      .then(resposta => {
        setData(resposta.data);
      });
  }

  const renderItem = ({item}) => (
    <Equipamento equipamento={item} refresh={count} />
  );

  const onChangeResetCount = () => setAtualizando(true);

  //Faz a alteração do novo valor para o contador apos o primeiro acesso ao app, e tambem encerra o contador depois do app iniciado
  const onFinish = () => {
    setSegundos(10), setAtualizando(false);
  };

  function isVisibleModal() {
    setModalVisible(!modalVisible);
  }

  return (
    <>
      {/*Visualização do Modal*/}
      <ModalVisible isVisible={modalVisible} onClose={isVisibleModal} />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={background}
          resizeMode="cover">
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />

          {/* BOTÃO TIME */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onChangeResetCount}>
            {/* display do contador */}

            <RenderConditional isTrue={atualizando}>
              <CountDown
                until={segundos}
                timeToShow={['S']}
                timeLabels={{s: ''}}
                onPress={() => alert('Atualizando Aguarde...')}
                onFinish={onFinish}
                onChange={value => setCount(value)}
                style={styles.count}
                digitStyle={{color: '#003c7c'}}
                digitTxtStyle={{color: '#FFFF'}}
              />
            </RenderConditional>

            <RenderConditional isTrue={!atualizando}>
              <Text style={styles.labelButton}>ATUALIZAR</Text>
            </RenderConditional>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
      <FabButton isVisibleModal={isVisibleModal} isAtualizando={atualizando} />
    </>
  );
};

const styles = StyleSheet.create({
  pai: {
    flex: 1,
    marginVertical: 2,
    // // marginHorizontal: 2,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  filho: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  labelButton: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  // CONTADOR
  button: {
    backgroundColor: '#003c7c',
    minHeight: 40,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  option: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Home;
