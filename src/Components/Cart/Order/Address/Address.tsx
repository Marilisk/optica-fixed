import c from './Address.module.scss';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import { IInitialValues, initValues } from './initialValues';
import dadataFetch from '../../../../redux/API/dadataApi';
import snowFlake from './../../../../assets/icons/snowflake.png';
import errorInput from './../../../../assets/icons/errorInput.png';
import check from './../../../../assets/icons/check.png';
import { DadataSuggestionType } from '../../../Types/types';
import { useAppDispatch } from '../../../../redux/hooks';
import { fetchCreateOrder } from '../../../../redux/authSlice';
import { fetchCollectCartPrices } from '../../../../redux/productsSlice';
import { OrderHeader } from '../OrderHeader/OrderHeader';

interface IAddress {
    userName: string
    setActiveCol: (arg: 'payment') => void
}
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
            //console.log(responce.data)
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

    return <>
        {hints.map((el, i) => {
            return <div className={c.hintsWrap} >
                <div onClick={() => { setFieldValue(statePart, el); setHints([]) }}
                    key={i} className={c.hint}>
                    {el}
                </div>
            </div>
        })}
    </>
}


export const Address: FC<IAddress> = ({ userName, setActiveCol }: IAddress) => {
    const iValues: IInitialValues = initValues(userName);
    const dispatch = useAppDispatch()

    return <>
        <OrderHeader>
            <div>Доставка</div>
        </OrderHeader>
        <div className={c.wrap}>

            <Formik initialValues={iValues}
                onSubmit={async (values: IInitialValues, actions: any) => {
                    const cart = await dispatch(fetchCollectCartPrices())
                    if (cart.meta.requestStatus === 'fulfilled') {
                        try {
                            //dispatch(fetchCreateOrder(values))
                            setActiveCol('payment')

                        } catch (error) {

                        }
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
                            <input type="text" placeholder='номер телефона'
                                onChange={props.handleChange}
                                value={props.values.phone}
                                name="phone"
                            />
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
                                value={props.values.building}
                                name="building"
                            />
                        </div>

                        <div className={c.formLine} >
                            <input type="text" placeholder='квартира'
                                onChange={props.handleChange}
                                value={props.values.apartment}
                                name="apartment"
                            />
                        </div>

                        <div className={c.formLine}>
                            <button type='submit' className={c.submitBtn}
                            /* disabled={props.values.phone.length < 9} */ >
                                применить
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    </>
}
