import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./App.css";
import Card from "./component/Card";
import Timer from "../../Timer";
import axios from "axios";

const cardImages = [
  { src: "/img/Card_robot.png", matched: false },
  { src: "/img/Card_tablet.png", matched: false },
  { src: "/img/Card_bits.png", matched: false },
  { src: "/img/Card_cloud.png", matched: false },
  { src: "/img/Card_techline.png", matched: false },
  { src: "/img/Card_server.png", matched: false },
];

function CardsView() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const AuthToken = cookies.AuthToken;
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(120);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [resetTimer, setResetTimer] = useState(false);

  //Will get the user and update the user state and high score
  useEffect(() => {
    if (AuthToken) {
      const userId = cookies.UserId;
      const getUser = async () => {
        try {
          const response = await axios.get("http://localhost:8000/user", {
            params: { userId },
          });
          setUser(response.data);
          setHighScore(response.data.highScores.pairs);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
      shuffleCards();
    }
  }, []);

  //If two cards are selected then we disable being able to select anymore cards then compare
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      compareCards(choiceOne, choiceTwo);
    }

    const allMatched = Object.values(cards).every((card) => card.matched);
    if (allMatched && isActive) {
      turns === 5 ? setCurrentScore((prevScore) => prevScore + 1000) : null;
      shuffleCards();
    }
    //If timer runs out then set an inactive and disable clicks
    //Also checks if the current score  is greater  than high score then updates

    if (!isActive) {
      let newHighScore;
      setDisabled(true);
      if (currentScore > highScore) {
        console.log(`High score is:  ${currentScore}`)
        newHighScore = currentScore
        setHighScore(currentScore);
      }

      const updateScore = async () => {
        try {
          const test = {
            userId: user.userId,
            gameName: 'pairs',
            score: newHighScore,
          }

          console.log(test)
          const response = await axios.put('http://localhost:8000/user/game/score', {
            userId: user.userId,
            gameName: 'pairs',
            score: newHighScore,
          });
        } catch (error) {
          console.error(error);
          // Handle error here
        }
      };
      updateScore();
    }
    // setIsActive(false);
  }, [choiceTwo, isActive]);

  const setInactive = () => {
    setIsActive(false);
  }

  // //Checks if all cards are matched and if there player is still active then shuffle cards again
  // useEffect(() => {
  //   const allMatched = Object.values(cards).every((card) => card.matched);
  //   if (allMatched && isActive) {
  //     turns === 5 ? setCurrentScore((prevScore) => prevScore + 1000) : null;
  //     shuffleCards();
  //   }
  //   //If timer runs out then set an inactive and disable clicks
  //   //Also checks if the current score  is greater  than high score then updates

  //     if (!isActive) {

  //       if (currentScore > highScore) {
  //         setHighScore(currentScore);
  //       }

  //       const updateScore = async () => {
  //         const response = await axios.put(
  //           "http://localhost:8000/user/game/score",
  //           { userId: user.userId, gameName: "pairs", score: highScore }
  //         );
  //       };
  //       updateScore();
  //     }
  //     setIsActive(false);
  //     setDisabled(true);
  // }, [counter]);

  //shuffle cards
  //Maybe change  the id to UUID
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  //Handle choice
  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) {
      return;
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const compareCards = (card1, card2) => {
    if (card1.src === card2.src) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
      });
      setCurrentScore((prevScore) => prevScore + 50);
    } else {
      if (Object.values(cards).some((card) => card.matched)) {
        setCurrentScore((prevScore) => prevScore - 25);
      }
    }
    setTimeout(() => cardDelay(), 1000);
  };

  const resetGame = () => {
    setIsActive(true);
    shuffleCards();
    setDisabled(false);
    setTurns(0);
    setCurrentScore(0);
    setCounter(120);
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 0);
    cardDelay();
  };

  const cardDelay = () => {
    if (isActive) {
      setChoiceOne(null);
      setChoiceTwo(null);
      setDisabled(false);
    } else {
      setTurns((prevTurns) => prevTurns + 1);
    }
  };

  const cardsComponent = cards.map((card) => (
    <Card
      key={card.id}
      card={card}
      handleChoice={handleChoice}
      flipped={card === choiceOne || card === choiceTwo || card.matched}
      disabled={disabled}
    />
  ));

  return (
    <div className="body">
      <div>
        <div className="details-box w-1/2 m-auto items-stretch">
          <button className="resetButton" onClick={resetGame}>
            {isActive ? "Reset Game" : "New Game"}
          </button>
          <div className="score-box">
            <div className="score-header">Time: </div>
            <Timer
              isActive={isActive}
              setIsActive={setInactive}
              initialCounter={counter}
              resetTimer={resetTimer}
            />
          </div>
          <div className="score-box">
            <div className="score-header">SCORE: </div>
            <div>{currentScore}</div>
          </div>
          <div className="score-box">
            <div className="score-header">BEST: </div>
            <div>{highScore}</div>
          </div>
        </div>
        <div className="card-grid mt-10 grid grid-cols-4 gap-5">
          {cardsComponent}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default CardsView;
