import c from './../LensFiltersDashboard.module.scss';
import sortDownIcon from './../../../../assets/icons/sortDown.svg';
import sortUpIcon from './../../../../assets/icons/sortUp.svg';
import { FC } from 'react';
import { FeatureType } from '../../../Types/types';

interface ILensFiltersOptionsProps {
    filters: FeatureType[]
    onSelectFilter: (arg1: number, arg2: string) => void
    filterOpened: number
    onHover: (arg: number | null) => void
}

export const LensFiltersOptions: FC<ILensFiltersOptionsProps> =
    ({ filters, onSelectFilter, filterOpened, onHover }: ILensFiltersOptionsProps) => {


        return <div className={c.filtersOptions}>
            {filters.map((elem) => {
                
                return <div key={elem.name}
                    className={filterOpened === elem.id ? c.filterName : c.otherFilterName}
                    onMouseOver={() => onHover(elem.id)} onMouseLeave={() => onHover(null)}
                    onClick={() => onHover(elem.id)} >

                    {elem.label} <img alt='' src={filterOpened === elem.id ? sortUpIcon : sortDownIcon} />

                    <div key={elem.name + 'd'}>
                        <div key={elem.name + 'e'}
                            className={filterOpened === elem.id ? c.accordeon : c.hiddenAccordeon} >

                            {elem.options?.map((el, i) => {
                                return <div key={i} className={c.filterCheckBoxWrapper}>

                                    <div className={c.filterCheckBoxLabel}
                                        onClick={() => onSelectFilter(elem.id, el)}>
                                        {el}
                                    </div>

                                </div>
                            })}
                        </div>
                    </div>
                </div>
                
            })}
        </div>



    }