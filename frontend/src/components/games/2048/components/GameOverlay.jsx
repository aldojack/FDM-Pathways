import React from 'react'
import TryAgainLogo from '../assets/img/try-again.gif'
export default function GameOverlay({onRestart, board, setIsActive}) {
    if(board.hasWon()){
        setIsActive(false);
        return<div className='tile2048'></div>
    } else if(board.hasLost()){
        setIsActive(false);
        return(
        <div className='gameOver' onClick={onRestart}>
            <img 
                src={TryAgainLogo}
                alt="Try Again" 
                style={{
                    width:'100%', 
                    height: '100%', 
                    cursor: 'pointer',
                }} 
            />
        </div>)
    }

    return null;
}
