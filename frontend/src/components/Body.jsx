import game1 from '../assets/games/2048.png'
import game2 from '../assets/games/pairs.jpeg'

export default function Body({handleClick, AuthToken}){

    return (
        <main className="max-w-sm  lg:max-w-5xl mx-auto">
            <section className="mt-12">
                <h2 className=" text-2xl text-cyan-500 ">Careers</h2>
                <p className="mt-4">Our people are our passion at FDM. That’s why we make your training and career growth a priority. Our vibrant and diverse workforce of talented professionals is what makes FDM such a dynamic and exciting place to work.</p>
            </section>

            <section className="mt-12">
                <h2 className=" text-2xl text-cyan-500 ">FDM Pathways</h2>
                <p className="mt-4">At FDM we want to help you find what career suits YOU.  So we have developed 3 short mini games to analyse some key skills and suggest a potential stream for you to apply for.</p>
                {!AuthToken && <button className="outline-none bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-4 py-1 mt-6 hover:from-purple-600 hover:to-blue-600 text-white font-bold"><a href="#" onClick={handleClick}>Join now</a></button>}

                <div className="games-grid mt-4 lg:mt-8 grid sm:grid-rows-3 md:grid-rows-2 lg:grid-rows-1 sm:grid-cols-12 gap-4 md:gap-12 items-center content-center">
                    <div className="game sm:col-span-12 md:col-span-6 lg:col-span-4 justify-self-center">
                        {/* <p>Game 1</p> */}
                        <img src={game1} className="min-h-full"/>
                    </div>
                    <div className="game sm:col-span-12 md:col-span-6 lg:col-span-4 justify-self-center">
                        {/* <p>Game 2</p> */}
                        <img src={game2} className="min-h-full"/>
                    </div>
                    <div className="game sm:col-span-12 lg:col-span-4 justify-self-center">
                        <p>Game 3</p>
                    </div>
                </div>
            </section>
        </main>
    )
}