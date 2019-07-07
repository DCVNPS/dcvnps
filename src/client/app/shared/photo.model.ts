export class Photo {
    constructor(
        public photoId: string,
        public galleryId: string,
        public gallery: string,
        public imgalt: string,
        public imgsrc: string,
        public portrait: boolean,
        public hidden: boolean
    ) {}
}
