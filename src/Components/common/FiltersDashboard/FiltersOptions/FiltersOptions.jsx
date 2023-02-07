import c from './../FiltersDashboard.module.scss';
import sortDownIcon from './../../../../assets/icons/sortDown.svg';
import sortUpIcon from './../../../../assets/icons/sortUp.svg';


export const FiltersOptions = ({filters, onSelectFilter, filterOpened, onHover}) => {


    return <div className={c.filtersOptions}>
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
            } else {
                return null;
            }
        })}
    </div>



}