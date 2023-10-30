import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React from 'react'

const {width, height} = Dimensions.get('screen')

const ListItem = ({ dataRender, width = {} }) => {
  return (
    <ScrollView 
      style={styles.listItem}
      horizontal
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      // pagingEnabled
      // contentContainerStyle={{width: itemList.length * width/2 - 23*itemList.length, height: '100%'}}
      contentContainerStyle={{...width}}
      >
        {dataRender}
    </ScrollView>
  )
}

export default ListItem

const styles = StyleSheet.create({
    listItem: {
        width: '100%'
    },
})