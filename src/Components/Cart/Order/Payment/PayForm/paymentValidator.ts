import { IPaymentInitValues } from "./PayForm";

interface IErrors {
    cardNum: string
    validityMonth: string
    code: string
}


export const paymentValidator = (values: IPaymentInitValues) => {
    const errors: IErrors = {
        cardNum: '',
        validityMonth: '',
        code: '',
    }

    if (!values.cardNum) {
        errors.cardNum = 'введите номер карты';
    }
    if ( Number(values.validityMonth) < 1 || Number(values.validityMonth) > 12
        || Number(values.validityYear) < 2023 || Number(values.validityYear) > 2040
        || !isFinite( Number(values.validityMonth))
        || (values.validityYear.length < 4 )
        || !isFinite( Number(values.validityYear)) ) {
        errors.validityMonth = 'введите корректный срок действия';
    }
    if (values.code.length < 3) {
        errors.code = 'Required';
    }

    return errors;
}
