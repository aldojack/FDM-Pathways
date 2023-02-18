import GamesContainer from './GamesContainer'

//May need removed if not used
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
                <GamesContainer AuthToken={AuthToken}/>
            </section>
        </main>
    )
}