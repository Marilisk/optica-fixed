import { IInitialValues } from './../../Components/Cart/Order/Address/initialValues';
import { ICartItemWithSum, ICartItem, CatEnum, IUser, OrderType } from "../../Components/Types/types";
import instance from '../API/api';

const sumsDefine = async (cartItem: ICartItem) => {
    const urlCat = cartItem.cat === CatEnum.eyewear ? 'products' : 'lenses';
    const data = await instance.get(`/${urlCat}/${cartItem.productId}`)
    
    let item: ICartItemWithSum = {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        leftLens: cartItem.leftLens,
        rightLens: cartItem.rightLens,
        price: data.data.price,
        cat: cartItem.cat,
    }
    return item
}

export const  cartWithSumsCreator = async (authData: IUser) => {
    let cartWithSums = [];
    for (let el of authData.cart) {
        let item = await sumsDefine(el)
        cartWithSums.push(item)
    }
    return [...cartWithSums];
}

export const orderCreate = (cart:ICartItemWithSum[], addressValues: IInitialValues, userId:string) => {
    
    const order:OrderType = {
        cart,
        address: addressValues.address,
        phoneNumber: addressValues.phone,
        paymentMade: false,
        paymentWay: 'cash',
        userId,
        condition: 'created',
    }

    return order
}




