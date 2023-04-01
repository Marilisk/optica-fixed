import { Field, Formik, Form } from 'formik';
import { useState } from 'react';
import instance from '../../../../redux/API/api';
import { validateEmail } from '../loginValidate';
import c from './ForgotPasswordForm.module.scss';


export const ForgotPasswordForm = () => {
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [message, setMessage] = useState<null | string>(null)

    const emailInLS = localStorage.getItem('email')
    const initialValues = emailInLS ? { email: emailInLS }
        : { email: '' } 
    

    return <Formik initialValues={initialValues}
        onSubmit={async (values, actions) => {
            setLoadingStatus(true)
            try {
                const response = await instance.post('/auth/forgotpassword', { email: values.email })
                console.log(response)
                if (response) {
                    setMessage(response.data.message)
                }
                actions.resetForm()
                setLoadingStatus(false)
            } catch (error) {
                console.log(error)
                setMessage(error.message)
                setLoadingStatus(false)
            }
        }}
    >

        {({ errors, touched }) => (
            <Form>
                <div className={c.wrap}>
                    <label>
                        <span>Введите электронную почту, указанную при регистрации:</span>
                        <Field id='email' name='email' validate={validateEmail}
                            style={errors.email && { borderColor: '#FF0000' }} />
                        {errors.email && touched.email && <p className={c.error}>{errors.email}</p>}
                    </label>

                    {message &&
                        <p className={c.msg}>{message}</p>
                    }

                    <button type='submit' disabled={loadingStatus}>
                        сбросить пароль
                    </button>

                </div>
            </Form>

        )}

    </Formik>
}