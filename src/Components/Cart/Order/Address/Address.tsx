import c from './Address.module.scss';
import { FC, useCallback, useEffect, useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import { IInitialValues, initValues } from './initialValues';
import dadataFetch from '../../../../redux/API/dadataApi';
import { DadataSuggestionType } from '../../../Types/types';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchAddValuesToOrder, fetchCreateOrder } from '../../../../redux/authSlice';
import { fetchCollectCartPrices, setProcessedOrder } from '../../../../redux/productsSlice';
import { OrderHeader } from '../OrderHeader/OrderHeader';
import { activeColEnum } from '../Order';
import InputMask from 'react-input-mask';


interface IGetDadataHints {
    statePart: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}
export const GetDadataHints: FC<IGetDadataHints> = ({ statePart, setFieldValue }: IGetDadataHints) => {
    const { values } = useFormikContext()
    const query = JSON.stringify({ query: values[statePart] })
    const [hints, setHints] = useState<string[]>([])


    const getHints = useCallback(async () => {
        const responce = await dadataFetch.post('', query);
        if (responce.data.suggestions) {
            const vals = [];
            responce.data.suggestions.forEach((el: DadataSuggestionType) => vals.push(el.value))
            setHints(vals)
        }
        return responce;
    }, [query])

    useEffect(() => {
        getHints()
    }, [query, getHints])

    if (!hints.length) { return null }

    return <div className={c.hintsWrap} >
        {hints.map((el, i) => {
            return <div key={i} onClick={() => { setFieldValue(statePart, el); setHints([]) }}
                    className={c.hint} style={ {top: 30*i + 'px'}}>
                    {el}
                </div>
            
        })}
        </div>
}

interface IAddress {
    userName: string
    setActiveCol: (arg: activeColEnum) => void
    activeCol: activeColEnum
}

export const Address: FC<IAddress> = ({ userName, setActiveCol, activeCol }: IAddress) => {
    const iValues: IInitialValues = initValues(userName);
    const dispatch = useAppDispatch()

    const editOrder = useCallback( async () => {
        const cart = await dispatch(fetchCollectCartPrices())
        if (cart.meta.requestStatus === 'fulfilled') {
            try {
                try {
                    const order = await dispatch(fetchCreateOrder(iValues))
                    dispatch(setProcessedOrder(order.payload))
                } catch (error) {
                    console.log('error in setting processed Order', error)
                }
            } catch (error) {
                console.log('error in prices collecting', error)
            }
        }
    }, [dispatch, iValues])
    
    useEffect( () => {
        editOrder()
    }, [editOrder])

    return <>
        <OrderHeader>
            <div onClick={() => setActiveCol(activeColEnum.address)} >Доставка</div>
        </OrderHeader>
        <div className={c.wrap}>

            <Formik initialValues={iValues}
                onSubmit={async (values: IInitialValues, actions: any) => {
                    try {
                        await dispatch(fetchAddValuesToOrder(values))
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
                            <textarea /* type="text" */ placeholder='адрес'
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
