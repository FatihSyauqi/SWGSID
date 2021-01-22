import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';

const MenuD = ({ }) => {
  const [img, setImg] = React.useState();
  const [
    { cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording },
    {
      toggleFacing,
      touchToFocus,
      textRecognized,
      facesDetected,
      takePicture,
      recordVideo,
      setIsRecording,
    },
  ] = useCamera();

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{ flex: 1 }}
        autoFocus={autoFocus}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
       
        <TouchableOpacity
          onPress={async () => {
          try {
            const data = await takePicture();
            setImg(data.uri)
            console.log(data)
          } finally {
            setIsRecording(false);
          }
          }}
          style={{ width: 100, height: 100, backgroundColor:'red', borderRadius:500 }}
        />
        <View style={{width:100, height:100}}>
          <Image source={{ uri: img }} style={{flex:1, width:undefined, height:undefined, resizeMode:'contain'}} />
        </View>
        
      </View>
      
  

      

      
    </View>
  );
};

export default MenuD