import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import color from '../contains/color'

const {width, height} = Dimensions.get('screen')

const ItemNews = ({imageNews, title}) => {
  return (
    <View style={styles.itemNews}>
        <Image source={imageNews} resizeMode='center' style={styles.imageNews} />
        <Text style={styles.titleNews}>{title}</Text>
    </View>
  )
}

export default ItemNews

const styles = StyleSheet.create({
    itemNews: {
        width: 0.42 * width,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 10
    },
    imageNews: {
        width: '100%',
        height: '80%',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 10
    },
    titleNews: {
        fontSize: 12,
        textTransform: 'uppercase',
        height: '20%',
        width: '100%',
        textAlign: 'center',
        fontWeight: '500',
        color: color.text,
        backgroundColor: color.white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
})