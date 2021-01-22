import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Fragment, Text, View, TextInput, TouchableHighlight, SafeAreaView, ScrollView,RefreshControl, TouchableOpacity, Select, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { openDatabase } from 'react-native-sqlite-storage';
import {Picker} from '@react-native-picker/picker';

var db = openDatabase({ name: 'SurveyPendudukDatabase.db' });

const MenuE = ({navigation,route}) => {

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
  }, []);
  
  const [data, setData] = useState([]);
  const append = () => {
    if(data.length == 0){
      setData([...data, { id: 1 }]);
    } else {
      setData([...data, { id: data.length + 1 }]);
    }
  };
  return (
    <View>
      <>
        <SafeAreaView>
            <ScrollView horizontal={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              
              <Text style={styles.headingText}>C. INPUT APPEND</Text> 
              
              <View style={styles.container}>

                {data.map((item, index) => (
                  <View key={index} style={styles.col12}>
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
                ))}

              </View>

              <TouchableHighlight
                style = {styles.submitButton}
                // onPress={handleSubmit(onSubmit)}
                onPress={() => {
                  append();
                }}
                >
                <Text style = {styles.submitButtonText}> ADD MORE</Text>
              </TouchableHighlight>
                
            </ScrollView>
        </SafeAreaView>
      </>
      
    </View>
  );
}

export default MenuE;

const styles = StyleSheet.create({
  headingText: {
    color:"black",
    fontSize:20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 12
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    margin: 10
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