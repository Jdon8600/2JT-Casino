import React from 'react';
import {Dealer} from '../classes/Dealer';
import {Player} from '../classes/Player';
import Card from '../components/Card';

function BlackJack(){
    const value = 'value';
    let suit = 'suit';
    let hand:object[] = [];
    let player1 = new Player('Player 1', hand);
    let dealer = new Dealer('Dealer');
    player1.addCard(dealer.deal()!);
    player1.addCard(dealer.deal()!);
    const card1 = player1.displayHand()[0];
    let value1 = card1[value as keyof object];
    let suit1 = card1[suit as keyof object];
    return (
      <Card cvalue={value1 }csuit={suit1} />
      
    );
}

export default BlackJack;