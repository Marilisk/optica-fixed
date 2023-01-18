
import c from './Children.module.scss';
import mainImg from './../../assets/women/main/mainImg.jpg';



export const Children = () => {

    return <>
        <section className={c.mainSection}>
            <div className={c.mainDescription}>
                <div className={c.mainDescriptionWrap}>
                <h2>
                    Мужские очки
                </h2>
                <p>
                    От классических овальных до экстравагантных кошачьих глаз - что бы Вы не искали, у нас найдётся идеальная женская оправа. Наши модели для девушек включают цвета, модели и формы, которые Вам понравятся. А ещё затемнение линз для особого шарма!
                </p>
                </div>
            </div>
            <div className={c.mainImgBlock}>
                <img alt='' src={mainImg} className={c.mainImg} />
            </div>

        </section>
    </>
}