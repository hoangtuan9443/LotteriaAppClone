import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image, Alert, StatusBar, ActivityIndicator } from 'react-native'
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import color from '../contains/color'
import { useSelector, useDispatch } from 'react-redux'
import ItemCart from '../components/itemCart'
import { SwipeListView } from 'react-native-swipe-list-view'
import * as Actions from '../redux/Action'

const {width, height} = Dimensions.get('screen')

const CartScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const cart = useSelector(
    state => state.cartReducer.cart, 
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  )
  const token = useSelector(state => state.authenticationReducer.UserToken)
  const [loading, setLoading] = useState(false)
    
  const handleGetOrder = () => {
    if(token) {
      navigation.navigate('Pay')
    }else {
      Alert.alert('Vui lòng đăng nhập để sử dụng !!!')
    }
  }

  const totaldiscountPrice = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.discountPrice * currentValue.quantity
  }, 0)

  const totalInitPrice = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.initPrice * currentValue.quantity
  }, 0)

  const totalPrice = cart.reduce((accumulator, currentValue) => {
    if(currentValue.discountPrice) {
      return accumulator + currentValue.discountPrice * currentValue.quantity
    }
    return accumulator + currentValue.initPrice * currentValue.quantity 
  }, 0)

  const handleRemoveItem = (e) => {
      setLoading(true)
      dispatch({
          type: Actions.API_REMOVE_FROM_CART,
          data: e.id,
          setLoading: setLoading
      })
  }

  return (
    <View style={styles.cartScreen}>
      <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
      {loading && <ActivityIndicator color={color.primary} size={'large'} style={styles.loading} />}
      <View style={styles.headerCart}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.pop(1)}>
          <FontAweSome5 name='angle-left' size={24} color={color.text}  />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Giỏ hàng</Text>
      </View>
      {/* <ScrollView 
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} 
        style={styles.cartScrollView}
        scrollEventThrottle={16}
      > */}
        {/* { token ? 
          cart.map(item => {
            return (  
                      <ItemCart
                        key={item.id}
                        props={item}
                        />
                  ) 
          })
          : null
        } */}
      {/* </ScrollView> */}
      <View style={[styles.cartScrollView]}>
        { token ? 
            <SwipeListView 
              data={cart}
              contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
              style={{width: '100%'}}
              renderItem={(data, rowMap) => {
                return (
                        <ItemCart
                          key={data.item.id}
                          props={data.item}
                          setLoading={setLoading}
                          />
                ) 
              }}
              renderHiddenItem={(data, rowMap) => {
                return (
                  <TouchableOpacity 
                    style={styles.backRightBtn} 
                    onPress={() => handleRemoveItem(data.item)}>
                      <AntDesign name='closecircle' color='red' size={32} />
                  </TouchableOpacity>
                )
              }}
              rightOpenValue={-40}
              disableRightSwipe={true}
              showsVerticalScrollIndicator={false}
            />
            : null
          }
      </View>
      {token && JSON.stringify([]) !== JSON.stringify(cart)
        ? <View style={[styles.footerCart, styles.shadowProp]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
              <Text style={{color: color.text, fontWeight: '500'}}>Tổng tiền:</Text>
              <Text style={{color: color.primary, fontWeight: 'bold', fontSize: 17}}>
                {
                  `${totaldiscountPrice === 0 ? totalInitPrice.toLocaleString() : totalPrice.toLocaleString()}đ`
                }
              </Text>
            </View>
            {totaldiscountPrice === 0 ? <View style={{width: '100%', height: 18}}></View> 
            :
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
              <Image source={require('../assets/image/tagPrice.png')} resizeMode='stretch' style={{width: 15, height: 15, marginRight: 5}} />
              <Text style={{textDecorationLine: 'line-through', fontSize: 13, color: '#999'}}>{`${totalInitPrice.toLocaleString()}đ`}</Text>
            </View>
            }
            <TouchableOpacity style={styles.btnOrder} onPress={handleGetOrder}>
              <Text style={{fontWeight: '500', color: color.white, fontSize: 18}}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        : null
      }
    </View>
  )
}

export default CartScreen 

const styles = StyleSheet.create({
  cartScreen: {
    flex: 1,
    backgroundColor: color.background,
  },
  headerCart: {
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
  cartScrollView:{
    flex: 1,
    width: width,
  },
  footerCart: {
    width: '100%',
    height: 0.15 * height,
    backgroundColor: color.white,
    paddingHorizontal: 15
  },
  btnOrder: {
    width: '100%',
    backgroundColor: color.second,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  shadowProp: {
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: 'black'
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