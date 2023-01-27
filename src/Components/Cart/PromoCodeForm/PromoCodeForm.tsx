import c from './PromoCodeForm.module.scss';
import { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { sendPromoCode } from '../../../redux/authSlice';



export const PromoCodeForm: FC = () => {
    const dispatch = useAppDispatch();
    const message = useAppSelector(s => s.auth.subscribeData.responseMsg)



    return <div className={c.wrap}>

        <div className={c.line}>
            <p className={c.bold}>Есть промокод?</p>
            <p>один для каждого заказа</p>
            {Boolean(message) && <p className={c.codeResult}>{message}</p>}
        </div>

        <Formik initialValues={{ code: '' }}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                console.log(values)
                dispatch(sendPromoCode('К сожалению, такой промокод не найден...'))
                actions.resetForm()
            }}
        >
            {() => (
                <Form>

                    <div>
                        <Field name='code' />
                        <button type='submit' className={c.submitBtn}>
                            применить
                        </button>
                    </div>

                </Form>
            )}

        </Formik>

    </div>




}
