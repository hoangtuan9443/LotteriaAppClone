import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import color from '../contains/color'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const {width, height} = Dimensions.get('screen')

const NotificationScreen = () => {

  const token = useSelector(state => state.authenticationReducer.UserToken)
  const notificationList = useSelector(state => state.orderReducer.notificationList)

  return (
    <SafeAreaView>
      <Header />
      <View style={styles.notification}>
        <Text style={styles.titleNotification}>Thông báo</Text>
        {
          !token || JSON.stringify([]) === JSON.stringify(notificationList) 
          ? <View>
              <Image source={require('../assets/image/noNotification.jpg')} resizeMode='center' style={styles.imgNotification} />
              <Text style={styles.contentNotification}>Hiện tại không có thông báo nào.</Text>
            </View>
          : <ScrollView
              contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
            >   
              {
                notificationList.map(item => {
                  return (
                        <View key={item.id} style={{width: width, backgroundColor: '#FFEAE3', paddingVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                          <Image source={require('../assets/image/iconNotification.jpg')} resizeMode='stretch' style={styles.imgItemNoti} />
                          <View>
                            <Text style={{color: color.title, fontSize: 16, fontWeight: '500'}}>{item.title}</Text>
                            {item.status === 'success' 
                            ? <Text style={{color: color.text, width: '80%'}}>
                              Đơn hàng <Text style={{color: color.primary}}>{item.id}</Text> của quý khách đã được đặt thành công.
                              </Text> : null}
                          </View>
                        </View>
                  )
                })
              }
            </ScrollView>  
        }
        
      </View>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    notification: {
      backgroundColor: color.background,
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    titleNotification: {
      marginTop: 15,
      fontSize: 20,
      color: color.title,
      fontWeight: '600',
      marginBottom: 10,
    },
    imgNotification: {
      width: width,
      height: 0.28 * height
    },
    contentNotification: {
      color: color.text,
      textAlign: 'center'
    },
    imgItemNoti: {
      width: 40,
      height: 45,
      borderRadius: 5,
      marginLeft: 15,
      marginRight: 10
    },
})