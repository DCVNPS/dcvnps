export class Gallery {
    public id: string;
    public gallery: string;
    public year: string;
    public profilePhoto: string;
    public createdDate: Date;
    public updatedDate: Date;
    constructor(
        id: string,
        gallery: string,
        year: string,
        profilePhoto: string,
        createdDate: Date,
        updatedDate: Date)
    {
        this.id = id;
        this.gallery = gallery;
        this.year = year;
        this.profilePhoto = profilePhoto;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}
