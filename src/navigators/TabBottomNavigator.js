import React from 'react'
import { Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/HomeScreen'
import DeliverScreen from '../screens/DeliverScreen'
import NotificationScreen from '../screens/NotificationScreen'
import AccountScreen from '../screens/AccountScreen'
import color from '../contains/color'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator();

const TabBottomNavigator = () => {

  const notificationList = useSelector(state => state.orderReducer.notificationList)
  const token = useSelector(state => state.authenticationReducer.UserToken)

  return (
      <Tab.Navigator 
        initialRouteName='Trang chủ' 
        screenOptions={{headerShown: false, tabBarStyle: {height: 55}}}
        >
          <Tab.Screen 
            name='Trang chủ' 
            component={HomeScreen} 
            options={{tabBarIcon: ({focused}) => 
              <Image source={require('../assets/image/logoTrangChu.jpg')} />
            , tabBarActiveTintColor: `${color.primary}`}}
            />
          <Tab.Screen 
            name='Đặt hàng' 
            component={DeliverScreen} 
            options={{tabBarIcon: () => <Image source={require('../assets/image/logoDatHang.jpg')} />, tabBarActiveTintColor: `${color.primary}`}} />
          <Tab.Screen 
            name='Thông báo' 
            component={NotificationScreen} 
            options={{tabBarIcon: () => 
            <View>
              <Image source={require('../assets/image/logoThongBao.jpg')} />
              {token && notificationList.length > 0 ?
                <View style={{position: 'absolute', height: 5, width: 5, borderRadius: 5, backgroundColor: color.primary, top: 0, right: 0}}></View>
                : null
              }
            </View>, tabBarActiveTintColor: `${color.primary}`}} />
          <Tab.Screen 
            name='Tài khoản' 
            component={AccountScreen} 
            options={{tabBarIcon: () => <Image source={require('../assets/image/logoTaiKhoan.jpg')} />, tabBarActiveTintColor: `${color.primary}`}} />
      </Tab.Navigator>
  )
}

export default TabBottomNavigator