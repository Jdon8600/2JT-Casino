export abstract class Deck {
    protected value: any = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    private suit: string [] = ['♦','♣','♥','♠'];
    deck: object[]
    constructor() {
        this.deck = [];
        this.createDeck();
        this.shuffle();
        
    }
    createDeck(): object[] {
        for (let i = 0; i < this.value.length; i++) {
            for (let j = 0; j < this.suit.length; j++) {
                this.deck.push({value: this.value[i], suit :this.suit[j]});
            }
        }
        return this.deck;
    }

    shuffle(): object[] {
        const deck = this.deck;
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], this.deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    abstract deal():object;

}