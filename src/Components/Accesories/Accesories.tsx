import c from './Accesories.module.scss';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { FC, useEffect, useRef, useState } from 'react';
import { Component } from './Component';
import { Test } from '../GoodsGrid/FaceShapeChoose/Test';


function transform(func) {
    
    return function changed(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args)
        } else {
            return function(...argsA) {
                return changed.apply(this, args.concat(argsA))
            }
        }
    }

}

function calc(x, y, z) {
    return x + y + z;
}

const transformedCalc = transform(calc)

// calc(1, 2, 3) === transformedCalc(1)(2)(3) // true
// calc(1, 2, 3) === transformedCalc(1, 2)(3) // true


export const Accesories: FC = () => {

    const transformedCalc = transform(calc)

    // calc(1, 2, 3) === transformedCalc(1)(2)(3) // true
    // calc(1, 2, 3) === transformedCalc(1, 2)(3) // true

    return <>
        <BreadCrumbs text={'Тесты'} />
        <div className={c.container}>

        <Test />
        </div>



    </>
}
