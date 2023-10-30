import { all } from 'redux-saga/effects'
import { categoryWatcher } from './categoryWatcher'
import { authenticationWatcher } from './authenticationWatcher'
import { cartWatcher } from './cartWatcher'
import { orderWatcher } from './orderWatcher'

export default function* rootSaga() {
    yield all([
        categoryWatcher(),
        authenticationWatcher(),
        cartWatcher(),
        orderWatcher(),
    ])
}