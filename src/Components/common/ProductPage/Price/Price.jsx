import c from './Price.module.scss';


export const Price = ({ price }) => {
    


    return <div className={c.priceWrapper}>

    <div className={c.price}>
        {price}
    </div>

    <div className={c.priceIncludes}>
        <p>В цену <span>уже</span> включено:</p>
        <ul>
            <li>высококачественная оправа</li>
            <li>базовые рецептупные линзы</li>
            <li>защитное покрытие</li>
            <li>покрытие от ультрафиолета</li>
        </ul>
    </div>
</div>
}

