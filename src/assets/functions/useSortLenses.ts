import { useAppSelector } from '../../redux/hooks';
import { ILensProduct, } from "../../Components/Types/types";


export const useSortLenses = (array:ILensProduct[]) => {
    const chosenTag = useAppSelector(s => s.filters.sortTags.chosenTag)
        
    if (chosenTag === 1) {
        return array;
    }
    let result = [...array]  // может ли здесь потом возникнуть какая-то проблема изза копирования по ссылке?

    if (chosenTag === 2) {
        result.sort( (a,b) => b.price - a.price)
    }

    if (chosenTag === 3) {
        result.sort( (a,b) => a.price - b.price)
    }

    if (chosenTag === 4) {
        result.sort( (a,b) => b.code - a.code)
    }
    
    return result;
}