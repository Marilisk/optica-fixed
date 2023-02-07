import { FC } from 'react';
import c from './LensChoice.module.scss';

interface ILensChoice {
    nums: Array<number>
    setLens: (arg: number) => void
}

export const LensChoice:FC<ILensChoice> = ({ nums, setLens }:ILensChoice) => {
    
    const elements = nums.map((el, i) => {

        return <div key={i} className={c.cellWrap} 
                            onClick={() => setLens(el)}>
            <div className={c.cell}>
                {el}
            </div>
        </div>

    })

    return <div className={c.numsWrapper}>

        <h3>Оптическая сила в наличии:</h3>

    <div className={c.grid}>
        {elements}
    </div>

    
</div>
}

