import c from './Address.module.scss';
import { FC } from 'react';
import { Formik} from 'formik';
import { IInitialValues, initValues } from './initialValues';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchAddValuesToOrder } from '../../../../redux/authSlice';
import { setProcessedOrder } from '../../../../redux/productsSlice';
import { OrderHeader } from '../OrderHeader/OrderHeader';
import { activeColEnum } from '../Order';
import InputMask from 'react-input-mask';
import { GetDadataHints } from './GetDadataHints/GetDadataHints';


interface IAddress {
    userName: string
    setActiveCol: (arg: activeColEnum) => void
    activeCol: activeColEnum
}



export const Address: FC<IAddress> = ({ userName, setActiveCol, activeCol }: IAddress) => {
    
    const iValues: IInitialValues = initValues(userName);
    const dispatch = useAppDispatch()

    return <>
        <OrderHeader>
            <div onClick={() => setActiveCol(activeColEnum.address)} >Доставка</div>
        </OrderHeader>
        <div className={c.wrap}>

            <Formik initialValues={iValues}
                onSubmit={async (values: IInitialValues, actions: any) => {
                    try {
                        const renewedOrder = await dispatch(fetchAddValuesToOrder(values))
                        dispatch(setProcessedOrder(renewedOrder.payload))
                        setActiveCol(activeColEnum.payment)
                    } catch (error) {
                        console.log('error in order editing', error)
                    }
                }}
            >

                {props => (
                    <form onSubmit={props.handleSubmit}>

                        <div className={c.formLine} >
                            <input type="text" placeholder='имя'
                                onChange={props.handleChange}
                                value={props.values.name}
                                name="name"
                            />
                        </div>

                        <div className={c.formLine} >
                            <InputMask mask='+7 (999) 999 99 99' maskChar='*'
                                onChange={ props.handleChange}
                                name='phone'
                                value={props.values.phone}
                                placeholder='номер телефона' />
                        </div>

                        <div className={c.formLine} >
                            <textarea placeholder='адрес'
                                onChange={props.handleChange}
                                value={props.values.address}
                                name="address"
                            />
                            <GetDadataHints statePart={'address'} setFieldValue={props.setFieldValue} />
                        </div>

                        <div className={c.formLine} >
                            <input type="text" placeholder='дополнительная информация'
                                onChange={props.handleChange}
                                value={props.values.additional}
                                name="additional"
                            />
                        </div>

                        <div className={c.formLine}>
                            <button type='submit' className={c.submitBtn}
                                style={activeCol === activeColEnum.address ? null : { display: 'none' }}
                                disabled={props.values.phone.length !== 18 || 
                                          props.values.phone.includes('*') } >
                                применить
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    </>
}
