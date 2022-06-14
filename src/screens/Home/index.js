import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Svg, Line} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CountDown from 'react-native-countdown-component';

import RenderConditional from '../../components/RenderConditional';
import ping from '../../services/ping';

const DATA = [
  {
    id: '1',
    title: 'Edivar SP',
    ip: '192.168.1.167',
  },
];

const Equipamento = ({equipamento, refresh}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    ping(equipamento.ip).then(resposta => {
      setIsActive(resposta);
    });
  }, [refresh]);

  // Alert.alert(JSON.stringify(equipamento));
  return (
    <View style={styles.pai}>
      <View style={styles.filho}>
        <Text style={styles.title}>{equipamento.ip}</Text>
        <Text style={styles.title}>{equipamento.title}</Text>
      </View>
      {/* svg (CODIGO  DA LINHA VERDE)*/}
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
        {/*CODIGO DAS LINHA VERMELHAS  */}
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
      {/* ICONES(IMPRESSORA) */}
      <View style={styles.filho}>
        <Icon name="printer" size={40} color={isActive ? 'green' : 'red'} />
      </View>
    </View>
  );
};

const Home = () => {
  const [count, setCount] = useState();
  const [atualizando, setAtualizando] = useState(true);

  const renderItem = ({item}) => (
    <Equipamento equipamento={item} refresh={count} />
  );

  const onChangeResetCount = () => setAtualizando(true);
  const onFinish = () => {
    setAtualizando(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* BOTÃO TIME */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={onChangeResetCount}>
        <RenderConditional isTrue={atualizando}>
          <CountDown
            until={10}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pai: {
    flex: 1,
    marginVertical: 2,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  filho: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  labelButton: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    //backgroundColor: 'red',
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
});

export default Home;
