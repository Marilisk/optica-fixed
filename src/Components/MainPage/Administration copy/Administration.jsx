import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import instance from '../../../redux/API/api';
import { fetchProd } from '../../../redux/productsSlice';
import { CreateFieldArray } from './createFieldArray';
import c from './Administration.module.scss';
import { FilesDownloader } from './FilesDownLoader';
import { initValues } from './initvalues';
import { useAddProductMutation } from '../../../redux/API/RTKQueryGoodsApi';

export const Administration = ({ }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const [successmsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        if (params.id) {
            dispatch(fetchProd(params.id));
        }
    }, [params.id]);

    const currentProduct = useSelector(state => state.products.currentProduct);
    const editMode = Boolean(params.id);

    const [images, setImages] = useState(editMode ? currentProduct.item?.imageUrl : { main: '', side: '', perspective: '' });

    // for RTK Query:
    //const [addProduct, {isError}] = useAddProductMutation();

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
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        try {
                            const { data } = editMode ?
                                await instance.patch(`/products/${params.id}`, values)
                                : await instance.post('/products', values);
                            const id = data._id;
                            setSuccessMsg(id);
                            console.log(data);
                            if (data.success === true || (editMode && data._id) ) {
                                alert('успешно!');
                                actions.resetForm({initialValues});
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
                                    <label>наименование
                                        <Field id='name' name='name' />
                                    </label>
                                </div>
                                <div className={c.inputWrapper}>
                                    <label>артикул
                                        <Field id='code' name='code' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>описание
                                        <Field id='description' name='description' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>цена
                                        <Field id='price' name='price' />
                                    </label>
                                </div>

                                <CreateFieldArray name='gender'
                                    array={values.gender}
                                    title={'Гендер'} />

                                <CreateFieldArray name='features'
                                    array={values.features}
                                    title={'Особенности'} />

                               
                                <CreateFieldArray name='options'
                                    array={values.options}
                                    title={'Опции'} />

                                <div className={c.inputWrapper}>
                                    <label>количество просмотров
                                        <Field type='number' name='viewsCount' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>количество покупок
                                        <Field type='number' name='buyCount' />
                                    </label>
                                </div>

                            
                                <CreateFieldArray name='shape'
                                    array={values.shape}
                                    title={'Форма'} />

                                <CreateFieldArray name='color'
                                    array={values.color}
                                    title={'Цвет'} />

                                <div className={c.inputWrapper}>
                                    <label>расстояние между зрачками
                                        <Field name='pupillaryDistance' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>ширина оправы, мм
                                        <Field type='number' name='frameWidth' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>ширина линзы, мм
                                        <Field type='number' name='lensWidth' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>ширина переносицы, мм
                                        <Field type='number' name='bridge' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>длина дужки, мм
                                        <Field type='number' name='templeLength' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>высота линзы, мм
                                        <Field type='number' name='lensHeight' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>вес, грамм
                                        <Field type='number' name='weight' />
                                    </label>
                                </div>

                                <CreateFieldArray name='material'
                                    array={values.material}
                                    title={'Материал'} />

                                <div className={c.inputWrapper}>
                                    <label>минимальные диоптрии
                                        <Field type='text' name='prescriptionMin' />
                                    </label>
                                </div>

                                <div className={c.inputWrapper}>
                                    <label>максимальные диоптрии
                                        <Field type='text' name='prescriptionMax' />
                                    </label>
                                </div>


                                <button className={c.submitBtn} disabled={currentProduct.isLoading === 'isLoading'} type='submit'>ОТПРАВИТЬ</button>
                                <button className={c.resetBtn} disabled={currentProduct.isLoading}
                                    type='button'
                                    onClick={() => actions.resetForm( {initialValues} )} >
                                    ОЧИСТИТЬ
                                </button>


                                {successmsg ?
                                    <NavLink to={`/product/${successmsg}`}>
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