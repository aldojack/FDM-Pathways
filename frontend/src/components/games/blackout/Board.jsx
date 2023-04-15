import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./App.css";
import Timer from "../../Timer";
import Cell from "./Cell";

//Set grid size and chance of a light on
const size = 6;
const chanceLightStartsOn = 0.40;




function Board() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const AuthToken = cookies.AuthToken;
  const [user, setUser] = useState(null);
  const [won, setWon] = useState(false);
  const [counter, setCounter] = useState(120);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isLightsOffCount, setIsLightsOffCount] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);
  const [disabled, setDisabled] = useState(false);

  /** randomLight: returns random boolean */
  function randomLight() {
    //Use if want to see all lights on
    // return true;
    return Math.random() < chanceLightStartsOn;
  }

const generateLightsGrid = (size) =>
Array.from({ length: size }).map((row) =>
  Array.from({ length: size }).map((cell) => randomLight())
);


  const [board, setBoard] = useState({ grid: generateLightsGrid(size) });


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
          setHighScore(response.data.highScores.blackout);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, []);

  // useEffect(() => {
  //   //If player is not active
  //   if (!isActive) {
  //     //Check if all lights are out then compare current score with high score
  //     if (hasWon()) {
  //       //If all lights are out is the players high score more than the current
  //       //If so then set that score
  //       setCurrentScore(10000);
  //       if (highScore < currentScore) {
  //         setHighScore(currentScore);
  //       }
  //     }
  //     //Else if timer is at 0 and the player hasn't won then reset player score
  //     else {
  //       if (highScore < currentScore) {
  //         setHighScore(currentScore);
  //       }
  //       setCurrentScore(0);
  //     }
  //   }

  //   if (hasWon()) {
  //     setCurrentScore(5000);
  //     if (highScore < currentScore) {
  //       setHighScore(currentScore);
  //     }

  //     if (!isActive && currentScore > highScore) {
  //       const updateScore = async () => {
  //         const response = await axios.put(
  //           "http://localhost:8000/user/game/score",
  //           { userId: user.userId, gameName: "blackout", score: highScore }
  //         );
  //       };
  //       updateScore();
  //     }
  //   }
  // }, [isActive]);

  useEffect(() => {
    const playerWon = hasWon();
    const convertedScore = currentScore * 100
    const isNewHighScore = convertedScore > highScore;
  
    if (!isActive) {
      setDisabled(true);
      if (playerWon) {
        setCurrentScore(10000);
        if (isNewHighScore) {
          setHighScore(convertedScore);
          persistScoreToDatabase(convertedScore); // pass convertedScore directly
        }
      } else {
        if (isNewHighScore) {
          setHighScore(convertedScore);
          persistScoreToDatabase(convertedScore); // pass convertedScore directly
        }
        setCurrentScore(0);
      }
    } else if (playerWon && isNewHighScore) {
      setCurrentScore(10000);
      setHighScore(convertedScore);
      persistScoreToDatabase(convertedScore); // pass convertedScore directly
    }
    
  }, [isActive, board.grid]);
  
  const persistScoreToDatabase = (score) => {
    const updateScore = async () => {
      console.log("Send to DB");
      const response = await axios.put(
        "http://localhost:8000/user/game/score",
        { userId: user.userId, gameName: "blackout", score: score }
      );
    };
    updateScore();
  };
  
  

  useEffect(() => {
    setCurrentScore(Math.ceil((isLightsOffCount / (size * size)) * 100));
  }, [isLightsOffCount]);

  const setInactive = () => {
    setIsActive(false);
    setWon(false);
  }


  //create size*size matrix state, randomly setting isOn to true/false
  // const lightsGrid = Array.from({ length: size }).map(
  //   (row) =>
  //     (row = Array.from({ length: size }).map((cell) => (cell = randomLight())))
  // );
  

  const resetGame = () => {
    setDisabled(false);
    setIsActive(true)
    setBoard({ grid: generateLightsGrid(size) });
    setCurrentScore(0);
    setCounter(120);
    setResetTimer(true)
    setTimeout(() => setResetTimer(false), 0);
  }

  /** toggleLight: toggles a single light on/off in the state */
  const toggleLight = function (cellIndex) {
    let [cellRowIndex, cellColIndex] = cellIndex.split("");
    cellRowIndex = parseInt(cellRowIndex);
    cellColIndex = parseInt(cellColIndex);

    setBoard((currSt) => {
      const newGrid = currSt.grid.map((row, rowIndex) =>
        rowIndex === cellRowIndex
          ? row.map((col, colIndex) => (colIndex === cellColIndex ? !col : col))
          : row
      );

      // count the number of cells with isOn set to false
      const newOffCellsCount = newGrid.reduce(
        (count, row) => count + row.filter((cell) => !cell).length,
        0
      );

      setIsLightsOffCount(newOffCellsCount);

      return {
        ...currSt,
        grid: newGrid,
      };
    });
  };

  /** toggleAllLights: toggles clicked-on light and its neighbours */
  function toggleAllLights(cellIndex) {
    let [cellRowIndex, cellColIndex] = cellIndex.split("");
    cellRowIndex = parseInt(cellRowIndex);
    cellColIndex = parseInt(cellColIndex);

    toggleLight(cellIndex); //toggle clicked on cell
    toggleLight([cellRowIndex, cellColIndex + 1].join("")); //toggle right
    toggleLight([cellRowIndex, cellColIndex - 1].join("")); //toggle left
    toggleLight([cellRowIndex + 1, cellColIndex].join("")); //toggle down
    toggleLight([cellRowIndex - 1, cellColIndex].join("")); //toggle up
  }

  /** hasWon: checks if all lights are off */
  function hasWon() {
    //setscore to 5000 as the maximum high score
    const lightsOut = board.grid.every((row) => row.every((cell) => !cell));
    console.log(lightsOut)

    if (lightsOut) {
      setWon(true);
    }

    return lightsOut ? true : false;
    // return board.grid.every((row) => row.every((cell) => cell));
  }

  const gridDisplay = board.grid.map((row, rowIndex) => {
    return (
      <div className="inline-block w-auto" key={rowIndex}>
        {row.map((col, colIndex) => (
          <Cell
            key={[rowIndex, colIndex].join("")}
            cellIndex={[rowIndex, colIndex].join("")}
            isOn={board.grid[rowIndex][colIndex]}
            toggleLight={toggleAllLights}
            disabled={disabled}
          />
        ))}
      </div>
    );
  });

  return (
    //Width 450px seems to be good
    <div className="body">
      <div>
        <div>
          <h1 className="App-h1 text-center">
            FDM<span className="App-orange">&#9733;</span>
          </h1>
          <div className="details-box">
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
              <div>{currentScore}%</div>
            </div>
            {highScore && <div className="score-box">
              <div className="score-header">BEST: </div>
              <div>{highScore}</div>
            </div>}
          </div>
          <div className="w-full mb-2">
            <div className="max-w-lg">
              <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-6  bg-gradient-to-r from-dodgerblue via-ultramarine to-vividviolet rounded-full"
                  style={{width: currentScore ? `${currentScore}%` : '0%'}}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg p-1 border-2 border-solid border-black items-center max-w-lg">
            {won ? (
              <div className="text-4xl tracking-wider mb-0 py-0 px-5 text-vividviolet bg-black h-96 w-full flex flex-col items-center justify-center">
                <p className="font-bold">Congratulations!</p>
                <p className="text-2xl mt-4">Maximum score 5000 achieved</p>
              </div>
            ) : (
              gridDisplay
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
