import { delay, put, select, takeEvery, takeLeading, take, call } from 'redux-saga/effects'

import * as Actions from '../Action'

export function* authenticationWatcher() {
    yield takeLeading(Actions.API_LOGIN, workerAPILogin)
    yield takeLeading(Actions.API_LOGOUT, workerAPILogout)
    yield takeLeading(Actions.API_UPDATE_INFO_USER, workerAPIUpdateInfoUser)
}

function* workerAPILogin(action) {
    try{
        const navigation = action.data.navigation
        const setLoading = action.setLoading
        yield put({
            type: Actions.LOGIN_SUCCESS,
            data: action.data
        })
        navigation.popToTop()
        setLoading(false)
    }catch(err) {
        const setLoading = action.setLoading
        setLoading(false)
        console.log(err.message)
    }
}

function* workerAPILogout(action) {
    try {
        yield put({
            type: Actions.LOGOUT_SUCCESS,
        })
    } catch(err) {
        console.log(err.message)
    }
} 

function* workerAPIUpdateInfoUser(action) {
    try {
        yield put({
            type: Actions.UPDATE_INFO_USER_SUCCES,
            data: action.data
        })
    } catch(err) {
        console.log(err.message)
    }
}