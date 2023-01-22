import AuthModal from "../components/AuthModal";
import { Link } from 'react-router-dom'


export default function Home({handleClick, AuthToken, showModal, setShowModal, isSignUp}) {

    return (
        <main className="max-w-sm  lg:max-w-5xl mx-auto">
        {AuthToken ?  
        <>

        <section className="mt-12 [&>p]:my-4">
                <h2 className=" text-2xl text-cyan-500 ">What Next?</h2>
                <ul className="text-center font-bold mt-4">
                  <li>Want to change career?</li>
                  <li>Undecided what is next for you?</li>
                </ul>
                <p>Then we have created carefully chosen games to help suggest potential careers so check out our Games</p>
                <p>Or if you have already tried out the games then visit your dashboard and see our suggestions</p>
                <div className="flex justify-evenly space-x-2">
                <Link to="/games" className='className="outline-none bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-4 py-1 hover:from-purple-600 hover:to-blue-600 text-white font-bold"'>Games</Link>
                <Link to="/dashboard" className='className="outline-none bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-4 py-1 hover:from-purple-600 hover:to-blue-600 text-white font-bold"'>Dashboard</Link>
                </div>
            </section> 

        <section className="mt-12 [&>p]:mt-4">
                <h2 className=" text-2xl text-cyan-500 ">The FDM Graduate Programme</h2>
                <p>Our two-year graduate programme gives you the opportunity to kick-start your career in technology with some of the world’s largest and well-known organisations, including HSBC, Virgin Media, the Home Office, Channel 4 and many more.</p>
                <p>Our graduate programmes begin with expert training courses, encompassing all the technical aspects of your chosen career path, as well as professional skills and working methodologies. Once you’ve completed your training, you’ll then be placed on our client’s sites as a qualified FDM Consultant, ready to get stuck into cutting-edge work.</p>
                <p>As an FDM Consultant, you will work as an integral part of our clients teams on exciting projects which could involve complex trade applications for global banks, new applications to optimise key operational systems for airlines, developing new entertainment channels for broadcast media or helping to improve critical government services that millions of UK citizens depend on daily.</p>
            </section>
          </>
            :
          <>
            <section className="mt-12">
                <h2 className=" text-2xl text-cyan-500 ">Careers</h2>
                <p className="mt-4">Our people are our passion at FDM. That’s why we make your training and career growth a priority. Our vibrant and diverse workforce of talented professionals is what makes FDM such a dynamic and exciting place to work.</p>
            </section>

            <section className="mt-12">
                <h2 className=" text-2xl text-cyan-500 ">FDM Pathways</h2>
                <p className="mt-4">At FDM we want to help you find what career suits YOU.  So we have developed 3 short mini games to analyse some key skills and suggest a potential stream for you to apply for.</p>
                {!AuthToken && <button className="outline-none bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-4 py-1 mt-6 hover:from-purple-600 hover:to-blue-600 text-white font-bold"><a href="#" onClick={handleClick}>Join now</a></button>}
            </section>
          </>
        }
        {showModal && (
            <AuthModal
                setShowModal={setShowModal}
                isSignUp={isSignUp}  
            />
        )}
        </main>
    )
  }