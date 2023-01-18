import c from './MobileFiltersDashboard.module.scss';
import sortDownIcon from './../../../../assets/icons/sortDown.svg';
import sortUpIcon from './../../../../assets/icons/sortUp.svg';
import smallCross from './../../../../assets/icons/smallCross.svg';
import { useState } from 'react';


export const MobileFiltersDashboard = ({ filters, onSelectFilter, goodsAmount, mobileFiltersSwitched }) => {

    const [filterOpened, toggleFilterOpened] = useState(null);
    const onOpen = (filterId) => {
        if (filterId === filterOpened) {
            toggleFilterOpened(null);
        } else {
            toggleFilterOpened(filterId);
        }
    }



    return <>
                
        <div className={mobileFiltersSwitched ? c.menuBar : c.hiddenMenuBar}
            /* style={mobileFiltersSwitched ? null : {display: 'none'} } */>
            <div className={c.filters}>
                <div className={c.selectedfilters}>
                    {goodsAmount} товаров:
                    {filters.filter(elem => elem.isSelected).map(elem => {
                        return <div key={elem.id}>
                            {elem.label}: {elem.chosenOptions.map((el, ind) => {
                                return <span key={ind}>{el} <img alt='' src={smallCross} onClick={() => onSelectFilter(elem.id, el)} /> </span>
                            }
                            )}
                        </div>
                    })}
                </div>



                <div className={c.filtersOptions}>
                    {filters.map(elem => {
                        return <div key={elem.name}
                            className={filterOpened === elem.id ? c.filterName : c.otherFilterName}
                            onClick={() => onOpen(elem.id)} >

                                <p>{elem.label} <img alt='' src={filterOpened === elem.id ? sortUpIcon : sortDownIcon} /></p>
                                
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
                                                    
                                                <span>{el}</span>
                                            </label>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>

       {/*  <div className={c.sortBoard}>
            <div></div>
            <div></div>
            <div></div>

        </div>


        <div></div> */}
    </>
}