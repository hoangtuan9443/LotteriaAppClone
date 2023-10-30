import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, Alert, StatusBar, ActivityIndicator } from 'react-native'
import color from '../contains/color'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import CheckBox from '@react-native-community/checkbox';
import * as Actions from '../redux/Action'
import KeyboardAvoidViewWrapper from '../components/KeyboardAvoidViewWrapper'

const {width, height} = Dimensions.get('screen')

const RegisterScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPw, setVerifyPw] = useState('')
  const [isValidEmail, setValidEmail] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const VerifyEmail = (email) => {
    let regExpEmail = new RegExp(/^[\w]+(\.[\w]+)?@[\w]+\.[\w]+(\.[\w]+)?(\.[\w]+)?$/)
    if(!email) return true
    if (regExpEmail.test(email)) {
        return true
    }
  }

  const handleSubmit = async () => {
    if(!VerifyEmail(account) || !password || !verifyPw) {
      return 
    }
    if(password !== verifyPw) {
      Alert.alert('Mật khẩu và xác thực mật khẩu không trùng khớp !!!')
    }
    if(VerifyEmail(account) && (password === verifyPw)) {
      setLoading(true)
      await auth()
      .createUserWithEmailAndPassword(account, password)
      .then((res) => {
        dispatch({
          type: Actions.API_LOGIN,
          data: {
            uid: res.user.uid,
            email: account,
            navigation: navigation
          },
          setLoading: setLoading
        })
      })
      .catch(error => {
        setLoading(false)
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert("Đăng kí thất bại !!!",'Địa chỉ email đã tồn tại !!!');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert("Đăng kí thất bại !!!",'Địa chỉ email không tồn tại trong cơ sở dữ liệu. Bạn có thể đăng kí bằng email này.');
        }
        console.error(error);
      });
    }
  }
  if(loading){
    return <ActivityIndicator color={color.primary} size={'large'} style={{flex: 1}} />
  }

  return (
    <KeyboardAvoidViewWrapper>
      <View style={styles.registerScreen}>
        <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
        <View style={{width: '100%', height: 0.04* height}}>
          <TouchableOpacity style={styles.btnClose} onPress={() => navigation.pop(1)}>
            <AntDesign name='close' size={22} color='#333' />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleRegister}>Đăng ký</Text>
        <View style={styles.formRegister}>
            <Text style={styles.titleInput}>Email</Text>
            <View style={{justifyContent: 'center', backgroundColor: color.white}}>
              <TextInput 
                placeholder='Vui lòng nhập' 
                style={styles.inputLogin} 
                value={account}
                onChangeText={text => {
                  setAccount(text)
                  const valid = VerifyEmail(text)
                  valid ? setValidEmail(true) : setValidEmail(false)
                }}
                />
                <TouchableOpacity style={styles.btnClearInput} onPress={() => setAccount('')}>
                  <AntDesign name='closecircle' size={16} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.titleInput, {color: 'red', marginBottom: 10}]}>{isValidEmail ? '' : 'Email chưa đúng định dạng !!!'}</Text>
            <Text style={styles.titleInput}>Mật khẩu</Text>
            <View style={{justifyContent: 'center', backgroundColor: color.white}}>
              <TextInput 
                placeholder='Vui lòng nhập' 
                style={styles.inputLogin} 
                value={password}
                onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.btnClearInput} onPress={() => setPassword('')}>
                  <AntDesign name='closecircle' size={16} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.titleInput, {color: 'red', marginBottom: 10}]}>{password.length > 6 ? '' : 'Mật khẩu phải chứa tối thiểu 6 ký tự !!!'}</Text>
            <Text style={styles.titleInput}>Nhập lại mật khẩu</Text>
            <View style={{justifyContent: 'center', backgroundColor: color.white}}>
              <TextInput 
                placeholder='Vui lòng nhập' 
                style={styles.inputLogin} 
                value={verifyPw}
                onChangeText={text => setVerifyPw(text)}
                />
                <TouchableOpacity style={styles.btnClearInput} onPress={() => setVerifyPw('')}>
                  <AntDesign name='closecircle' size={16} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.titleInput, {color: 'red'}]}>{verifyPw.length > 6 ? '' : 'Mật khẩu phải chứa tối thiểu 6 ký tự'}</Text>
            <View style={{width: '100%', marginTop: 25, flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox 
                value={disabled}
                onValueChange={setDisabled}
                tintColors={{false: color.text, true: color.primary}}
              />
              <Text style={{color: color.text}}>Vui lòng chấp nhận thông tin dưới đây để tiếp tục:</Text>
            </View>
            <TouchableOpacity style={styles.btnShowClause}>
              <Text style={styles.titleClause}>Hiển thị Điều khoản sử dụng</Text>
              <FeatherIcon name='chevron-down' size={20} color={color.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.btnContinuous, styles.shadowProp, disabled ? {} : {backgroundColor: 'grey'}]} 
              disabled={!disabled}
              onPress={handleSubmit}
              >
              <Text style={styles.titleContinuous}>Đăng kí</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.footerRegister}>
            <Text style={{fontSize: 14, color: color.text}}>Bạn đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{fontSize: 16, color: color.primary, marginLeft: 15}}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
      </View>
    </KeyboardAvoidViewWrapper>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  registerScreen: {
    backgroundColor: color.background,
    height: height * 0.9, 
    width: '100%',
    paddingHorizontal: 15
  },
  btnClose: {
    marginTop: 15, 
    height: '100%', 
    justifyContent: 'center', 
    width: 25
  },
  titleRegister: {
    fontSize: 32,
    fontWeight: 'bold',
    color: color.title,
    marginTop: 15
  },
  formRegister: {
    marginTop: 15,
    width: '100%',
    flex: 1
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
  btnContinuous: {
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    height: 50,
    borderRadius: 10
  },
  titleContinuous: {
    fontSize: 20,
    color: color.white
  },
  btnShowClause: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleClause: {
    fontSize: 16,
    color: color.primary,
    fontWeight: '600',
    marginRight: 5
  },
  footerRegister: {
    height: 0.12 * height,
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  shadowProp: {
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    shadowColor: 'black'
  },
})