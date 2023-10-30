import * as Actions from '../Action'
const initialState = {
    cart: [], //Danh sách sản phẩm của giỏ hàng
    cartDiscount: [], ///Sản phẩm mua bằng mã giảm giá. Sẽ được concat với cart khi người dùng vào thanh toán
    deliveryCharge: 40000, //Phí ship
    payment: 'Tiền mặt', ///Phương thức thanh toán
    discountAndPaymentTypeList: [
        {   
            id: 'cashondelivery',
            title: 'Tiền mặt',
            image: require('../../assets/image/cash.jpg'),
            checkbox: true,
        },
        {   
            id: 'momowallet',
            title: 'Momo E-Wallet',
            image: require('../../assets/image/momo.png'),
            checkbox: false,
        },
    ], /// Danh sách các phương thức thanh toán
    discountList: [
        {
            id: 'SEP_2023_FRSPEF',
            title: 'Đơn hàng đầu tiên trên 99k tặng Mì Ý',
            date: '31/10/2023',
            available: true,
            upperThreshold: 99000,
            product: {
                id: 'SEP_2023_FRSPEF',
                title: 'Mì Ý (L) FREE',
                image: require('../../assets/image/miy_commiy.png'),
                initPrice: 0,
                discountPrice: 0,
                quantity: 1,
                add: false,
            }
        },
        {
            id: 'PROMO_OCT_P1',
            title: 'Khoai Tây Chiên 10k',
            date: '31/10/2023',
            available: true,
            upperThreshold: 99000,
            product: {
                id: 'PROMO_OCT_P1',
                title: 'Khoai Tây Chiên (M)',
                initPrice: 10000,
                discountPrice: 0,
                image: require('../../assets/image/khoaitaychien_thucannhe.png'),
                quantity: 1,
                add: false,
            }
        },
        {
            id: 'PROMO_OCT_P2',
            title: 'Mực rán (3 miếng) 10k',
            date: '31/10/2023',
            available: true,
            upperThreshold: 99000,
            product: {
                id: 'PROMO_OCT_P2',
                title: 'Mực Rán (3 miếng)',
                initPrice: 10000,
                discountPrice: 0,
                image: require('../../assets/image/mucran3m_thucannhe.png'),
                add: false,
                quantity: 1,
            }
        },
        {
            id: 'FREESHIP_2023',
            title: 'Ưu đãi giảm 100% phí giao hàng',
            date: '31/10/2023',
            available: true,
            upperThreshold: 0,
            percentage: 1
        },
    ], /// Danh sách mã giảm giá
    myLocation: "", ///Lấy địa điểm hiện tại
    mainLocation: {}, ///Địa điểm giao hàng chính
    locationList: [], ///Danh sách các địa điểm giao hàng đã tạo
}

export default (state = initialState, action) => {
    switch(action.type) {
        case Actions.ADD_TO_CART_SUCCESS: {
            return {
                ...state,
                cart: [...action.data],
            }
        }
        case Actions.CHANGE_PAYMENT_SUCCESS: {
            const navigation = action.data.navigation
            navigation.pop(1)
            return {
                ...state,
                payment: action.data.payment,
                discountAndPaymentTypeList: action.data.discountAndPaymentTypeList,
            }
        }
        case Actions.INCREASE_QUANTITY_SUCCESS: {
            return {
                ...state,
                cart: [...action.data]
            }
        }
        case Actions.DECREASE_QUANTITY_SUCCESS: {
            return {
                ...state,
                cart: [...action.data]
            }
        }
        case Actions.REMOVE_FROM_CART_SUCCESS: {
            if(action.data.length === 0) {
                return {
                    ...state,
                    cart: [...action.data],
                    deliveryCharge: initialState.deliveryCharge,
                    discountList: [...initialState.discountList],
                    cartDiscount: [],
                }
            }else{
                return {
                    ...state,
                    cart: [...action.data]
                }
            }
        }
        case Actions.GET_DISCOUNT_SUCCESS: {
            const navigation = action.data.navigation
            navigation.pop(1)
            return {
                ...state,
                deliveryCharge: action.data.deliveryCharge,
                discountList: [...action.data.discountList],
            }
        }
        case Actions.ADD_TO_CARTDISCOUNT: {
            const navigation = action.data.navigation
            navigation.pop(1)
            return {
                ...state,
                cartDiscount: [...action.data.cartDiscount],
                discountList: [...action.data.discountList]
            }
        }
        case Actions.CLEAR_DISCOUNT_SUCCESS: {
            const navigation = action.data.navigation
            navigation.pop(1)
            return {
                ...state,
                deliveryCharge: action.data.deliveryCharge,
                discountList: [...action.data.discountList],
            }
        }
        case Actions.REMOVE_FROM_CARTDISCOUNT: {
            const navigation = action.data.navigation
            navigation.pop(1)
            return {
                ...state,
                cartDiscount: [...action.data.cartDiscount],
                discountList: [...action.data.discountList],
            }
        }
        case Actions.GET_MYLOCATION_SUCCESS: {
            return {
                ...state,
                myLocation: action.data.myLocation,
            }
        }
        case Actions.UPDATE_MYLOCATION_SUCCESS: {
            const navigation = action.data.navigation
            navigation.pop(1)
            return {
                ...state,
                mainLocation: action.data.mainLocation,
            }
        }
        case Actions.CREATE_NEW_LOCATION_SUCCESS: {
            const navigation = action.data.navigation
            navigation.pop(1)
            return {
                ...state,
                locationList: action.data.locationList
            }
        }
        case Actions.GET_ORDER_SUCCESS: {
            return {
                ...state,
                cart: [],
                cartDiscount: [],
                discountList: [...initialState.discountList],
                deliveryCharge: initialState.deliveryCharge
            }
        }
        default: 
            return state
    }
}