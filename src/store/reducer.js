const initialState = {
    formLoginEmail: '',
    formLoginPassword: '',
    formSignUpEmail: '',
    formSignUpPassword: '',
    formSignUpName: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            break;
    }
    return state;
}

export default reducer;