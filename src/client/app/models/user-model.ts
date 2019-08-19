export class User {
    constructor(
        public userId: string,
        public userName: string,
        public userSurname: string,
        public userGivenName: string,
        public roleCode: string,
        public createdUserId: string,
        public createdData: Date,
        public updatedUserId: string,
        public updatedDate: Date
    ){};
}