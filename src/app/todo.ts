export class Todo {
    _id?: number;
    title: string = '';
    completed: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class Todos {
    todos: Todo[];
}
