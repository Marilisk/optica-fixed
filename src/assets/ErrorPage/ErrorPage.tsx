import c from './ErrorPage.module.scss';



export const ErrorPage = () => {

    return <div className={c.wrapper}>
        <h1>Простите, у нас что-то сломалось.</h1>
        Попробуйте обновить страницу, вернуться назад,  или обратитесь к администратору.
    </div>
}