import c from './BreadCrumbs.module.scss';
import homeIcon from './../../../assets/icons/home.svg';
import angle from './../../../assets/icons/angle-right.svg';
import { NavLink } from 'react-router-dom';



export const BreadCrumbs = ({ text }) => {

    return <>
    <div className={c.wrapper}>
        <div className={c.breadCrumb}>
            <NavLink to='/' className={c.iconWrapper}>
                    <img alt='' src={homeIcon} className={c.icon} />
            </NavLink>
            <div className={c.angleIconWrapper}>
                <img alt='' src={angle} className={c.angleIcon} />
            </div>
            <p>{text}</p>

        </div>
        </div>

    </>
}