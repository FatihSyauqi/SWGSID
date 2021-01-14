import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableHighlight, SafeAreaView, ScrollView,RefreshControl, TouchableOpacity, Select, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import RBSheet from "react-native-raw-bottom-sheet";
import RNPickerSelect from "react-native-picker-select";


export default function MenuA() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  const DatasHubunganKeluarga = ["Kepala Keluarga","Suami", "Istri", "Anak", "Menantu", "Cucu","Orang Tua", "Mertua", "Famili","Pembantu","Lainnya"];
  const DatasJenisKelamin = ["Laki-Laki","Perempuan"];
  const DatasStatusPenduduk = ["Tetap","Tidak Tetap", "Pendatang"];
  const DatasAgama = ["Islam","Kristen", "Katolik", "Hindu", "Budha", "Khonghucu", "Lainnya"];

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
  }, []);

  const [ language, setLanguage ] = useState("");

  const ElementSelect = ({ArrayData}) => {
    const refRBSheet = useRef();
    const [state,setState] = useState([]);
    const selectedData = (val)=>{
        refRBSheet.current.close()
        setState(val);
    }

    return (<>
      <TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.selectGrid}>
        <Text style={styles.input}>{state == "" ? "Pilih Salah Satu" : state}</Text>
      </TouchableOpacity>
      <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
            wrapper: {
                backgroundColor: "transparent"
            },
            draggableIcon: {
                backgroundColor: "#000"
            }
            }}
        >
        <ScrollView>
            {ArrayData.map((val, key) => {
            return (
                <View key={key}>
                    <TouchableOpacity onPress={() => {selectedData(val, key)}} style={styles.combobox}>
                        {state == val ? (
                            <Text>{val.toUpperCase()} checked</Text>
                        ) : (
                          <Text>{val.toUpperCase()}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            );
            })} 
        </ScrollView>
      </RBSheet>
    </>);
  }

  return (
    <View>
      <>
        <SafeAreaView>
            <ScrollView horizontal={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            
              <View style={styles.container}>
                  <ElementSelect ArrayData={DatasHubunganKeluarga} />
                  <ElementSelect ArrayData={DatasJenisKelamin} />

                  <ElementSelect ArrayData={DatasStatusPenduduk} />
                  <ElementSelect ArrayData={DatasAgama} />
              </View>

              <View style={styles.container}>
                  <Text>
                      {language ?
                        `My favourite language is ${language}` :
                          "Please select a language"
                      }
                  </Text>
                  <RNPickerSelect
                      onValueChange={(language) => setLanguage(language)}
                      items={[
                          { label: "JavaScript", value: "JavaScript" },
                          { label: "TypeStript", value: "TypeStript" },
                          { label: "Python", value: "Python" },
                          { label: "Java", value: "Java" },
                          { label: "C++", value: "C++" },
                          { label: "C", value: "C" },
                      ]}
                  />
              </View>

                <View style={styles.container}>
                    <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <TextInput
                          placeholder = "Ketikkan NIK"
                          placeholderTextColor = "#9a73ef"
                          style={styles.inputGrid}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                        />
                      )}
                      name="Nik"
                      rules={{ required: true }}
                      defaultValue=""
                    />

                    <Controller
                      control={control}
                      render={({ onChange, onBlur, value }) => (
                        <TextInput
                          placeholder = "Ketikkan Nama Lengkap"
                          placeholderTextColor = "#9a73ef"
                          style={styles.inputGrid}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                        />
                      )}
                      name="NamaLengkapSalim"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                </View>

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
                
            </ScrollView>
        </SafeAreaView>
      </>


      <TouchableHighlight
         style = {styles.submitButton}
         onPress={handleSubmit(onSubmit)}>
        <Text style = {styles.submitButtonText}> SIMPAN </Text>
      </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  selectGrid: {
    width: "50%", 
    overflow: 'hidden'
  },

  inputGrid: {
    margin: 10,
    height: 40,
    marginBottom:5,
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
  },
  combobox: {
    borderBottomWidth:1,
    borderBottomColor: "gray",
    paddingVertical: 10,
    fontSize: 14,
    color: "#000000",
    flexDirection: 'row',
    justifyContent:'space-between'
  }
});