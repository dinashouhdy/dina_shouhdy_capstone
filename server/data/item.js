import { v4 as uuidv4 } from 'uuid';

class Item {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
    }

    displayName() {
    }

    displayId() {
    }
}

export default Item;