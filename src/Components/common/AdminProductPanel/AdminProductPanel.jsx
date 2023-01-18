import c from './AdminProductPanel.module.scss';
import { fetchDeleteProd } from '../../../redux/productsSlice.js';
import { useNavigate } from 'react-router-dom';


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

        <button onClick={() => navigate(`/manage/${productId}`)}>
            Изменить товар
        </button>
    </div>


}