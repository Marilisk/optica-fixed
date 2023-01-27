

export type IUser = {
    activationLink: string,
    _id: string,
    cart: Array<ICartItem>,
    createdAt: string,
    email: string,
    favourites: string[],
    fullName: string,
    orders: OrderType[]
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
    size?:string

}

export interface ILensProduct {
    _id: string
    category: string
    brand: string
    manufacturer: string 
    manufacturerCountry: string
    code: number
    description: string
    price: number
    prescription: number[]
    BC: number[]
    CYL: number[]
    AX: number[]
    changePeriod: string
    color: string
    UVFilter: boolean
    design: string
    moisture: number
    amountInPack: number
    oxygen: number
    material: string
    user?: object
    imageUrl: object
}

export type ICartItem = {
    productId: string
    quantity: number
    leftLens: number
    rightLens: number
}
export type ICartItemWithSum = {
    productId: string
    quantity: number
    leftLens: number
    rightLens: number
    price: number
}

export type ILData = {
    data?: IUser | null
    status: 'loaded' | 'loading' | 'error'
} 
export type ISubscribeData = {
    email: string
    responseMsg: string
}




export type OrderType = {
    cart: Array<ICartItemWithSum>,
    address: string
    phoneNumber: number
    paymentMade: boolean
    paymentWay: string
    user?: object 
    userId: string
    condition?: string
};

export type DadataSuggestionType = {
    data: object
    unrestricted_value: string
    value: string
}

export type MainMenuLinkItemType = { 
    label: string
    to: string
    featureFilter?: string
}

export type MainMenuItemType = {
    name: string
    url: string,
    links: MainMenuLinkItemType[]
}
export type HeaderInitialStateType = {
    fullHeader: boolean 
    menuOpened: string,
    loginModalOpened: boolean,
    mainMenu: MainMenuItemType[]    
}


type FeatureType = {
    id: number
    label: string
    name: string
    options: string[]
    chosenOptions: string[],
    isSelected: boolean
}
export type FeaturesInitialStateType = {
    features: FeatureType[]
    status: string
}


export enum LoadingStatusEnum {
    loading = 'isLoading',
    loaded = 'loaded',
    error = 'error',
}
type ProductsType = {
    items:  IProduct[]
    status: LoadingStatusEnum
}
type CurrentProductType = {
    item: IProduct
    status: LoadingStatusEnum
}
type SearchResultType = {
    items: IProduct[]
    status: LoadingStatusEnum
}
type CartItemWithSumType = {
    items: ICartItemWithSum[]
    status: LoadingStatusEnum
}
export type ProdInitialStateType = {
    products: ProductsType
    currentProduct: CurrentProductType
    searchResult: SearchResultType
    tags: object
    currentCartWithSums: CartItemWithSumType
}

type FieldType = {
    name: string
    parent: number
    slug: string
    photo: string
    lft: number
    rght: number
    tree_id: number
    level: number
}
type CategoryType = {
    model: string
    pk: number
    fields: FieldType
}
export type CategotiesInitialStateType = {
    categories: CategoryType[]
}



