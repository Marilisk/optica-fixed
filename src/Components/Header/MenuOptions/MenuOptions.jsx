import c from './MenuOptions.module.scss';
import { NavLink } from 'react-router-dom';
import { clearAllFilters, selectFilter } from '../../../redux/featuresSlice';


export const MenuOptions = ({ links, dispatch }) => {

    const linksList = links.map((link, index) => {
        return <div key={index} className={c.linkList}>
            <ul>
                <NavLink to={link.to}>
                    <li onClick={() => {
                        if (link.featureFilter) {
                            dispatch(selectFilter({ feature: 7, option: link.featureFilter }))
                        } else {
                            dispatch(clearAllFilters())
                        }

                    }} >
                        {link.label}
                    </li>
                </NavLink>
            </ul>
        </div>

    })

    return <>{linksList}</>

}