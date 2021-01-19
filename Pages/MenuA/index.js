import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, PermissionsAndroid, Platform, Text, View, TextInput, TouchableHighlight, SafeAreaView, ScrollView,RefreshControl, TouchableOpacity, Select, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { openDatabase } from 'react-native-sqlite-storage';
import {Picker} from '@react-native-picker/picker';

const GLOBALDATA = require('../../Function/global');

var db = openDatabase({ name: 'sqlite.db' });

const MenuA = ({navigation,route}) => {
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

  const DataDesas = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Desa 1"},{"id":2,"nama":"Desa 2"},{"id":3,"nama":"Desa 3"}];
  const DataKecamatans = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Kecamatan 1"},{"id":2,"nama":"Kecamatan 2"},{"id":3,"nama":"Kecamatan 3"}];
  const DataKotkabs = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Kota 1"},{"id":2,"nama":"Kota 2"},{"id":3,"nama":"Kota 3"}];
  const DataProvinsis = [{"id":"","nama":"- Choose One -"},{"id":1,"nama":"Provinsi 1"},{"id":2,"nama":"Provinsi 2"},{"id":3,"nama":"Provinsi 3"}];

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setCurrentLongitude(GLOBALDATA.LONG);
    setCurrentLatitude(GLOBALDATA.LAT);
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


  return (
    <View>
      {/* <Header /> */}
      <>
        <SafeAreaView>
            <ScrollView horizontal={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <View style={styles.container}> 
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput placeholder = "Nomor Kartu Keluarga" placeholderTextColor = "#9a73ef" style={styles.inputGrid} onBlur={onBlur} onChangeText={value => onChange(value)} value={value} />
                    )}
                    name="NoKartuKeluarga"
                    defaultValue=""
                />
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "NoKertas"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="NoKertas"
                    defaultValue=""
                />
              </View>
              <View style={styles.container}>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Nama Kepala Keluarga"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    )}
                    name="NamaKepalaKeluarga"
                    rules={{ required: true }}
                    defaultValue=""
                  />

                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Alamat"
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
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
                          {DataProvinsis.map((val, key) => {
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
                      name="Provinsi"
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
                          {DataKotkabs.map((val, key) => {
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
                      name="Kota"
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
                            {DataDesas.map((val, key) => {
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
                        name="Desa"
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
                            {DataKecamatans.map((val, key) => {
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
                        name="Kecamatan"
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
              
              <View style={styles.container}> 
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Longitude..."
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={currentLongitude}
                      />
                    )}
                    name="Longitude"
                    defaultValue={currentLongitude}
                />
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        placeholder = "Latitude..."
                        placeholderTextColor = "#9a73ef"
                        style={styles.inputGrid}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={currentLatitude}
                      />
                    )}
                    name="Latitude"
                    defaultValue={currentLatitude}
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
export default MenuA;
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