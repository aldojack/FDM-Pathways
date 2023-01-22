import { useState, useEffect } from "react";
import Tile from './Tile'
import Cell from './Cell'
import {Board} from '../helper';
import Timer from '../../../Timer';
import useEvent from '../../../../../hooks/useEvent';
import {useCookies} from 'react-cookie';
import GameOverlay from './GameOverlay';
import axios from 'axios';


export default function BoardView() {
  
    const [cookies,  setCookie, removeCookie] = useCookies(['user']);
    const AuthToken = cookies.AuthToken;
    const [board, setBoard] = useState(new Board());
    const [user, setUser] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [counter, setCounter] = useState(10);
    const [currentScore, setCurrentScore] = useState(board.score);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
      if(AuthToken){
        const userId = cookies.UserId
        const getUser = async () => {
          try {
              const response = await axios.get('http://localhost:8000/user', {
                  params: {userId}
              })
              setUser(response.data)
              setHighScore(response.data.highScores.game2048)
          } catch (error) {
              console.log(error)
          }
      }
          getUser();
      }
  },[])

  useEffect(() => {
    //If the current score is better than the current high score then update the scores
    if(currentScore >= highScore){
      setCurrentScore(board.score)
      if(board.score > highScore)
      {
        setHighScore(board.score);
      }
      if(!isActive)
      {
        const updateScore = async() => {
          const response = await axios.put('http://localhost:8000/user/game/score', 
            { userId: user.userId, 
              gameName: "game2048", 
              score: highScore
            })
          }
          updateScore();
      }
    }
    else{
      setCurrentScore(board.score)
    }
  },[board.score, isActive])

    const handleKeyDown = (event) => {
      if(board.hasWon()){
        return;
      }
      if(event.keyCode>=37 & event.keyCode <=40){
        let direction = event.keyCode - 37;
        let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
        let newBoard = boardClone.move(direction);
        setBoard(newBoard);
      }
    }

    
    //If time runs out and is no longer playing then stop movement
    if(counter <=0 && !isActive)
    {
      useEvent('keydown', handleKeyDown, true)
    }
    else{
      useEvent('keydown', handleKeyDown)
    }

    const cells = board.cells.map((row, rowIndex) => {
      return(
        <div key={rowIndex}>
          {row.map((col, colIndex)=> {
            return <Cell key={rowIndex * board.size + colIndex}/>
          })}
        </div>
      )
    })
    const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, tileIndex) => {
      return <Tile tile={tile} key={tileIndex}/>
    })

    const resetGame = () => {
      setIsActive(true)
      setBoard(new Board());
      setCounter(10);
    }

  return (
    <div className='body'>
      <div>
        <div className='details-box'>
          <div className='resetButton' onClick={resetGame}>{isActive ? "Reset Game" : "New Game"}</div>
          <div className='score-box'>
            <div className='score-header'>Time: </div>
            <Timer isActive={isActive} setIsActive={setIsActive} counter={counter} setCounter={setCounter}/>
          </div>
          <div className='score-box'>
            <div className='score-header'>SCORE: </div>
            <div>{currentScore}</div>
          </div>
          <div className='score-box'>
            <div className='score-header'>BEST: </div>
            <div>{highScore}</div>
          </div>
        </div>
          <div className='board'>
            {cells}
            {tiles}
            <GameOverlay setIsActive={setIsActive} onRestart={resetGame} board={board}/>
          </div>
      </div>
    </div>
  )
}
