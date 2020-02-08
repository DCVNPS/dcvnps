export class Gallery {
    public galleryId: string;
    public gallery: string;
    public profilePhoto: string;
    public activeInd: string;
    public updatedUserId: string;
    public createdDate: Date;
    public updatedDate: Date;
    constructor(
        id: string,
        gallery: string,
        profilePhoto: string,
        activeInd:string,
        updatedUser: string,
        createdDate: Date,
        updatedDate: Date) {
        this.galleryId = id;
        this.gallery = gallery;
        this.profilePhoto = profilePhoto;
        this.activeInd = activeInd;
        this.updatedUserId = updatedUser;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
    get  imgSrc(){ return `galleries/${this.gallery.replace(' ','_')}/profile/${this.profilePhoto}`}

}
