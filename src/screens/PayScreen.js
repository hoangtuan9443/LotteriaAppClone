import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image, Switch, TextInput, StatusBar, ActivityIndicator, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'

import ItemPayment from '../components/ItemPayment'
import * as Actions from '../redux/Action'
import color from '../contains/color'

const {width, height} = Dimensions.get('screen')

const PayScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const payment = useSelector(state => state.cartReducer.payment)
    const [isEnabled, setIsEnabled] = useState(true);
    const [note, setNote] = useState('')
    const [loading, setLoading] = useState(false)
    const cart = useSelector(
        state => state.cartReducer.cart, 
        (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
    )
    const cartDiscount = useSelector(
      state => state.cartReducer.cartDiscount, 
      (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
    )
    const discountList = useSelector(
      state => state.cartReducer.discountList, 
      (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
    )
    const deliveryCharge = useSelector(state => state.cartReducer.deliveryCharge)
    const mainLocation = useSelector(state => state.cartReducer.mainLocation, 
      (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
    )
    const UserInfo = useSelector(state => state.authenticationReducer.UserInfo)

    const totalCart = cart.concat(cartDiscount)
    const totalDiscountUsed = discountList.reduce((accumulator, currentValue) => {
      return !currentValue.available ? accumulator + 1 : accumulator
    }, 0)
    const totalPrice = cart.reduce((accumulator, currentValue) => {
      if(currentValue.discountPrice) {
        return accumulator + currentValue.discountPrice * currentValue.quantity
      }
      return accumulator + currentValue.initPrice * currentValue.quantity 
    }, 0)

    const priceCartDiscount = cartDiscount.reduce((accumulator, currentValue) => {
      if(currentValue.discountPrice) {
        return accumulator + currentValue.discountPrice * currentValue.quantity
      }
      return accumulator + currentValue.initPrice * currentValue.quantity 
    }, 0)

    const handlePayment = () => {
      if(mainLocation?.location){
        const date = new Date()
        dispatch({
          type: Actions.API_GET_ORDER, 
          data: {
            newOrder: {
              utensil: isEnabled,
              note: note,
              orderList: totalCart,
              deliveryLocation: mainLocation.location,
              cartPrice: totalPrice,
              totalPrice: totalPrice + deliveryCharge + priceCartDiscount,
              payment: payment,
              userInfo: UserInfo,
              deliveryCharge: deliveryCharge,
              state: 'complete',
              createdDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
              createdTime: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            },
            navigation: navigation
          }
        })
      }else{
        Alert.alert('Vui lòng chọn địa chỉ giao hàng !!!')
      }
    }  

    const handleTypeBtn = (e) => {
      navigation.navigate('DiscountAndPayment', {type: e, totalPrice: totalPrice + priceCartDiscount})
    }

  return (
    <View style={styles.payScreen}>
      <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
      {loading && <ActivityIndicator color={color.primary} size={'large'} style={styles.loading} />}
      <View style={styles.headerPay}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.pop(1)}>
          <FontAweSome5 name='angle-left' size={24} color={color.text}  />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Thanh toán</Text>
      </View>
      {JSON.stringify([]) !== JSON.stringify(cart) &&
        <ScrollView
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} 
          style={styles.payScrollView}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={[styles.btnAddress, styles.shadowProp]} onPress={() => navigation.navigate('MyLocation')}>
            <View style={{marginVertical: 10, marginLeft: 10, flex: 1}}>
              <Text style={{color: color.text}}>Giao hàng đến</Text>
              <Text numberOfLines={1} style={{color: color.title, fontWeight: '600', fontSize: 16}}>{mainLocation?.location ? mainLocation?.location : "Xin chọn địa chỉ"}</Text>
            </View>
            <FontAweSome5 name='edit' size={20} color={color.primary} style={{marginRight: 10, marginLeft: 5}} />
          </TouchableOpacity>
          <View style={styles.orderInfo}>
            <Text style={styles.textOrderInfo}>Thông tin đơn hàng</Text>
            <View style={[styles.viewNote, styles.shadowProp]}>
                {
                  totalCart.map(item => {
                    return (
                      <ItemPayment
                        key={item.id}
                        props={item}
                        setLoading={setLoading}
                        />
                  ) 
                  })
                }
            </View>
          </View>
          <View style={[styles.viewNote, styles.shadowProp]}>
            <Text style={styles.textOrderInfo}>Ghi chú cho đơn hàng</Text>
            <TextInput
              style={styles.inputNote}
              placeholder='Vui lòng thêm lưu ý cho cửa hàng'
              placeholderTextColor={'#d1d1d1'}  
              value={note}
              onChangeText={text => setNote(text)}
            />
          </View>
          <View style={[styles.viewUtensil, styles.shadowProp]}>
              <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/image/utensil.jpg')} resizeMode='stretch' style={{marginRight: 5, width: 20, height: 25}} />
                <Text style={{color: color.text}}>Lấy dụng cụ ăn uống nhựa</Text>
              </View>
              <Switch 
                trackColor={{false: '#d1d1d1', true: `${color.primary}`}}
                thumbColor={`${color.white}`}
                onValueChange={() => setIsEnabled(!isEnabled)}
                value={isEnabled} 
              />
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.textOrderInfo}>Thông tin thanh toán</Text>
            <View style={[styles.viewPaymentInfo, styles.shadowProp]}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10}}>
                <Text style={{color: color.text}}>Tổng tiền</Text>
                <Text style={{color: color.text}}>{(totalPrice + priceCartDiscount).toLocaleString()}đ</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10}}>
                <Text style={{color: color.text}}>Phí giao hàng</Text>
                <Text style={{color: color.text}}>{deliveryCharge.toLocaleString()}đ</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10}}>
                <Text style={{color: color.primary, fontWeight: '600'}}>Mã giảm giá</Text>
                <Text style={{color: color.primary, fontWeight: '500'}}>0đ</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      }
      {JSON.stringify([]) !== JSON.stringify(cart) &&
        <View style={[styles.footerPay, styles.shadowProp]}>
          <View style={styles.wrapBtnDeliveryDiscount}>
            <TouchableOpacity style={[styles.btnFooter, {justifyContent: 'space-around'}]} onPress={() => handleTypeBtn('cachthanhtoan')}>
              {payment === 'Tiền mặt' &&
                <Image 
                  source={require('../assets/image/cash.jpg')} 
                  resizeMode='stretch' 
                  style={{width: 25, height: 20}} 
                  />
              }
              {
                payment === 'Momo E-Wallet' && 
                <Image 
                  source={require('../assets/image/momo.png')} 
                  resizeMode='stretch' 
                  style={{width: 25, height: 25}} 
                  />
              }  
              <Text style={{color: color.text}}>{payment}</Text>
              <FontAweSome5 name='angle-up' size={14} color={color.text} />
            </TouchableOpacity>
            <View style={styles.lineBtwDeliveryDiscount}></View>
            <TouchableOpacity style={styles.btnFooter} onPress={() => handleTypeBtn('magiamgia')}>
              <Text style={{color: color.primary, fontWeight: '500'}}>{totalDiscountUsed > 0 ? `Áp dụng (${totalDiscountUsed})` : 'Mã giảm giá'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapBtnPay}>
            <View>
              <Text style={{color: color.title}}>Tổng cộng</Text>
              <Text style={{color: color.text, fontWeight: 'bold', fontSize: 18}}>{(totalPrice + deliveryCharge + priceCartDiscount).toLocaleString()}đ</Text>
            </View>
            <TouchableOpacity style={styles.btnPay} onPress={handlePayment}>
              <Text style={{color: color.white, fontSize: 18}}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      {
        JSON.stringify([]) === JSON.stringify(cart) &&
        <View style={styles.notification}>
          <Image source={require('../assets/image/noNotification.jpg')} resizeMode='center' style={styles.imgNotification} />
          <Text style={styles.contentNotification}>Giỏ hàng trống!</Text>
      </View>
      }
    </View>
  )
}

export default PayScreen

const styles = StyleSheet.create({
    payScreen: {
      flex: 1,
      backgroundColor: color.background,
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
    payScrollView:{
      flex: 1,
      height: '100%'
    },
    btnAddress: {
      flexDirection: 'row',
      width: width - 30,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: color.white,
      borderRadius: 10,
      marginTop: 5
    },
    shadowProp: {
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
      shadowColor: 'black'
    },
    orderInfo: {
      width: width - 30,
      marginTop: 15,
    },
    textOrderInfo: {
      textTransform: 'uppercase',
      fontSize: 14,
      fontWeight: 'bold',
      color: color.title
    },
    footerPay: {
      width: '100%',
      height: 0.15 * height,
      backgroundColor: color.white,
      paddingHorizontal: 0,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    wrapBtnDeliveryDiscount: {
      width: '100%', 
      height: '50%',
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    lineBtwDeliveryDiscount: {
      width: 2,
      height: 25,
      backgroundColor: '#999'
    },
    btnFooter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    wrapBtnPay: {
      width: '100%',
      height: '50%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 15,
      paddingHorizontal: 10
    },
    btnPay: {
      width: '60%',
      height: '100%',
      backgroundColor: color.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    viewPaymentInfo: {
      marginTop: 15,
      width: '100%',
      backgroundColor: color.white,
      borderRadius: 10,
      paddingTop: 10,
      marginBottom: 20
    },
    viewNote: {
      marginTop: 15,
      width: width - 30,
      backgroundColor: color.white,
      borderRadius: 10,
      paddingVertical: 10,
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    viewUtensil: {
      marginTop: 20,
      width: width - 30,
      backgroundColor: color.white,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputNote: {
      color: color.text,
      borderBottomWidth: 1,
      borderBottomColor: '#999' 
    },
    notification: {
      backgroundColor: color.background,
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    imgNotification: {
      width: '100%',
      height: 0.3 * height
    },
    contentNotification: {
      color: color.text
    },
    backRightBtn: {
      position: 'absolute',
      width: 50,
      right: 0,
      justifyContent: 'center',
      height: '84%',
      alignItems: 'flex-end',
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
    },
    loading: {
      position: 'absolute', 
      top: 0, 
      width: width,
      height: height,
      backgroundColor: '#F5F5F5',
      zIndex: 10,
      opacity: 0.8
    }
})