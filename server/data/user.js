import { v4 as uuidv4 } from 'uuid';

class User {
    constructor(username) {
        this.id = uuidv4();
        this.username = username;
        this.selectedItems = [];
    }

    addNewSelectedItem(item) {
        this.selectedItems.push(item);
    }

    removeSelectedItem(item) {
        this.selectedItems = this.selectedItems.filter(i => i.name !== item.name);
    }

    displayItems() {
    }
}

export default User;

