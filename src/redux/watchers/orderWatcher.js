import { delay, put, select, takeEvery, takeLeading, take, call } from 'redux-saga/effects'
import messaging from '@react-native-firebase/messaging'
import * as Actions from '../Action'

export function* orderWatcher() {
    yield takeLeading(Actions.API_GET_ORDER, workerAPIGetOrder)
    yield takeLeading(Actions.API_CREATE_NOTIFICATION_ORDER, workerAPICreateNotificationOrder)
    yield takeLeading(Actions.API_ADD_TO_FAVORITELIST, workerAPIAddToFavoriteList)
    yield takeLeading(Actions.API_REMOVE_FROM_FAVORITELIST, workerAPIRemoveFromFavoriteList)
}

function* workerAPIGetOrder(action) {
    try{
        const orderList = yield select(state => state.orderReducer.orderList)
        let temporaryOrderList = [...orderList]
        const id = `#${Math.floor(Math.random()*9000000000) + 1000000000}`
        temporaryOrderList.unshift({...action.data.newOrder, id: id})
        yield put({
            type: Actions.GET_ORDER_SUCCESS,
            data: {
                navigation: action.data.navigation,
                orderList: temporaryOrderList,
            }
        })
        yield put({
            type: Actions.API_CREATE_NOTIFICATION_ORDER,
            data: {
                id: id,
                title: 'Đơn hàng mới',
                status: 'success'
            }
        })
    } catch(err) {
        console.log("Error: ", err.message)
    }
}

function* workerAPICreateNotificationOrder(action) {
    try{
        // const urlLocal = 'http://26.51.98.135:3000/api/pushNotificationSuccess'
        const urlBE = "https://backend-psi-ruby.vercel.app/api/pushNotificationSuccess"
        const handlePostAPINotification = async () => {
            const deviceTokenNotification = await messaging().getToken()
            await fetch(urlBE,{
                method: "post",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id: action.data.id,
                  token: deviceTokenNotification
                })
            }).catch(err => {
                console.log("Error from handlePostAPINotification: ", err.message)
            })
        }
        const notificationList = yield select(state => state.orderReducer.notificationList)
        let temporaryNotificationList = [...notificationList]
        temporaryNotificationList.unshift(action.data)
        yield put({
            type: Actions.CREATE_NOTIFICATION_ORDER_SUCCESS,
            data: temporaryNotificationList
        })
        handlePostAPINotification()
    } catch(err) {
        console.log("Err: ", err.message)
    }
}

function* workerAPIAddToFavoriteList(action) {
    try {
        const favoriteList = yield select(state => state.orderReducer.favoriteList)
        let temporaryFavoriteList = [...favoriteList]
        temporaryFavoriteList.push(action.data)
        yield put({
            type: Actions.ADD_TO_FAVORITELIST_SUCCESS,
            data: temporaryFavoriteList
        })
    } catch(err) {
        console.log("Err: ", err.message)
    }
}

function* workerAPIRemoveFromFavoriteList(action) {
    try {
        const favoriteList = yield select(state => state.orderReducer.favoriteList)
        let temporaryFavoriteList = favoriteList.filter(item => {
            if(item.id !== action.data.id) {
                return item
            }
        })
        yield put({
            type: Actions.REMOVE_FROM_FAVORITELIST_SUCCESS,
            data: temporaryFavoriteList
        })
    } catch(err) {
        console.log("Err: ", err.message)
    }
}