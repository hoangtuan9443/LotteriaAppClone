import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Alert, StatusBar, ActivityIndicator} from 'react-native'
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import color from '../contains/color'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from '../redux/Action'
import KeyboardAvoidViewWrapper from '../components/KeyboardAvoidViewWrapper'

const {width, height} = Dimensions.get('screen')

const GetLocationScreen = ({ navigation, route }) => {

    const dontFill = route?.params.dontFill
    const dispatch = useDispatch()
    const myLocation = useSelector(
        state => state.cartReducer.myLocation, 
        (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
    )
    const locationList = useSelector(state => state.cartReducer.locationList)
    const [nameLocation, setNameLocation] = useState('')
    const [location, setLocation] = useState('')
    const [noteLocation, setNoteLocation] = useState('')

    useEffect(() => {
        if(!dontFill){
            setLocation(myLocation)
        }
    }, [])

    const handleCreateNewLocation = () => {
        const checkLocation = locationList.filter((value) => {
            if(value.location === location){ 
                return value
            }
        })
        if(location && checkLocation.length === 0) {
            dispatch({
                type: Actions.API_CREATE_NEW_LOCATION,
                data: {
                    newLocation: {
                        nameLocation: nameLocation ? nameLocation : '',
                        location: location,
                        noteLocation: noteLocation ? noteLocation : '',
                    },
                    navigation: navigation
                }
            })
        } else if(checkLocation.length > 0) {
            Alert.alert("Địa chỉ đã tồn tại")
        } else if(!location) {
            Alert.alert("Vui lòng điền địa chỉ")
        }
    }   

  return (
    <KeyboardAvoidViewWrapper>
        <View style={styles.formLocation}>
            <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
            <View style={styles.headerPay}>
                <TouchableOpacity style={styles.iconBack} onPress={() => navigation.pop(1)}>
                    <FontAweSome5 name='angle-left' size={24} color={color.text}  />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Giao hàng đến đâu nhỉ?</Text>
            </View>
            <ScrollView
                contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
            >
                <View style={{marginTop: 15, width: width - 30}}>
                    <Text style={styles.titleInput}>Tên địa chỉ</Text>
                    <View style={{justifyContent: 'center', backgroundColor: color.white}}>
                        <TextInput 
                            placeholder='Nhà/Cơ quann/Phòng Gym...' 
                            style={styles.inputLogin} 
                            value={nameLocation}
                            onChangeText={text => setNameLocation(text)}
                        />
                        <TouchableOpacity style={styles.btnClearInput} onPress={() => setNameLocation('')}>
                            <AntDesign name='closecircle' size={16} color={color.text} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 15, width: width - 30}}>
                    <Text style={styles.titleInput}>Địa chỉ</Text>
                    <View style={{justifyContent: 'center', backgroundColor: color.white}}>
                        <MaterialIcons name='location-on' color='red' size={20} style={styles.iconLocation} />
                        <TextInput 
                            placeholder='Vui lòng nhập' 
                            style={[styles.inputLogin, {paddingLeft: 30}]} 
                            value={location}
                            onChangeText={text => setLocation(text)}
                        />
                        <TouchableOpacity style={styles.btnClearInput} onPress={() => setLocation('')}>
                            <AntDesign name='closecircle' size={16} color={color.text} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 15,  width: width - 30}}>
                    <Text style={styles.titleInput}>Ghi chú khác (Tòa nhà, số nhà, tên đường)</Text>
                    <View style={{justifyContent: 'center', backgroundColor: color.white}}>
                        <TextInput 
                            placeholder='Vui lòng nhập' 
                            style={styles.inputLogin} 
                            value={noteLocation}
                            onChangeText={text => setNoteLocation(text)}
                        />
                        <TouchableOpacity style={styles.btnClearInput} onPress={() => setNoteLocation('')}>
                            <AntDesign name='closecircle' size={16} color={color.text} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.textNote}>*Trong trường hợp địa chỉ không xác định chính xác hoặc không chỉnh sửa được địa chỉ, bạn vui lòng nhập thêm thông tin địa chỉ tại mục Ghi chú nhé.</Text>
            </ScrollView>
            <View style={styles.footerLocation}>
                <TouchableOpacity style={styles.btnContinous} onPress={handleCreateNewLocation}>
                    <Text style={{color: color.white, fontSize: 18}}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    </KeyboardAvoidViewWrapper>
  )
}

export default GetLocationScreen

const styles = StyleSheet.create({
    formLocation: {
        height: height * 0.9,
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
    map: {
        height: height * 0.29,
        width: width - 30,
        borderRadius: 20
    },
    titleInput: {
        color: color.text,
        fontSize: 16,
        fontWeight: '500'
    },
    inputLogin: {
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 35,
        borderRadius: 5,
        fontSize: 16,
        borderColor: color.primary,
        color: color.text,
    },
    btnClearInput: {
        height: '100%',
        width: 25,
        position: 'absolute',
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconLocation: {
        position: 'absolute',
        left: 5,
    },
    footerLocation: {
        width: '100%',
        height: 0.1 * height,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0
    },
    btnContinous: {
        width: width - 30,
        height: '60%',
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textNote: {
        width: width - 30,
        marginTop: 15,
        color: color.text
    },
})