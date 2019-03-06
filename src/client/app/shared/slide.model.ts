export class Slide {
    public id: string;
    public galleryId: string;
    public galleryNote: string;
    public photoIndex: number;
    public imgsrc: string;
    public imgalt: string;
    public hidden: boolean;
    constructor(id: string,
        galleryId: string,
        galleryNote: string,
        photoIndex: number,
        imgsrc: string,
        imgalt: string,
        hidden: boolean) {
        this.id = id;
        this.galleryId = galleryId;
        this.galleryNote = galleryNote;
        this.photoIndex = photoIndex;
        this.imgsrc = imgsrc;
        this.imgalt = imgalt;
        this.hidden = hidden;
    }
    toggle() {
        this.hidden = !this.hidden;
    }

}