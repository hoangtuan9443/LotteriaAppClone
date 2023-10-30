import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import color from '../contains/color'

const {width, height} = Dimensions.get('screen')

const CategoryItem = ({title, image, borderChooseCategory = {}, setCategory, index}) => {
  return (
    <TouchableOpacity 
      style={styles.categoryItem} 
      disabled={borderChooseCategory?.borderWidth ? true : false} 
      onPress={() => setCategory(index)}>
        <Image source={image} resizeMode='stretch' style={[styles.imgItem, borderChooseCategory]} />
        <Text numberOfLines={2} style={styles.titleCategory}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  categoryItem: {
    width: width * 0.25,
    height: '100%',
    alignItems: 'center',
    marginLeft: 10,
  },
  imgItem: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  titleCategory: {
    color: color.text,
    textAlign: 'center',
    width: '100%',
    flexShrink: 1,
    fontSize: 12,
    marginTop: 5
  }
})