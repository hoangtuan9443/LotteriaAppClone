import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native'
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'

import color from '../contains/color'
import ListItem from '../components/ListItem'
import CategoryItem from '../components/CategoryItem'
import { useSelector } from 'react-redux'
import ItemOrder from '../components/ItemOrder'

const {width, height} = Dimensions.get('screen')

const OrderHistoryScreen = ({ navigation }) => {

    const orderList = useSelector(
        state => state.orderReducer.orderList, 
        (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
    )

    const OrderHistoryList = [
        {
            key: 'hoantatdathang',
            title: 'Hoàn tất đặt hàng',
            image: require('../assets/image/btnHTDH_orderHistory.jpg'),
        },
        {
            key: 'chuanbimonan',
            title: 'Chuẩn bị món ăn',
            image: require('../assets/image/btnCBMA_orderHistory.jpg'),
        },
        {
            key: 'danggiaohang',
            title: 'Đang giao hàng',
            image: require('../assets/image/btnDGH_orderHistory.jpg'),
        },
        {
            key: 'giaohangthanhcong',
            title: 'Giao hàng thành công',
            image: require('../assets/image/btnGHTC_orderHistory.jpg'),
        },
        {
            key: 'donhangdahuy',
            title: 'Đơn hàng đã hủy',
            image: require('../assets/image/btnDHDH_orderHistory.jpg'),
        },
    ] 

    const handleChangeOrderHistoryList = () => {

    }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
        <View style={styles.headerOrderHistory}>
            <TouchableOpacity style={styles.btnBack} onPress={() => navigation.pop(1)}>
                <FontAweSome5 name='angle-left' size={24} color={color.text} />
            </TouchableOpacity>
            <Text style={styles.titleHeader}>Lịch sử đơn hàng</Text>
        </View>
        <View style={styles.orderHistoryList}>
            <ListItem  
                dataRender={OrderHistoryList.map(item => {
                    return (<CategoryItem 
                        key={item.key} 
                        index={item.key} 
                        title={item.title}
                        image={item.image}
                        setCategory={handleChangeOrderHistoryList}
                        />)
                })}
            />
        </View>
        <ScrollView
            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
            style={{borderTopWidth: 1, marginTop: 20, borderColor: '#d1d1d1'}}
            showsVerticalScrollIndicator={false}
        >
            {
                JSON.stringify([]) === JSON.stringify(orderList) 
                ?   <View style={{width: '100%',}}>
                        <Image source={require('../assets/image/noNotification.jpg')} resizeMode='center' style={styles.imgHollow} />
                        <Text style={{color: color.text, textAlign: 'center'}}>Hiện tại không có thông báo nào.</Text>
                    </View>
                : orderList.map(item => {
                    return (<ItemOrder 
                                key={item.id} 
                                props={item}
                                navigation={navigation}
                            />)
                })
            }
        </ScrollView>
    </SafeAreaView>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    headerOrderHistory: {
        width: '100%',
        height: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: '500',
        color: color.title,
    },
    btnBack: {
        position: 'absolute',
        left: 15
    },
    orderHistoryList: {
        width: '100%',
        height: 0.15 * height,
    },
    imgHollow: {
        width: '100%',
        height: 0.3 * height
    },
})