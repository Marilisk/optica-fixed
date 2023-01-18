import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from '../../../redux/authSlice';
import c from './SubscribeForm.module.scss';


export const SubscribeForm = () => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.auth.subscribeData);
    const msg = data.responseMsg;

    const formik = useFormik({
        initialValues: {
            email: data.email,
        },
        enableReinitialize: true,
        onSubmit: (values, actions) => { 
            dispatch(subscribe(values.email))
            console.log(actions)
            actions.resetForm('')

        },
    })

    return <>
    {msg ? msg  
    :
    <form onSubmit={formik.handleSubmit}
        className={c.subscribeForm}>
        
        <input name='email'
                type='text'
                value={formik.values.email}
                placeholder='email'
                onChange={formik.handleChange}
            />

        <button type='submit'>
            Получить
        </button>


    </form>
}

    </>
}