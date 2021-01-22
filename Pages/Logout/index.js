import React, { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation,route}) => {
  useEffect(() => {
    AsyncStorage.removeItem('SessionLogin');
    alert('Anda Berhasil Logout')
    navigation.replace('Login')
  },)
  return (
    null
  );
}

export default Logout;