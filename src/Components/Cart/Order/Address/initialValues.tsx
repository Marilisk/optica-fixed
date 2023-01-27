export interface IInitialValues {
    name: string 
    address: string 
    building: string 
    apartment: string
    phone: string
}

export const initValues = (name:string) => {
    const values: IInitialValues = {
        name: name, 
        phone: '',
        address: '', 
        building: '', 
        apartment: '', 
    } 
    return values;
}
