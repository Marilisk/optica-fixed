import c from './OfflineShop.module.scss';
import React from 'react';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';


export const OfflineShop = () => {

    function sostavChisla(massivChisel, chislo) {
        let sortedArr = massivChisel.sort((a, b) => (a - b));
        let results = [];
        let piece = [];

        for(let i = 0; i < sortedArr.length; i++) {
            piece.push(sortedArr[i]);
        
            let sum = piece.reduce((a, b) => a + b);
            
            if (sum === chislo) {
              results.push([...piece]);
            }
        
            if (sum > chislo) {
              piece.pop();
              i = sortedArr.indexOf(piece[piece.length - 1]);
              piece.pop();
            }
          }
        

        return results;
    }

    const result = sostavChisla([7, 8, 3, 4, 5, 6, 1, 2], 8);
    console.log('RESULT', result);




    return <>
        <BreadCrumbs text={'Наш магазин'} />

        <section className={c.mainSection}>
            <h1>Мы находимся</h1>
            <div>
                <h2></h2>
                <div>
                    {result.map((arr, i) => {
                        return <div key={i} className={c.block}>
                            {arr.map(el => <div>{el}</div>)}
                        </div>
                    })}
                </div>

                <button >
                    press!
                </button>
            </div>
        </section>
    </>
}
