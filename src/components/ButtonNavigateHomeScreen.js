import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'

const {width, height} = Dimensions.get('screen')

const ButtonNavigateHomeScreen = ({ sourceImg, handleNavigate = () => {} }) => {
  return (
    <TouchableOpacity style={styles.btnWrapContent} onPress={handleNavigate}>
      <Image source={sourceImg} resizeMode='stretch' style={styles.img}/>
    </TouchableOpacity>
  )
}

export default ButtonNavigateHomeScreen

const styles = StyleSheet.create({
    btnWrapContent: {
        width: 0.5 * width - 20,
        height: 0.25 * height * 0.5 - 5,
    },
    img: {
        width: '100%', 
        height: '100%', 
        borderRadius: 10
    }
})