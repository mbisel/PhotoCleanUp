import React from 'react'
import { Text,View, StyleSheet } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
export default function TopBar() {
  return (
    <View style={styles.container}>
       
      <Text style={styles.text}><FontAwesome5 name="soap" size={27} color="#50C7C7" /> Clean Up </Text>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    //flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 9,
  },
  text:{
      fontSize:20,
      fontWeight: "700",
  }
})