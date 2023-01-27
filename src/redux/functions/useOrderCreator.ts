import { IInitialValues } from './../../Components/Cart/Order/Address/initialValues';
import { ICartItemWithSum, ICartItem, IUser, OrderType } from "../../Components/Types/types";
import instance from '../API/api';

const sumsDefine = async (cartItem: ICartItem) => {
    const data = await instance.get(`/products/${cartItem.productId}`)
    
    let item: ICartItemWithSum = {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        leftLens: cartItem.leftLens,
        rightLens: cartItem.rightLens,
        price: data.data.price
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
        phoneNumber: Number(addressValues.phone),
        paymentMade: false,
        paymentWay: 'СБП',
        userId,
        condition: 'created',
    }

    return order
}




