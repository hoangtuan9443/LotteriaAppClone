import * as Actions from '../Action'
const initialState = {
    UserToken: '',
    UserInfo: {fullname: '', phone: '', dob: '', email: ''}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case Actions.LOGOUT_SUCCESS: {
            return {
                ...state,
                UserInfo: initialState.UserInfo,
                UserToken: initialState.UserToken
            }
        }
        case Actions.LOGIN_SUCCESS: {
            return {
                ...state,
                UserInfo: {
                    ...state.UserInfo,
                    email: action.data.email,
                },
                UserToken: action.data.uid
            }
        }
        case Actions.UPDATE_INFO_USER_SUCCES: {
            action.navigation
            return {
                ...state,
                UserInfo: {
                    ...state.UserInfo,
                    ...action.data
                }
            }
        }
        default: 
            return state
    }
}