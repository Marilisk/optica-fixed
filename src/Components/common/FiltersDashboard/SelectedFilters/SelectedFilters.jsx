import c from './../FiltersDashboard.module.scss';
import smallCross from './../../../../assets/icons/smallCross.svg';


export const SelectedFilters = ({filters, onSelectFilter}) => {
    

    return <div className={c.selectedfilters}>
        Фильтры:
        {filters.filter(elem => elem.isSelected).map((elem, index) => {
            if (elem.name !== 'gender') {
                return <div key={elem.id}>
                    {elem.label}: {elem.chosenOptions.map((el, ind) => {
                        return <span key={ind}>
                            {el}
                            <img alt='' src={smallCross} onClick={() => onSelectFilter(elem.id, el)} />
                        </span>
                    }
                    )}
                </div>
            } else {
                return null;
            }
        })}
    </div>


}