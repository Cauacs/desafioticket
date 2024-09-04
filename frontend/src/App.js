// import React, { useEffect, useState } from "react";
// import "./App.css";

// const App = () => {

//   const [tournamentData, setTourmanetData] = useState([])
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetch("http://localhost:4000/elim?players=16")
//       .then((res) => {
//         return res.json()
//       })
//       .then((data) => {
//         console.log(data)
//         setTourmanetData(data)
//       })
//     }
//     fetchData()
//   }, [])

//   return (
//     <div className="bracket">
//       {tournamentData.map((roundData, roundIndex) => (
//         <Round key={roundIndex} matches={roundData} />
//       ))}
//     </div>
//   );
// };

// const Round = ({ matches }) => {
//   return (
//     <div className="round">
//       {matches.map((match, index) => (
//         <Match key={index} match={match} />
//       ))}
//     </div>
//   );
// };

// const Match = ({ match }) => {
//   return (
//     <div className={`match ${match.winner.name === match.left.name ? 'winner-left' : 'winner-right'}`}>
//       <div className={`team ${match.winner.name === match.left.name ? 'winner' : ''}`}>
//         {match.left.name}
//       </div>
//       <div className={`team ${match.winner.name === match.right.name ? 'winner' : ''}`}>
//         {match.right.name}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
    const [numPlayers, setNumberPlayers] = useState(8);
    const [format, setFormat] = useState("singleElimination")

    const handleNumPlayersChange = (e) => {
        setNumberPlayers(e.target.value)
    }

    const handleFormatChange = (e) => {
        setFormat(e.target.value);
    };

    return (
      <div className="tournament-setup">
        <h1>Setup Tournament</h1>
  
        {/* Number of Players Selection */}
        <div className="form-group">
          <label htmlFor="numPlayers">Number of Players:</label>
          <select id="numPlayers" value={numPlayers} onChange={handleNumPlayersChange}>
            <option value="4">4 Players</option>
            <option value="8">8 Players</option>
            <option value="16">16 Players</option>
            <option value="32">32 Players</option>
          </select>
        </div>
  
        {/* Tournament Format Selection */}
        <div className="form-group">
          <label>Tournament Format:</label>
          <div>
            <label>
              <input
                type="radio"
                value="singleElimination"
                checked={format === "singleElimination"}
                onChange={handleFormatChange}
              />
              Single Elimination
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="roundRobin"
                checked={format === "roundRobin"}
                onChange={handleFormatChange}
              />
              Round-Robin
            </label>
          </div>
        </div>
  
        {/* Submit Button */}
        <button>Generate Tournament</button>
      </div>
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