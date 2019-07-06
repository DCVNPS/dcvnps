export class Slide {
    constructor(
        public photoId: string,
        public galleryId: string,
        public gallery: string,
        public year: string,
        public author: string,
        public imgsrc: string,
        public imgalt: string,
        public portrait: boolean,
        public hidden: boolean) {
    }
    toggle() {
        this.hidden = !this.hidden;
    }

}