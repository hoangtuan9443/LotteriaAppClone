import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { StatusBar, PermissionsAndroid, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { PersistGate } from 'redux-persist/integration/react'

import TabBottomNavigator from '../navigators/TabBottomNavigator';
import Store from '../redux/Store';
import CartScreen from './CartScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import OrderHistoryScreen from './OrderHistoryScreen';
import PayScreen from './PayScreen';
import DiscountAndPaymentScreen from './DiscountAndPaymentScreen';
import MapScreen from './MapScreen';
import GetLocationScreen from './GetLocationScreen';
import OrderInfoScreen from './OrderInfoScreen';
import UserInfoScreen from './UserInfoScreen';
import color from '../contains/color';
import FavoriteScreen from './FavoriteScreen';
import messaging from '@react-native-firebase/messaging'
import notifee from '@notifee/react-native';

const Stack = createNativeStackNavigator();

const MainScreen = () => {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  }

  const HandleGetToken = async () => {
    const deviceToken = await messaging().getToken()
    return deviceToken
  }

  const DisplayNotification = async (title, body) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        smallIcon: 'ic_launcher_round', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        sound: 'default'
      },
    });
  }

  useEffect(() => {
    SplashScreen.hide();
    const handleToken = async () => {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      await HandleGetToken()
      await requestUserPermission()

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });

      messaging().onNotificationOpenedApp(async remoteMessage => {
        console.log('Remote message: ', remoteMessage)
      })

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        // console.log(remoteMessage.notification)
        DisplayNotification(remoteMessage.notification?.title, remoteMessage.notification?.body)
      })
      
      return unsubscribe
    }
    handleToken()
  }, [])

  return (
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <StatusBar backgroundColor={color.primary} StatusBarStyle={'dark-content'} />
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Tab' screenOptions={{headerShown: false}}>
                <Stack.Screen name='Tab' component={TabBottomNavigator} />
                <Stack.Screen name='Cart' component={CartScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='OrderHistory' component={OrderHistoryScreen} />
                <Stack.Screen name='Pay' component={PayScreen} />
                <Stack.Screen name='DiscountAndPayment' component={DiscountAndPaymentScreen} />
                <Stack.Screen name='MyLocation' component={MapScreen} />
                <Stack.Screen name='GetLocation' component={GetLocationScreen} />
                <Stack.Screen name='OrderInfo' component={OrderInfoScreen} />
                <Stack.Screen name='UserInfo' component={UserInfoScreen} />
                <Stack.Screen name='Favorite' component={FavoriteScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default MainScreen