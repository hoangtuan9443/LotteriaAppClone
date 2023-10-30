import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import color from '../contains/color'
import { useDispatch } from 'react-redux'
import * as Actions from '../redux/Action'

const {width, height} = Dimensions.get('screen')

const ItemPayment = ({props, setLoading}) => {

    const dispatch = useDispatch()
    const handleDecreaseValue = () => {
        setLoading(true)
        if(props.quantity === 1) {
            dispatch({
                type: Actions.API_REMOVE_FROM_CART,
                data: props.id,
                setLoading: setLoading
            })
        }else {
            dispatch({
                type: Actions.API_DECREASE_QUANTITY,
                data: props.id,
                setLoading: setLoading
            })
        }
    }

    const handleIncreaseValue = () => {
        setLoading(true)
        dispatch({
            type: Actions.API_INCREASE_QUANTITY,
            data: props.id,
            setLoading: setLoading
        })
    }

    return (
        <View style={styles.itemCart}>
            <Image source={props.image} resizeMode='center' style={styles.imgItemCart} />
            <View style={{width: '40%'}}>
                <Text style={{fontWeight: 'bold', color: color.title}}>{props.title}</Text>
                {
                    props.detailsCombo?.map((item, index) => {
                        return (<Text key={index} style={styles.detailsCombo}>
                                {item.quantity + ` x `} 
                                {item.name + ` `}
                                {item.size ? `(${item.size})` : ''}
                            </Text>)
                    }) 
                }
                {props.add && <View style={styles.formBtn}>
                    <TouchableOpacity style={styles.btn} onPress={handleDecreaseValue}>
                        <Text style={styles.styleBtn}>-</Text>
                    </TouchableOpacity>
                        <Text style={styles.value}>{props.quantity}</Text>
                    <TouchableOpacity style={styles.btn} onPress={handleIncreaseValue}>
                        <Text style={styles.styleBtn}>+</Text>
                    </TouchableOpacity>
                </View>}
            </View>
            <View style={styles.itemPrice}>
                <Text style={{color: color.text, fontSize: 16}}>
                    {
                        props.discountPrice 
                        ? `${(props.quantity * props.discountPrice).toLocaleString()}đ`
                        : `${(props.initPrice * props.quantity).toLocaleString()}đ`
                    }
                </Text>
            </View>
        </View>
    )
}

export default ItemPayment

const styles = StyleSheet.create({
    itemCart: {
        width: '100%',
        backgroundColor: color.white,
        flexDirection: 'row',
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: color.primary
    },
    imgItemCart: {
        width: '30%',
        height: 70,
        borderRadius: 15,
        marginRight: 5
    },
    formBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    btn: {
        width: 30,
        height: 30,
        backgroundColor: color.second,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    styleBtn: { 
        fontSize: 20,
        color: color.white, 
        fontWeight: 'bold',
        textAlign: 'center'
    },
    value: {
        width: 40,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'pink',
        borderRadius: 5,
        fontWeight: '600',
        color: color.white
    },
    detailsCombo: {
        fontSize: 12,
        color: color.text,
    },
    itemPrice: {
        width: '30%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 10,
        paddingRight: 10
    },
})