import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [numPlayers, setNumberPlayers] = useState(8);
  const [format, setFormat] = useState("elim");
  const [showResult, setShowResult] = useState(false);

  const maxPlayers = 16;

  const handleNumPlayersChange = (e) => {
    setNumberPlayers(e.target.value);
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const isPowerOfTwo = (x) => {
    return (Math.log(x) / Math.log(2)) % 1 === 0;
  };

  const handleClick = () => {
    if (format === "elim" && !isPowerOfTwo(numPlayers)){
      alert("Number of players must be in the power of 2");
      return
    }

    setShowResult(true);
  };
  const handleBack = () => {
    setShowResult(false);
    setFormat("elim")
    setNumberPlayers(8)
  };

  return (
    <>
      {!showResult && (
        <div className="setupContainter">
          <div className="tournament-setup">
            <h1>Setup Tournament</h1>

            {/* Number of Players Selection */}
            <div className="form-group">
              <label htmlFor="numPlayers">Number of Players:</label>
              <select
                id="numPlayers"
                value={numPlayers}
                onChange={handleNumPlayersChange}
              >
                {format === "elim" &&
                  // Display only powers of 2 starting from 2 up to maxPlayers
                  [...Array(Math.floor(Math.log2(maxPlayers)))].map((_, i) => {
                    const powerOfTwo = 2 ** (i + 1); // Start from 2^1 = 2
                    return (
                      <option key={powerOfTwo} value={powerOfTwo}>
                        {powerOfTwo} Players
                      </option>
                    );
                  })}
                {format === "robin" &&
                  [...Array(maxPlayers)].map((_, i) => (
                    <option key={i + 2} value={i + 2}>
                      {i + 2} Players
                    </option>
                  ))}
              </select>
            </div>

            {/* Tournament Format Selection */}
            <div className="form-group">
              <label>Tournament Format:</label>
              <div>
                <div className="labelContainer">
                  <label>
                    <input
                      type="radio"
                      value="elim"
                      checked={format === "elim"}
                      onChange={handleFormatChange}
                    />
                    Single Elimination
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="robin"
                      checked={format === "robin"}
                      onChange={handleFormatChange}
                    />
                    Round-Robin
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="buttonContainer">
              <button onClick={handleClick}>Generate Tournament</button>
            </div>
          </div>
        </div>
      )}
      {showResult && (
        <div>
          <TournamentResult players={numPlayers} format={format} />
          <BackButton setState={handleBack} />
        </div>
      )}
    </>
  );
};

const TournamentResult = ({ players, format }) => {
  const [tournamentData, setTourmanetData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:4000/${format}?players=${players}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          console.log(players);
          setTourmanetData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);

  if (format === "elim") {
    return (
      <div className="bracket">
        {tournamentData.map((roundData, roundIndex) => (
          <Round key={roundIndex} matches={roundData} />
        ))}
      </div>
    );
  }
  console.log(tournamentData);

  return (
    <>
      <RoundRobinTable matches={tournamentData} />
    </>
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
    <div
      className={`match ${
        match.winner.name === match.left.name ? "winner-left" : "winner-right"
      }`}
    >
      <div
        className={`team ${
          match.winner.name === match.left.name ? "winner" : ""
        }`}
      >
        {match.left.name}
      </div>
      <div
        className={`team ${
          match.winner.name === match.right.name ? "winner" : ""
        }`}
      >
        {match.right.name}
      </div>
    </div>
  );
};

const RoundRobinTable = ({ matches }) => {
  return (
    <div>
      <h2>Round Robin Matches</h2>
      <div className="round-robin-table">
        <table>
          <thead>
            <tr>
              <th>Match</th>
              <th>Player 1</th>
              <th>Player 2</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* Match number */}
                <td>{match.left.name}</td> {/* Player 1 */}
                <td>{match.right.name}</td> {/* Player 2 */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BackButton = ({ setState }) => {
  return (
    <div className="buttonContainer">
      <button onClick={setState}>Back</button>
    </div>
  );
};

export default App;
