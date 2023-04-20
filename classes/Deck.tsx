export class Deck {
    private value: any = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    private suit: string [] = ['♦','♣','♥','♠'];
    
    constructor(public deck: object[] = []) {
        
    }
    createDeck() {
        for (let i = 0; i < this.value.length; i++) {
            for (let j = 0; j < this.suit.length; j++) {
                this.deck.push({value: this.value[i], suit :this.suit[j]});
            }
        }
        
    }

    deckSize():number{
        return this.deck.length;
    }

    shuffle(): object[] {
        const deck = this.deck;
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], this.deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    deal():object{
        if (this.deck.length != 0) {
          return this.deck.pop()!;
        }
        throw new Error("Deck is empty!");
      }

}