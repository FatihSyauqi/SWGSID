import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

const MenuE = ({}) => {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View>
        <Text>MENU E</Text>
    </View>
  );
}

export default MenuE

const styles = StyleSheet.create({})
