import c from './RegisterForm.module.scss';
import { CustomCheckbox } from '../../../assets/form_elements/CustomCheckbox/CustomCheckbox';
import { Field, Form, Formik } from 'formik';
import { fetchRegister } from '../../../redux/authSlice';
import { validateEmail, validatePassword, validateFullName } from '../LoginForm/loginValidate';
import snowFlake from './../../../assets/icons/snowflake.png';
import errorInput from './../../../assets/icons/errorInput.png';
import check from './../../../assets/icons/check.png';
import { useState } from 'react';


export const RegisterForm = ({ dispatch, toggleLoginModalOpened, isLoading, setIsLoginTab }) => {
    const [alreadyRegisteredMsg, setAlreadyRegisteredMsg] = useState(null)

    return <Formik initialValues={{
        fullName: '',
        email: '',
        password: '',
        rememberMe: true,
    }}
        onSubmit={async (values, actions) => {
            const payload = { email: values.email, password: values.password, fullName: values.fullName };
            const response = await dispatch(fetchRegister(payload));
            console.log(response)
            if (response.error.message === "Request failed with status code 400") {
                setAlreadyRegisteredMsg('Пользователь с таким email уже зарегистрирован')
                setIsLoginTab(true)
            } else if (response.payload && 'email' in response.payload) {
                if (values.rememberMe) { localStorage.setItem('email', values.email) }
                actions.resetForm({
                    fullName: '',
                    email: '',
                    password: '',
                    rememberMe: true,
                });
                toggleLoginModalOpened();
            } else {
                console.log(response);
            }
        }}
    >

        {({ errors, touched }) => (
            <Form >
                <div className={c.wrap}>

                    <Field id='fullName' name='fullName' placeholder='Ваше полное имя' validate={validateFullName}
                        style={errors.fullName && { borderColor: '#95009C', color: '#95009C' }} />
                    {errors.fullName && touched.fullName && <p className={c.errorFullname}>{errors.fullName}</p>}
                    <img alt=''
                        src={errors.fullName && touched.fullName ? errorInput :
                            touched.fullName ? check : snowFlake}
                        className={c.fullNameIcon} />

                    <Field id='email' name='email' placeholder='email' validate={validateEmail}
                        style={errors.email && { borderColor: '#95009C', color: '#95009C' }} />
                    {errors.email && touched.email && <p className={c.errorEmail}>{errors.email}</p>}
                    <img alt=''
                        src={errors.email && touched.email ? errorInput :
                            touched.email ? check : snowFlake}
                        className={c.emailIcon} />

                    <Field id="password" type="password" name="password" placeholder='пароль' validate={validatePassword}
                        style={errors.password && { borderColor: '#95009C', color: '#95009C' }} />
                    {errors.password && touched.password && <p className={c.errorPassword}>{errors.password}</p>}
                    <img alt=''
                        src={errors.password && touched.password ? errorInput :
                            touched.password ? check : snowFlake}
                        className={c.passwordIcon} />

                    {alreadyRegisteredMsg && <p className={c.alreadyRegisteredMsg}>{alreadyRegisteredMsg}</p>}

                    <button type='submit'
                        disabled={isLoading === 'loading'}
                        className={(errors.fullName || errors.email || errors.password || isLoading === 'loading') ?
                            c.btnEnabled : null}>
                        ЗАРЕГИСТРИРОВАТЬСЯ
                    </button>

                    <div className={c.underBtn}>
                        <Field type='checkbox' name='rememberMe' component={CustomCheckbox} />
                        <label htmlFor='rememberMe'>запомнить меня</label>
                    </div>

                </div>
            </Form>

        )}

    </Formik>
}