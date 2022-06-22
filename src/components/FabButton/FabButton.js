import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

export default function FabButton({isVisibleModal}) {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  function toggleMenu() {
    setOpen(true);
    const toValue = open ? 0 : 1;
    // console.log(toValue);

    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: false,
    }).start();

    setOpen(!open);
  }

  function onOpenModal() {
    isVisibleModal();
  }

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
    alignItems: 'center',
    position: 'absolute',
  },
  button: {
    // position: 'absolute',
    backgroundColor: '#003c7c',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowColor: '#000213B',
    shadowOpacity: 0.3,
    left: width / 1.25,
    top: height / 1.5,
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
