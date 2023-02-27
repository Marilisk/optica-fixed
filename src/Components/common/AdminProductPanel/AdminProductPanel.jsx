import c from './AdminProductPanel.module.scss';
import { fetchDeleteProd } from '../../../redux/productsSlice';
import { useNavigate } from 'react-router-dom';

export const ADMIN_URL = 'http://localhost:3000'

export const AdminProductPanel = ({ productId, dispatch }) => {
    const navigate = useNavigate();

    const deleteProd = () => {
        try {
            dispatch(fetchDeleteProd(productId));
            alert('товар успешно удалён');
            navigate(-1);
        } catch (error) {
            alert('ошибка при удалении товара');
        }
    }

    return <div className={c.editBlock}>
        <button onClick={() => deleteProd()}>
            Удалить товар
        </button>

        <button onClick={() => navigate(`${ADMIN_URL}/manage/${productId}`)}>
            Изменить товар
        </button>
    </div>

}