import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import color from '../contains/color'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from '../redux/Action'

const {width, height} = Dimensions.get('screen')

const ItemHomeScreen = ({ image, title, detailsCombo = [], initPrice, discountPrice, add, dimensionCustomView = {}, detailsItem, navigation }) => {
    
    const dispatch = useDispatch()
    const token = useSelector(state => state.authenticationReducer.UserToken)
    const handleAddToCart = () => {
        if(token) {
            dispatch({
                type: Actions.API_ADD_TO_CART,
                data: {
                    ...detailsItem,
                    quantity: 1,
                },
            })
        }else {
            navigation.navigate('Login')
        }
    }

    return (
        <View style={[styles.ItemHomeScreen, styles.shadowProp, dimensionCustomView]}>
        <Image source={image} resizeMode='stretch' style={styles.imgPromotion} />
        <View style={{height: '50%'}}>
            <Text style={styles.titlePromotion}>{title}</Text>
            <View style={{height: '50%'}}>
                {
                    JSON.stringify([]) !== JSON.stringify(detailsCombo) 
                    ? detailsCombo.map((item, index) => {
                        return (
                        <Text key={index} style={styles.detailsCombo}>
                            {item.quantity < 10 ? `${'0' + item.quantity} ` : item.quantity} 
                            {item.name + ` `}
                            {item.size ? `(${item.size})` : ''}
                        </Text>)
                    }) 
                    : null
                }
            </View>
            {
                discountPrice ? <Text style={styles.discountPrice}>{Number(discountPrice).toLocaleString()}₫</Text> : <Text style={styles.discountPrice}>{Number(initPrice).toLocaleString()}₫</Text>
            }
            {
                discountPrice 
                ?   <View style={{flexDirection: 'row'}}>
                    <Image 
                                source={require('../assets/image/tagPrice.png')} 
                                resizeMode='contain' 
                                style={styles.imgTagPrice} 
                            />
                        <Text style={styles.subtractPrice}>
                            {Number(initPrice).toLocaleString('en')}₫
                        </Text> 
                    </View> 
                : null
            }
        </View>
        {
            add 
            ?   (<View style={styles.formBtn}>
                    <TouchableOpacity style={styles.btn} onPress={handleAddToCart}>
                        <Text style={styles.styleBtn}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                </View>) 
            : null
        }
        </View>
  )
}

export default ItemHomeScreen

const styles = StyleSheet.create({
    ItemHomeScreen: {
        width: 0.42 * width,
        height: '99.5%',
        marginRight: 10,
        paddingHorizontal: 5,
        paddingTop: 2,
        backgroundColor: color.white,
    },
    imgPromotion: {
        width: '100%',
        height: '37%',
    },
    titlePromotion: {
        fontSize: 14,
        fontWeight: 'bold',
        color: color.title,
        height: '15%',
        paddingLeft: 5
    },
    detailsCombo: {
        fontSize: 10,
        color: color.text,
        paddingLeft: 5,
    },
    discountPrice: {
        marginTop: 5,
        fontSize: 15,
        color: color.primary,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    subtractPrice: {
        textDecorationLine: 'line-through',
        fontSize: 13,
        paddingLeft: 5,
        color: '#999'
    },
    formBtn: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: '10%'
    },
    btn: {
        width: '90%',
        height: 30,
        backgroundColor: color.second,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    value: {
        width: 40,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'pink',
        borderRadius: 5,
        fontWeight: '600'
    },
    shadowProp: {
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
        shadowColor: 'black'
    },
    imgTagPrice: {
        height: '100%',
        width: 15
    },
    styleBtn: { 
        color: color.white, 
        fontWeight: 'bold',
        textAlign: 'center'
    },
})