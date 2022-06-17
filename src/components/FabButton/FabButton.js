import React, {useState, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Modalize} from 'react-native-modalize';

const {width, height} = Dimensions.get('window');

export default function FabButton() {
  function toggleMenu() {
    Alert.alert('oi');
  }

  return (
    // CORAÇÃO DO FABBUTON(BOTÃO PRINCIPAL)
    <View style={[styles.containerpro]}>
      <TouchableWithoutFeedback onPress={() => Alert.alert('sadasd')}>
        <Animated.View style={[styles.button, styles.submenu]}>
          <Icon name="heart" size={24} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
      {/* BOTÃO SUBMENU */}
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.submenu]}>
          <Icon name="camera" size={24} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
      {/* BOTÃO PRINCIPAL */}
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu]}>
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
    position: 'absolute',
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
    top: height / 1.7,
    shadowOffset: {
      height: 10,
    },
    menu: {
      backgroundColor: '#00ff',
    },
    submenu: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      backgroundColor: '#00ff',
    },
  },
});
