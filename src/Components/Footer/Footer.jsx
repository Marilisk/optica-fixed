import { Link } from 'react-router-dom';
import c from './Footer.module.scss';
import { SearchBar } from './SearchBar/SearchBar';


export const Footer = () => {

    return <div className={c.footerWrapper}>

        <section>

            <div className={c.mediaFlex}>
                <div className={c.column}>
                    <h3>Популярное</h3>

                    <Link to='/budjet/5000'>
                        <div>Оправы до 5 000 рублей</div>
                    </Link>

                    <Link to='/budjet/3000'>
                        <div>Оправы до 3 000 рублей</div>
                    </Link>

                </div>
                <div className={c.column}>
                    <h3>Информация</h3>

                    <Link to={'/myoptis'}>
                        <div>Отследить заказ</div>
                    </Link>

                    <Link to={'/ask'}>
                        <div>Задать вопрос</div>
                    </Link>

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