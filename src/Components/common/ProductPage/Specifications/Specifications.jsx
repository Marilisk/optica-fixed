import { AdminProductPanel } from '../../AdminProductPanel/AdminProductPanel';
import c from './Specifications.module.scss';


export const Specifications = ({ product, dispatch, IsManager }) => {
    console.log(product);

    return <div className={c.section}>
        
        <div className={c.part}>
            <h3>Подробности</h3>

            <div className={c.columnWrap}>

                <div>
                    <div className={c.line}>
                        <span>Расстояние между зрачками:</span> {product.pupillaryDistance}
                    </div>
                    <div className={c.line}>
                        <span>Диапазон линз:</span> {product.prescriptionMin} ~ + {product.prescriptionMax}
                    </div>
                    <div className={c.line}>
                        <span>Размер оправы:</span> {product.size}
                    </div>
                </div>
                <div>
                    <div className={c.line}>
                        <span>Форма:</span> {product.shape}
                    </div>
                    <div className={c.line}>
                        <span>Материал:</span> {product.material}
                    </div>
                    <div className={c.line}>
                        <span>Цвет:</span> {product.color}
                    </div>
                </div>

            </div>
        </div>

        <div className={c.part}>
            <h3>Размеры</h3>

            <div className={c.columnWrap}>
                <div>
                    <div className={c.line}>
                        <span>Длина дужки:</span> {product.templeLength} мм
                    </div>
                    <div className={c.line}>
                        <span>Ширина оправы:</span> {product.frameWidth} мм
                    </div>
                    <div className={c.line}>
                        <span>Высота линз:</span> {product.lensHeight} мм
                    </div>
                </div>
                <div>
                    <div className={c.line}>
                        <span>Ширина линз:</span> {product.lensWidth} мм
                    </div>
                    <div className={c.line}>
                        <span>Ширина переносицы:</span> {product.bridge} мм
                    </div>
                    <div className={c.line}>
                        <span>Вес оправы:</span> {product.weight} грамм
                    </div>
                </div>

            </div>
        </div>

        {IsManager && <AdminProductPanel productId={product._id}
            dispatch={dispatch} />}
           
    </div>
}
