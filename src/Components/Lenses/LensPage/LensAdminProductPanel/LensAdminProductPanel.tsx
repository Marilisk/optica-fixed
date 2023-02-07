import c from './LensAdminProductPanel.module.scss';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { fetchDeleteLens } from '../../../../redux/lensesSlice';
import { useAppDispatch } from '../../../../redux/hooks';

interface ILensAdminProductPanel {
    productId: string
}

export const LensAdminProductPanel: FC<ILensAdminProductPanel> = ({ productId }: ILensAdminProductPanel) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const deleteLens = () => {
        dispatch(fetchDeleteLens(productId))
        alert('товар успешно удалён');
        navigate(-1);
    }

    return <div className={c.editBlock}>
        <button onClick={() => deleteLens()}>
            Удалить линзы
        </button>

        <button onClick={() => navigate(`/managelenses/${productId}`)}>
            Изменить линзы
        </button>
    </div>


}