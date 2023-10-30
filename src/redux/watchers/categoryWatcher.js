import { delay, put, select, takeEvery, takeLeading, take, call } from 'redux-saga/effects'

import * as Actions from '../Action'

export function* categoryWatcher() {
    yield takeLeading(Actions.API_CHANGE_CATEGORY_ORDERLIST, workerAPIChangeCategoryOrderlist)
}

function* workerAPIChangeCategoryOrderlist(action) {
    try{
        const setLoading = action.data.setLoading
        const orderList = yield select(state => state.categoryReducer.order)
        let temporary = orderList.filter((item) => item.id === action.data.id ? item : null)
        yield put({
            type: Actions.CHANGE_CATEGORY_ORDERLIST_SUCCESS,
            data: {
                id: action.data.id,
                listItems: temporary[0].listItems,
            }
        })
        yield delay(100)
        setLoading(false)
    }catch(err) {
        console.log(err.message)
    }
}