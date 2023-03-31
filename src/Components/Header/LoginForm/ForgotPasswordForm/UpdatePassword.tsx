import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import instance from '../../../../redux/API/api';
import { validateEmail } from '../loginValidate';
import c from './ForgotPasswordForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { checkAuth } from '../../../../redux/authSlice';


const UpdatePassword: FC = () => {
    const [message, setMessage] = useState<null | string>(null)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const initialValues = {
        email: '',
        newPassword: ''
    }
    const emailInLS = localStorage.getItem('email')
    if (emailInLS) { initialValues.email = emailInLS }

    return <Formik initialValues={initialValues}
        onSubmit={async (values) => {
            setLoadingStatus(true)
            try {
                const response = await instance.post('/auth/setnewpassword', { email: values.email, newPassword: values.newPassword })
                if (response.status === 200 && response.data.accessToken) {
                    localStorage.setItem('token', response.data.accessToken)
                    dispatch(checkAuth())
                    navigate('/')
                }
                setLoadingStatus(false)
            } catch (error) {
                console.log(error)
                setMessage(error.message)
                setLoadingStatus(false)
            }
        }}>

        {({ values, errors, touched }) => (
            <Form>
                <div className={c.wrap}>
                    <label>
                        <span>почта</span>
                        <Field id='email' name='email' validate={validateEmail}
                            style={errors.email && { borderColor: '#FF0000' }} />
                        {errors.email && touched.email && <p className={c.error}>{errors.email}</p>}
                    </label>

                    <label>
                        <span>новый пароль</span>
                        <Field id='newPassword' name='newPassword'
                            style={errors.email && { borderColor: '#FF0000' }} />
                        {values.newPassword.length < 6 && touched.newPassword &&
                            <p className={c.error}>
                                длина пароля должна быть более 6 символов
                            </p>}
                    </label>

                    {message &&
                        <p className={c.msg}>{message}</p>
                    }

                    <button type='submit' disabled={loadingStatus}>
                        обновить пароль
                    </button>

                </div>
            </Form>
        )}

    </Formik>
};

export default UpdatePassword;