import c from './LoginForm.module.scss';
import { CustomCheckbox } from '../../../assets/form_elements/CustomCheckbox/CustomCheckbox';
import { Field, Form, Formik } from 'formik';
import { fetchAuth } from '../../../redux/authSlice';
import { validateEmail, validatePassword } from './loginValidate';

export const LoginForm = ({ toggleLoginModalOpened, dispatch, isLoading }) => {

    return <Formik initialValues={{
        email: '6868221@gmail.com',
        password: '123456',
        rememberMe: true,
    }}
        onSubmit={async (values, actions) => {
            const payload = { email: values.email, password: values.password };
            const data = await dispatch(fetchAuth(payload));
            
            if (!data.payload && data.error.message === 'Request failed with status code 404') {
                alert('неверный логин или пароль');
            } else if ('accessToken' in data.payload) {
                actions.resetForm({
                    email: '',
                    password: '',
                    rememberMe: true,
                })
                toggleLoginModalOpened();
            } else {
                alert('ошибка авторизации');
            }
        }}
    >

        {({ errors, touched }) => (
            <Form >
                <div className={c.wrap}>

                    <Field id='email' name='email' placeholder='email' validate={validateEmail}
                        style={errors.email && { borderColor: '#FF0000' }} />
                    {errors.email && touched.email && <p className={c.error}>{errors.email}</p>}

                    <Field id="password" type="password" name="password" placeholder='пароль' validate={validatePassword}
                        style={errors.password && { borderColor: '#FF0000' }} />
                    {errors.password && touched.password && <p className={c.errorPassword}>{errors.password}</p>}

                    <button type='submit' disabled={isLoading === 'loading' || (errors.email || errors.password) }>
                        ВОЙТИ
                    </button>

                    <div className={c.underBtn}>
                        <Field type='checkbox' name='rememberMe' component={CustomCheckbox} />
                        <label htmlFor='rememberMe'>запомнить меня</label>
                        <span>забыли пароль?</span>
                    </div>

                </div>
            </Form>

        )}

    </Formik>
}