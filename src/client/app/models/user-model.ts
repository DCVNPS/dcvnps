export class User {
    constructor(
        public userId: string,
        public userName: string,
        public userLastName: string,
        public userFirstName: string,
        public roleCode: string,
        public createdUserId: string,
        public createdData: Date,
        public updatedUserId: string,
        public updatedDate: Date
    ){};

    public  fulName(){
        return `${this.userFirstName} ${this.userLastName}`;
      }
}
