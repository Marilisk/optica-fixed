import c from './../BestSellers.module.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import defaultImg from '../../../../assets/common/defaultGlasses.webp';


export const useBestSellers = () => {
    const products = useSelector(s => s.products.products.items.filter(item => item.buyCount > 0));

    const [portion, setPortion] = useState(1);
    const [mobilePortion, setMobPortion] = useState(1);
    //console.log('portion ' + portion)
    const itemsAmount = 3;   // здесь изменять количество одновременно выводимых бестселлеров
    const [decrement, setDecrement] = useState(0);
    const showPrev = () => {
        if (portion > 1 && decrement > 0) {
            setPortion(portion - 1)
            setDecrement(decrement - itemsAmount)
            setMobPortion(mobilePortion - 1)
        }
    }
    const showNext = () => {
        if (portion > Math.floor(products.length / itemsAmount)) {
            setPortion(1)
        } else {
            setPortion(portion + 1)
            setDecrement(decrement + itemsAmount)
            setMobPortion(mobilePortion + 1)
        }
    }

    const bestsellersItems = products.map((item, ind) => {
        const price = item.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });

        return <NavLink to={`/product/${item._id}`} key={ind} >
            <div className={c.item}
                style={(ind + 1) <= (itemsAmount * portion - itemsAmount) || (ind + 1) > portion * itemsAmount ?
                    { left: '200vw' }
                    : { left: (34.9 * (ind - decrement)) + '%' }} >

                <img alt='' src={`http://localhost:4444${item.imageUrl?.main}`} />
                <p className={c.price}>
                    {price}
                </p>

            </div>
        </NavLink>
    })

    const mobileBestsellersItems = products.filter(item => item.buyCount > 0)
        .map((item, ind) => {
            const price = item.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });

            return <NavLink to={`/product/${item._id}`} key={ind + 'm'} >
                <div className={c.item}
                    style={(ind + 1) === mobilePortion ?
                        { left: 0 + 'vw' }
                        : { display: 'none' }} >

                    <img alt='' src={`http://localhost:4444${item.imageUrl?.main}`} />
                    <p className={c.price}>
                        {price}
                    </p>

                </div>
            </NavLink>
        })

    const nextDisabled = portion * itemsAmount >= products.length;
    const prevDisabled = portion === 1;

    return {
        products,
        bestsellersItems,
        mobileBestsellersItems,
        showNext,
        showPrev,
        nextDisabled,
        prevDisabled
    }

}