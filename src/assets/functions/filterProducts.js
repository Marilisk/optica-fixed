

export const filterProducts = (array, filters) => {
    if (!filters.length) {
        return array;
    }
    const result = [];
    const set = new Set();

    for (let filter of filters) {
        //console.log(filter)
        filter.chosenOptions.forEach(option => {
            for (let product of array) {
                if (product[filter.name].includes(option)) {
                    set.add(product);
                }
            }
        })
    }
    for (let elem of set) {
        result.push(elem);
    }
    return result;
}