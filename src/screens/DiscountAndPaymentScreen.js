import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image, StatusBar } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import CheckBox from '@react-native-community/checkbox';
import color from '../contains/color'
import * as Actions from '../redux/Action'
import ItemDiscount from '../components/ItemDiscount';

import { useSelector, useDispatch } from 'react-redux';

const {width, height} = Dimensions.get('screen')

const DiscountAndPaymentScreen = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const discountAndPaymentTypeList = useSelector(state => state.cartReducer.discountAndPaymentTypeList)
    const discountList = useSelector(state => state.cartReducer.discountList)
    const {type, totalPrice} = route.params
    const [dataListRender, setDataListRender] = useState([])

    useEffect(() => {
        setDataListRender(discountAndPaymentTypeList)
    }, [])

    const handleApprove = () => {
        const temporaryPayment = dataListRender.filter(item => item.checkbox)
        dispatch({
            type: Actions.API_CHANGE_PAYMENT,
            data: {
                payment: `${temporaryPayment[0].title}`,
                discountAndPaymentTypeList: dataListRender,
                navigation: navigation
            }
        })
    }

    return (
        <View style={styles.discountPayment}>
            <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
            <View style={styles.headerPay}>
                <TouchableOpacity style={styles.iconBack} onPress={() => navigation.pop(1)}>
                    <EvilIcons name='close' size={24} color={color.title}  />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>{type === 'cachthanhtoan' ? 'Bạn muốn thanh toán bằng?' : 'Mã giảm giá'}</Text>
            </View>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            >
                    {   type === 'cachthanhtoan' &&
                        dataListRender.map(item => {
                            return (
                                <View style={styles.wrapPayment} key={item.id}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={item.image} resizeMode='center' style={styles.imgPayment} />
                                        <Text style={{color: color.text}}>{item.title}</Text>
                                    </View>
                                    <CheckBox
                                        value={item.checkbox}
                                        onValueChange={() => {
                                            const temporaryData = [...dataListRender]
                                            const findValueItem = temporaryData.map(record => {
                                                if(record.id === item.id) {
                                                    return {...record, checkbox: true}
                                                }
                                                return {...record, checkbox: false}
                                            })
                                            setDataListRender(findValueItem)}
                                        }
                                        tintColors={{true: color.primary}} 
                                    />
                                </View>)
                        })
                    }
                    {
                        type === 'magiamgia' && 
                        discountList.map(item => {
                            if(totalPrice > item.upperThreshold) {
                                return (<ItemDiscount
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            date={item.date}
                                            available={item.available}
                                            product={item.product} 
                                            percentage={item?.percentage}
                                            navigation={navigation}
                                        />)
                            }
                        })
                    }
            </ScrollView>
            {   type === 'cachthanhtoan' &&
                <View style={styles.footer}>
                    <TouchableOpacity style={[styles.btnAccept, styles.shadowProp]} onPress={handleApprove}>
                        <Text style={{color: color.white, fontSize: 18}}>Đồng ý</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default DiscountAndPaymentScreen

const styles = StyleSheet.create({
    discountPayment: {
        flex: 1,
        backgroundColor: color.background
    },
    headerPay: {
        flexDirection: 'row',
        height: 0.08 * height,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconBack: {
        position: 'absolute',
        left: 15
      },
      titleHeader: {
        fontSize: 20,
        color: color.title,
        fontWeight: '600',
      },
      scrollView: {
        flex: 1
      },
      wrapPayment: {
        width: width - 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d1',
        paddingVertical: 15,
      },
      imgPayment: {
        width: 35,
        height: 25,
        marginRight: 10
      },
      footer: {
        height: height * 0.1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      btnAccept: {
        width: width - 30,
        height: '60%',
        backgroundColor: color.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      shadowProp: {
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: 'black'
      },
})