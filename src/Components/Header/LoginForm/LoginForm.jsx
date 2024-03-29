import c from './LoginForm.module.scss';
import { CustomCheckbox } from '../../../assets/form_elements/CustomCheckbox/CustomCheckbox';
import { Field, Form, Formik } from 'formik';
import { fetchAddEyewearToCart, fetchAuth } from '../../../redux/authSlice';
import { validateEmail, validatePassword } from './loginValidate';
import { useState } from 'react';
import { setCartInLSLength } from '../../../redux/productsSlice';
import { Link } from 'react-router-dom';

export const initialiseCart = async (dispatch) => {
    let cartInLS = localStorage.getItem('cart')
    if (cartInLS) {
        cartInLS = JSON.parse(localStorage.getItem('cart'))
        for (let cartItem of cartInLS) {
            if (cartItem.cat === "eyewear") {
                await dispatch(fetchAddEyewearToCart({ productId: cartItem.productId, cat: "eyewear" }))
            } else {
                await dispatch(fetchAddEyewearToCart({
                    productId: cartItem.productId, cat: 'contactLens', lens: cartItem.leftLens
                }))
            }
        }
        localStorage.removeItem('cart')
        dispatch(setCartInLSLength(0))
    }
}

export const LoginForm = ({ toggleLoginModalOpened, dispatch, isLoading }) => {
    const [invalidMsg, setInvalidMsg] = useState(null)

    const emailInLS = localStorage.getItem('email')
    const initialValues = emailInLS ? { email: emailInLS, password: '', rememberMe: true }
        : { email: '', password: '', rememberMe: true, }

    return <Formik initialValues={initialValues}
        onSubmit={async (values, actions) => {
            const payload = { email: values.email, password: values.password };
            const data = await dispatch(fetchAuth(payload));
            if (!data.payload && data.error.message === 'Request failed with status code 400') {
                setInvalidMsg('неверный логин или пароль')
                actions.resetForm({
                    email: '',
                    password: '',
                    rememberMe: true,
                })
            } else if ('accessToken' in data.payload.data) {
                if (values.rememberMe) { localStorage.setItem('email', values.email) }
                initialiseCart(dispatch)
                actions.resetForm({
                    email: '',
                    password: '',
                    rememberMe: true,
                })
                toggleLoginModalOpened();
            } 
        }}
    >

        {({ errors, touched }) => (
            <Form>
                <div className={c.wrap}>

                    <Field id='email' name='email' placeholder='email' validate={validateEmail}
                        style={errors.email && { borderColor: '#FF0000' }} />
                    {errors.email && touched.email && <p className={c.error}>{errors.email}</p>}

                    <Field id="password" type="password" name="password" placeholder='пароль' validate={validatePassword}
                        style={errors.password && { borderColor: '#FF0000' }} />
                    {errors.password && touched.password && <p className={c.errorPassword}>{errors.password}</p>}

                    {invalidMsg &&
                        <p className={c.alreadyRegisteredMsg}>{invalidMsg}</p>
                    }

                    <button type='submit' disabled={isLoading === 'loading' || (errors.email || errors.password)}>
                        ВОЙТИ
                    </button>

                    <div className={c.underBtn}>
                        <Field type='checkbox' name='rememberMe' component={CustomCheckbox} />
                        <label htmlFor='rememberMe'>запомнить меня</label>
                        <Link to={'/login/forgotpassword'} onClick={() => toggleLoginModalOpened()}>
                            <span>забыли пароль?</span>
                        </Link>
                    </div>

                </div>
            </Form>

        )}

    </Formik>
}