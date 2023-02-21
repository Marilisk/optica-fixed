import c from './QuestionForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { AskForm } from './AskForm';

export const QuestionForm: FC = () => {

    const navigate = useNavigate()

    return <>
        <div className={c.wrapper}>
            <div>
                <div className={c.header}>
                    <h2>Задайте нам свой вопрос</h2>
                    <div onClick={() => navigate(-1)}>
                        закрыть
                    </div>
                </div>

                <p>
                    оставьте предпочтительный способ связи и мы свяжемся с Вами в течение следующего рабочего дня
                </p>

                <div className={c.formWrapper}>
                    <AskForm navigate={navigate} />
                </div>

            </div>
        </div>

    </>

}


