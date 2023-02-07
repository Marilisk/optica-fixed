import c from './PayForm.module.scss';
import { FC } from 'react';
import { AngleIcon } from '../../../../../assets/icons/AngleIcon';
import { Formik } from 'formik';
import { CardInfoStrings } from '../CardPayVariety/CardInfoStrings';
import InputMask from 'react-input-mask';
import { paymentValidator } from './paymentValidator';
import ch from '../../../../../assets/form_elements/CustomCheckbox/CustomCheckbox.module.scss';
import logo from './../payLogo.png'
import { activeColEnum } from '../../Order';
import btnCl from './../../Address/Address.module.scss';
import { priceFormatter } from '../../../../../assets/functions/priceFormatter';


export interface IPaymentInitValues {
    cardNum: string
    validityMonth: string
    validityYear: string
    code: string
    rememberCard: boolean
}
interface IPayForm {
    isCardChosen: boolean
    setCardChosen: (arg: boolean) => void
    sum: number
    activeCol: activeColEnum
    setActiveCol: (arg: activeColEnum) => void
}

export const PayForm: FC<IPayForm> = ({ isCardChosen, setCardChosen, sum, activeCol, setActiveCol }: IPayForm) => {
    const price = priceFormatter(sum)

    return <div className={c.wrap}>
        <div className={c.header}>
            <div className={c.iconWrap}>
                <AngleIcon color={'#D8D1CA'} size={'24px'} margin={'12px auto'}
                    transform={'rotate(180deg)'}
                    showAnother={() => setCardChosen(!isCardChosen)} disabled={false} />
            </div>
            <div className={c.stringsWrap}>
                <CardInfoStrings />
            </div>
        </div>

        <Formik initialValues={{
            cardNum: '',
            validityMonth: '',
            validityYear: '',
            code: '',
            rememberCard: true,
        }}
            onSubmit={async (values: IPaymentInitValues, actions: any) => {
                console.log(values)

            }}
            validate={paymentValidator}
            validateOnBlur={true} >

            {props => (
                <form onSubmit={props.handleSubmit}>

                    <div className={c.formLine} >
                        <span>Номер карты</span>
                        <InputMask mask='9999 9999 9999 9999' maskChar=' '
                            onChange={props.handleChange}
                            name='cardNum'
                            value={props.values.cardNum}
                            className={props.errors.cardNum ? c.errorInput : null}
                        />
                    </div>

                    <div className={c.formLine} >

                        <div className={c.formFlex}>

                            <div className={c.validityLine}>
                                <span>срок действия </span>
                                <input type='text'
                                    className={props.errors.validityMonth ? c.errorInput : null}
                                    onChange={props.handleChange}
                                    value={props.values.validityMonth}
                                    placeholder='MM'
                                    name='validityMonth'
                                    maxLength={2}
                                />
                                /
                                <input type="text"
                                    className={props.errors.validityMonth ? c.errorInput : null}
                                    onChange={props.handleChange}
                                    value={props.values.validityYear}
                                    placeholder='ГГ'
                                    name='validityYear'
                                    maxLength={4}
                                />

                                {(props.errors.validityMonth || props.errors.validityYear) &&
                                    <div className={c.error}>
                                        {props.errors.validityMonth}
                                    </div>}
                            </div>

                            <div>
                                <span>Код</span>
                                <input type="text" className={props.errors.code ? c.errorInput : null}
                                    onChange={props.handleChange}
                                    value={props.values.code}
                                    placeholder='CVC'
                                    maxLength={3}
                                    name='code'
                                />
                              
                            </div>
                        </div>
                    </div>

                    <div className={`${c.formLine} ${c.formFlexLine}`} >

                        <div className={props.values.rememberCard ? ch.checked : ch.checkWrap}>
                            <input type="checkbox"
                                onChange={props.handleChange}
                                checked={props.values.rememberCard}
                                name="rememberCard"
                            />

                        </div>
                        <span>Запомнить карту в ЮMoney</span>
                    </div>

                    <div className={c.btnLine}>
                        <button type='submit' className={btnCl.submitBtn}
                            style={activeCol === activeColEnum.payment ? null : { display: 'none' }} >
                            Заплатить {price}
                        </button>
                    </div>

                    <div className={c.rulesLink}>
                        Нажимая кнопку, вы принимаете <a target="_blank" rel="noreferrer" href='https://yoomoney.ru/page?id=527708'>
                            условия сервиса
                        </a>
                    </div>
                </form>

            )}

        </Formik>

        <img alt='' src={logo} />
    </div>

}
