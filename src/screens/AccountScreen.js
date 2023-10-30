import React from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import color from '../contains/color'
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth'
import * as Actions from '../redux/Action'
import Header from '../components/Header';

const {width, height} = Dimensions.get('screen')

const AccountScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const token = useSelector(
    state => state.authenticationReducer.UserToken, 
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  )
  const UserInfo = useSelector(
    state => state.authenticationReducer.UserInfo, 
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  )
  
  const listAccount = [
    {
      key: 'taikhoanmangxahoi',
      icon: <Entypo name={'network'} size={20} color={'#333'} style={{marginRight: 5, width: 30}} />,
      title: 'Tài khoản mạng xã hội',
      fc: () => {},
    },
    { 
      key: 'diachigiaohang',
      icon: <FontAwesome5 name={'map-marker-alt'} size={20} color={'#333'} style={{marginRight: 5, width: 30}} />,
      title: 'Địa chỉ giao hàng',
      fc: () => {
        token ? navigation.navigate('MyLocation') : Alert.alert('Vui lòng đăng nhập để sử dụng !!!')
      },
    },
    {
      key: 'lichsugiaohang',
      icon: <FontAwesome5 name={'file-alt'} size={20} color={'#333'} style={{marginRight: 5, width: 30}} />,
      title: 'Lịch sử đơn hàng',
      fc: () => {
        token ? navigation.navigate('OrderHistory') : Alert.alert('Vui lòng đăng nhập để sử dụng !!!')
      },
    },
    {
      key: 'couponscuatoi',
      icon: <MaterialIcon name={'ticket-percent'} size={20} color={'#333'} style={{marginRight: 5, width: 30}} />,
      title: 'Coupons của tôi',
      fc: () => {},
    },
    {
      key: 'monyeuthich',
      icon: <MaterialIcon name={'heart'} size={20} color={'#333'} style={{marginRight: 5, width: 30}} />,
      title: 'Món yêu thích',
      fc: () => {
        token ? navigation.navigate('Favorite') : Alert.alert('Vui lòng đăng nhập để sử dụng !!!')
      },
    },
    {
      key: 'ykienkhachhang',
      icon: <FontAwesome5 name={'comments'} size={20} color={'#333'} style={{marginRight: 5, width: 30}} />,
      title: 'Ý kiến khách hàng',
      fc: () => {},
    },
    {
      key: 'dangxuat',
      icon: <FontAwesome5 name={'power-off'} size={20} color={'#333'} style={{marginRight: 5, width: 30}} />,
      title: 'Đăng xuất',
      fc: () => handleAlert(),
    },
  ]

  const handleAlert = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel'},
        {text: 'Đồng ý', onPress: handleLogout},
      ],
    );
  }
  
  const handleLogout = () => {
    if(token) {
      auth()
      .signOut()
      .then(() => dispatch({
          type: Actions.API_LOGOUT,
        })
      )
      .catch(err => {
        console.log(err.message)
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.accountSrceen} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 15, marginTop: 20}}>
          <Text style={styles.titleAccount}>My FAVORITE</Text>
          {
            token 
            ? (<View style={styles.contentLogin}>
                  <View style={styles.borderContentLogin}>
                    <Text numberOfLines={2} style={{position: 'absolute', left: 10, color: color.white, fontSize: 16, width: 195, fontWeight: '500'}}>{UserInfo?.fullname ? UserInfo?.fullname : ''}</Text>
                    <Image source={require('../assets/image/imageLogin.jpg')} resizeMode='stretch' style={{width: '40%', height: '100%', borderRadius: 10}} />
                  </View>
              </View>)
            : (<View>
                <Text style={{marginTop: 20, color: color.text}}>Hãy tạo tài khoản Lotteria để tận hưởng ưu đãi mua hàng dành riêng cho bạn</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                  <TouchableOpacity style={[styles.btn, styles.shadowProp]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.titleBtn}>Đăng nhập</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, styles.shadowProp]} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.titleBtn}>Đăng ký</Text>
                  </TouchableOpacity>
                </View>
              </View>)
          }
        </View>
        <View style={[styles.listAccount, styles.shadowProp, token ? {marginTop: 0} : {}]}>
            { token ?
                <View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                    <Text style={{fontSize: 16, color: color.title, fontWeight: '600'}}>Thông tin tài khoản</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
                      <Text style={{color: color.primary}}>Cập nhật thông tin</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={[styles.btnInformation, styles.shadowProp]} onPress={() => navigation.navigate('UserInfo')}>
                    <View style={{flexDirection: 'row', paddingVertical: 5, alignItems: 'center'}}>
                      <FontAwesome5 name='user-circle' color={color.primary} size={20} style={{marginRight: 5, width: 20}} />
                      <Text style={{color: color.title, fontWeight: '500'}}>Họ tên: </Text>
                      <Text numberOfLines={1} style={{color: color.text, width: '50%'}}>{UserInfo?.fullname ? UserInfo.fullname : ''}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 5, alignItems: 'center'}}>
                      <FontAwesome5 name='birthday-cake' color={color.primary} size={20} style={{marginRight: 5, width: 20}} />
                      <Text style={{color: color.title, fontWeight: '500'}}>Ngày sinh: </Text>
                      <Text numberOfLines={1} style={{color: color.text, width: '50%'}}>{UserInfo?.dob ? UserInfo.dob : ''}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 5, alignItems: 'center'}}>
                      <MaterialIcon name='cellphone' color={color.primary} size={20} style={{marginRight: 5, width: 20}} />
                      <Text style={{color: color.title, fontWeight: '500'}}>SĐT: </Text>
                      <Text numberOfLines={1} style={{color: color.text, width: '50%'}}>{UserInfo?.phone ? UserInfo.phone : ''}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 5, alignItems: 'center'}}>
                      <MaterialIcon name='email' color={color.primary} size={20} style={{marginRight: 5, width: 20}} />
                      <Text style={{color: color.title, fontWeight: '500'}}>Email: </Text>
                      <Text numberOfLines={1} style={{color: color.text, width: '50%'}}>{UserInfo.email}</Text>
                    </View>
                    <Image source={require('../assets/image/imageFormInformation.jpg')} resizeMode='stretch' style={styles.imageInformation} />
                  </TouchableOpacity>
                </View>
              : null
            }
            {
              listAccount.map((item) => {
                if(!token) {
                  if(item.key === 'dangxuat') {
                    return
                  }
                  return (
                    <TouchableOpacity style={styles.btnListAccount} key={item.key} onPress={item.fc}>
                      <View style={{flexDirection: 'row'}}>
                        {item.icon}
                        <Text style={{fontSize: 14, color: color.text}}>{item.title}</Text>
                      </View>
                      <FontAwesome5 name={'angle-right'} size={16} color={'#666'} />
                    </TouchableOpacity>
                  )
                }
                return (
                  <TouchableOpacity style={styles.btnListAccount} key={item.key} onPress={item.fc}>
                    <View style={{flexDirection: 'row'}}>
                      {item.icon}
                      <Text style={{fontSize: 14, color: color.text}}>{item.title}</Text>
                    </View>
                    <FontAwesome5 name={'angle-right'} size={16} color={'#666'} />
                  </TouchableOpacity>
                )
              })
            }
            <Text style={{marginTop: 35, color: color.text, fontWeight: '500'}}>Mọi thắc mắc vui lòng liên hệ qua CSKH:</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: color.text, fontWeight: '500'}}>Hotline: </Text>
              <Text style={{color: color.primary, fontWeight: '500'}}>19006778</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: color.text, fontWeight: '500'}}>Email: </Text>
              <Text style={{color: color.primary, fontWeight: '500'}}>CSKH@lotteria.vn</Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'center'}}>
              <Text style={{color: color.text, fontWeight: '500'}}>Follow with Lotteria Vietnam</Text>
              <FontAwesome5 name={'facebook-square'} size={28} color={'#3F51B5'} style={{marginRight: 5, width: 30, marginLeft: 10}} />
              <Image source={require('../assets/image/instagram.png')} resizeMode='stretch' style={styles.iconFollow} />
              <Image source={require('../assets/image/zalo.png')} resizeMode='stretch' style={styles.iconFollow} />
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  accountSrceen: {
    backgroundColor: color.background,
    width: '100%',
  },
  titleAccount: {
    fontSize: 20,
    color: color.primary,
    fontWeight: 'bold'
  },
  btn: {
    width: 0.5 * width - 25,
    backgroundColor: color.primary,
    height: 0.06 * height,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleBtn: {
    fontSize: 20,
    color: color.white,
  },
  btnListAccount: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#999'

  },
  listAccount: {
    backgroundColor: '#FFEAE3',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 30,
    paddingHorizontal: 15,
    // height: 0.7 * height 
  },
  iconFollow: {
    width: 35,
    height: 35,
    marginRight: 5
  },
  shadowProp: {
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    shadowColor: 'black'
  },
  contentLogin: {
    marginTop: 20,
    width: '100%',
    height: 0.1 * height,
    backgroundColor: color.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderContentLogin: {
    marginTop: 10,
    width: '95%',
    height: 0.09 * height,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: color.white,
    alignItems: 'flex-end',
    justifyContent:'center'
  },  
  btnInformation: {
    width: '100%',
    backgroundColor: color.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 10,
    marginTop: 10
  },
  imageInformation: {
    height: '75%',
    width: '30%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 10,
  }
})