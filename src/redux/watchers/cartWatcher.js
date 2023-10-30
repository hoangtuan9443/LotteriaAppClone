import { delay, put, select, takeEvery, takeLeading, take, call } from 'redux-saga/effects'

import * as Actions from '../Action'

export function* cartWatcher() {
    ///Cart
   yield takeLeading(Actions.API_ADD_TO_CART, workerAPIAddToCart)
   yield takeLeading(Actions.API_REMOVE_FROM_CART, workerAPIRemoveFromCart)
   yield takeLeading(Actions.API_INCREASE_QUANTITY, workerAPIIncreaseQuantity)
   yield takeLeading(Actions.API_DECREASE_QUANTITY, workerAPIDecreaseQuantity)
   ///Payment
   yield takeLeading(Actions.API_CHANGE_PAYMENT, workerAPIChangePayment)
   yield takeLeading(Actions.API_GET_DISCOUNT, workerAPIGetDiscount)
   yield takeLeading(Actions.API_CLEAR_DISCOUNT, workAPIClearDiscount)
   ///Location
   yield takeLeading(Actions.API_GET_MYLOCATION, workerAPIGetMyLocation)
   yield takeLeading(Actions.API_CREATE_NEW_LOCATION, workerAPICreateNewLocation)
   yield takeLeading(Actions.API_UPDATE_MYLOCATION, workerAPIUpdateMyLocation)
}

function* workerAPIAddToCart(action) {
    try {
        const cart = yield select(state => state.cartReducer.cart)
        if(JSON.stringify([]) === JSON.stringify(cart)) {
            const temporaryCart = []
            temporaryCart.push(action.data)
            yield put({
                type: Actions.ADD_TO_CART_SUCCESS,
                data: temporaryCart,
            })
        }else {
            const checkItemAvailable = cart.filter(item => {
                if(item.id === action.data.id) {
                    return {...action.data, quantity: item.quantity++}
                }
            })
            if(checkItemAvailable.length > 0) {
                const temporaryCart = [...cart]
                const filterCart = temporaryCart.map(item => {
                    return item.id === action.data.id ? checkItemAvailable[0] : item
                })
                yield put({
                    type: Actions.ADD_TO_CART_SUCCESS,
                    data: filterCart
                })
            }else {
                const temporaryCart = [...cart]
                temporaryCart.push(action.data)
                yield put({
                    type: Actions.ADD_TO_CART_SUCCESS,
                    data: temporaryCart
                })
            }
        }
    } catch(err) {
        console.log("Error: ", err.message)
    }
}

function* workerAPIRemoveFromCart(action) {
    try {
        const cart = yield select(state => state.cartReducer.cart)
        const temporaryData = cart.filter(item => {
            if(item.id !== action.data) {
                return item
            }
        })
        yield put({
            type: Actions.REMOVE_FROM_CART_SUCCESS,
            data: temporaryData
        })
        yield delay(300)
        const setLoading = action.setLoading
        setLoading(false)
    } catch(err) {
        console.log('Error', err.message)
    }
}

function* workerAPIIncreaseQuantity(action) {
    try {
        const cart = yield select(state => state.cartReducer.cart)
        const temporaryData = cart.map(item => {
            return item.id === action.data ? {...item, quantity: item.quantity + 1} : item
        })
        yield put({
            type: Actions.INCREASE_QUANTITY_SUCCESS,
            data: temporaryData
        })
        yield delay(300)
        const setLoading = action.setLoading
        setLoading(false)
    } catch(err) {
        console.log('Error', err.message)
    }
}

function* workerAPIDecreaseQuantity(action) {
    try {
        const cart = yield select(state => state.cartReducer.cart)
        const temporaryData = cart.map(item => {
            return item.id === action.data ? {...item, quantity: item.quantity - 1} : item
        })
        yield put({
            type: Actions.DECREASE_QUANTITY_SUCCESS,
            data: temporaryData
        })
        yield delay(300)
        const setLoading = action.setLoading
        setLoading(false)
    } catch(err) {
        console.log('Error', err.message)
    }
}

function* workerAPIChangePayment(action) {
    try {
        yield put({
            type: Actions.CHANGE_PAYMENT_SUCCESS,
            data: action.data
        })
    } catch(err) {
        console.log("Error: ", err.message)
    }
}

function* workerAPIGetDiscount(action) {
    try {
        const discountList = yield select(state => state.cartReducer.discountList)
        const temporaryData = discountList.map(item => {
            return item.id === action.data.id ? {...item, available: false} : item
        })
        if(action.data.type === 'ship'){
            const deliveryCharge = yield select(state => state.cartReducer.deliveryCharge)
            const applyDiscount = deliveryCharge - (deliveryCharge * action.data.data)
            return yield put({
                type: Actions.GET_DISCOUNT_SUCCESS,
                data: {
                    deliveryCharge: applyDiscount,
                    discountList: temporaryData,
                    navigation: action.data.navigation,
                }
            })
        }
        if(action.data.type === 'productDiscount') {
            const cartDiscount = yield select(state => state.cartReducer.cartDiscount)
            const temporaryCart = [...cartDiscount]
            temporaryCart.push(action.data.data)
            return yield put({
                type: Actions.ADD_TO_CARTDISCOUNT,
                data: {
                    cartDiscount: temporaryCart,
                    discountList: temporaryData,
                    navigation: action.data.navigation,
                }
            })
        }
    } catch(err) {
        console.log("Error: ", err.message)
    }
}

function* workAPIClearDiscount(action) {
    try {
        const discountList = yield select(state => state.cartReducer.discountList)
        const temporaryDiscountList = discountList.map(item => {
            return item.id === action.data.id ? {...item, available: true} : item
        })
        if(action.data.type === 'ship'){
            return yield put({
                type: Actions.CLEAR_DISCOUNT_SUCCESS,
                data: {
                    deliveryCharge: 40000,
                    discountList: temporaryDiscountList,
                    navigation: action.data.navigation,
                }
            })
        }
        if(action.data.type === 'productDiscount') {
            const cartDiscount = yield select(state => state.cartReducer.cartDiscount)
            const temporaryData = cartDiscount.filter(item => {
                if(item.id !== action.data.id) {
                    return item
                }
            })
            return yield put({
                type: Actions.REMOVE_FROM_CARTDISCOUNT,
                data: {
                    cartDiscount: temporaryData,
                    discountList: temporaryDiscountList,
                    navigation: action.data.navigation,
                },
            })
        }
    }catch(err) {
        console.log("Error: ", err.message)
    }
}

function* workerAPIGetMyLocation(action) {
    try {
        const GetLocation = async () => {
            const myApiKey = "AIzaSyACL3PhOgddEIUm-buJiiY3YLxwbbdVocg"
            return await new Promise((resolve, reject) => {
                fetch(
                  'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                    action.data.latitude +
                    ',' +
                    action.data.longitude +
                    '&key=' +
                    myApiKey,
                )
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(responseJson)
                    if (responseJson.status === 'OK') {
                      return resolve(responseJson?.results?.[1]?.formatted_address)
                    } else {
                      reject('not found');
                    }
                  })
                  .catch(error => {
                    reject(error);
                  });
              })
        }
        const resultPromise = yield call(GetLocation)
        yield put({
          type: Actions.GET_MYLOCATION_SUCCESS,
          data: {
              navigation: action.data.navigation,
              myLocation: resultPromise
          }
        })
        const navigation = action.data.navigation
        const setLoading = action.setLoading
        setLoading(false)
        navigation.navigate('GetLocation', {dontFill: false})
    } catch(err) {
        const setLoading = action.setLoading
        setLoading(false)
        console.log("Error cartWatcher: ", err)
    }
}


function* workerAPICreateNewLocation(action) {
    try {
        const locationList = yield select(state => state.cartReducer.locationList)
        const temporaryLocationList = [...locationList]
        temporaryLocationList.push({...action.data.newLocation, id: temporaryLocationList.length})
        yield put({
            type: Actions.CREATE_NEW_LOCATION_SUCCESS,
            data: {
                navigation: action.data.navigation,
                locationList: temporaryLocationList,
            }
        })
    } catch(err) {
        console.log("Error: ", err.message)
    }
}

function* workerAPIUpdateMyLocation(action) {
    try {
        yield put({
            type: Actions.UPDATE_MYLOCATION_SUCCESS,
            data: action.data
        })
    } catch(err) {
        console.log("Error: ", err.message)
    }
}