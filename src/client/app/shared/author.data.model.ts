import { Photo } from './photo.model';

export class AuthorData {
    constructor(public author: string, public year: string, public photos: Array<Photo>) {}
}
