export class User {
    constructor(
        public userId: string,
        public userName: string,
        public password: string,
        public userSurname: string,
        public userGivenName: string,
        public roleCode: string,
        public createdUserId: string,
        public createdDate: Date,
        public updatedUserId: string,
        public updatedDate: Date
    ){};

    public  fulName(){
        return `${this.userGivenName} ${this.userSurname}`;
      }
}
