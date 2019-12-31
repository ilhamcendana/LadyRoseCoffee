const initialState = {
    usersData: {
        nama: '',
        cart: []
    },
    cartTotal: 0,
    isReady: false,
    isAuth: false,
    formLoginEmail: '',
    formLoginPassword: '',
    formSignUpEmail: '',
    formSignUpPassword: '',
    formSignUpName: '',
    allProducts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setUsersData":
            return {
                ...state,
                usersData: action.data
            }
        case "setIsReady":
            return {
                ...state,
                isReady: action.readyCondition
            }
        case "setIsAuth":
            return {
                ...state,
                isAuth: action.authCondition
            }
        case "loginFormChange":
            return {
                ...state,
                [action.formLoginName]: action.formLoginValue
            }
        case "signUpFormChange":
            return {
                ...state,
                [action.formSignUpName]: action.formSignUpValue
            }
        case "setAllProducts":
            return {
                ...state,
                allProducts: action.data
            }
        case "setAddNewProduct":
            let newProducts = [...state.allProducts]
            const { name, desc, price, imgurl, id } = action
            newProducts.push({ name, desc, price, imageUrl: imgurl, id })
            return {
                ...state,
                allProducts: newProducts
            }
        case "changeCart":
            let newValue = [...state.usersData.cart]
            if (action.diapain === 'tmbhQty') {
                newValue[action.prods].qty += 1
            } else if (action.diapain === 'inc') {
                newValue.push(action.prods)
            } else if (action.diapain === 'dec') {
                newValue.filter(nv => nv !== action.prods)
            }
            return {
                ...state,
                usersData: {
                    ...state.usersData,
                    cart: newValue
                }
            }
        case "cleanUsersData":
            return {
                ...state,
                usersData: {
                    name: '',
                    cart: []
                }
            }
        case "cariTotalCart":
            let initotalnya = 0
            state.usersData.cart.map(item => initotalnya += parseInt(item.qty))
            return {
                ...state,
                cartTotal: initotalnya
            }
        default:
            break;
    }
    return state;
}

export default reducer;