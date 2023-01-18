import c from './CustomCheckbox.module.scss';


export const CustomCheckbox = ({ field }) => {
    
    return <div className={field.checked ? c.checked : c.checkWrap}>

        <input {...field} 
            id='rememberMe'
            type='checkbox' />
    </div>
}