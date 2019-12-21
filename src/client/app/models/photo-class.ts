export class PhotoClass {
    constructor(
        public photoClassId: string,
        public classLevel: string,
        public classLevelDesc: string,
        public classDescription: string,
        public prerequisite: string,
        public curriculum: string,
        public instructors: string,
        public postedUser_id: string,
        public createdDate: Date,
        public updatedUserId: string,
        public updatedDate: Date
    ){}
}
