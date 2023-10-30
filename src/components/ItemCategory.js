import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import color from '../contains/color'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from '../redux/Action'
import AntDesign from 'react-native-vector-icons/AntDesign'

const {width, height} = Dimensions.get('screen')

const ItemCategory = ({title, image, initPrice, discountPrice, add, dimensionCustomView = {}, detailsItem, navigation}) => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.authenticationReducer.UserToken)
    const favoriteList = useSelector(state => state.orderReducer.favoriteList)
    const checkFavoriteItemInList = favoriteList.filter(item => {
        if(item.id === detailsItem.id) {
            return item
        }
    })

    const handleAddToCart = () => {
        if(token) {
            dispatch({
                type: Actions.API_ADD_TO_CART,
                data: {
                    ...detailsItem,
                    quantity: 1,
                }
            })
        }else {
            navigation.navigate('Login')
        }
    }

    const handleAddtoFavoriteList = () => {
        if(token) {
            dispatch({
                type: Actions.API_ADD_TO_FAVORITELIST,
                data: {
                    ...detailsItem
                }
            })
        }else {
            navigation.navigate('Login')
        }
    }

    const handleRemoveFromFavoriteList = () => {
        if(token) {
            dispatch({
                type: Actions.API_REMOVE_FROM_FAVORITELIST,
                data: {id: detailsItem.id}
            })
        }else {
            navigation.navigate('Login')
        }
    }

    return (
        <TouchableOpacity style={[styles.itemCategory, dimensionCustomView]} disabled>
            <Image source={image} resizeMode='center' style={styles.img} />
            <View style={{height: '30%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text numberOfLines={1} style={styles.title}>{title}</Text>
                    {checkFavoriteItemInList.length === 0 
                    ? <TouchableOpacity onPress={handleAddtoFavoriteList} style={{marginRight: 5}}>
                        <AntDesign name={'hearto'} size={16} color={color.text} />
                      </TouchableOpacity>
                    : <TouchableOpacity onPress={handleRemoveFromFavoriteList} style={{marginRight: 5}}>
                        <AntDesign name={'heart'} size={16} color={'red'} />
                      </TouchableOpacity>
                    }
                </View>
                {
                    discountPrice ? <Text style={styles.discountPrice}>{discountPrice.toLocaleString()}₫</Text> : <Text style={styles.discountPrice}>{initPrice.toLocaleString()}₫</Text>
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
                                {initPrice.toLocaleString()}₫
                            </Text> 
                        </View> 
                    : null
                }
            </View>
            {
                add 
                ?   (<View style={styles.formBtn}>
                        <TouchableOpacity style={styles.newBtn} onPress={handleAddToCart}>
                            <Text style={styles.styleBtn}>Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                    </View>) 
                : null
            }
        </TouchableOpacity>
    )
}

export default ItemCategory

const styles = StyleSheet.create({
    itemCategory: {
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
    formBtn: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: '18%'
    },
    newBtn: {
        width: '90%',
        height: 30,
        backgroundColor: color.second,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    imgTagPrice: {
        height: '100%',
        width: 15
    },
    styleBtn: { 
        color: color.white, 
        textAlign: 'center',
        fontSize: 12
    },
})