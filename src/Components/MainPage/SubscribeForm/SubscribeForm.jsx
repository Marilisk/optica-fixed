import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from '../../../redux/authSlice';
import { validateEmail } from '../../Header/LoginForm/loginValidate';
import c from './SubscribeForm.module.scss';


export const SubscribeForm = () => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.auth.subscribeData);
    const msg = data.responseMsg;

    if (msg) {
        return <p>{msg}</p>
    }

    return <Formik initialValues={{ email: data.email, }}
        onSubmit={(values, actions) => {
            dispatch(subscribe(values.email))
            actions.resetForm('')
        }

        }>
        {({ errors, touched }) => (
            <Form className={c.subscribeForm}>
                <Field name='email' 
                    placeholder={'email'} 
                    validate={validateEmail} />

                {errors.email && touched.email &&
                    <p className={c.error}>{errors.email}</p>}

                <button type='submit' disabled={errors.email}>
                    получить
                </button>
            </Form>
        )}
    </Formik>



}