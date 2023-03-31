export type IUser = {
    activationLink: string
    _id: string
    cart: Array<ICartItem>
    createdAt: string
    email: string
    favourites: string[]
    fullName: string
    orders: string[]
    isActivated: boolean
    resetPasswordLink?: string
    allowedToResetPassword?: boolean
    password: string
    role: string
    updatedAt: string
    __v: number
}
export interface IImageUrl {
    main: string,
    side?: string,
    perspective?: string,
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
    imageUrl: IImageUrl 
    size?:string
    inStockQuantity?: number
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
    imageUrl: IImageUrl
    inStockQuantity?: number
}
export type ICartItem = {
    productId: string
    quantity: number
    leftLens: number
    rightLens: number
    cat: CatEnum
}
export type ICartItemWithSum = {
    productId: string
    quantity: number
    leftLens: number
    rightLens: number
    price: number
    cat: CatEnum
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
    _id?: string
    cart: Array<ICartItemWithSum>
    address: string
    phoneNumber: string
    paymentMade: boolean
    paymentWay: string
    user?: object 
    userId: string
    condition?: string
    createdAt?: Date
    updatedAt?: Date
    additionalInfo?: string
}

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
export enum MainMenuFilterEnum {
    women = 'женские',
    men = 'мужские',
    children = 'детские',
    lenses = 'линзы',
}
export type MainMenuItemType = {
    name: string
    url: string,
    filter: MainMenuFilterEnum,
    links: MainMenuLinkItemType[]
}
export type HeaderInitialStateType = {
    fullHeader: boolean 
    menuOpened: string
    loginModalOpened: boolean
    authOfferModalOpened: boolean
    mainMenu: MainMenuItemType[]   
}
export type FeatureType = {
    id: number
    label: string
    name: string
    options: string[]
    chosenOptions: string[],
    isSelected: boolean
    worked?: boolean
}
export type SortTagType = {
    id: number 
    label: string
    name: string
}
type SortType = {
    tags: SortTagType[]
    chosenTag: number
}
export type FeaturesInitialStateType = {
    features: FeatureType[]
    sortTags: SortType
    status: string
    filteredProducts: IProduct[]
    goodsAmount: number
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
export type CurrentProductType = {
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
type ProcessedOrderType = {
    order: OrderType
    status: LoadingStatusEnum
}
export type ProdInitialStateType = {
    products: ProductsType
    currentProduct: CurrentProductType
    searchResult: SearchResultType
    tags: object
    currentCartWithSums: CartItemWithSumType
    processedOrder: ProcessedOrderType
    cartInLSLength: number
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
export type LensProductsType = {
    items: ILensProduct[]
    status: LoadingStatusEnum
}
export type CurrentLensType = {
    item: ILensProduct
    status: LoadingStatusEnum
}
export type LensesInitialStateType = {
    products: LensProductsType
    currentProduct: CurrentLensType
}


export enum CatEnum {
    eyewear = 'eyewear',
    contactLens = 'contactLens'
}
export type FetchAddToCartArgType = {
    productId: string
    cat: CatEnum
    lens?: number
}

