import { AuthorData } from './author.data.model';
export class YearData {
    constructor(public year: string, public authorData:Array<AuthorData>){}
}
