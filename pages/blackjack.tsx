import React from "react";
import { Player } from "../classes/Player";
import { Deck } from "@/classes/Deck";
import Card from "../components/Card";

interface KeyboardEvent {
  enterKey: boolean;
}

function BlackJack() {
  const newGameCss: string =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
  const hitCss: string =
    "bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded";
  const standCss: string =
    "bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded";
  const inputCss: string =
    "shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const betCss: string =
    "bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded";
  let d = new Deck();

  //set game state
  const [gameOver, setGameOver] = React.useState(false);
  //set deck state
  const [deck, setDeck] = React.useState<Deck>(d);
  //set player state
  const [player, setPlayer] = React.useState<Player>({ cards: [{}], count: 0 });
  //set dealer state
  const [dealer, setDealer] = React.useState<Player>({ cards: [{}], count: 0 });
  //set bet state
  const [bet, setBet] = React.useState<number | null>(null);
  //set input state
  const [input, setInput] = React.useState("");
  //set wallet state
  const [wallet, setWallet] = React.useState(1000);
  //set message state
  const [message, setMessage] = React.useState<string | null>(null);

  //initialize game
  React.useEffect(() => {
    startGame();
  }, []);

  //deal first hand
  function dealHand(deck: Deck) {
    const pCard1 = deck.deal();
    const dCard1 = deck.deal();
    const pCard2 = deck.deal();
    setDeck(deck);
    const pStartingHand = [pCard1, pCard2];
    const dStartingHand = [dCard1, {}];

    const player: Player = {
      cards: pStartingHand,
      count: getCount(pStartingHand),
    };
    const dealer: Player = {
      cards: dStartingHand,
      count: getCount(dStartingHand),
    };

    return { player, dealer };
  }

  function startGame() {
    if (wallet > 0) {
      const newDeck = new Deck();
      newDeck.createDeck();
      newDeck.shuffle();
      const { player, dealer } = dealHand(newDeck);
      setDeck(newDeck);
      setPlayer(player);
      setDealer(dealer);
      setBet(null);
      setMessage(null);
      setGameOver(false);
      setInput("");
    } else {
      setMessage("Game Over! you dont have enough points");
    }
  }
  function startNewGame(type: string) {
    const d = new Deck();
    d.createDeck();
    d.shuffle();
    if (type === "continue") {
      if (wallet > 0) {
        const newDeck = deck.deckSize() < 10 ? d : deck;
        const { player, dealer } = dealHand(newDeck);
        setDeck(newDeck);
        setPlayer(player);
        setDealer(dealer);
        setBet(null);
        setMessage(null);
        setGameOver(false);
      } else {
        setMessage("Game Over! you dont have enough points");
      }
    }
  }

  function placeBet() {
    const currentBet = input;
    if (+currentBet > wallet) {
      setMessage("You dont have enough points");
    } else if (+currentBet % 1 !== 0) {
      setMessage("Bet must be a whole number");
    } else {
      const upWallet = wallet - +currentBet;
      setWallet(upWallet);
      setInput("");
      setBet(+currentBet);
    }
  }

  function hit() {
    if (!gameOver) {
      if (bet) {
        const pPlayer: Player = { ...player };
        let currDeck = deck;
        pPlayer.cards.push(currDeck.deal());
        pPlayer.count = getCount(pPlayer.cards);

        if (pPlayer.count > 21) {
          setGameOver(true);
          setPlayer(pPlayer);
          setMessage("BUST!");
        } else {
          setDeck(currDeck);
          setPlayer(pPlayer);
        }
      } else {
        setMessage("Please enter a bet.");
      }
    } else {
      setMessage("Game Over! Come back when you have enough points.");
    }
  }

  function dealerDraw(dealer: Player, deck: Deck) {
    dealer.cards.push(deck.deal());
    dealer.count = getCount(dealer.cards);
    return { dealer, deck };
  }

  function stand() {
    if (!gameOver) {
      if (bet) {
        let currDeck = deck;
        let currDealer = dealer;
        currDealer.cards.pop();
        currDealer.cards.push(currDeck.deal());
        currDealer.count = getCount(currDealer.cards);

        while (currDealer.count < 17) {
          const draw = dealerDraw(currDealer, currDeck);
          currDealer = draw.dealer;
          currDeck = draw.deck;
        }

        if (currDealer.count > 21) {
          setGameOver(true);
          setDealer(currDealer);
          setMessage("Dealer BUST! You win!");
          setWallet(wallet + bet! * 2);
        } else {
          const winner = getWinner(currDealer, player);
          let currWallet = wallet;
          let currMessage = "";
          if (winner === "player") {
            currWallet = wallet + bet! * 2;
            currMessage = "You win!";
          } else if (winner === "dealer") {
            currMessage = "Dealer wins!";
          } else {
            currWallet += bet!;
            currMessage = "Push";
          }
          setDeck(currDeck);
          setDealer(currDealer);
          setWallet(currWallet);
          setGameOver(true);
          setMessage(currMessage);
        }
      } else {
        setMessage("Please enter a bet.");
      }
    } else {
      setMessage("Game Over! Press Continue.");
    }
  }

  function getWinner(dealer: Player, player: Player) {
    if (dealer.count > player.count) {
      return "dealer";
    } else if (dealer.count < player.count) {
      return "player";
    } else {
      return "push";
    }
  }

  function getCount(cards: object[]) {
    const rearranged: object[] = [];
    cards.forEach((card) => {
      if (card["value" as keyof object] === "A") {
        rearranged.push(card);
      } else if (card["value" as keyof object]) {
        rearranged.unshift(card);
      }
    });

    return rearranged.reduce((total: number, card: object) => {
      if (
        card["value" as keyof object] === "K" ||
        card["value" as keyof object] === "Q" ||
        card["value" as keyof object] === "J"
      ) {
        return total + 10;
      } else if (card["value" as keyof object] === "A") {
        return total + 11 <= 21 ? total + 11 : total + 1;
      } else {
        return total + card["value" as keyof object];
      }
    }, 0);
  }

  function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target!.value;
    setInput(inputValue);
  }

  console.log(player);

  //create ui for blackjack
  return (
    <div className="bg-slate-100 ">
      <div>
        <h1>BlackJack</h1>
      </div>

      <div className="flex space-x-4">
        <button className={newGameCss} onClick={() => startGame()}>
          New Game
        </button>
        <button className={standCss} onClick={() => stand()}>
          stand
        </button>
        <button className={hitCss} onClick={() => hit()}>
          hit
        </button>
      </div>
      <h2>Wallet: {wallet}</h2>
      {!bet ? (
        <div className="input-bet">
          <form>
            <input
              className={inputCss}
              type="text"
              name="bet"
              placeholder=""
              value={input}
              onChange={inputChange}
            />
          </form>
          <button
            className={betCss}
            onClick={() => {
              placeBet();
            }}
          >
            Place Bet
          </button>
        </div>
      ) : null}
      {gameOver ? (
        <div className="buttons">
          <button
            onClick={() => {
              startNewGame("continue");
            }}
          >
            Continue
          </button>
        </div>
      ) : null}

      <p>Your Hand ({player.count})</p>
      <table>
        <tbody>
        <tr>
          {player.cards.map((card, index) => {
            return (
              <Card
                key={index}
                cvalue={card["value" as keyof object]}
                csuit={card["suit" as keyof object]}
              />
            );
          })}
        </tr>
        </tbody>
      </table>
      <p>Dealer Hand ({dealer.count})</p>
      <table>
        <tbody>
        <tr>
          {dealer.cards.map((card, index) => {
            return (
              <Card
                key={index}
                cvalue={card["value" as keyof object]}
                csuit={card["suit" as keyof object]}
              />
            );
          })}
        </tr>
        </tbody>
      </table>

      <p>{message}</p>
    </div>
  );
}

export default BlackJack;
