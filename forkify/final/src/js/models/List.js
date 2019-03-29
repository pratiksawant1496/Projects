import uniqid from 'uniqid';    //external package for creating unique id

export default class List {
    constructor() {
        this.items = [];   //for storing the all items of shopping list
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);     //pushing the item into the array
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);  // it will check wheather id of current element matches with the passed element id
        // [2,4,8] splice(1, 2) -> returns [4, 8], original array is [2]
        // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]
        this.items.splice(index, 1);   //here 1 is no of element to be removed
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;     //here find method will actually finds the element & not its index
    }
}