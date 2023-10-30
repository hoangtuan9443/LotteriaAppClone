import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, ScrollView, StatusBar } from 'react-native'
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'
import color from '../contains/color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const {width, height} = Dimensions.get('screen')

const OrderInfoScreen = ({ route, navigation }) => {

    const ItemInfo = route.params

  return (
    <SafeAreaView style={styles.orderInfo}>
        <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
        <View style={styles.headerOrderHistory}>
            <TouchableOpacity style={styles.btnBack} onPress={() => navigation.pop(1)}>
                <FontAweSome5 name='angle-left' size={24} color={color.text} />
            </TouchableOpacity>
            <Text style={styles.titleHeader}>Thông tin đơn hàng</Text>
        </View>
        <ScrollView
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            showsVerticalScrollIndicator={false}
        >
            <View style={[styles.wrapContent, {marginTop: 0}]}>
                <Text style={styles.titleWrapContent}>Thông tin giao hàng</Text>
                <View style={[styles.viewContent, styles.shadowProps]}>
                    <Text style={{color: color.text, paddingVertical: 5}}>{ItemInfo.userInfo.email}</Text>
                    {
                        ItemInfo.userInfo?.fullname && 
                        <Text style={{color: color.text, paddingVertical: 5}}>{ItemInfo.userInfo?.fullname}</Text>
                    }
                    {
                        ItemInfo.userInfo?.phone &&
                        <Text style={{color: color.text, paddingVertical: 5}}>{ItemInfo.userInfo?.phone}</Text>
                    }
                    {
                        ItemInfo.userInfo?.dob &&
                        <Text style={{color: color.text, paddingVertical: 5}}>{ItemInfo.userInfo?.dob}</Text>
                    }
                    <View style={styles.content}>
                        <MaterialIcons 
                            name='location-on' 
                            color={color.primary} 
                            size={20} 
                            style={styles.iconLocation} 
                        />
                        <View style={{flex: 1}}>
                            <Text style={{color: color.title}}>Giao đến:</Text>
                            <Text style={{color: '#999', fontSize: 12}}>{ItemInfo.deliveryLocation}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.wrapContent, {marginBottom: 10}]}>
                <Text style={styles.titleWrapContent}>Thông tin đơn hàng</Text>
                <View style={[styles.viewContent, styles.shadowProps]}>
                    <View 
                        style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 5}}
                    >
                        <Text style={{color: color.text}}>Mã đơn hàng</Text>
                        <Text style={{color: color.primary, fontSize: 16, fontWeight: '600'}}>{ItemInfo.id}</Text>
                    </View>
                    <View 
                        style={{
                            flexDirection: 'row', 
                            width: '100%', 
                            justifyContent: 'space-between', 
                            paddingVertical: 5,
                            borderBottomWidth: 1,
                            borderColor: '#d1d1d1',
                        }}
                    >
                        <Text style={{color: color.text}}>Phương thức</Text>
                        <Text style={{color: color.text, marginBottom: 20}}>{ItemInfo.payment}</Text>
                    </View>
                    <View style={{borderBottomWidth: 1, borderColor: '#d1d1d1', paddingBottom: 10}}>
                        {
                            ItemInfo.orderList.map(item => {
                                return (<View key={item.id} style={styles.viewOrderItem}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={styles.viewQuantityOrderItem}>{`x${item.quantity}`}</Text>
                                                <View>
                                                    <Text style={styles.textTitleOrderItem}>{item.title}</Text>
                                                    {
                                                        item.detailsCombo?.map((record, index) => {
                                                            return (<Text key={index} style={styles.detailsCombo}>
                                                                    {record.quantity + ` x `} 
                                                                    {record.name + ` `}
                                                                    {record.size ? `(${record.size})` : ''}
                                                                </Text>)
                                                        }) 
                                                    }

                                                </View>
                                            </View>
                                            <Text style={{color: color.text}}>{item.discountPrice ? Number(item.discountPrice).toLocaleString() : Number(item.initPrice).toLocaleString()}đ</Text>
                                        </View>)
                            })
                        }
                    </View>
                    <View style={{marginVertical: 10}}>
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: color.text}}>Tổng tiền</Text>
                            <Text style={{color: color.text}}>{ItemInfo.cartPrice.toLocaleString()}đ</Text>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                            <Text style={{color: color.text}}>Phí giao hàng</Text>
                            <Text style={{color: color.text}}>{ItemInfo.deliveryCharge.toLocaleString()}đ</Text>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                            <Text style={{color: color.primary}}>Mã giảm giá</Text>
                            <Text style={{color: color.primary}}>0đ</Text>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                            <Text style={{fontSize: 18, color: color.title, fontWeight: '600'}}>Tổng cộng</Text>
                            <Text style={{fontSize: 18, color: color.title, fontWeight: '600'}}>{ItemInfo.totalPrice.toLocaleString()}đ</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default OrderInfoScreen

const styles = StyleSheet.create({
    orderInfo: {
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
    wrapContent: {
        width: width - 30,
        marginTop: 15
    },
    titleWrapContent: {
        textTransform: 'uppercase',
        color: color.title,
        fontSize: 16,
        fontWeight: '500'
    },
    viewContent: {
        width: '100%',
        backgroundColor: color.white,
        padding: 10,
        borderRadius: 10,
        marginTop: 15
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 5,
    },
    shadowProps: {
        shadowOpacity: 1, 
        shadowRadius: 5, 
        elevation: 5, 
        shadowColor: 'black', 
    },
    viewOrderItem: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewQuantityOrderItem: {
        width: 25,
        height: 25,
        textAlign:'center',
        textAlignVertical: 'center',
        borderWidth: 1, 
        borderColor: color.primary,
        borderRadius: 6,
        fontSize: 12, 
        marginRight: 45,
        color: color.text
    },  
    textTitleOrderItem: {
        color: color.title,
        fontWeight: '500'
    },
})