import React, { useEffect } from "react";
import { StyleSheet, Image,ImageBackground, Dimensions, Text, View} from "react-native";

const imageBackground = { uri : "https://designmodo.com/wp-content/uploads/2014/04/SplashScreen-iOS-640px.jpg"}
var {width} = Dimensions.get('window');

import { GetLokasi, CreateTabel, InisialisasiDataLocal } from "../../Function";

const Splashscreen = ({navigation,route}) => {
  useEffect(() => {
    CreateTabel();
    InisialisasiDataLocal();
    GetLokasi();

    setTimeout(() => {
        navigation.replace('Login')
    }, 3000)
  },)
  return (
    <View style={styles.container}>
        <ImageBackground source={imageBackground} style={styles.image}>

            {/* <View style={{margin:10, padding:10, paddingTop:35, paddingBottom:35}}>

              <View style={styles.containerLogo}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: 'http://acct.swg.co.id/assets/img/logo-swg.png',
                    }}
                  />
                  <Text style={styles.headingLogin}>Aplikasi Survey Penduduk</Text>
              </View>
            </View> */}
            </ImageBackground>
        </View>
  );
}

export default Splashscreen;

const styles = StyleSheet.create({
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
  headingLogin: {
    color:"blue",
    fontSize:27,
    fontWeight: "bold",
    margin: 10,
    marginBottom:20,
    overflow: 'hidden',
    textAlign:"center"
  }
});