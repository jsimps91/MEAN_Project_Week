export class User {
    constructor(
        public fullName: string = '',
        public email: string = '',
        public age: number = null,
        public gender: string = '',
        public password: string = '',
        public boards = [],
        public pins = [],
        public followers = [],
        public following = [],
        public _id = null,
    ) {}
}
