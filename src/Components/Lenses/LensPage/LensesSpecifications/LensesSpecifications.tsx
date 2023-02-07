import { FC } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { AdminProductPanel } from '../../../common/AdminProductPanel/AdminProductPanel';
import { ILensProduct } from '../../../Types/types';
import { LensAdminProductPanel } from '../LensAdminProductPanel/LensAdminProductPanel';
import c from './LensesSpecifications.module.scss';

interface ILensesSpecifications {
    product: ILensProduct
    IsManager: boolean
}

export const LensesSpecifications: FC<ILensesSpecifications> = ({ product, IsManager }: ILensesSpecifications) => {


    return <div className={c.section}>

        <div className={c.part}>

            <h3>Подробности</h3>

            <div className={c.columnWrap}>

                <div>
                    <div className={c.line}>
                        <span>Производитель:</span> {product.manufacturer}
                    </div>
                    <div className={c.line}>
                        <span>Срок ношения:</span> {product.changePeriod}
                    </div>
                    <div className={c.line}>
                        <span>Штук в упаковке:</span> {product.amountInPack}
                    </div>
                </div>
                <div>
                    <div className={c.line}>
                        <span>Дизайн:</span> {product.design}
                    </div>

                    <div className={c.line}>
                        <span>Материал:</span> {product.material}
                    </div>

                    <div className={c.line}>
                        <span>Цвет:</span> {product.color}
                    </div>
                </div>

                <div>
                    <div className={c.line}>
                        <span>УФ-защита:</span> {product.UVFilter ? 'есть' : 'нет'}
                    </div>
                    <div className={c.line}>
                        <span>Влагосодержание</span> {product.moisture} мм
                    </div>
                    <div className={c.line}>
                        <span>Пропуск кислорода:</span> {product.oxygen} мм
                    </div>
                </div>

            </div>
        </div>


        {IsManager && <LensAdminProductPanel productId={product._id} />}

    </div>
}
