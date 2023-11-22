import React from "react";
import style from './LoginForm.module.css';
import { connect } from 'react-redux';
import { login } from '../../reduser/auth-reduser.js';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import { Navigate } from "react-router-dom";


const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
});


export const LoginForm = ({login, captchaUrl}) => {
    return (
        <Formik
            initialValues={{ username: "", password: ""}}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                login(values.username, values.password, setStatus)
                setSubmitting(false);
                
            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched, status }) => (
                <div className={style.myForm}>
                    <Form>
                        <div className={errors.username && touched.username ? style.errors : null}>
                            {errors.username && touched.username ? (
                                <div>{errors.username}</div>
                            ) : null}
                            <Field placeholder={'Username'} name={'username'} type={'input'} />
                        </div>
                        <div className={errors.password && touched.password ? style.errors : null}>
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                            <Field placeholder={'Password'} name={'password'} type={'password'} />
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                        
                    </Form>
                </div>

            )}
        </Formik>
    )
}

// const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)


export const Login = ({login, isAuth, captchaUrl}) => {

    if (isAuth === true) {
        return <Navigate to={"/home"} />
    }

    return (
        <div>
            <h1 className={style.login}>Login</h1>
            <LoginForm login={login} captchaUrl={captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    // captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)