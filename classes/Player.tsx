export class Player{
    constructor(protected name: string, public hand: object[]){
    }
    displayPlayer():string{
        const p = `${this.name}`
        return p;
    }
    addCard(card: object):void{
        this.hand.push(card);
    }
    displayHand():object[]{
        return this.hand;
    }


} 