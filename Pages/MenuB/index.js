import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Dimensions, PermissionsAndroid, Platform, Image, Modal, Text, View, TextInput, TouchableHighlight, SafeAreaView, ScrollView,RefreshControl, TouchableOpacity, Select, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { openDatabase } from 'react-native-sqlite-storage';
import {Picker} from '@react-native-picker/picker';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

import { requestCameraPermission, requestExternalWritePermission } from "../../Function";
const GLOBALDATA = require('../../Function/global');

var db = openDatabase({ name: 'SurveyPendudukDatabase.db' });
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const window = Dimensions.get('window');
const ratio = window.width; //541 is actual image width

const MenuB = ({navigation,route}) => {
  /// get location
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  /// end get location

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
  }, []);

  let [stateStatusKk, setStateStatusKk] = useState([]);

  let [stateProvinsi, setStateProvinsi] = useState([]);
  let [stateKotkab, setStateKotkab] = useState([]);
  let [stateKecamatan, setStateKecamatan] = useState([]);
  let [stateDesa, setStateDesa] = useState([]);

  const [setModalFotoKk, setStateModalFotoKk] = useState(false);
  const [setModalFotoRumah, setStateModalFotoRumah] = useState(false);
  const [setModalFotoKeluarga, setStateModalFotoKeluarga] = useState(false);

  const [setfilePathKk, setStateFilePathKk] = useState({});
  const [setfilePathRumah, setStateFilePathRumah] = useState({});
  const [setfilePathKeluarga, setStatefilePathKeluarga] = useState({});

  useEffect(() => {
    navigation.setOptions({ title: "Form Input Data KK" })

    setCurrentLongitude(GLOBALDATA.LONG);
    setCurrentLatitude(GLOBALDATA.LAT);

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tb_status_kk',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_status_kk": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
               tempData.push(results.rows.item(i));
            }
            setStateStatusKk(tempData);
          } else {
            console.log("Data Status KK Tidak Ditemukan");
          }
        }
      );

      tx.executeSql(
        'SELECT * FROM tb_provinsi',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_provinsi": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
               tempData.push(results.rows.item(i));
            }
            setStateProvinsi(tempData);
          } else {
            console.log("Data Provinsi Tidak Ditemukan");
          }
        }
      );

      tx.executeSql(
        'SELECT * FROM tb_kotkab',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_kotkab": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
               tempData.push(results.rows.item(i));
            }
            setStateKotkab(tempData);
          } else {
            console.log("Data Kota Kabupaten Tidak Ditemukan");
          }
        }
      );

      tx.executeSql(
        'SELECT * FROM tb_kecamatan',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_kecamatan": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
               tempData.push(results.rows.item(i));
            }
            setStateKecamatan(tempData);
          } else {
            console.log("Data Kecamatan Tidak Ditemukan");
          }
        }
      );

      tx.executeSql(
        'SELECT * FROM tb_desa',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_desa": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
               tempData.push(results.rows.item(i));
            }
            setStateDesa(tempData);
          } else {
            console.log("Data Desa Tidak Ditemukan");
          }
        }
      );
    });
  }, []);
  
  // const SelectPicker = ({Name,ArrayData}) => {
  //   return (
  //     <>
  //     <Controller
  //       control={control}
  //       render={({ onChange, onBlur, value }) => (
  //         <Picker
  //           selectedValue={value}
  //           style={styles.SelectPickerGrid}
  //           onBlur={onBlur}
  //           onValueChange={(value, itemIndex) => onChange(value)}
  //         >
  //           {ArrayData.map((val, key) => {
  //             return (
  //               value == val ? (
  //                 <Picker.Item label={val.nama} value={val.id} key={key} />
  //               ) : (
  //                 <Picker.Item label={val.nama} value={val.id} key={key} />
  //               )
  //             );
  //           })} 
  //         </Picker>
  //       )}
  //       name={Name}
  //       rules={{ required: true }}
  //       defaultValue=""
  //     />

      
  //     </>
  //   );
  // }


  const captureImage = async (type,name) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        
        setResponseFile(name,response);
      });
    }
  };

  const chooseFile = (type,name) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);

      setResponseFile(name,response);
    });
  };

  const setResponseFile = (name,response) => {
    if(name == "FotoKk"){
      setStateModalFotoKk(!setModalFotoKk);
      setStateFilePathKk(response);
    } else if(name == "FotoRumah"){
      setStateModalFotoRumah(!setModalFotoRumah);
      setStateFilePathRumah(response);
    } else if(name == "FotoKeluarga"){
      setStateModalFotoKeluarga(!setModalFotoKeluarga);
      setStatefilePathKeluarga(response);
    }
  };
  return (
    <View>
      {/* <Header /> */}
      <>
        <SafeAreaView>
            <ScrollView horizontal={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              
              <View style={styles.container}> 
                <View style={styles.rowStyle}>
                <View style={styles.col12}>
                  <Text style={styles.label}>No Kartu Keluarga</Text>
                  <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <TextInput placeholder = "Nomor Kartu Keluarga" style={styles.input} placeholderTextColor = "#9a73ef" onBlur={onBlur} onChangeText={value => onChange(value)} value={value} />
                      )}
                      name="NoKartuKeluarga"
                      defaultValue=""
                  />
                </View>
                
                <View style={styles.col12}>
                  <Text style={styles.label}>Status KK</Text>
                  <View style={styles.SelectPickerGrid}>
                      <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                          <Picker
                            selectedValue={value}
                            onBlur={onBlur}
                            onValueChange={(value, itemIndex) => onChange(value)}
                          >
                            {stateStatusKk.map((val, key) => {
                              return (
                                value == val.id_status_kk ? (
                                  <Picker.Item label={val.keterangan} value={val.id_status_kk} key={key} />
                                ) : (
                                  <Picker.Item label={val.keterangan} value={val.id_status_kk} key={key} />
                                )
                              );
                            })} 
                          </Picker>
                        )}
                        name="StatusKk"
                        rules={{ required: true }}
                        defaultValue=""
                      />
                    </View>
                </View>

                <View style={styles.col12}>
                    <Text style={styles.label}>Alamat Lengkap</Text>
                    <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <TextInput
                          multiline={true}
                          numberOfLines={10}
                          placeholder = "Alamat"
                          placeholderTextColor = "#9a73ef"
                          style={[styles.input,{height:70}]}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                        />
                      )}
                      name="Alamat"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                </View>

                <View style={styles.col6}>
                  <Text style={styles.label}>RT</Text>
                  <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <TextInput
                          placeholder = "RT"
                          placeholderTextColor = "#9a73ef"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                        />
                      )}
                      name="Rt"
                      defaultValue=""
                  />
                </View>

                <View style={styles.col6}>
                  <Text style={styles.label}>RW</Text>
                  <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <TextInput
                          placeholder = "RW"
                          placeholderTextColor = "#9a73ef"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                        />
                      )}
                      name="Rw"
                      defaultValue=""
                  />
                </View>

                <View style={styles.col6}>
                    <Text style={styles.label}>Provinsi</Text>
                    <View style={styles.SelectPickerGrid}>
                      <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                          <Picker
                            selectedValue={value}
                            onBlur={onBlur}
                            onValueChange={(value, itemIndex) => onChange(value)}
                          >
                            {stateProvinsi.map((val, key) => {
                              return (
                                value == val.id_provinsi ? (
                                  <Picker.Item label={val.keterangan} value={val.id_provinsi} key={key} />
                                ) : (
                                  <Picker.Item label={val.keterangan} value={val.id_provinsi} key={key} />
                                )
                              );
                            })} 
                          </Picker>
                        )}
                        name="Provinsi"
                        rules={{ required: true }}
                        defaultValue=""
                      />
                    </View>
                  </View>
                  
                  <View style={styles.col6}>
                    <Text style={styles.label}>Kota / Kabupaten</Text>
                    <View style={styles.SelectPickerGrid}>
                      <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                          <Picker
                            selectedValue={value}
                            onBlur={onBlur}
                            onValueChange={(value, itemIndex) => onChange(value)}
                          >
                            {stateKotkab.map((val, key) => {
                              return (
                                value == val.id_kotkab ? (
                                  <Picker.Item label={val.keterangan} value={val.id_kotkab} key={key} />
                                ) : (
                                  <Picker.Item label={val.keterangan} value={val.id_kotkab} key={key} />
                                )
                              );
                            })} 
                          </Picker>
                        )}
                        name="Kota"
                        rules={{ required: true }}
                        defaultValue=""
                      />
                    </View>
                  </View>

                  <View style={styles.col6}>
                    <Text style={styles.label}>Kecamatan</Text>
                    <View style={styles.SelectPickerGrid}>
                        <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <Picker
                              selectedValue={value}
                              onBlur={onBlur}
                              onValueChange={(value, itemIndex) => onChange(value)}
                            >
                              {stateKecamatan.map((val, key) => {
                                return (
                                  value == val.id_kecamatan ? (
                                    <Picker.Item label={val.keterangan} value={val.id_kecamatan} key={key} />
                                  ) : (
                                    <Picker.Item label={val.keterangan} value={val.id_kecamatan} key={key} />
                                  )
                                );
                              })} 
                            </Picker>
                          )}
                          name="Kecamatan"
                          rules={{ required: true }}
                          defaultValue=""
                        />
                    </View>
                  </View>

                  <View style={styles.col6}>
                    <Text style={styles.label}>Desa</Text>
                    <View style={styles.SelectPickerGrid}>
                      <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                          <Picker
                            selectedValue={value}
                            onBlur={onBlur}
                            onValueChange={(value, itemIndex) => onChange(value)}
                          >
                            {stateDesa.map((val, key) => {
                              return (
                                value == val.id_desa ? (
                                  <Picker.Item label={val.keterangan} value={val.id_desa} key={key} />
                                ) : (
                                  <Picker.Item label={val.keterangan} value={val.id_desa} key={key} />
                                )
                              );
                            })} 
                          </Picker>
                        )}
                        name="Desa"
                        rules={{ required: true }}
                        defaultValue=""
                      />
                      </View>
                  </View>

                  <View style={styles.col6}>
                    <Text style={styles.label}>Longitude</Text>
                    <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <TextInput
                          placeholder = "Longitude..."
                          placeholderTextColor = "#9a73ef"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={currentLongitude}
                        />
                      )}
                      name="Longitude"
                      defaultValue={currentLongitude}
                    />
                  </View>
                
                  <View style={styles.col6}>
                    <Text style={styles.label}>Latitude</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                          <TextInput
                            placeholder = "Latitude..."
                            placeholderTextColor = "#9a73ef"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={currentLatitude}
                          />
                        )}
                        name="Latitude"
                        defaultValue={currentLatitude}
                    />
                  </View>
                  
                  <View style={styles.col6}>
                    <Text style={styles.label}>Upload Foto KK</Text>
                    <TouchableHighlight
                      underlayColor='none'
                      onPress={() => {
                        setStateModalFotoKk(!setModalFotoKk);
                      }}>
                      <Image
                        source={{uri: "http://www.pngall.com/wp-content/uploads/2/Upload-Button-PNG-HD-Quality.png"}}
                        style={{width:"100%",height:100 }}
                      />
                    </TouchableHighlight>
                    <Image
                      source={{uri: setfilePathKk.uri}}
                      style={styles.imageStyle}
                    />
                  </View>

                  <View style={styles.col6}>
                    <Text style={styles.label}>Upload Foto Rumah</Text>
                    <TouchableHighlight
                      underlayColor='none'
                      onPress={() => {
                        setStateModalFotoRumah(!setModalFotoRumah);
                      }}>
                        <Image
                          source={{uri: "http://www.pngall.com/wp-content/uploads/2/Upload-Button-PNG-HD-Quality.png"}}
                          style={{width:"100%",height:100 }}
                        />
                      </TouchableHighlight>
                      <Image
                        source={{uri: setfilePathRumah.uri}}
                        style={styles.imageStyle}
                      />
                  </View>

                  <View style={[styles.col12]}>
                    <Text style={styles.label}>Foto Keluarga</Text>
                    <TouchableHighlight
                      underlayColor='none'
                      onPress={() => {
                        setStateModalFotoKeluarga(!setModalFotoKeluarga);
                      }}>
                      <Image
                        source={{uri: "http://www.pngall.com/wp-content/uploads/2/Upload-Button-PNG-HD-Quality.png"}}
                        style={{width:200,height:100 }}
                      />
                    </TouchableHighlight>
                    <Image
                        source={{uri: setfilePathKeluarga.uri}}
                        style={styles.imageStyle}
                        resizeMode={"contain"}
                    />
                  </View>
                
                  <View style={styles.col12}>
                    <TouchableHighlight
                      style = {styles.submitButton}
                      // onPress={handleSubmit(onSubmit)}
                      onPress={() => navigation.replace('MenuC')}
                      >
                      <Text style = {styles.submitButtonText}> LANJUT</Text>
                    </TouchableHighlight>
                  </View>
                </View> 
              </View>
              

              {/* Modal Foto KK */}
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={setModalFotoKk}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Pilih Upload Foto KK!</Text>
                      
                      <View style={[styles.rowStyle,{backgroundColor:"white"}]}>
                          <View style={styles.col6}>
                            <TouchableHighlight
                              style = {styles.submitButton}
                              onPress={() => chooseFile('photo','FotoKk')}
                            >
                              <Text style = {styles.submitButtonText}> Galeri</Text>
                            </TouchableHighlight>
                          </View>
                          <View style={styles.col6}>
                            <TouchableHighlight
                              style = {styles.submitButton}
                              onPress={() => captureImage('photo','FotoKk')}
                            >
                              <Text style = {styles.submitButtonText}> Kamera</Text>
                            </TouchableHighlight>
                          </View>
                        </View>
                      
                    </View>
                  </View>
                </Modal>
              </View>
              {/* Modal Foto KK */}

              {/* Modal Foto Rumah */}
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={setModalFotoRumah}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Pilih Upload Foto Rumah!</Text>
                      
                      <View style={[styles.rowStyle,{backgroundColor:"white"}]}>
                          <View style={styles.col6}>
                            <TouchableHighlight
                              style = {styles.submitButton}
                              onPress={() => chooseFile('photo','FotoRumah')}
                            >
                              <Text style = {styles.submitButtonText}> Galeri</Text>
                            </TouchableHighlight>
                          </View>
                          <View style={styles.col6}>
                            <TouchableHighlight
                              style = {styles.submitButton}
                              onPress={() => captureImage('photo','FotoRumah')}
                            >
                              <Text style = {styles.submitButtonText}> Kamera</Text>
                            </TouchableHighlight>
                          </View>
                        </View>
                      
                    </View>
                  </View>
                </Modal>
              </View>
              {/* Modal Foto Rumah */}

              {/* Modal Foto Keluarga */}
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={setModalFotoKeluarga}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Pilih Upload Foto Keluarga!</Text>
                      
                      <View style={[styles.rowStyle,{backgroundColor:"white"}]}>
                          <View style={styles.col6}>
                            <TouchableHighlight
                              style = {styles.submitButton}
                              onPress={() => chooseFile('photo','FotoKeluarga')}
                            >
                              <Text style = {styles.submitButtonText}> Galeri</Text>
                            </TouchableHighlight>
                          </View>
                          <View style={styles.col6}>
                            <TouchableHighlight
                              style = {styles.submitButton}
                              onPress={() => captureImage('photo','FotoKeluarga')}
                            >
                              <Text style = {styles.submitButtonText}> Kamera</Text>
                            </TouchableHighlight>
                          </View>
                        </View>
                      
                    </View>
                  </View>
                </Modal>
              </View>
              {/* Modal Foto Keluarga */}
            </ScrollView>
        </SafeAreaView>

      </>
      
    </View>
  );
}
export default MenuB;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:300,
    minHeight:100,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  imageStyle: {
    width: "100%",
    height: 200, //362 is actual height of image
  },
  headingText: {
    color:"black",
    fontSize:20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 12
  },
  container: {
    margin: 10
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  SelectPickerGrid: {
    overflow: 'hidden',
    height: 50,
    marginBottom:0,
    borderColor: '#000000',
    borderWidth: 1
  },
  input: {
    height: 40,
    marginBottom:0, 
    overflow: 'hidden',
    borderColor: '#000000',
    borderWidth: 1
  },
  col12: {
    width: "100%",
    padding:5 
  },
  col8: {
    width: "67%", 
    padding:5
  },
  col6: {
    width: "50%", 
    padding:5
  },
  col4: {
    width: "33%", 
    padding:5
  },
  label: {
    fontWeight: "bold",
    marginBottom:0,
    overflow: 'hidden'
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    height: 40,
  },
  submitButtonText:{
    color: 'white',
    textAlign:'center'
  }
});