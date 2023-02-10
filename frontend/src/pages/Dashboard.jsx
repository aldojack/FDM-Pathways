export default function Dashboard({ User }) {

  const highScoresList = Object.entries(User.highScores).map(([key, value]) => {
    return <p key={key}>{key}: {value}</p>
  });

  const suggestStream = () => {
    let suggestedStream = '';

    /*
      Maybe look into grading the games based on scores and adding hasPlayed

      If all games have been played then loop through the potential grades [A+, A, B, C, D]

      If more than 1 game have the same high grade then show a suggesting for a combination of the games
    */
  }

  return (
    <main className="max-w-sm  lg:max-w-5xl mx-auto text-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>
        Name: {User.firstName} {User.lastName}
      </p>
      <p>Email: {User.email}</p>
      <h2 className="text-1xl font-bold">High Scores</h2>
      <div>
        {highScoresList}
      </div>
      <h2 className="text-1xl font-bold">Suggested Stream</h2>
      <p>Pending</p>
    </main>
  );
}
