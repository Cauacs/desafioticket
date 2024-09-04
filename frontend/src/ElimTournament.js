import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
    const [numPlayers, setNumberPlayers] = useState(4);
    const [format, setFormat] = useState("singleElimination")

    const handleNumPlayersChange = (e) => {
        setNumberPlayers(e.target.value)
    }

    const handleFormatChange = (e) => {
        setFormat(e.target.value);
    };

    return (
        // <TournamentElim players={numPlayers}/>
        <div></div>
    );
};

export default App;

const TournamentElim = ({players}) => {

  const [tournamentData, setTourmanetData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:4000/elim?players=${players}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        console.log(players)
        setTourmanetData(data)
      })
    }
    fetchData()
  }, [])

  return (
    <div className="bracket">
      {tournamentData.map((roundData, roundIndex) => (
        <Round key={roundIndex} matches={roundData} />
      ))}
    </div>
  );
};

const Round = ({ matches }) => {
  return (
    <div className="round">
      {matches.map((match, index) => (
        <Match key={index} match={match} />
      ))}
    </div>
  );
};

const Match = ({ match }) => {
  return (
    <div className={`match ${match.winner.name === match.left.name ? 'winner-left' : 'winner-right'}`}>
      <div className={`team ${match.winner.name === match.left.name ? 'winner' : ''}`}>
        {match.left.name}
      </div>
      <div className={`team ${match.winner.name === match.right.name ? 'winner' : ''}`}>
        {match.right.name}
      </div>
    </div>
  );
};