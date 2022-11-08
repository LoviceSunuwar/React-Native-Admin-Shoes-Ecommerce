import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

import React , { useState } from 'react';
import {firebase} from '../firebase/firebaseConfig';
import {useNavigation} from '@react-navigation/native';



const Details = ({route}) => {
  const shoesRef = firebase.firestore().collection('shoes');
  const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
  const navigation = useNavigation();

  const updateshoes = () => {
    if (textHeading && textHeading.length > 0){
      shoesRef
      .doc(route.params.item.id)
      .update({
        heading: textHeading,
      }).then (() => {
        navigation.navigate('Home')
      }).catch((error.message))
    }
  }

  return (
    <View style={styles.contianer}>
      <TextInput 
        style = {styles.textField}
        onChangeText= {onChangeHeadingText}
        value = {textHeading}
        placeholder = "Update Shoes">
        
      </TextInput>
      <Pressable
      style={styles.buttonUpdate}
      onPress={()=> {updateshoes()}}
      >
        <Text>Update Shoes</Text>
      </Pressable>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
    container: {
      marginTop: 80,
      marginLeft: 15,
      marginRight: 15,
    }, 
    textField: {
      marginBottom: 10,
      padding: 10,
      fontSize: 15,
      color: '#000000',
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
    },
    buttonUpdate: {
      marginTop: 25,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 10,
      backgroundColor:'#0de065',
      

    }

})