import c from './PayForm.module.scss';
import { FC } from 'react';
import { AngleIcon } from '../../../../../assets/icons/AngleIcon';
import { Formik } from 'formik';
import { CardInfoStrings } from '../CardPayVariety/CardInfoStrings';

export interface IPaymentInitValues {
    cardNum: number
    validityMonth: number
    validityYear: number
    code: number
    rememberCard: boolean
}
interface IPayForm {
    isCardChosen: boolean
    setCardChosen: (arg: boolean) => void
    sum: number
}

export const PayForm: FC<IPayForm> = ({ isCardChosen, setCardChosen, sum }: IPayForm) => {



    return <div className={c.wrap}>
        <div className={c.header}>
            <div className={c.iconWrap}>
                <AngleIcon color={'#D8D1CA'} size={'18px'} margin={'20px 0px auto auto'} transform={'rotate(180deg)'}
                    showAnother={() => setCardChosen(!isCardChosen)} disabled={false} />
            </div>
            <div className={c.stringsWrap}>
                <CardInfoStrings />
            </div>
        </div>

        <Formik initialValues={{
            cardNum: null,
            validityMonth: 0,
            validityYear: 0,
            code: 0,
            rememberCard: true,
        }


        }
            onSubmit={async (values: IPaymentInitValues, actions: any) => {
                console.log(values)

            }}

        >
            {props => (
                <form onSubmit={props.handleSubmit}>

                    <div className={c.formLine} >
                        <span>Номер карты </span>
                        <input type="text"
                            onChange={props.handleChange}
                            value={props.values.cardNum}
                            name="cardNum"
                        />
                    </div>

                    <div className={c.formLine} >
                        <span>Номер карты </span>
                        <input type="text"
                            onChange={props.handleChange}
                            value={props.values.cardNum}
                            name="cardNum"
                        />
                    </div>


                    <button type='submit'>Заплатить {sum} </button>
                </form>

            )}



        </Formik>


    </div>

}
