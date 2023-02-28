import c from './AdminProductPanel.module.scss';
import { fetchDeleteProd } from '../../../redux/productsSlice';
import { useNavigate } from 'react-router-dom';
import { ADMIN_URL } from '../../../redux/API/api';

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

        <button>
            <a href={`${ADMIN_URL}/manage/${productId}`}>
                Изменить товар
            </a>
        </button>
    </div>

}