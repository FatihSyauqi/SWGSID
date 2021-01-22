import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Fragment, Image,ImageBackground, Dimensions, Text, View, TextInput, TouchableHighlight, SafeAreaView, ScrollView,RefreshControl, TouchableOpacity, Select, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';

const imageBackground = { uri : "http://acct.swg.co.id/assets/img/authentication-bg.jpg"}
var {width} = Dimensions.get('window');

const Login = ({navigation,route}) => {

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => {
      AsyncStorage.setItem('SessionLogin', 
        JSON.stringify({
          Email:data.Email
        })
      );
  } 
  
  AsyncStorage.getItem('SessionLogin', (error, result) => {
    if(result != null){
      const resData = JSON.parse(result); 
      navigation.replace('MainApp');
    } 
  });
  
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
        <ImageBackground source={imageBackground} style={styles.image}>

            <View style={{margin:30, padding:10, paddingTop:35, paddingBottom:35, backgroundColor:"white"}}>

                <View style={styles.containerLogo}>
                    <Image
                      style={styles.logo}
                      source={{
                        uri: 'http://acct.swg.co.id/assets/img/logo-swg.png',
                      }}
                    />
                    <Text style={[styles.h2,{marginBottom:20}]}>APLIKASI SURVEY PENDUDUK</Text>
                </View>
              

                <Text style={styles.label}>Alamat Email</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Ketikkan Alamat Email Disini..."
                        placeholderTextColor = "#9a73ef"
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="Email"
                    defaultValue=""
                />

                {/* <Text style={styles.label}>Password atau Kata Sandi</Text>
                <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <TextInput
                          placeholder = "Ketikkan Password atau Kata Sandi"
                          placeholderTextColor = "#9a73ef"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                        />
                      )}
                      name="Password"
                      defaultValue=""
                /> */}
                <TouchableHighlight
                  style = {styles.submitButton}
                  onPress={handleSubmit(onSubmit)}
                  //onPress={() => navigation.navigate('MainApp')}
                  >
                  <Text style = {styles.submitButtonText}> LOGIN </Text>
                </TouchableHighlight>
                <Text style={{textAlign:"center",fontWeight:"bold"}}>&copy; 2020 Sawerigading Multi Kreasi</Text>
            </View>

           
            </ImageBackground>
        </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  h2: {
    color:"blue",
    fontSize:17,
    fontWeight: "bold",
    overflow: 'hidden',
    textAlign:"center"
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    resizeMode: "cover",
    width: "95%",
    height:50
  },
  label: {
    fontWeight: "bold",
    margin: 10,
    marginBottom:0,
    overflow: 'hidden'
  },
  input: {
    padding:10,
    margin: 10,
    height: 40,
    marginBottom:0,
    overflow: 'hidden',
    borderColor: '#7a42f4',
    borderWidth: 1,
    backgroundColor:"white"
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
    height: 40,
  },
  submitButtonText:{
    color: 'white',
    textAlign:'center'
  }
});