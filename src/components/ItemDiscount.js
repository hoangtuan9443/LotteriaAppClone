import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import color from '../contains/color'
import { useDispatch } from 'react-redux'
import * as Actions from '../redux/Action'

const {width, height} = Dimensions.get('screen')

const ItemDiscount = ({ id, title, date, available, product, percentage, navigation }) => {

  const dispatch = useDispatch()
  const handleChooseDiscount = () => {
    dispatch({
      type: Actions.API_GET_DISCOUNT,
      data: {
        id: id,
        type: percentage ? 'ship' : 'productDiscount',
        data: percentage ? percentage : product, 
        navigation: navigation
      }
    })
  }

  const handleClearDiscount = () => {
    dispatch({
      type: Actions.API_CLEAR_DISCOUNT,
      data: {
        id: id,
        type: percentage ? 'ship' : 'productDiscount',
        data: percentage ? percentage : product, 
        navigation: navigation
      }
    })
  }

  return (
    <View style={[styles.itemDiscount, styles.shadowProp]}> 
      <View style={{marginLeft: 5}}>
        <Text style={{color: color.title, fontWeight: '500'}}>{id}</Text>
        <Text style={{color: color.title, marginVertical: 5, fontWeight: '500'}}>{title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: color.text}}>HSD: </Text>
          <Text>{date}</Text>
        </View>
      </View>
      {available ? 
        <TouchableOpacity style={styles.btnChoose} onPress={handleChooseDiscount}>
          <Text style={{color: color.primary, fontWeight: '500'}}>CHỌN</Text>
        </TouchableOpacity>
      : <TouchableOpacity style={styles.btnChoose} onPress={handleClearDiscount}>
          <Text style={{color: color.primary, fontWeight: '500'}}>XÓA</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

export default ItemDiscount

const styles = StyleSheet.create({
    itemDiscount: {
      width: width - 30,
      backgroundColor: color.white,
      borderRadius: 5,
      borderLeftWidth: 5,
      borderColor: color.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5,
      marginBottom: 10
    },
    btnChoose: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadowProp: {
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
      shadowColor: 'black'
    },
})