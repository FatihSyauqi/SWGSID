import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Fragment, Text, View, TextInput, TouchableHighlight, SafeAreaView, ScrollView,RefreshControl, TouchableOpacity, Select, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { openDatabase } from 'react-native-sqlite-storage';
import {Picker} from '@react-native-picker/picker';

var db = openDatabase({ name: 'SurveyPendudukDatabase.db' });
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const MenuC = ({navigation,route}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Form Input Anggota Keluarga" });
  }, [navigation, route]);

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
  }, []);

  let [stateAgama, setStateAgama] = useState([]);
  let [stateJenisKelamin, setStateJenisKelamin] = useState([]);
  let [stateJenisPekerjaan, setStateJenisPekerjaan] = useState([]);
  let [stateGolonganDarah, setStateGolonganDarah] = useState([]);
  let [stateStatusKawin, setStateStatusKawin] = useState([]);
  let [stateKewarganegaraan, setStateKewarganegaraan] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tb_agama',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_agama": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
               tempData.push(results.rows.item(i));
            }
            setStateAgama(tempData);
          } else {
            console.log("Data Agama Tidak Ditemukan");
          }
        }
      );

      tx.executeSql(
        'SELECT * FROM tb_jenis_kelamin',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_jenis_kelamin": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
              tempData.push(results.rows.item(i));
            }
            setStateJenisKelamin(tempData);
          } else {
            console.log("Data Jenis Kelamin Tidak Ditemukan");
          }
        }
      );

      tx.executeSql(
        'SELECT * FROM tb_jenis_pekerjaan',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_jenis_pekerjaan": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
              tempData.push(results.rows.item(i));
            }
            setStateJenisPekerjaan(tempData);
          } else {
            console.log("Data Jenis Pekerjaan Tidak Ditemukan");
          }
        }
      );

      tx.executeSql(
        'SELECT * FROM tb_jenis_goldar',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_jenis_goldar": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
              tempData.push(results.rows.item(i));
            }
            setStateGolonganDarah(tempData);
          } else {
            console.log("Data Jenis Golongan Darah Tidak Ditemukan");
          }
        }
      );

      tx.executeSql(
        'SELECT * FROM tb_status_kawin',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_status_kawin": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
              tempData.push(results.rows.item(i));
            }
            setStateStatusKawin(tempData);
          } else {
            console.log("Data Status Kawin Tidak Ditemukan");
          }
        }
      );

      tx.executeSql(
        'SELECT * FROM tb_jenis_warga',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            var tempData = [];
            tempData.push({ "id_warga": "", "keterangan": "-Choose One-" });
            for (let i = 0; i < results.rows.length; ++i){
              tempData.push(results.rows.item(i));
            }
            setStateKewarganegaraan(tempData);
          } else {
            console.log("Data Kewarganegaraan Tidak Ditemukan");
          }
        }
      );

    });
  }, []);
  
  const [data, setData] = useState([]);
  if(data.length == 0){
    setData([...data, { id: 1 }]);
  }
  const append = () => {
    if(data.length == 0){
      setData([...data, { id: 1 }]);
    } else {
      setData([...data, { id: data.length + 1 }]);
    }
  };

  console.log(data);
  return (
    <View>
      <>
        <SafeAreaView>
            <ScrollView horizontal={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

              <View style={styles.container}>
                <View style={styles.rowStyle}>
                    <View style={styles.col12}>
                      <TouchableHighlight
                        style = {styles.submitButton}
                        onPress={() => navigation.replace('MainApp')}>
                        <Text style = {styles.submitButtonText}> SIMPAN DATA </Text>
                      </TouchableHighlight>
                    </View>
                </View>
                {data.map((item, indexAppend) => (
                  <View key={indexAppend} style={[styles.rowStyle,{margin:1, padding:1, marginTop:10, marginBottom:10, paddingTop:10, paddingBottom:10, backgroundColor:"white"}]}>
                    <Text style={[styles.headingText,{textAlign:"left",width:"100%",marginBottom:10}]}>FORM ANGGOTA KK KE-{indexAppend+1}</Text> 
                    <View style={styles.col6}>
                      <Text style={styles.label}>Nama Lengkap</Text> 
                      <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <TextInput
                              placeholder = "Nama Lengkap"
                              placeholderTextColor = "#9a73ef"
                              style={styles.input}
                              onBlur={onBlur}
                              onChangeText={value => onChange(value)}
                              value={value}
                            />
                          )}
                          name="NamaLengkap"
                          defaultValue=""
                      />
                    </View>
                    <View style={styles.col6}>
                      <Text style={styles.label}>NIK</Text> 
                      <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                          <TextInput
                            placeholder = "NIK (Sesuai KTP)"
                            placeholderTextColor = "#9a73ef"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                          />
                        )}
                        name="NIK"
                        defaultValue=""
                    />
                    </View>
                    <View style={styles.col6}>
                      <Text style={styles.label}>Tempat Lahir</Text> 
                      <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                          <TextInput
                            placeholder = "Tempat Lahir"
                            placeholderTextColor = "#9a73ef"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                          />
                        )}
                        name="TempatLahir"
                        rules={{ required: true }}
                        defaultValue=""
                      />
                    </View>
                    
                    <View style={styles.col6}>
                      <Text style={styles.label}>Tanggal Lahir</Text>
                      <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                          <TextInput
                            placeholder = "Tanggal Lahir"
                            placeholderTextColor = "#9a73ef"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                          />
                        )}
                        name="TanggalLahir"
                        rules={{ required: true }}
                        defaultValue=""
                      />
                    </View>
                    <View style={styles.col6}>
                      <Text style={styles.label}>Jenis Kelamin</Text>
                      <View style={styles.SelectPickerGrid}>
                        <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <Picker
                              selectedValue={value}
                              onBlur={onBlur}
                              onValueChange={(value, itemIndex) => onChange(value)}
                            >
                              {stateJenisKelamin.map((val, key) => {
                                return (
                                  value == val.id_jenis_kelamin ? (
                                    <Picker.Item label={val.keterangan} value={val.id_jenis_kelamin} key={key} />
                                  ) : (
                                    <Picker.Item label={val.keterangan} value={val.id_jenis_kelamin} key={key} />
                                  )
                                );
                              })} 
                            </Picker>
                          )}
                          name="JenisKelamin"
                          rules={{ required: true }}
                          defaultValue=""
                        />
                      </View>
                    </View>
                      
                    <View style={styles.col6}>
                      <Text style={styles.label}>Agama</Text>
                      <View style={styles.SelectPickerGrid}>
                        <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <Picker
                              selectedValue={value}
                              onBlur={onBlur}
                              onValueChange={(value, itemIndex) => onChange(value)}
                            >
                              {stateAgama.map((val, key) => {
                                return (
                                  value == val.id_agama ? (
                                    <Picker.Item label={val.keterangan} value={val.id_agama} key={key} />
                                  ) : (
                                    <Picker.Item label={val.keterangan} value={val.id_agama} key={key} />
                                  )
                                );
                              })} 
                            </Picker>
                          )}
                          name="Agama"
                          rules={{ required: true }}
                          defaultValue=""
                        />
                      </View>
                    </View>
                    <View style={styles.col6}>
                      <Text style={styles.label}>Golongan Darah</Text>
                      <View style={styles.SelectPickerGrid}>
                        <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <Picker
                              selectedValue={value}
                              onBlur={onBlur}
                              onValueChange={(value, itemIndex) => onChange(value)}
                            >
                              {stateGolonganDarah.map((val, key) => {
                                return (
                                  value == val.id_jenis_goldar ? (
                                    <Picker.Item label={val.keterangan} value={val.id_jenis_goldar} key={key} />
                                  ) : (
                                    <Picker.Item label={val.keterangan} value={val.id_jenis_goldar} key={key} />
                                  )
                                );
                              })} 
                            </Picker>
                          )}
                          name="GolonganDarah"
                          rules={{ required: true }}
                          defaultValue=""
                        />
                      </View>
                    </View>
                      
                    
                    <View style={styles.col6}>
                      <Text style={styles.label}>Jenis Pekerjaan</Text>
                      <View style={styles.SelectPickerGrid}>
                        <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <Picker
                              selectedValue={value}
                              onBlur={onBlur}
                              onValueChange={(value, itemIndex) => onChange(value)}
                            >
                              {stateJenisPekerjaan.map((val, key) => {
                                return (
                                  value == val.id_jenis_pekerjaan ? (
                                    <Picker.Item label={val.keterangan} value={val.id_jenis_pekerjaan} key={key} />
                                  ) : (
                                    <Picker.Item label={val.keterangan} value={val.id_jenis_pekerjaan} key={key} />
                                  )
                                );
                              })} 
                            </Picker>
                          )}
                          name="JenisPekerjaan"
                          rules={{ required: true }}
                          defaultValue=""
                        />
                      </View>
                    </View>

                    <View style={styles.col6}>
                      <Text style={styles.label}>Status Perkawinan</Text>
                      <View style={styles.SelectPickerGrid}>
                        <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <Picker
                              selectedValue={value}
                              onBlur={onBlur}
                              onValueChange={(value, itemIndex) => onChange(value)}
                            >
                              {stateStatusKawin.map((val, key) => {
                                return (
                                  value == val.id_status_kawin ? (
                                    <Picker.Item label={val.keterangan} value={val.id_status_kawin} key={key} />
                                  ) : (
                                    <Picker.Item label={val.keterangan} value={val.id_status_kawin} key={key} />
                                  )
                                );
                              })} 
                            </Picker>
                          )}
                          name="StatusPerkawinan"
                          rules={{ required: true }}
                          defaultValue=""
                        />
                      </View>
                    </View>
                    
                    <View style={styles.col6}>
                      <Text style={styles.label}>Kewarganegaraan</Text>
                      <View style={styles.SelectPickerGrid}>
                        <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <Picker
                              selectedValue={value}
                              onBlur={onBlur}
                              onValueChange={(value, itemIndex) => onChange(value)}
                            >
                              {stateKewarganegaraan.map((val, key) => {
                                return (
                                  value == val ? (
                                    <Picker.Item label={val.keterangan} value={val.id_warga} key={key} />
                                  ) : (
                                    <Picker.Item label={val.keterangan} value={val.id_warga} key={key} />
                                  )
                                );
                              })} 
                            </Picker>
                          )}
                          name="JenisWarga"
                          rules={{ required: true }}
                          defaultValue=""
                        />
                      </View>
                    </View>
                    
                    <View style={styles.col6}>
                      <Text style={styles.label}>Nama Ayah</Text>
                      <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <TextInput
                              placeholder = "Nama Ayah"
                              placeholderTextColor = "#9a73ef"
                              style={styles.input}
                              onBlur={onBlur}
                              onChangeText={value => onChange(value)}
                              value={value}
                            />
                          )}
                          name="NamaAyah"
                          defaultValue=""
                      />
                    </View>
                    
                    <View style={styles.col6}>
                      <Text style={styles.label}>Nama Ibu</Text>
                      <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <TextInput
                              placeholder = "Nama Ibu"
                              placeholderTextColor = "#9a73ef"
                              style={styles.input}
                              onBlur={onBlur}
                              onChangeText={value => onChange(value)}
                              value={value}
                            />
                          )}
                          name="NamaIbu"
                          defaultValue=""
                      />
                    </View>

                    <View style={styles.col6}>
                      <Text style={styles.label}>Nomor Kitas</Text>
                      <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <TextInput
                              placeholder = "Nomor Kitas"
                              placeholderTextColor = "#9a73ef"
                              style={styles.input}
                              onBlur={onBlur}
                              onChangeText={value => onChange(value)}
                              value={value}
                            />
                          )}
                          name="NoKitas"
                          defaultValue=""
                      />
                    </View>
                    
                    <View style={styles.col6}>
                      <Text style={styles.label}>Nomor Paspor</Text>
                      <Controller
                          control={control}
                          render={({ onChange, onBlur, value }) => (
                            <TextInput
                              placeholder = "Nomor Paspor"
                              placeholderTextColor = "#9a73ef"
                              style={styles.input}
                              onBlur={onBlur}
                              onChangeText={value => onChange(value)}
                              value={value}
                            />
                          )}
                          name="NoPaspor"
                          defaultValue=""
                      />
                    </View>
                  </View>
                ))}



                <View style={styles.col12}>
                  <TouchableHighlight
                    style = {styles.addButton}
                    //onPress={handleSubmit(onSubmit)}
                    onPress={() => {
                      append();
                    }}
                    >
                    <Text style = {styles.submitButtonText}> TAMBAH SATU ANGGOTA LAGI </Text>
                  </TouchableHighlight>
                </View>
              </View>
                
            </ScrollView>
        </SafeAreaView>
      </>
      
    </View>
  );
}

export default MenuC;

const styles = StyleSheet.create({
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
  col6: {
    width: "50%", 
    padding:5
  },
  label: {
    fontWeight: "bold",
    marginBottom:0,
    overflow: 'hidden'
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    height: 40,
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