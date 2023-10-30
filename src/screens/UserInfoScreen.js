import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, TextInput, Alert, StatusBar } from 'react-native'
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import color from '../contains/color'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from '../redux/Action'
import DatePicker from 'react-native-date-picker'

const {width, height} = Dimensions.get('screen')

const UserInfoScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const UserInfo = useSelector(state => state.authenticationReducer.UserInfo)
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [dob, setDob] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
      if(UserInfo.fullname){
        setFullname(UserInfo.fullname)
      }
      if(UserInfo.phone){
        setPhone(UserInfo.phone)
      }
      if(UserInfo.dob){
        setDob(UserInfo.dob)
      }
    }, [])



    const VerifyPhone = (phone) => {
        let regExpphone = new RegExp(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/g)
        if(!phone) return true
        if (regExpphone.test(phone)) {
            return true
        }
      }

    const handleUpdateUserInfo = () => {
        if(phone && VerifyPhone(phone)){
            dispatch({
                type: Actions.API_UPDATE_INFO_USER,
                data: {
                    fullname: fullname,
                    phone: phone,
                    dob: typeof(dob) === 'object' ? `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}` : '',
                  },
                navigation: navigation.pop(1)
            })
        }else if(phone && !VerifyPhone(phone)){
          Alert.alert('Số điện thoại chưa đúng định dạng')
        }else{
          dispatch({
            type: Actions.API_UPDATE_INFO_USER,
            data: {
                fullname: fullname,
                phone: phone,
                dob: typeof(dob) === 'object' ? `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}` : '',
              },
            navigation: navigation.pop(1)
        })
        }
    }

  return (
    <View style={styles.uerInfoScreen}>
      <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
      <View style={styles.headerPay}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.pop(1)}>
          <FontAweSome5 name='angle-left' size={24} color={color.text}  />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Tài khoản</Text>
      </View>
      <ScrollView
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        style={{flex: 1}}
      > 
        <View style={{width: width - 30, marginBottom: 5}}>
            <Text style={styles.titleInput}>Họ và tên</Text>
        </View>
        <View style={{justifyContent: 'center', backgroundColor: color.white}}>
          <TextInput 
            placeholder='Vui lòng nhập' 
            style={styles.inputLogin} 
            value={fullname}
            onChangeText={text => 
                setFullname(text)
            }
            />
            <TouchableOpacity style={styles.btnClearInput} onPress={() => setFullname('')}>
              <AntDesign name='closecircle' size={16} color={color.text} />
            </TouchableOpacity>
        </View>
        <View style={{width: width - 30, marginBottom: 5}}>
            <Text style={styles.titleInput}>Ngày sinh</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setOpen(true)} 
          style={[{justifyContent: 'center', backgroundColor: color.white, height: 50}, styles.inputLogin]}>
            <Text style={{color: color.text, fontSize: 16}}>{typeof(dob) === 'object' ? `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}` : dob ? dob : ''}</Text>
            <DatePicker
              modal
              mode='date'
              open={open}
              date={new Date()}
              onConfirm={(date) => {
                setOpen(false)
                setDob(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
            <TouchableOpacity style={styles.btnClearInput} onPress={() => setOpen(true)}>
              <AntDesign name='calendar' size={16} color={color.text} />
            </TouchableOpacity>
        </TouchableOpacity>
        <View style={{width: width - 30, marginBottom: 5}}>
            <Text style={styles.titleInput}>Số điện thoại</Text>
        </View>
        <View style={{justifyContent: 'center', backgroundColor: color.white}}>
          <TextInput 
            textContentType='telephoneNumber'
            placeholder='Vui lòng nhập' 
            style={styles.inputLogin} 
            value={phone}
            onChangeText={text => 
                setPhone(text)
            }
            />
            <TouchableOpacity style={styles.btnClearInput} onPress={() => setPhone('')}>
              <AntDesign name='closecircle' size={16} color={color.text} />
            </TouchableOpacity>
        </View>
        <View style={{width: width - 30, marginBottom: 5}}>
            <Text style={styles.titleInput}>Email</Text>
        </View>
        <View style={{justifyContent: 'center', backgroundColor: color.white}}>
          <TextInput 
            style={styles.inputLogin} 
            value={UserInfo.email}
            disableFullscreenUI={true}
            />
        </View>
        <TouchableOpacity style={[styles.btnContinuous, styles.shadowProp]} onPress={handleUpdateUserInfo}>
            <Text style={{color: color.white, fontSize: 18}}>Cập nhật</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default UserInfoScreen

const styles = StyleSheet.create({
    uerInfoScreen: {
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
    titleInput: {
        color: color.text,
        fontSize: 16,
        fontWeight: '500',
    },
    inputLogin: {
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 35,
        borderRadius: 5,
        fontSize: 16,
        borderColor: color.primary,
        color: color.text,
        width: width - 30
    },
    btnClearInput: {
        height: '100%',
        width: 25,
        position: 'absolute',
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContinuous: {
        marginTop: 30,
        width: width - 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primary,
        height: 50,
        borderRadius: 10,
        marginBottom: 10
    },
    shadowProp: {
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        shadowColor: 'black'
    },
})