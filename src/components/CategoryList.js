import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

const CategoryList = ({ dataRender }) => {
  return (
    <ScrollView
        horizontal
        scrollEventThrottle={16}
        contentContainerStyle={{width: imgList.length * width - 30*4, height: '100%'}}
    >
      {
        dataRender
      }
    </ScrollView>
  )
}

export default CategoryList