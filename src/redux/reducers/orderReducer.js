import * as Actions from '../Action'
const initialState = {
    orderList: [], ///don hang
    notificationList: [
        // {
        //     id: '#201010101010',
        //     title: 'Đơn hàng mới',
        //     status: 'success',
        // },
    ],
    favoriteList: [],
}

export default (state = initialState, action) => {
    switch(action.type){
        case Actions.GET_ORDER_SUCCESS: {
            const navigation = action.data.navigation
            navigation.popToTop()
            return {
                ...state,
                orderList: [...action.data.orderList]
            }
        }
        case Actions.CREATE_NOTIFICATION_ORDER_SUCCESS: {
            return {
                ...state,
                notificationList: [...action.data]
            }
        }
        case Actions.ADD_TO_FAVORITELIST_SUCCESS: {
            return {
                ...state,
                favoriteList: [...action.data],
            }
        }
        case Actions.REMOVE_FROM_FAVORITELIST_SUCCESS: {
            return {
                ...state,
                favoriteList: [...action.data]
            }
        }
        default:
            return state 
    }
}