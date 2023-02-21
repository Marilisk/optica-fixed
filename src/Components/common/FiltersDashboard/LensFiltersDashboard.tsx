import c from './LensFiltersDashboard.module.scss';
import settings from './../../../assets/icons/settings.png';
import { FC, useState } from 'react';
import { MobileFiltersDashboard } from './MobileDashBoard/MobileFiltersDashboard';
import { FiltersOptions } from './FiltersOptions/FiltersOptions';
import { SelectedFilters } from './SelectedFilters/SelectedFilters';
import { SortBoard } from './SortBoard/SortBoard';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectFilter } from '../../../redux/lensFeaturesSlice';
import { LensFiltersOptions } from './LensFiltersOptions/LensFiltersOptions';


export const LensFiltersDashboard:FC = () => {
    const dispatch = useAppDispatch()
    const filters = useAppSelector(state => state.lensfilters.features)
    const onSelectFilter = (feature:number, option:string) => {
        dispatch(selectFilter ({ feature, option }))
    }

    const [filterOpened, toggleFilterOpened] = useState(null);
    const onHover = (filterId:number) => {
        toggleFilterOpened(filterId);
    }

    const [mobileFiltersSwitched, switchMobileFilters] = useState(false);

    return <>
        <div className={c.mobileFiltersSwitcher}>

            <div className={c.mobileHeader} 
                onClick={() => switchMobileFilters(!mobileFiltersSwitched)} >
                    Фильтры
                <img alt='' src={settings} />
            </div>

            <SortBoard />

        </div>

        <div className={c.mobileDashBoard}>
            <MobileFiltersDashboard filters={filters}
                onSelectFilter={onSelectFilter}
                mobileFiltersSwitched={mobileFiltersSwitched} />
        </div>

        <div className={c.menuBar}>

            <div className={c.filters}>

                <SelectedFilters filters={filters} onSelectFilter={onSelectFilter} />

                <LensFiltersOptions filters={filters} onSelectFilter={onSelectFilter}
                    filterOpened={filterOpened}
                    onHover={onHover} />    

            </div>

            <SortBoard />
            
        </div>

        
        

    </>
}