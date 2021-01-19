import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

const MenuF = ({}) => {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View>
        <Text>MENU F</Text>
    </View>
  );
}

export default MenuF

const styles = StyleSheet.create({})
