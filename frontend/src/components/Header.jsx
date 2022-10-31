export default function Header(){
    return(
        <header className=" bg-header-background bg-cover bg-no-repeat flex items-center justify-center text-white border-b-4 border-blue-600" style={{height: "350px"}}>
            <div className="hero-text">
                <h2 className="text-3xl lg:text-4xl max-w-240 drop-shadow-2xl">Your tech career starts here</h2>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-4 py-1 mt-6 hover:from-white hover:to-white hover:text-black font-bold"><a href="#">Join now</a></button>
            </div>
        </header>
    )
}