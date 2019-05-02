export class Slide {
    public id: string;
    public galleryId: string;
    public year: string;
    public galleryNote: string;
    public photoIndex: number;
    public imgsrc: string;
    public imgalt: string;
    public hidden: boolean;
    public portrait: boolean;
    constructor(id: string,
        galleryId: string,
        year: string,
        galleryNote: string,
        photoIndex: number,
        imgsrc: string,
        imgalt: string,
        portrait: boolean,
        hidden: boolean) {
        this.id = id;
        this.galleryId = galleryId;
        this.year = year;
        this.galleryNote = galleryNote;
        this.photoIndex = photoIndex;
        this.imgsrc = imgsrc;
        this.imgalt = imgalt;
        this.portrait = portrait;
        this.hidden = hidden;
    }
    toggle() {
        this.hidden = !this.hidden;
    }

}