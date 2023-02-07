import c from './OfflineShop.module.scss';
import React from 'react';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { Map } from './Map';
import img1 from './../../assets/offlineShop/way1.png'
import img2 from './../../assets/offlineShop/way2.png'
import img3 from './../../assets/offlineShop/way3.png'


export const OfflineShop = () => {


    return <>
        <BreadCrumbs text={'Наш шоурум'} />

        <section className={c.mainSection}>
            <h1>Санкт-Петербург, ул. Заозерная, дом 8, лит. Б, офис 24-А</h1>

        </section>

        <div className={c.flex}>

            <div className={c.textBlock}>
                <h2>График работы</h2>
                <div>
                    ежедневно с 10 до 21 часа
                </div>

                <div>
                    <a href='tel:+7(981)939-12-21'>
                        тел. +7 (981) 939 12 21
                    </a>
                </div>

            </div>
            <Map />
        </div>

        <div className={c.imgBlock}>

            <div>
                <div className={c.text}>Въезд в арку:</div>
                <img src={img3} alt='' />
            </div>

            <div>
                <div className={c.text}>Проезд под шлагбаум:</div>
                <img src={img1} alt='' />
            </div>

            <div>
                <div className={c.text}>Бесплатная парковка:</div>
                <img src={img2} alt='' />
            </div>

        </div>
    </>
}
