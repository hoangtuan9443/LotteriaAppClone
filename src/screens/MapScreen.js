import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, PermissionsAndroid, Alert, StatusBar, ActivityIndicator } from 'react-native'
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'
import FontAweSome6 from 'react-native-vector-icons/FontAwesome6'
import color from '../contains/color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Geolocation from '@react-native-community/geolocation'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../redux/Action'

const {width, height} = Dimensions.get('screen')

const MapScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const locationList = useSelector(
        state => state.cartReducer.locationList, 
        (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
     )
    const myLocation = useSelector(state => state.cartReducer.myLocation)
    const [geolocation, setGeolocaction] = useState({longitude: "", latitude: ""})
    const [loading, setLoading] = useState(false)

    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cho phép Lotteria App sử dụng vị trí của bạn',
                    message: 
                    'Lotteria App cần định vị vị trí của bạn để xác định địa chỉ giao hàng',
                    buttonNeutral: 'Hỏi tôi sau',
                    buttonNegative: 'Hủy',
                    buttonPositive: 'Đồng ý'
                }
            )
            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location')
                await getCurrentLocation()
            } else {
                console.log('Location permission denied ')
            }
        } catch(err) {
            console.log("Error requestPermission: ", err.message)
        }
    }

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords
            setGeolocaction({latitude, longitude})
        }, 
        err => Alert.alert("Error getCurrentLocation :", err.message), 
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000})
    }

    const handleGetLocation = async () => {
        await requestPermission()
        setLoading(true)
        dispatch({
            type: Actions.API_GET_MYLOCATION,
            data: {
                latitude: geolocation.latitude, 
                longitude: geolocation.longitude,  
                navigation: navigation
            },
            setLoading: setLoading
        })
    }

    const handleChooseLocation = (e) => {
        dispatch({
            type: Actions.API_UPDATE_MYLOCATION,
            data: {
                mainLocation: e,
                navigation: navigation,
            }
        })
    }

    if(loading) {
        return <ActivityIndicator color={color.primary} size={'large'} style={{flex: 1}} />
    }

  return (
    <View style={styles.myGeolocation}> 
    <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
      <View style={styles.headerPay}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.pop(1)}>
          <FontAweSome5 name='angle-left' size={24} color={color.text}  />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Địa điểm của tôi</Text>
      </View>
      <ScrollView 
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={[styles.btnUseMyLocation, styles.shadowProp]} onPress={handleGetLocation}>
            <MaterialIcons name='my-location' size={20} color={color.primary} style={{marginRight: 10}} />
            <Text style={{color: color.text}}>Sử dụng vị trí hiện tại của tôi</Text>
        </TouchableOpacity>
        <View style={styles.viewSavedLocation}>
            <Text style={styles.titleSavedLocation}>Địa điểm đã lưu</Text>
            {
                locationList.map(item => {
                    return (
                    <TouchableOpacity key={item.id} style={styles.btnAddNewLocation} onPress={() => handleChooseLocation(item)}>
                        <Image source={require('../assets/image/flat.jpg')} resizeMode='stretch' style={styles.imgFlat} />
                            <Text style={{width: '85%', marginRight: 10, color: '#666'}}>{item.location}</Text>
                        <FontAweSome5 name='angle-right' size={16} color="#999" />
                    </TouchableOpacity>)
                })
            }
            <TouchableOpacity style={styles.btnAddNewLocation} onPress={() => navigation.navigate('GetLocation', {dontFill: true})}>
                <FontAweSome6 name='plus' size={20} color={color.primary} style={{marginRight: 10}} />
                <Text style={{color: color.text}}>Thêm địa chỉ mới</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
    myGeolocation: {
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
        flex: 1,
        backgroundColor: color.white,
    },
    btnUseMyLocation: {
        width: width,
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
        backgroundColor: color.white
    },
    viewSavedLocation: {
        width: width,
        paddingHorizontal: 15,
        backgroundColor: color.white,
        marginTop: 15,
    },
    shadowProp: {
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: 'black',
    },
    titleSavedLocation: {
        fontSize: 16,
        color: color.title,
        fontWeight: 'bold',
        marginTop: 10,
    },
    btnAddNewLocation: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 10,
    },
    btnLocation: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    imgFlat: {
        width: 30,
        height: 30,
        marginRight: 10
    }
})