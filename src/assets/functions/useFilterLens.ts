import { useAppSelector } from '../../redux/hooks';
import { FeatureType, ILensProduct } from "../../Components/Types/types";

/* const doFilterSmth = (products:ILensProduct[], chosenFeatures:string[], tag:string ) => {

    let result = []
    for (let product of products) {
        for (let feature of chosenFeatures) {
            if (product[tag].includes(feature)) {
                result.push(product)
            }
        }
    }
    return result
} */

export const useFilterLens = (array:ILensProduct []) => {
    
    const filters:FeatureType[] = useAppSelector(state => state.lensfilters.features.filter(elem => elem.isSelected))
    
    if (!filters.length) {
        return array;
    }
    let result = [...array]  // может ли здесь потом возникнуть какая-то проблема изза копирования по ссылке?

    const manufactFilter = filters.find(el => el.name === 'manufacturer' && el.isSelected)
    if (manufactFilter) {
        result = result.filter(elem => manufactFilter.chosenOptions.includes(elem.manufacturer))
    }

    const colorFilter = filters.find(el => el.name === 'color' && el.isSelected)
    if (colorFilter) {
        result = result.filter(elem => colorFilter.chosenOptions.includes(elem.color) ) 
    }

    const periodityFilter = filters.find(el => el.name === 'periodity' && el.isSelected)
    if (periodityFilter) {
        result = result.filter(elem => periodityFilter.chosenOptions.includes(elem.changePeriod) ) 
    }

    const amountFilter = filters.find(el => el.name === 'amountInPack' && el.isSelected)
    if (amountFilter) {
        result = result.filter(elem => periodityFilter.chosenOptions.includes(elem.changePeriod) ) 
    }
    
    return result;
}