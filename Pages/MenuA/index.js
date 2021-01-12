import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, RefreshControl, Alert, Dimensions, PermissionsAndroid, TouchableHighlight } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper'
import NumberFormat from 'react-number-format';
import axios from 'axios';

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

import DeviceInfo from 'react-native-device-info';

export function ReactNativeNumberFormat({ value }) {
    return (
        <NumberFormat
            value={value}
            displayType={'text'}
            thousandSeparator={'.'} 
            decimalSeparator={','}
            prefix={'Rp.'}
            renderText={formattedValue => <Text>{formattedValue} -,</Text>} // <--- Don't forget this!
        />
    );
}

export async function request_READ_PHONE_STATE() {
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE ,
        {
            'title': 'ReactNativeCode wants to READ_PHONE_STATE',
            'message': 'ReactNativeCode App needs access to your personal data. '
        }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Permission Granted.");
        }
        else {
            console.log("Permission Not Granted");
        }
    } catch (err) {
        console.warn(err)
    }
}

export async function request_ACCESS_FINE_LOCATION() {
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION ,
        {
            'title': 'ReactNativeCode wants to ACCESS_FINE_LOCATION',
            'message': 'ReactNativeCode App needs access to your personal data. '
        }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Permission Location Granted.");
        }
        else {
            console.log("Permission Location Not Granted");
        }
    } catch (err) {
        console.warn(err)
    }
}

const MenuA = ({navigation}) => {
    request_READ_PHONE_STATE()
    
    // Section GetDeviceInfo
    let uniqueId = DeviceInfo.getUniqueId();
    console.log("uniqueId nya ",uniqueId)

    let deviceId = DeviceInfo.getDeviceId();
    console.log("deviceId nya ",deviceId)

    DeviceInfo.getPhoneNumber().then(phoneNumber => {
        console.log("no hp",phoneNumber);
        // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
    });


    DeviceInfo.isLocationEnabled().then(enabled => {
        if(enabled == false){
            request_ACCESS_FINE_LOCATION()
        } else {
            console.log("lokasi == ",enabled);
        }
        
      });
    // End Section GetDeviceInfo

    var deviceWidth = Dimensions.get('window').width;
    
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [DataSlider,setDataSlider] = useState([]); 
    const [DataKategoriPaket,setDataKategoriPaket] = useState([]); 
    const [DataPaket,setDataPaket] = useState([]); 
    
    useEffect(() => {
        
        ServiceGetHome()
    },[])
    
    const ServiceGetHome = () => {
        axios.get("http://api.wisatamurahindonesia.com/").then((response) => 
        {
            var Response = response.data;
            setDataSlider(Response.Data.Slider.Data);
            setDataKategoriPaket(Response.Data.KategoriPaket.Data);
            setDataPaket(Response.Data.Paket.Data);
        }).catch((response_error) => {
            console.log(response_error);
        })
    }

    return (
        <>
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{width: deviceWidth, height:165}}>
                    <Swiper pagingEnabled={true} loop={true} autoplay={true} style={styles.wrapper} showsButtons={true} showsPagination={false}>
                        {
                            DataSlider.map((value,index) => {
                                return (
                                    <View key={"CardSlider"+index} style={{ height: 165, width: deviceWidth, overflow: 'hidden'}}>
                                        <Image style={{flex:1,width:null,height:null }} resizeMode={'contain'} source={{uri:"https://wisatamurahindonesia.com/image/slider/"+value.Foto }} />
                                    </View>
                                );
                            })
                        }
                    </Swiper>
                </View>

                <ScrollView horizontal={true} style={{paddingRight:10, paddingLeft:10, overflow: 'hidden'}}>
                {
                    DataKategoriPaket.map((value,index) => {
                        return (
                            <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.navigate("KategoriKotaNegara",{
                                url:value.Url,
                                header_title: value.Judul
                            })}  key={"CardKategori"+index} style={{ height: 170, width: 170}}>
                                 <Image style={{flex:1,width:null,height:null,marginRight:20 }} resizeMode={'contain'} source={{uri:"https://wisatamurahindonesia.com/image/kategori_paket/"+value.Foto }} /> 
                            </TouchableHighlight>
                            
                        );
                    })
                }
                </ScrollView>

                <ScrollView style={styles.scrollView}>
                {
                    DataPaket.map((value,index) => {
                        return (
                            <Card key={"Card"+index}>
                                <Card.Image overlayStyle={{opacity: 0}} style={{width: deviceWidth, height:200, resizeMode:'cover'}} source={{uri:"https://wisatamurahindonesia.com/image/paket/"+value.Foto }} />
                                <Card.Title style={{paddingTop:10, textAlign:'left', fontSize:19, color:'blue'}}>{value.Judul}</Card.Title>
                                <Text style={{fontSize:18}}>
                                    <Text style={{fontWeight: "bold"}}>Dewasa : </Text> <ReactNativeNumberFormat value={value.Harga} />
                                </Text>
                                <Text style={{fontSize:18}}>
                                    <Text style={{fontWeight: "bold"}}>Anak : </Text> <ReactNativeNumberFormat value={value.HargaAnak} />
                                </Text>
                                <Text style={{fontSize:18}}>
                                    <Text style={{fontWeight: "bold"}}>Durasi : </Text> {value.Durasi}
                                </Text>
                                <Text style={{fontSize:18}}>
                                    <Text style={{fontWeight: "bold"}}>Minimal : </Text> {value.MinimalJumlahOrang} Pax/Orang
                                </Text>
                                <View style={{paddingTop:10, flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
                                    <TouchableHighlight style={{ marginBottom:5, width: "50%"}}>
                                        <Button
                                            title="DOWNLOAD"
                                            buttonStyle={{flex:1,width:null,height:null, marginRight:10}}
                                            type="outline">
                                            <Icon
                                                name="arrow-right"
                                                size={15}
                                                color="black"
                                            />
                                        </Button>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={{ marginBottom:5, width: "50%"}} >
                                        <Button onPress={() => navigation.navigate("PaketDetil",{
                                        url:value.Url,
                                        header_title: value.Judul
                                    })}
                                            buttonStyle={{flex:1,width:null,height:null}}
                                            title='BOOK NOW' />
                                    </TouchableHighlight>
                                </View>
                            </Card>
                        );
                    })
                }
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
        
        
        </>
    )
}

export default MenuA

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
});
