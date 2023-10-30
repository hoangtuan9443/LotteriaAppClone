import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import color from '../contains/color'

const {width, height} = Dimensions.get('screen')

const ItemOrder = ({props, navigation}) => {
  return (
    <TouchableOpacity style={styles.btnItemOrder} onPress={() => navigation.navigate('OrderInfo', {...props})}>
      <View style={styles.idDateTime}>
        <Text style={{color: color.title, fontWeight: '500'}}>{props.id}</Text>
        <Text style={{color: '#999', fontSize: 10}}>{props.createdDate} {props.createdTime}</Text>
      </View>
      <View style={styles.content}>
        <MaterialIcons name='location-on' color={color.primary} size={20} style={styles.iconLocation} />
        <View style={{flex: 1}}>
          <Text style={{color: color.title}}>Giao đến:</Text>
          <Text style={{color: '#999', fontSize: 12}}>{props.deliveryLocation}</Text>
        </View>
      </View>
      <View style={styles.state}>
        <Text style={{color: 'green', fontStyle: 'italic', fontSize: 12}}>{props.state === 'complete' ? 'Đã đặt hàng' : ''}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemOrder

const styles = StyleSheet.create({
    btnItemOrder: {
        width: width - 20,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#d1d1d1'
    },
    idDateTime: {
      flexDirection: 'row', 
      paddingVertical: 5, 
      justifyContent: 'space-between', 
      alignItems: 'center',
      width: '100%',
    },
    content: {
      width: '100%',
      flexDirection: 'row',
      paddingVertical: 5,
    },
    state: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 5
    },
    iconLocation: {
      width: 25,
      height: 25
    }
})