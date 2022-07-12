import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';


import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';


export default function Print({abrirModal = false, fecharModal = () => {},idPrinter }){

const [text, setText] = useState('');

function limpar () {
  setText('')
  fecharModal()
}

async function imprimir() {
  if (text == ''){
    alert('Digite alguma coisa');
    
    return;
  }

  axios.post('http://192.168.0.11:3333/print', {
    action: "imprimir_etiquetas_texto",
  	idPrinter:idPrinter,
   	texto: text,
  })
  .then(function (response) {
    showToast(response.data.message);
    setText('')
  })
  .catch(function (error) {
   if(error.response.status == 500) {
    showToast(error.response.data.message);
   }
  });
  }

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

    return (
      <>
      <Modal
      style={styles.viwe}
      visible={ abrirModal}
      transparent 
      animationType='slide'
      >
        <View style={styles.quadradoA}>
      <View style={styles.modalprint}>
      <TextInput
                textAlign="center"
                value={text}
                onChangeText={setText}
                placeholder="Digite alguma coisa"
                color="#000"
                placeholderTextColor={'#838B83'}
                style={styles.input}
              />
      <View style={styles.quadradoB}/>
        <View style={styles.viwe}>
        <TouchableOpacity style={styles.TextoBotao} onPress={limpar}>
          <Text style={styles.botao}>Fechar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.TextoBotao} onPress={imprimir}>
          <Text style={styles.botao}>Imprimir</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    </Modal>
    </>
    );
  }


  const styles = StyleSheet.create({
    modalprint: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 270,
      paddingVertical: 80,
      paddingHorizontal: 10,
      width: '95%',
      borderRadius: 13,
      height: 220,
      margin: 10
    },
    TextoBotao: {
      fontWeight: '500',
      color: '#FFF',
      fontSize: 16,
      textAlign: 'center',
    },
    botao: {
      alignItems: 'center',
      height: 50,
      borderRadius: 10,
      backgroundColor: '#003c7c',
      color: '#FFF',
      textAlign: 'center',
      padding: 10,
      justifyContent: 'space-evenly',
      marginHorizontal: 25,
      marginVertical: 6,
      fontSize: 16,
    },
    input: {
      width: '100%',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginHorizontal: 50,
    },
    quadradoA: {
      flex: 1,
    },
    quadradoB: {
      backgroundColor: "green",
      height: 20
    },
    viwe: {
      flexDirection:'row', 
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }
   
  })