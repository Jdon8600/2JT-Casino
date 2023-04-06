import {Deck} from "./Deck"
export class Dealer extends Deck {
  constructor(protected name:string) {
    super();
    
  }
  displayPlayer():string{
    const p = `${this.name}`
    return p;
}
  deal(){
    if (this.deck.length != 0) {
      return this.deck.pop()!;
    }
    throw new Error("Deck is empty!");
  }
}