import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const AuthToken = cookies.AuthToken;
  const [User, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (AuthToken) {
      const userId = cookies.UserId;
      const getUser = async () => {
        try {
          const response = await axios.get("http://localhost:8000/user", {
            params: { userId },
          });
          setUser(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };
      getUser();
    }
  }, []);

  let streamLink;
  let successMessage;
  if (User?.suggestedCareerPath === "Technical Operations") {
    streamLink =
      "https://www.fdmgroup.com/careers/graduates/technical-graduate-programme/technical-operations-graduate-programme/";
      successMessage = "Congratulations on completing the three games on our website! Based on your performance, we suggest a career path in Technical Operations. As a Technical Operations Consultant, you will maintain critical business systems to ensure smooth operation, making this a great option for anyone interested in a technical role. This broad and varied role can lead to different pathways, including Software Development, Business Intelligence, or Project Management. You will need resilience, creativity, and effective communication skills as you manage and maintain IT infrastructure, discover solutions to technical problems, and communicate effectively in high-pressure environments."
  } else if (User?.suggestedCareerPath === "Software Testing") {
    streamLink =
      "https://www.fdmgroup.com/careers/graduates/technical-graduate-programme/software-testing-graduate-programme/";
      successMessage = "Congratulations on completing the three games on our website! Based on your performance, we suggest a career path in Software Testing. As a Software Tester, you will work closely with the Software Development team to ensure the quality of systems and software applications. This role is process-driven and can be divided into two areas - manual and automated testing. An interest in new technologies, curiosity, and professional pessimism are important skills to have. You will look for potential flaws in the code and highlight errors to the Software Developers for fixing."
  } else if (User?.suggestedCareerPath === "Business Intelligence") {
    streamLink =
      "https://www.fdmgroup.com/careers/graduates/technical-graduate-programme/business-intelligence-graduate-programme/";
      successMessage = "Congratulations on completing the three games on our website! Based on your performance, we suggest a career path in Business Intelligence. As a Business Intelligence Analyst, you will transform raw data into useful information for making important business decisions. Having an analytical mindset and understanding data are crucial for this role. Additionally, attention to detail, an appreciation for business, and effective communication skills are necessary to present data in a way that makes sense to others."

  }

  const highScoresList =
    User?.highScores &&
    Object.entries(User.highScores).map(([key, value]) => {
      return (
        <p key={key}>
          {key}: {value}
        </p>
      );
    });

  return (
    <div className="w-full">
      <div className="container mx-auto p-4">
        <div className="max-w-5xl bg-ghost p-8 mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-center text-vividviolet">
            Account Dashboard
          </h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="w-full md:w-1/3 mb-8 md:mb-0">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                  User Information
                </h2>
                <div className="flex flex-col items-center">
                  <p className="text-gray-500 mb-2">
                    <strong>Name:</strong> {User.firstName} {User.lastName}
                  </p>
                  <p className="text-gray-500 mb-2">
                    <strong>Email:</strong> {User.email}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                  High Scores
                </h2>
                {highScoresList ? (
                  <ul className="list-none flex flex-col items-center ">
                    <li className="flex items-center justify-between mb-2">
                      <span className="text-gray-500 font-bold">
                        2048:&nbsp;
                      </span>
                      <span className="text-gray-700 ">
                        {User.highScores["game2048"]}
                      </span>
                    </li>
                    <li className="flex items-center justify-between mb-2">
                      <span className="text-gray-500 font-bold">
                        Pairs:&nbsp;
                      </span>
                      <span className="text-gray-700">
                        {User.highScores["pairs"]}
                      </span>
                    </li>
                    <li className="flex items-center justify-between mb-2">
                      <span className="text-gray-500 font-bold">
                        Blackout:&nbsp;
                      </span>
                      <span className="text-gray-700 ">
                        {User.highScores["blackout"]}
                      </span>
                    </li>
                  </ul>
                ) : (
                  <p className="text-gray-500">No high scores found.</p>
                )}
              </div>
              <div className="w-full md:w-1/3">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                  Suggested Stream
                </h2>
                <div className="flex flex-col">
                  <p className="text-gray-500 font-bold">
                    {User.suggestedCareerPath}
                  </p>

                  {streamLink && (
                    <>
                      <p className="text-gray-500">
                        {successMessage}
                      </p>
                      <button className="outline-none bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-4 py-1 mt-6 hover:from-purple-600 hover:to-blue-600 text-white font-bold">
                        <a
                          href={streamLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn More
                        </a>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
