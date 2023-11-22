import {authUser} from './auth-reduser.js';

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"


let initialState = {
    initialized: false,

}

const AppReducer = (state = initialState, action) => {

    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return {
                ...state, 
                initialized: true
                }

        default:
            return state
    }
}
    

export default AppReducer

export const initializedApp = () => {
    return (dispatch) => {

        let promies = dispatch(authUser())

        Promise.all([promies]).then(() => {
            dispatch(initializedSuccess());
        });

    }
}


export const initializedSuccess = () => {return { type: INITIALIZED_SUCCESS }}
