import { Photo } from './photo-model';

export class AuthorData {
    constructor(public author: string, public photos: Array<Photo>) {}
}
