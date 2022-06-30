import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

/**
 * TouchableOpacity e como se fosse uma View, entao nao necessita uma view por fora na maioria dos casos, se tiver mais de um TouchableOpacity ai sim usa-se a View como container.
 */
import {TextInput} from 'react-native-gesture-handler';
import ping from '../../services/ping';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderConditional from '../RenderConditional';
import Ping from 'react-native-ping';

const ModalPing = ({isVisible, onClose}) => {
  const [ip, setIp] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isAtualizando, setIsAtualizando] = useState(false);

  function handleClose() {
    onClose();
    setIsAtualizando(false);
    setIp('');
  }

  /*Funçao responsavel por pingar no ip digitado no campo textImput*/
  async function handlerPing() {
    //verifica se o campo está vazio
    if (ip == '') {
      Alert.alert('Digite um ip');

      return;
    }
    setIsAtualizando(true);
    /*
    a função ping é responsavel por verificar o status de conexão do equipamento na rede,
    ela recebe como partametro o ipaddress ex: 0.0.0.0, e retorna true ou false,
    para receber um retorno da função usa-se o .then que recebe uma (resposta) => {}
     */

    try {
      await Ping.start(ip, {timeout: 1000});
      setIsActive(true);
      setIsAtualizando(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error.message);
      setIsActive(false);
      setIsAtualizando(false);
      Keyboard.dismiss();
    }
  }

  // função que mostra na tela se o equipamento está ativo ou não
  function activeItem() {
    if (isActive == true) {
      return (
        <>
          <View style={styles.boxStatus}>
            <Text
              style={[{color: isActive ? 'green' : 'red'}, styles.textStyle]}>
              Online
            </Text>
            <Icon
              name="minus-circle"
              size={30}
              color={isActive ? 'green' : 'red'}
            />
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.boxStatus}>
          <Text style={[{color: isActive ? 'green' : 'red'}, styles.textStyle]}>
            Offline
          </Text>
          <Icon
            name="minus-circle-off"
            size={30}
            color={isActive ? 'green' : 'red'}
          />
        </View>
      );
    }
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={handleClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.input}>
              <TextInput
                textAlign="center"
                value={ip}
                placeholder="Digite um ip"
                onChangeText={setIp}
                color="#000"
              />
            </View>

            <View>{activeItem()}</View>
            <View style={styles.lineModal}>
              <TouchableOpacity style={styles.botao} onPress={handleClose}>
                <Text style={styles.TextoBotao}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botao} onPress={handlerPing}>
                <RenderConditional isTrue={!isAtualizando}>
                  <Text style={styles.TextoBotao}>Pingar</Text>
                </RenderConditional>
                <RenderConditional isTrue={isAtualizando}>
                  <ActivityIndicator size={20} color="#ffff" />
                </RenderConditional>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 220,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',

    backgroundColor: 'white',
    borderRadius: 13,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  lineModal: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  boxStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 5,
  },
  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 80,
    borderRadius: 10,
    backgroundColor: '#003c7c',
  },
  TextoBotao: {
    fontWeight: '500',
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ModalPing;
