import { Field, Form, Formik } from 'formik';
import c from './LensesAdministration.module.scss';
import { FC, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import instance from '../../../redux/API/api';
import { initValues } from '../InitValues/lensesInitvalues';
import { FilesDownloader } from '../EyewearAdministration/FilesDownLoader';
import { fetchLens } from '../../../redux/lensesSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { CreateLenFieldArray } from './createLenFieldArray';
import { IImageUrl, LoadingStatusEnum } from '../../Types/types';

export const LensesAdministration:FC = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [successmsg, setSuccessMsg] = useState(null);
    const dispatch = useAppDispatch()
    const [images, setImages] = useState<IImageUrl>();


    useEffect(() => {
        if (params.id) {
            const fetch = async () => {
                const response = await dispatch(fetchLens(params.id));
                console.log(response)
                if (response.payload.imageUrl) {
                    setImages(response.payload.imageUrl)
                }
            }
            fetch()
        } else {
            
            setImages({main: '', side: '', perspective: ''})
        }
    }, [params.id, dispatch]);

    const currentProduct = useAppSelector(state => state.lenses.currentProduct);
    const editMode = Boolean(params.id);

    
    if (currentProduct.status === LoadingStatusEnum.loading || !images) {
        return <div><Preloader minFormat={true} /></div>
    }

    const initialValues = initValues(editMode, currentProduct, images);

    return <section>
        <div className={c.header}>
            <h2>{editMode ? 'Редактирование товара' : 'Новый товар'}</h2>
        </div>

        <div className={c.adminWrapper}>
            <div className={c.formikWrapper}>
                <Formik initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        //console.log('presubmit', values)
                        try {
                            //props.values.imageUrl = images
                            console.log('submit', values)
                            const { data } = editMode ?
                                await instance.patch(`/lenses/${params.id}`, values)
                                : await instance.post('/lenses', values);
                            const id = data._id;
                            setSuccessMsg(id);
                            console.log('response ', data);
                            if (data.success === true || (editMode && data._id)) {
                                alert('успешно!');
                                navigate(`/lenses/${params.id || id}`);
                            }
                        } catch (error) {
                            console.warn(error);
                            alert('ошибка при загрузке товара');
                        }
                    }}
                >

                    {/* {({ values }) => ( */}
                    {props => (
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

                                <div className={c.prescriptionArr}>
                                    <CreateLenFieldArray name='prescription'
                                        array={props.values.prescription}
                                        title={'Оптическая сила'} />
                                </div>


                                <CreateLenFieldArray name='BC'
                                    array={props.values.BC}
                                    title={'BC'} />
                                <CreateLenFieldArray name='CYL'
                                    array={props.values.CYL}
                                    title={'CYL'} />

                                <CreateLenFieldArray name='AX'
                                    array={props.values.AX}
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
                                    disabled={currentProduct.status === LoadingStatusEnum.loading 
                                        || images.main === ''}
                                    type='submit'>ОТПРАВИТЬ</button>

                                <button className={c.resetBtn} 
                                    disabled={currentProduct.status === LoadingStatusEnum.loading 
                                        || images.main === ''}
                                    type='button'
                                    onClick={() => props.resetForm()} >
                                    ОЧИСТИТЬ
                                </button>


                                {successmsg ?
                                    <NavLink to={`/lenses/${successmsg}`}>
                                        <p className={c.successLink}>перейти на страницу товара</p>
                                    </NavLink>
                                    : null}
                            </div>


                            <FilesDownloader images={images} setImages={setImages} setFieldValue={props.setFieldValue} />
                        </Form>
                    )}
                </Formik>

            </div>

            

        </div>


    </section>
}