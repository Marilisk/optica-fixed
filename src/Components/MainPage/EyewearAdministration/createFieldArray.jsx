import { FieldArray, Field } from 'formik';
import c from './Administration.module.scss';


export const CreateFieldArray = ({ name, array, title}) => {

    return <div className={c.arrayWrapper}>
        <FieldArray name={name}>

            {({ insert, remove, push }) => (
                <div>{title}:
                    {array.length > 0 &&
                        array.map((elem, index) => (
                            <div key={index}>
                                <label className={c.arrayLabel}>{/* {index + 1}. */}
                                    <Field name={`${name}.${index}`} type="text" />
                                </label>
                                <button type="button" className={c.btn} onClick={() => remove(index)}>
                                    удалить
                                </button>
                            </div>
                        ))}
                    <button className={c.btn} type="button" onClick={() => push('')}>добавить поле</button>
                </div>
            )}

        </FieldArray>


    </div>

}