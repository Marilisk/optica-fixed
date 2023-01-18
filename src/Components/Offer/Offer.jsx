import { useSelector } from 'react-redux';
import c from './Offer.module.scss';
import { offerImgLib } from '../../assets/offer/offerImgLib';


export const  Offer = () => {

    const categories = useSelector(state => state.categories.categories);
    
    const allCategories = categories.map((cat, i) => {
        return <div key={i}>
            <img src={offerImgLib[`${cat.fields.photo}`] } alt='' />
            <p>{cat.fields.name}</p>
        </div>
    });


    return <div className={c.mainWrapper}>
        <h2>
            Очки для Всех
        </h2>
        <p>
            Рецептурные очки с линзами уже от 1 999 руб.
        </p>
        <div className={c.carousel}>
            {allCategories}
        </div>
       
    </div>
}