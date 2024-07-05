import { v4 as uuidv4 } from 'uuid';

class Trip {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
        this.users = [];
    }

    displayName() {
    }

    displayId() {
    }

    addUser(name) {
        this.users.push(name)
    }
}

export default Trip;