import authAPI from "../api/api.js";

const SET_AUTH_USER = "SET_AUTH_USER"
const RESET_USER_AUTH_DATA = "RESET_USER_AUTH_DATA"
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS"
const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN";


let initialState = {
  username: null,
  loglast_name: null,
  last_name: null,
  email: null,
  isAuth: false,
  accessToken: "",
  refreshToken: "",
};

const AuthReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.accessToken
            }
        
        case SET_REFRESH_TOKEN:
            return {
              ...state,
              refreshToken: action.refreshToken
            };

        case SET_AUTH_USER:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state, 
                ...action.payload
                }

        case RESET_USER_AUTH_DATA:
            return {
                // ...state,
                ...initialState
            }
        
        default:
            return state
    }
}

export default AuthReducer


export const authUser = () => {
    return async (dispatch) => {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await authAPI.authMe(refreshToken);
        if (response.status === 200) {
            dispatch(setAccessToken(response.data.access));
            dispatch(setRefreshToken(response.data.refresh));
            dispatch(getAauthUser());
        }
    };
};


export const getAauthUser = () => {
    return async (dispatch) => {
      try {
        const response = await authAPI.getAythUser();
        if (response.status === 200) {
          let { username, first_name, last_name, email } = response.data.data;
          dispatch(setAuthUser(username, first_name, last_name, email, true));
        }
      } catch (error) {
        console.log('Get user error:', error)
      }
    };
};


export const register = (username, first_name, last_name, email, password, setStatus) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.registerUser(
            username,
            first_name,
            last_name,
            email,
            password
            );
            if (response.status === 201) {
                dispatch(login(username, password, setStatus));
            } else {
                setStatus(response.data.email[0]);
            }
        } catch (error) {
            console.log("Registration error: ", error)
        }
    }
}


export const login = (username, password, setStatus) => {
  return async (dispatch) => {
    try {
        const response = await authAPI.loginUser(username, password);
        console.log('Что то тут', response.data.detail)
        if (response.status === 200) {

            dispatch(setAccessToken(response.data.access));
            dispatch(setRefreshToken(response.data.refresh));
            localStorage.setItem("refreshToken", response.data.refresh);
            dispatch(getAauthUser());
        } else if (response.status === 401) {
            console.log(response)
            setStatus(response.detail);
        }
    } catch (error) {
        console.log("Login error:", error)
    }
    
  };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            const response = await authAPI.logout();
            if (response.data.resultCode === 0) {
                dispatch(resetAuthDataAC());
                setAccessToken("");
                setRefreshToken("");
            }
        } catch (error) {
            // Обработка ошибок при выходе
            console.error('Logout error:', error);
        }
    };
};



//Вывод стрелочной ф-и без return возможен, если функция только возвращает обьекты, после => нужно обернуть в ()
export const setAuthUser = (username, first_name, last_name, email, isAuth) => ({ type: SET_AUTH_USER, payload: {username, first_name, last_name, email, isAuth} })
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} })
export const resetAuthDataAC = () => {return { type: RESET_USER_AUTH_DATA }}
export const setAccessToken = (accessToken) => ({type: SET_ACCESS_TOKEN, accessToken})
export const setRefreshToken = (refreshToken) => ({type: SET_REFRESH_TOKEN, refreshToken})
