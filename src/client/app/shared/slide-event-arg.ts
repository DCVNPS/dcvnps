export enum Direction {
    UNKOWN = 'UNKNOWN',
    NEXT = 'NEXT',
    PREV = 'PREV',
    STARTSTOP = 'STARTSTOP'
}

export class SlideEventArg {
    constructor(public name: Direction, public slideIndex: number, public playing: boolean) {    }
}
