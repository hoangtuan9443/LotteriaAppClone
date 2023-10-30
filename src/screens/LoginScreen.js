import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, Image, Alert, StatusBar, ActivityIndicator } from 'react-native'
import color from '../contains/color'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux'
import * as Actions from '../redux/Action'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import KeyboardAvoidViewWrapper from '../components/KeyboardAvoidViewWrapper'

const {width, height} = Dimensions.get('screen')

const LoginScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [accountAccept, setAccountAccept] = useState(false)
  const [loading, setLoading] = useState(false)

  GoogleSignin.configure({
    webClientId: '855799724660-u7nldei4evkpj42iu4ijpffck503lu5h.apps.googleusercontent.com',
  });

  const onGoogleButtonPress = async () => {
    setLoading(true)
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    // Sign-in the user with the credential
    return auth()
    .signInWithCredential(googleCredential)
    .then(res => {
      dispatch({
        type: Actions.API_LOGIN,
        data: {
          uid: res.user.uid,
          email: res.user.email,
          navigation: navigation
        },
        setLoading: setLoading
      })
    }).catch(err => {
      Alert.alert(err.message)
    })
  }

  const onFacebookButtonPress = async () => {
    setLoading(true)
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth()
    .signInWithCredential(facebookCredential).then(res => {
      dispatch({
        type: Actions.API_LOGIN,
        data: {
          uid: res.user.uid,
          email: res.user.email,
          navigation: navigation
        },
        setLoading: setLoading
      })
    }).catch(err => {
      Alert.alert(err.message)
    })
  }

  const handleSubmit = async () => {
    let regExpPhone = new RegExp(/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/g)
    let regExpEmail = new RegExp(/^[\w]+(\.[\w]+)?@[\w]+\.[\w]+(\.[\w]+)?(\.[\w]+)?$/)
    if(account && !accountAccept) {
      if(regExpEmail.test(account) || regExpPhone.test(account)) {
        setAccountAccept(true)
      }else{
        Alert.alert('Email chưa đúng định dạng')
      }
    }
    if(password && account && accountAccept) {
      setLoading(true)
      await auth()
      .signInWithEmailAndPassword(account, password)
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
        if(error.code === 'auth/invalid-email'){
          Alert.alert('Đăng nhập thất bại !!!', 'Địa chỉ email không tồn tại trong cơ sở dữ liệu. Bạn có thể đăng kí bằng email này.')
        }
        if (error.code === 'auth/invalid-login') {
          Alert.alert("Đăng nhập thất bại !!!",'Mật khẩu chưa chính xác. Vui lòng thử lại !!!');
        }
      });
    }else if(!password){
      Alert.alert("Đăng nhập thất bại !!!", 'Vui lòng nhập mật khẩu trước khi tiếp tục.')
    }
  }

  if(loading) {
    return <ActivityIndicator style={{flex: 1}} color={color.primary} size={'large'} />
  }
  
  return (
    <KeyboardAvoidViewWrapper>
      <View style={styles.loginScreen}>
        <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
        <View style={{width: '100%', height: 0.04* height}}>
          <TouchableOpacity style={styles.btnClose} onPress={() => navigation.popToTop()}>
            <AntDesign name='close' size={22} color='#333' />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleLogin}>Đăng nhập hoặc {'\n'}Tạo tài khoản</Text>
        <View style={styles.formLogin}>
          {
            !accountAccept 
            ? (<View>
                <Text style={styles.titleInput}>Email hoặc số điện thoại</Text>
                <View style={{justifyContent: 'center', backgroundColor: color.white}}>
                  <TextInput 
                    placeholder='Vui lòng nhập' 
                    style={styles.inputLogin} 
                    value={account}
                    onChangeText={text => setAccount(text)}
                    />
                    <TouchableOpacity style={styles.btnClearInput} onPress={() => setAccount('')}>
                      <AntDesign name='closecircle' size={16} />
                    </TouchableOpacity>
                </View>
              </View>)
            : (<View>
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
            </View>)
          }
          <TouchableOpacity style={[styles.btnContinuous, styles.shadowProp]} onPress={handleSubmit}>
            <Text style={styles.titleContinuous}>Tiếp tục</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBuyWithoutLogin}>
            <Text style={styles.titleBuyWithoutLogin}>Mua hàng không cần tài khoản</Text>
            <FeatherIcon name='info' size={20} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.lineFooter}></View>
          <Text style={{fontSize: 16, color: color.text}}>   hoặc Đăng nhập bằng   </Text>
          <View style={styles.lineFooter}></View>
        </View>
        <View style={styles.btnAnotherLogin}>
          <TouchableOpacity 
            style={[styles.btnSocialLogin, styles.shadowProp]} 
            onPress={onFacebookButtonPress}>
              <Image source={require('../assets/image/fb-circle.png')} resizeMode='stretch' />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSocialLogin, styles.shadowProp]} onPress={onGoogleButtonPress}>
              <Image source={require('../assets/image/gg.png')} resizeMode='stretch' />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSocialLogin, styles.shadowProp]}>
              <Image source={require('../assets/image/apple.png')} resizeMode='stretch' />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidViewWrapper>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  loginScreen: {
    backgroundColor: color.background,
    width: '100%',
    paddingHorizontal: 15, 
    height: height * 0.9,
  },
  btnClose: {
    marginTop: 15, 
    height: '100%', 
    justifyContent: 'center', 
    width: 25
  },
  titleLogin: {
    fontSize: 32,
    fontWeight: 'bold',
    color: color.title,
    marginTop: 15
  },
  formLogin: {
    marginTop: 20,
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
    marginTop: 25,
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
  btnBuyWithoutLogin: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleBuyWithoutLogin: {
    fontSize: 18,
    color: color.primary,
    marginRight: 5
  },
  lineFooter: {
    width: 0.22 * width,
    height: 1,
    backgroundColor: '#999'
  },
  btnAnotherLogin: {
    width: '100%',
    height: 0.15 * height,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  btnSocialLogin: {
    width: 70,
    height: 70,
    backgroundColor: color.white,
    borderRadius: 10,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadowProp: {
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    shadowColor: 'black'
  },
})