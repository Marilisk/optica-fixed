import c from './BestSellers.module.scss';
import { AngleIcon } from '../../../assets/icons/AngleIcon';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { useBestSellers } from './hook/useBestSellers';


export const BestSellers = () => {

    const { products,
        bestsellersItems,
        mobileBestsellersItems,
        showPrev,
        showNext,
        nextDisabled,
        prevDisabled } = useBestSellers();


    if (!products.length) { return <Preloader minFormat={true} /> }

    return <section className={c.mainWrapper}>
        <h2>Бестселлеры</h2>
        <div className={c.underH2}>
            полюбившиеся нашим покупателям модели в разных категориях
        </div>

        <div className={c.galleryWrapper}>

            <div className={c.mobileAngleWrap}>
                <AngleIcon color={'#95009C'} size={40}
                    margin={'10vw auto auto 20px'}
                    transform={'rotate(180deg)'}
                    showAnother={showPrev} />
            </div>
            <div className={c.angleWrap}>
                <AngleIcon color={'#95009C'} size={40}
                    margin={'6vw auto auto 20px'}
                    transform={'rotate(180deg)'}
                    showAnother={showPrev}
                    disabled={prevDisabled} />
            </div>

            <div className={c.itemsWrap}>
                {bestsellersItems}
            </div>
            <div className={c.mobileItemsWrap}>
                {mobileBestsellersItems}
            </div>

            <div className={c.angleWrap}>
                <AngleIcon color={'#95009C'} size={40}
                    margin={'6vw 20px auto auto'}
                    showAnother={showNext}
                    disabled={nextDisabled} />
            </div>
            <div className={c.mobileAngleWrap}>
                <AngleIcon color={'#95009C'} size={40}
                    margin={'10vw 20px auto auto'}
                    showAnother={showNext} />
            </div>



        </div>
    </section>
}