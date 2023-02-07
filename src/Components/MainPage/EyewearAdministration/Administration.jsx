import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import instance from '../../../redux/API/api';
import { fetchProd } from '../../../redux/productsSlice';
import { CreateFieldArray } from './createFieldArray';
import c from './Administration.module.scss';
import { FilesDownloader } from './FilesDownLoader';
import { initValues } from './../InitValues/EyewearInitvalues';


export const Administration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [successmsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        if (params.id) {
            dispatch(fetchProd(params.id));
        }
    }, [params.id, dispatch]);

    const currentProduct = useSelector(state => state.products.currentProduct);
    //console.log('currentProduct ', currentProduct);
    const editMode = Boolean(params.id);

    const [images, setImages] = useState(editMode ? (currentProduct.item?.imageUrl || {}) : { main: '', side: '', perspective: '' });

    if (editMode && currentProduct.status === 'loading') {
        return <div><Preloader /></div>
    }

    const initialValues = initValues(editMode, currentProduct, images);

    return <section>
        <div className={c.header}>
            <h2>{editMode ? 'Редактирование товара' : 'Новый товар'}</h2>
        </div>

        <div className={c.adminWrapper}>

            <FilesDownloader images={images} setImages={setImages} /* editMode={editMode} currentProduct={currentProduct} */ />

            <div className={c.formikWrapper}>
                <Formik initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        values.gender = [values.gender]
                        try {
                            values.imageUrl = images
                            const { data } = editMode ?
                                await instance.patch(`/products/${params.id}`, values)
                                : await instance.post('/products', values);
                            const id = data._id;
                            setSuccessMsg(id);
                            if (data.success === true || (editMode && data._id)) {
                                alert('данные успешно внесены');
                                actions.resetForm({ initialValues });
                                navigate(`/product/${params.id || id}`);
                            }
                        } catch (error) {
                            console.warn(error);
                            alert('ошибка при загрузке товара');
                        }
                    }}
                >

                    {({ values, actions }) => (
                        <Form>
                            <div>

                                <div className={c.inputGroup}>

                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>категория</span>
                                            <Field id='category' name='category' />
                                        </label>
                                    </div>
                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>наименование</span>
                                            <Field id='name' name='name' />
                                        </label>
                                    </div>
                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>артикул</span>
                                            <Field id='code' name='code' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>описание</span>
                                            <Field id='description' name='description' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>цена</span>
                                            <Field id='price' name='price' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>количество просмотров</span>
                                            <Field type='number' name='viewsCount' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>количество покупок</span>
                                            <Field type='number' name='buyCount' />
                                        </label>
                                    </div>

                                </div>

                                <div className={c.inputWrapper}>

                                    <div className={c.genderEdit}>
                                        <label >
                                            <div className={values.gender === "Мужские" ? c.chosenJaw : c.jaw}>
                                                Мужские
                                            </div>
                                            <Field type={'radio'} name="gender" value={"Мужские"} />
                                        </label>
                                        <label >
                                            <div className={values.gender === "Женскиe" ? c.chosenJaw : c.jaw}>
                                                Женскиe
                                            </div>
                                            <Field type={'radio'} name="gender" value={"Женскиe"} />
                                        </label>

                                    </div>
                                </div>

                                <CreateFieldArray name='features'
                                    array={values.features}
                                    title={'Особенности'} />

                                <CreateFieldArray name='options'
                                    array={values.options}
                                    title={'Опции'} />



                                <CreateFieldArray name='shape'
                                    array={values.shape}
                                    title={'Форма'} />

                                <CreateFieldArray name='color'
                                    array={values.color}
                                    title={'Цвет'} />

                                <div className={c.inputGroup}>

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
                                </div>

                                <CreateFieldArray name='material'
                                    array={values.material}
                                    title={'Материал'} />




                                <button className={c.submitBtn} disabled={currentProduct.isLoading === 'isLoading'} type='submit'>ОТПРАВИТЬ</button>
                                <button className={c.resetBtn} disabled={currentProduct.isLoading}
                                    type='button'
                                    onClick={() => actions.resetForm( /* {initialValues} */)} >
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


        </div>


    </section>
}