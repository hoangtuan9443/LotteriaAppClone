import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import color from '../contains/color'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from '../redux/Action'

const {width, height} = Dimensions.get('screen')

const ItemFavorite = ({props, navigation}) => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.authenticationReducer.UserToken)
    const handleAddToCart = () => {
        if(token) {
            dispatch({
                type: Actions.API_ADD_TO_CART,
                data: {
                    ...props,
                    quantity: 1,
                },
                navigation: navigation.navigate('Cart')
            })
        }
    }

    const handleRemoveFromFavoriteList = () => {
        if(token) {
            dispatch({
                type: Actions.API_REMOVE_FROM_FAVORITELIST,
                data: {id: props.id}
            })
        }
    }

  return (
    <View style={styles.itemFavorite}>
        <Image source={props.image} resizeMode='center' style={styles.img} />
        <View style={{height: '30%'}}>
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            {
                props.discountPrice ? <Text style={styles.discountPrice}>{props.discountPrice}₫</Text> : <Text style={styles.discountPrice}>{props.initPrice}₫</Text>
            }
            {
                props.discountPrice 
                ?   <View style={{flexDirection: 'row'}}>
                    <Image 
                        source={require('../assets/image/tagPrice.png')} 
                        resizeMode='contain' 
                        style={styles.imgTagPrice} 
                    />
                    <Text style={styles.subtractPrice}>
                        {props.initPrice}₫
                    </Text> 
                    </View> 
                : null
            }
        </View>
        {
            props.add 
            ?   (<View style={styles.formBtn}>
                    <TouchableOpacity style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}} onPress={handleRemoveFromFavoriteList}>
                        <AntDesign name='heart' size={16} color='red' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.newBtn} onPress={handleAddToCart}>
                        <Text style={styles.styleBtn}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>) 
            : null
        }
    </View>
  )
}

export default ItemFavorite

const styles = StyleSheet.create({
    itemFavorite: {
        width: 0.5 * width - 20,
        height: 0.28 * height,
        paddingHorizontal: 5,
        paddingTop: 2,
        backgroundColor: color.white,
        borderRadius: 15,
        marginBottom: 10
    },
    img: {
        width: '100%',
        height: '52%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: color.title,
        paddingLeft: 5,
        width: '88%'
    },
    discountPrice: {
        marginTop: 5,
        color: color.primary,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    subtractPrice: {
        textDecorationLine: 'line-through',
        fontSize: 12,
        paddingLeft: 5,
        color: '#999'
    },
    imgTagPrice: {
        height: '100%',
        width: 15
    },
    formBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '18%',
        alignItems: 'center'
    },
    newBtn: {
        width: '60%',
        height: 30,
        backgroundColor: color.second,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    styleBtn: { 
        color: color.white, 
        textAlign: 'center',
        fontSize: 12
    },
})