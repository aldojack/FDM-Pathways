import GameCard from './GameCard'

export default function GamesContainer({Games, AuthToken}) {

  return (
    <div className="games-grid mt-4 gap-y-8 lg:mt-8 grid sm:grid-rows-3 md:grid-rows-2 lg:grid-rows-1 sm:grid-cols-12 gap-4 md:gap-12 items-center content-center">
        {Games && Games.map(game => <GameCard AuthToken={AuthToken} Name={game.name} Description={game.description} PlaceholderImg={game.img} key={game._id}/>)}
    </div>
  )
}
