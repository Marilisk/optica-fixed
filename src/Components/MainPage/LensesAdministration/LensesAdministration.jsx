import { Field, Form, Formik } from 'formik';
import c from './LensesAdministration.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import instance from '../../../redux/API/api';
import { initValues } from './../InitValues/lensesInitvalues';
import { FilesDownloader } from '../EyewearAdministration/FilesDownLoader';
import { CreateFieldArray } from '../EyewearAdministration/createFieldArray';

export const LensesAdministration = ({ }) => {
    const navigate = useNavigate()
    const params = useParams();
    const [successmsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        if (params.id) {
            //dispatch(fetchProd(params.id));
        }
    }, [params.id]);

    const currentProduct = useSelector(state => state.lenses.currentProduct);
    const editMode = Boolean(params.id);

    const [images, setImages] = useState(editMode ? currentProduct.item?.imageUrl : { main: '', side: '', perspective: '' });

    if (editMode && !currentProduct.item) {
        return <div><Preloader /></div>
    }

    const initialValues = initValues(editMode, currentProduct, images);

    return <section>
        <div className={c.header}>
            <h2>{editMode ? 'Редактирование товара' : 'Новый товар'}</h2>
        </div>

        <div className={c.adminWrapper}>
            <div className={c.formikWrapper}>
                <Formik initialValues={initialValues}
                    /* enableReinitialize={true} */
                    onSubmit={async (values, actions) => {
                        console.log('presubmit', values)
                        try {
                            values.imageUrl = images
                            console.log('submit', values)
                            const { data } = editMode ?
                                await instance.patch(`/lenses/${params.id}`, values)
                                : await instance.post('/lenses', values);
                            const id = data._id;
                            setSuccessMsg(id);
                            console.log('response ', data);
                            if (data.success === true || (editMode && data._id)) {
                                alert('успешно!');
                                actions.resetForm({initialValues})
                                navigate(`/lenses/${params.id || id}`);
                            }
                        } catch (error) {
                            console.warn(error);
                            alert('ошибка при загрузке товара');
                        }
                    }}
                >

                    {({ values, actions }) => (
                        <Form>
                            <div className={c.form}>
                                <div className={c.inputWrapper}>
                                    <label>категория
                                        <Field id='category' name='category' />
                                    </label>
                                </div>
                                <div className={c.inputWrapper}>
                                    <label>марка (бренд)
                                        <Field id='brand' name='brand' />
                                    </label>
                                </div>
                                <div className={c.inputWrapper}>
                                    <label>производитель
                                        <Field id='manufacturer' name='manufacturer' />
                                    </label>
                                </div>
                                <div className={c.inputWrapper}>
                                    <label>страна производитства
                                        <Field id='manufacturerCountry' name='manufacturerCountry' />
                                    </label>
                                </div>
                                <div className={c.inputWrapper}>
                                    <label>артикул
                                        <Field id='code' name='code' />
                                    </label>
                                </div>

                                <div className={c.descriptionInputWrapper}>
                                    <label>описание
                                        <Field component="textarea" id='description' name='description' />
                                        {/* <textarea id='description' name='description' /> */}
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>цена
                                        <Field id='price' name='price' />
                                    </label>
                                </div>

                                <CreateFieldArray name='prescription'
                                    className={c.prescriptionArr}
                                    array={values.prescription}
                                    title={'Оптическая сила'} />

                                <CreateFieldArray name='BC'
                                    array={values.BC}
                                    title={'BC'} />
                                <CreateFieldArray name='CYL'
                                    array={values.CYL}
                                    title={'CYL'} />

                                <CreateFieldArray name='AX'
                                    array={values.AX}
                                    title={'AX'} />

                                <div className={c.inputWrapper}>
                                    <label>период замены
                                        <Field id='changePeriod' name='changePeriod' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>цветность
                                        <Field name='color' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>UVFilter
                                        <Field name='UVFilter' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>дизайн
                                        <Field id='design' name='design' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>влажность
                                        <Field type='number' name='moisture' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>штук в упаковке
                                        <Field type='number' name='amountInPack' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>кислородопроницаемость
                                        <Field type='number' name='oxygen' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>материал
                                        <Field type='text' name='material' />
                                    </label>
                                </div>

                                <button className={c.submitBtn} 
                                    disabled={currentProduct.isLoading === 'isLoading' || images.main === ''} 
                                    type='submit'>ОТПРАВИТЬ</button>
                                {/* <button className={c.resetBtn} disabled={currentProduct.isLoading}
                                    type='button'
                                    onClick={() => actions.resetForm({ initialValues })} >
                                    ОЧИСТИТЬ
                                </button> */}


                                {successmsg ?
                                    <NavLink to={`/lenses/${successmsg}`}>
                                        <p className={c.successLink}>перейти на страницу товара</p>
                                    </NavLink>
                                    : null}
                            </div>

                        </Form>
                    )}
                </Formik>

            </div>

            <FilesDownloader images={images} setImages={setImages} />

        </div>


    </section>
}