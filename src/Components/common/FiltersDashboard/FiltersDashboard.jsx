import c from './FiltersDashboard.module.scss';
import settings from './../../../assets/icons/settings.png';
import { useState } from 'react';
import { MobileFiltersDashboard } from './MobileDashBoard/MobileFiltersDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../../redux/featuresSlice';
import { FiltersOptions } from './FiltersOptions/FiltersOptions';
import { SelectedFilters } from './SelectedFilters/SelectedFilters';
import { SortBoard } from './SortBoard/SortBoard';


export const FiltersDashboard = () => {
    const dispatch = useDispatch()

    const filters = useSelector(state => state.filters.features)
    const onSelectFilter = (feature, option) => {
        dispatch(selectFilter({ feature, option }))
    }

    const [filterOpened, toggleFilterOpened] = useState(null);
    const onHover = (filterId) => {
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

                <FiltersOptions filters={filters} onSelectFilter={onSelectFilter}
                    filterOpened={filterOpened}
                    onHover={onHover} />

            </div>

            <SortBoard />
            
        </div>

        
        

    </>
}