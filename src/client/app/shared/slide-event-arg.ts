export enum Direction {
    UNKOWN = 'UNKNOWN',
    NEXT = 'NEXT',
    PREV = 'PREV',
    STARTSTOP = 'STARTSTOP'
  }

export class SlideEventArg {
    public name: Direction;
    public slideIndex: number;
    public isPlaying: boolean;
    constructor(name: Direction, slideIndex: number, playing: boolean){
        this.name = name;
        this.slideIndex = slideIndex;
        this.isPlaying = playing;
    }
}
