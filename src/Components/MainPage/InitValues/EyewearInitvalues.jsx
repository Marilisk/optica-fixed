
export const initValues = (editMode, currentProduct, images) => {
    if (editMode) {
        return {
            category: currentProduct.item.category,
            name: currentProduct.item.name,
            code: currentProduct.item.code,
            description: currentProduct.item.description,
            price: currentProduct.item.price,
            gender: currentProduct.item.gender,
            features: currentProduct.item.features,
            options: currentProduct.item.options,
            viewsCount: currentProduct.item.viewsCount,
            buyCount: currentProduct.item.buyCount,
            shape: currentProduct.item.shape,
            color: currentProduct.item.color,
            pupillaryDistance: currentProduct.item.pupillaryDistance,
            frameWidth: currentProduct.item.frameWidth,
            lensWidth: currentProduct.item.lensWidth,
            bridge: currentProduct.item.bridge,
            templeLength: currentProduct.item.templeLength,
            lensHeight: currentProduct.item.lensHeight,
            weight: currentProduct.item.weight,
            material: currentProduct.item.material,
            prescriptionMin: currentProduct.item.prescriptionMin,
            prescriptionMax: currentProduct.item.prescriptionMax,
            imageUrl: images,
        }
    } else {
        return {
            category: 'eyewear',
            name: 'очки красивые тестовые',
            code: 125954,
            description: 'новинка',
            price: 0,
            gender: ['женские', 'мужские', 'универсальные'],
            features: ['детские', 'строгие', 'офисные', 'new Look', 'для чтения', 'безоправные', 'полностью оправленные','подростковые',
                        'праздничные',
                        'легкие',
                        'очки до 3000 рублей',
                        'очки до 5000 рублей',
                        'для овального лица',
                        'для круглого лица',
                    ],
            options: [],
            viewsCount: 0,
            buyCount: 0,
            shape: ['круглые', 'прямоугольные', 'квадратные', 'авиаторы', 'cat eye'],
            color: ['чёрный', 'серебро','белый', 'розовый' ],
            pupillaryDistance: '58-72',
            frameWidth: 138,
            lensWidth: 50,
            bridge: 19,
            templeLength: 143,
            lensHeight: 39,
            weight: 8,
            material: ['пластик', 'сталь'],
            prescriptionMin: '-20.00',
            prescriptionMax: '12.00',
            imageUrl: null,  // or images?
        }
    }
}

