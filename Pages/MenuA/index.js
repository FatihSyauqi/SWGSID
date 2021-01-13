import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Select, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-picker/picker';

export default function MenuA() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <View>
        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      
        <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            placeholder = "Ketikkan NIK"
            placeholderTextColor = "#9a73ef"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Nik"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.Nik && <Text>Wajib di isi.</Text>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            placeholder = "Ketikkan Nama Lengkap"
            placeholderTextColor = "#9a73ef"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="NamaLengkap"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.NamaLengkap && <Text>Wajib di isi.</Text>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            placeholder = "Ketikkan No KK Sebelumnya"
            placeholderTextColor = "#9a73ef"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="NoKkSebelumnya"
        defaultValue=""
      />

      <TouchableHighlight
         style = {styles.submitButton}
         onPress={handleSubmit(onSubmit)}>
        <Text style = {styles.submitButtonText}> SIMPAN </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    padding:10,
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText:{
    color: 'white',
    textAlign:'center'
  }
});