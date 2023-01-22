import GamesContainer from '../components/GamesContainer'

export default function Games({Games, AuthToken}) {
  return (
    <div>
        <main className="max-w-sm  lg:max-w-5xl mx-auto">
            <GamesContainer Games={Games} AuthToken={AuthToken}/>
        </main>
    </div>
  )
}
