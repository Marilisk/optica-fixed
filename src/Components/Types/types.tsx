

export type IUser = {
    activationLink: string,
    _id: string,
    cart: Array<ICartItem>,
    createdAt: string,
    email: string,
    favourites: string[],
    fullName: string,
    isActivated: boolean,
    password: string,
    role: string,
    updatedAt: string,
    __v: number,

};



export interface IImageUrl {
    main: string,
    side: string,
    perspective: string,
}


export interface IProduct {
    _id: string,
    category: string,
    name: string,
    code: number,
    description: string,
    price: number,
    gender: string[],
    features: string[],
    options: string[],
    viewsCount: number,
    buyCount: number,
    shape: string[],
    color: string[],
    pupillaryDistance: string,
    frameWidth: number,
    lensWidth: number,
    bridge: number,
    templeLength: number,
    lensHeight: number,
    weight: number,
    material: string[],
    prescriptionMin: string,
    prescriptionMax: string,
    imageUrl: IImageUrl /* | null */

}

export type ICartItem = {
    productId: string
    quantity: number
    leftLens: number
    rightLens: number
}

export type ILData = {
    data?: IUser | null
    status: 'loaded' | 'loading' | 'error'
} 
export type ISubscribeData = {
    email: string
    responseMsg: string
}
/* export interface IAuthInitState {
    loginData: ILData
    subscribeData: ISubscribeData
} */



