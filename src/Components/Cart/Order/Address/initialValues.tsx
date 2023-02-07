export interface IInitialValues {
    name: string 
    address: string 
    additional: string 
    apartment?: string
    phone: string
}

export const initValues = (name:string) => {
    const values: IInitialValues = {
        name: name, 
        phone: '',
        address: '', 
        additional: '', 
        apartment: '', 
    } 
    return values;
}
