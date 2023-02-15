import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsManager } from '../../redux/authSlice';
import c from './Footer.module.scss';
import { SearchBar } from './SearchBar/SearchBar';


export const Footer = () => {
    const isManager = useSelector(selectIsManager);

    return <div className={c.footerWrapper}>

        <section>

            <div className={c.mediaFlex}>
                <div className={c.column}>
                    <h3>Популярное</h3>
                    <div>Оправы до 4 900 рублей</div>
                    <div>Аксессуары</div>
                </div>
                <div className={c.column}>
                    <h3>Информация</h3>
                    <div>
                        <Link to={'/myoptis'}>Отследить заказ</Link>
                    </div>
                    <div>Задать вопрос</div>

                    {isManager && <Link to='/manage'>
                        <div className={c.administrationLink}>Добавление товара. Оправы.</div>
                    </Link>}

                    {isManager && <Link to='/managelenses'>
                        <div className={c.administrationLink}>Добавление товара. Линзы.</div>
                    </Link>}
                </div>
            </div>


            <div className={c.thirdColumn}>
                <div>
                    <h3>Магазин оптики Optis, 2022</h3>
                    <div>Санкт-Петербург</div>
                    <div>ул. Заозерная, дом 8, лит. Б</div>
                    <div>
                        <a href='tel:+7(981)939-12-21'>
                            тел. +7 (981) 939 12 21
                        </a>
                    </div>
                    <div>заказать звонок</div>
                </div>
            </div>

            <SearchBar />

        </section>

        <div className={c.bottom}>
            <div>Информация на сайте optis.ru не является публичной офертой. Указанные цены действуют только при оформлении заказа через интернет-магазин optis.ru</div>
            <div>OOO "Профессионал" ИНН 7816460728 КПП 781601001</div>

        </div>
    </div>
}