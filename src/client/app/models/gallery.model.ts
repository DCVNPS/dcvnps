export class Gallery {
    public galleryId: string;
    public gallery: string;
    public profilePhoto: string;
    public imgSrc: string;
    public createdDate: Date;
    public updatedDate: Date;
    constructor(
        id: string,
        gallery: string,
        profilePhoto: string,
        createdDate: Date,
        updatedDate: Date) {
        this.galleryId = id;
        this.gallery = gallery;
        this.profilePhoto = profilePhoto;
        this.imgSrc = `galleries/${gallery}/profile/${profilePhoto}`;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}
