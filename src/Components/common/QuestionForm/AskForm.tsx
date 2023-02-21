import c from './QuestionForm.module.scss';
import { Form } from 'react-router-dom';
import { FC } from 'react';
import { Field, Formik } from 'formik';

interface IAskForm {
    navigate: (arg: number) => void
}

export const AskForm: FC<IAskForm> = ({ navigate }: IAskForm) => {



    return <Formik
        initialValues={
            { name: '', email: '', phone: '', text: '' }
        }
        onSubmit={(values, actions) => {
            console.log(values)
            navigate(-1)
        }

        }>

        {(props) => (
            <Form>

                <label>
                    <span>имя</span>
                    <Field name='name' />
                </label>

                <label>
                    <span>электронная почта</span>
                    <Field name='email' />
                </label>

                <label>
                    <span>номер телефона</span>
                    <Field name='phone' />
                </label>

                <label>
                    <span>текст обращения</span>
                    <Field name='text' />
                </label>

                <button type='submit' className={c.btn} onClick={props.submitForm}>
                    отправить
                </button>

            </Form>
        )}
    </Formik>

}



