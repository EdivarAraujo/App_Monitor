import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Button,
  Svg,
  Line,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ping from '../../services/ping';
import RenderConditional from '../RenderConditional/index';

const ModalPing = ({isVisible, onClose}) => {
  const [ip, setIp] = useState('');
  const [isActive, setIsActive] = useState(false);

  /*Funçao responsavel por pingar no ip digitado no campo textImput*/
  function handlerPing() {
    //verifica se o campo está vazio
    if (ip == '') {
      Alert.alert('Digite um ip');
      return;
    }
    /*
    a função ping é responsavel por verificar o status de conexão do equipamento na rede,
    ela recebe como partametro o ipaddress ex: 0.0.0.0, e retorna true ou false,
    para receber um retorno da função usa-se o .then que recebe uma (resposta) => {}
     */
    ping(ip).then(resposta => {
      // atualiza o valor da variavel isActive para true ou false de acordo com a resposta da função ping
      setIsActive(resposta);
    });
  }

  // função que mostra na tela se o equipamento está ativo ou não
  function activeItem() {
    if (isActive == true) {
      return <Text>Online</Text>;
    } else {
      return <Text>Offline</Text>;
    }
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              textAlign="center"
              placeholder="Digite um ip"
              onChangeText={setIp}
            />
            <View>{activeItem}</View>

            <Button title="Pingar" onPress={handlerPing} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  confirmIcon: {
    color: 'red',
  },
});

export default ModalPing;
