export default function Dashboard({ User }) {

  const highScoresList = Object.entries(User.highScores).map(([key, value]) => {
    return <p key={key}>{key}: {value}</p>
  });

  return (
    <div className="w-full">
    <main className="max-w-5xl mx-auto text-center">
    <div className=" bg-ghost p-3 mt-10 space-y-2">
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
      <p>{User.suggestedCareerPath}</p>
    </div>
    </main>
    </div>
  );
}
