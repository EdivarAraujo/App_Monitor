import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function FabButton({isVisibleModal, isAtualizando}) {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const showToast = () => {
    ToastAndroid.show('Atualizando... Aguarde!', ToastAndroid.SHORT);
  };

  //Ao cliclar no botão chama essa animação(toogleMenu), para apresentar o menu do botão
  function toggleMenu() {
    setOpen(true);
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: false,
    }).start();

    setOpen(!open);
  }

  function onOpenModal() {
    if (isAtualizando) {
      showToast();
      return;
    }
    isVisibleModal();
  }
  //Animação para o submenu aparecer depois de apertar o menu
  const pinStyle = {
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
          useNativeDriver: false,
        }),
      },
    ],
  };
  //Faz o botão girar o mais fazendo como se fosse um sibolo de fechar
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
          useNativeDriver: false,
        }),
      },
    ],
  };

  return (
    // CORAÇÃO DO FABBUTON(BOTÃO PRINCIPAL)
    <View style={[styles.containerpro]}>
      {/* BOTÃO SUBMENU */}
      <TouchableWithoutFeedback onPress={onOpenModal}>
        <Animated.View style={[styles.button, styles.submenu, pinStyle]}>
          <Icon name="codesquareo" size={24} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* BOTÃO PRINCIPAL */}
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <Icon name="plus" size={24} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  containerpro: {
    flex: 1,
    width: '100%',
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    position: 'absolute',
  },
  button: {
    position: 'relative',
    backgroundColor: '#003c7c',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowColor: '#000213B',
    shadowOpacity: 0.3,
    left: 0,
    top: 0,
    shadowOffset: {
      height: 10,
    },
    menu: {
      backgroundColor: '#00ff',
    },
    submenu: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      backgroundColor: '#00ff',
    },
  },
});
