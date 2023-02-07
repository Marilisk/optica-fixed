import { FC, useState } from 'react';
import { AngleIcon } from '../../../../assets/icons/AngleIcon';
import { setSortTag } from '../../../../redux/featuresSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import c from './SortBoard.module.scss';


export const SortBoard: FC = () => {
    const dispatch = useAppDispatch()
    const sortTags = useAppSelector(s => s.filters.sortTags.tags)
    const chosenTag =  useAppSelector(s => s.filters.sortTags.chosenTag);

    const currentTag = sortTags.find(el => el.id === chosenTag)

    const [isSelectorOpened, setIsSelectorOpened] = useState(false)

    const options = sortTags.map((tag, i) => {

        return <div key={i} className={chosenTag === tag.id ? c.chosenAccLine : c.accordeonLine}
                    onClick={() => dispatch(setSortTag (tag.id))} >

            {tag.label}
        </div>
    })

    return <div className={c.sortBoard} 
            onMouseEnter={() => setIsSelectorOpened(true)}
            onMouseLeave={() => setIsSelectorOpened(false)} >

        <div className={c.header}>
            Сортировка:
        </div>

        <div className={c.chosenOption} >
            {currentTag.label} 
            <div className={c.iconWrapper}>
                <AngleIcon color={'#666666'}
                            size={'10px'}
                            margin={'0'}
                            transform={'rotate(90deg)'}
                            showAnother={() => false}
                            disabled={false} />
            </div>  

        </div>

        <div style={isSelectorOpened ? {display: 'block'} : {display: 'none', pointerEvents: 'none'}}
            className={c.accordeon}>
            {options}
        </div>

    </div>
}