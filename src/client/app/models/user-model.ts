export class User {
    constructor(
        public userId: string,
        public email: string,
        public password: string,
        public userSurname: string,
        public userGivenName: string,
        public roleCode: string,
        public roleDescription: string,
        public activeInd:string,
        public createdUserId: string,
        public createdDate: Date,
        public updatedUserId: string,
        public updatedDate: Date
    ){};

    get  fullName(){
        return `${this.userGivenName} ${this.userSurname}`;
      }
}
