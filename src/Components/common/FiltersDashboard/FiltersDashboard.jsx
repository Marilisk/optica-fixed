import c from './FiltersDashboard.module.scss';
import sortDownIcon from './../../../assets/icons/sortDown.svg';
import sortUpIcon from './../../../assets/icons/sortUp.svg';
import smallCross from './../../../assets/icons/smallCross.svg';

import { useState } from 'react';
import { MobileFiltersDashboard } from './MobileDashBoard/MobileFiltersDashboard';


export const FiltersDashboard = ({ filters, onSelectFilter, goodsAmount }) => {

    const [filterOpened, toggleFilterOpened] = useState(null);
    const onHover = (filterId) => {
        toggleFilterOpened(filterId);
    }

    const [mobileFiltersSwitched, switchMobileFilters] = useState(false);

    return <>
        <div className={c.mobileFiltersSwitcher} onClick={() => switchMobileFilters(!mobileFiltersSwitched)}>
            Фильтры
            <img alt='' src={mobileFiltersSwitched ? sortUpIcon : sortDownIcon} />
        </div>

        <div className={c.mobileDashBoard}>
            <MobileFiltersDashboard filters={filters}
                onSelectFilter={onSelectFilter}
                goodsAmount={goodsAmount}
                mobileFiltersSwitched={mobileFiltersSwitched} />
        </div>

        <div className={c.menuBar}>

            <div className={c.filters}>
                <div className={c.selectedfilters}>
                    {goodsAmount} товаров:
                    {filters.filter(elem => elem.isSelected).map((elem, index) => {
                        if (elem.name !== 'gender') {
                            return <div key={elem.id}>
                                {elem.label}: {elem.chosenOptions.map((el, ind) => {
                                    return <span key={ind}>{el} <img alt='' src={smallCross} onClick={() => onSelectFilter(elem.id, el)} /> </span>
                                }
                                )}
                            </div>
                        } else {
                            return null;
                        }
                    })}
                </div>

                <div className={c.filtersOptions}>
                    {filters.map((elem, index) => {
                        if (index > 0) {
                            return <div key={elem.name}
                                className={filterOpened === elem.id ? c.filterName : c.otherFilterName}
                                onMouseOver={() => onHover(elem.id)} onMouseLeave={() => onHover(null)}
                                onClick={() => onHover(elem.id)} >

                                {elem.label} <img alt='' src={filterOpened === elem.id ? sortUpIcon : sortDownIcon} />

                                <div key={elem.name + 'd'}>
                                    <div key={elem.name + 'e'}
                                        className={filterOpened === elem.id ? c.accordeon : c.hiddenAccordeon} >

                                        {elem.options?.map(el => {
                                            return <div key={el + 'c'} className={c.filterCheckBoxWrapper}>
                                                <label className={c.filterCheckBoxLabel}>
                                                    <input type={'checkbox'}
                                                        name={'checkbox'}
                                                        checked={elem.chosenOptions.find(it => it === el)}
                                                        onChange={() => onSelectFilter(elem.id, el)} />
                                                    {el}
                                                </label>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div>

        <div className={c.sortBoard}>
            <div></div>
            <div></div>
            <div></div>

        </div>

    </>
}