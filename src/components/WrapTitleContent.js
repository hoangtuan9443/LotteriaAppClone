import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../contains/color'

const WrapTitleContent = ({ title, navigation }) => {
  return (
    <View style={styles.wrapTitleContent}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Đặt hàng')}>
        <Text style={styles.textSeeAll}>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WrapTitleContent

const styles = StyleSheet.create({
    wrapTitleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15
    },
    title: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: color.title,
        fontWeight: '500'
    },
    textSeeAll: {
        color: color.primary,
        fontWeight: '500',
        fontSize: 14,
        marginRight: 15
    },
})