import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native'
import color from '../contains/color'
import { useSelector } from 'react-redux'

const {width, height} = Dimensions.get('screen')

const Header = ({ handleNavigate = () => {}, validCart }) => {

  const token = useSelector(state => state.authenticationReducer.UserToken)
  const cart = useSelector(state => state.cartReducer.cart)

  const quantityInCart = cart.reduce((acc, value) => {
    return value.quantity + acc
  },0)

  return (
    <View style={styles.header}>
        <Image 
          source={require('../assets/image/logo.jpg')} 
          resizeMode='contain' 
          style={styles.logoHeader} 
          />
        {validCart ?
            <TouchableOpacity style={styles.btnCartHeader} onPress={handleNavigate}>
                <Image 
                    source={require('../assets/image/cart.jpg')} 
                    resizeMode='contain' 
                    style={styles.cart}
                    />
                  {token && quantityInCart !== 0 ? <Text style={styles.valueCart}>{quantityInCart}</Text> : null}
            </TouchableOpacity>
        : null
        }
      </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      width: '100%',
      height: 0.07 * height,
      backgroundColor: color.primary,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleHeader: {
      fontSize: 20,
      color: color.white,
      fontWeight: 'bold'
    },
    logoHeader: {
      width: '50%', 
      height: '100%',
    },
    btnCartHeader: {
      height: '100%',
      width: '10%',
      position: 'absolute',
      right: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    cart: {
      height: '50%',
      width: '70%',
    },
    valueCart: {
      position: 'absolute', 
      color: color.primary, 
      width: 20, 
      height: 20, 
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: color.white,
      borderRadius: 20,
      top: 5,
      right: 0,
      fontWeight: '500'
    }
  })