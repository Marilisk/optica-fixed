import { FC } from "react"
import c from './OfflineShop.module.scss';


export const Map: FC = () => {


    return <div className={c.mapWrap}>
        <iframe title='map'
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aed9a311532ab5a97a33147c85468a045721cc3c6adbaa7dec882c3e1746fcde6&amp;source=constructor"
            /* frameBorder="0" */>
        </iframe>
    </div>
}



