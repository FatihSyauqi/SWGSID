import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Fragment, Text, View, TextInput, TouchableHighlight, SafeAreaView, ScrollView,RefreshControl, TouchableOpacity, Select, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { openDatabase } from 'react-native-sqlite-storage';
import {Picker} from '@react-native-picker/picker';

var db = openDatabase({ name: 'SurveyPendudukDatabase.db' });

const MenuB = ({navigation,route}) => {
  const {
    url, header_title
  } = route.params;

  useEffect(() => {
      navigation.setOptions({ title: header_title })
  },[])

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: header_title });
  }, [navigation, route]);

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  const DataJenisKelamins = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Laki-Laki"},{"id":2,"nama":"Perempuan"}];
  const DataAgamas = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Islam"},{"id":2,"nama":"Katolik"},{"id":3,"nama":"Hindu"},{"id":4,"nama":"Budha"},{"id":5,"nama":"Khonghucu"},{"id":6,"nama":"Lainnya"}];

  const DataPendidikans = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Pendidikan 1"},{"id":2,"nama":"Pendidikan 2"},{"id":3,"nama":"Pendidikan 3"}];
  const DataJenisPekerjaans = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Jenis Pekerjaan 1"},{"id":2,"nama":"Jenis Pekerjaan 2"},{"id":3,"nama":"Jenis Pekerjaan 3"}];

  const DataStatusPerkawinans = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Kawin"},{"id":2,"nama":"Belum Kawin"},{"id":3,"nama":"Cerai"}];
  const DataHubunganKeluargas = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Kandung"},{"id":2,"nama":"Anak Tiri"},{"id":3,"nama":"Angkat"}];

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
  }, []);

  let [stateAgama, setStateAgama] = useState([]);
  let [stateJenisKelamin, setStateJenisKelamin] = useState([]);
  let [stateJenisPekerjaan, setStateJenisPekerjaan] = useState([]);

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

    });
  }, []);
  
  return (
    <View>
      <>
        <SafeAreaView>
            <ScrollView horizontal={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <View style={styles.container}> 
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Nama Lengkap"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="NamaLengkap"
                    defaultValue=""
                />
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "NIK (Sesuai KTP)"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="NIK"
                    defaultValue=""
                />
              </View>
              <View style={styles.container}>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Tempat Lahir"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="TempatLahir"
                    rules={{ required: true }}
                    defaultValue=""
                  />

                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Tanggal Lahir"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
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
              
              <View style={styles.container}>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "RT"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="Rt"
                    defaultValue=""
                />
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "RW"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="Rw"
                    defaultValue=""
                />
              </View>
              
              <View style={styles.container}>
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

              <View style={styles.container}>
                  <View style={styles.SelectPickerGrid}>
                    <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <Picker
                          selectedValue={value}
                          onBlur={onBlur}
                          onValueChange={(value, itemIndex) => onChange(value)}
                        >
                          {DataPendidikans.map((val, key) => {
                            return (
                              value == val ? (
                                <Picker.Item label={val.nama} value={val.id} key={key} />
                              ) : (
                                <Picker.Item label={val.nama} value={val.id} key={key} />
                              )
                            );
                          })} 
                        </Picker>
                      )}
                      name="Pendidikan"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                  </View>

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

              <View style={styles.container}>
                  <View style={styles.SelectPickerGrid}>
                    <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <Picker
                          selectedValue={value}
                          onBlur={onBlur}
                          onValueChange={(value, itemIndex) => onChange(value)}
                        >
                          {DataStatusPerkawinans.map((val, key) => {
                            return (
                              value == val ? (
                                <Picker.Item label={val.nama} value={val.id} key={key} />
                              ) : (
                                <Picker.Item label={val.nama} value={val.id} key={key} />
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

                  <View style={styles.SelectPickerGrid}>
                    <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <Picker
                          mode="dropdown"
                          selectedValue={value}
                          onBlur={onBlur}
                          onValueChange={(value, itemIndex) => onChange(value)}
                        >
                          {DataHubunganKeluargas.map((val, key) => {
                            return (
                              value == val ? (
                                <Picker.Item label={val.nama} value={val.id} key={key} />
                              ) : (
                                <Picker.Item label={val.nama} value={val.id} key={key} />
                              )
                            );
                          })} 
                        </Picker>
                      )}
                      name="StatusHubunganKeluarga"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                  </View>
                  
              </View>

              <View style={styles.container}> 
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Kode Pos"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="KodePos"
                    defaultValue=""
                />
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Tanggal Dikeluarkan"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="TanggalDikeluarkan"
                    defaultValue=""
                />
              </View>
                
            </ScrollView>
        </SafeAreaView>
      </>


      <TouchableHighlight
         style = {styles.submitButton}
         onPress={handleSubmit(onSubmit)}>
        <Text style = {styles.submitButtonText}> SIMPAN DATA </Text>
      </TouchableHighlight>

    </View>
  );
}

export default MenuB;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  SelectPickerGrid: {
    width: "45%", 
    overflow: 'hidden',
    margin: 10,
    height: 50,
    marginBottom:0,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  selectGrid: {
    width: "50%", 
    overflow: 'hidden'
  },

  inputGrid: {
    margin: 10,
    height: 40,
    marginBottom:0,
    width: "45%", 
    overflow: 'hidden',
    borderColor: '#7a42f4',
    borderWidth: 1
  },

  input: {
    margin: 10,
    height: 40,
    padding:10,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 10,
    height: 40,
  },
  submitButtonText:{
    color: 'white',
    textAlign:'center'
  }
});