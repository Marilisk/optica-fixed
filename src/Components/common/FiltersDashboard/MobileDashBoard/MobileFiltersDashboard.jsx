import c from './MobileFiltersDashboard.module.scss';
import sortDownIcon from './../../../../assets/icons/sortDown.svg';
import sortUpIcon from './../../../../assets/icons/sortUp.svg';
import smallCross from './../../../../assets/icons/smallCross.svg';
import { useState } from 'react';


export const MobileFiltersDashboard = ({ filters, onSelectFilter, mobileFiltersSwitched }) => {

    const [filterOpened, toggleFilterOpened] = useState(null);
    const onOpen = (filterId) => {
        if (filterId === filterOpened) {
            toggleFilterOpened(null);
        } else {
            toggleFilterOpened(filterId);
        }
    }

    return <>
                
        <div className={mobileFiltersSwitched ? c.menuBar : c.hiddenMenuBar}>

            <div className={c.filters}>
                <div className={c.selectedfilters}>
                    
                    {filters.filter((elem) => elem.isSelected).map((elem, i) => {
                        return <div key={i}>
                            {elem.label}: {elem.chosenOptions.map((el, ind) => {
                                return <span key={ind}>{el} <img alt='' src={smallCross} 
                                            onClick={() => onSelectFilter(elem.id, el)} /> </span>
                            }
                            )}
                        </div>
                    })}
                </div>

                <div className={c.filtersOptions}>
                    {filters.map((elem, i) => {
                        if (elem.name === 'gender') {
                            return null
                        } else {
                            return <div key={i}
                            className={filterOpened === elem.id ? c.filterName : c.otherFilterName}
                            onClick={() => onOpen(elem.id)} >

                                <p>{elem.label} <img alt='' src={filterOpened === elem.id ? sortUpIcon : sortDownIcon} /></p>
                                
                            <div key={elem.name + 'd'}>
                                <div key={elem.name + 'e'}
                                    className={filterOpened === elem.id ? c.accordeon : c.hiddenAccordeon} >

                                    {elem.options?.map((el, i) => {
                                        return <div key={i} className={c.filterCheckBoxWrapper}>
                                            <div className={c.filterCheckBoxLabel}
                                                    onClick={() => onSelectFilter(elem.id, el)}>                                                  
                                                    
                                                <span>{el}</span>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        }
                        
                    })}
                </div>
            </div>
        </div>

       
    </>
}