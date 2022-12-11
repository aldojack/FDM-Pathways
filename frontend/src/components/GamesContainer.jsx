import { useEffect, useState } from 'react'
import game1 from '../assets/games/2048.png'
import game2 from '../assets/games/pairs.jpeg'
import GameLink from './GameLink'
import axios from 'axios';


export default function GamesContainer({AuthToken}) {
  const [games, setGames] = useState(null);

  useEffect(() => {
    if(AuthToken){
        const getGames = async() => {
            const response = await axios.get('http://localhost:8000/games');
            setGames(response.data);
        }
        getGames();
    }
},[])

  return (
    <div className="games-grid mt-4 lg:mt-8 grid sm:grid-rows-3 md:grid-rows-2 lg:grid-rows-1 sm:grid-cols-12 gap-4 md:gap-12 items-center content-center">
        {games && games.map(game => <GameLink AuthToken={AuthToken} Name={game.name} Description={game.description} PlaceholderImg={game1} key={game._id}/>)}
    </div>
  )
}
