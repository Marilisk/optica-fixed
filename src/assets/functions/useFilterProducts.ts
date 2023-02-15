import { useAppSelector } from './../../redux/hooks';
import { FeatureType, IProduct } from "../../Components/Types/types";

export const doFilterSmth = (products:IProduct[], chosenFeatures:string[], tag:string ) => {

    let result = []
    for (let product of products) {
        for (let feature of chosenFeatures) {
            if (product[tag].includes(feature)) {
                result.push(product)
            }
        }
    }
    return result
}

export const useFilterProducts = (array:IProduct[]) => {
    
    const filters:FeatureType[] = useAppSelector(state => state.filters.features.filter(elem => elem.isSelected))
    
    if (!filters.length) {
        return array;
    }
    let result = [...array]  // может ли здесь потом возникнуть какая-то проблема изза копирования по ссылке?

    const colorFilter = filters.find(el => el.name === 'color' && el.isSelected)
    if (colorFilter) {
        result = doFilterSmth(result, colorFilter.chosenOptions, 'color')
    }

    const shapeFilter = filters.find(el => el.name === 'shape' && el.isSelected)
    if (shapeFilter) {
        result = doFilterSmth(result, shapeFilter.chosenOptions, 'shape')
    }

    const materialFilter = filters.find(el => el.name === 'material' && el.isSelected)
    if (materialFilter) {
        result = doFilterSmth(result, materialFilter.chosenOptions, 'material')
    }

    const sizeFilter = filters.find(el => el.name === 'size' && el.isSelected)
    if (sizeFilter) {
        result = doFilterSmth(result, sizeFilter.chosenOptions, 'size')
    }

    const featuresFilter = filters.find(el => el.name === 'features' && el.isSelected)
    if (featuresFilter) {
        result = doFilterSmth(result, featuresFilter.chosenOptions, 'features')
    }
    
    return result;
}