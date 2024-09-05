import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [numPlayers, setNumberPlayers] = useState(8);
  const [format, setFormat] = useState("elim");
  const [showResult, setShowResult] = useState(false);

  const maxPlayers = 32;

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
    if (format === "elim" && !isPowerOfTwo(numPlayers)) {
      alert(
        "Número de jogadores de um torneio elimintório precisam ser uma potência de 2"
      );
      return;
    }

    setShowResult(true);
  };
  const handleBack = () => {
    setShowResult(false);
    setFormat("elim");
    setNumberPlayers(8);
  };

  return (
    <>
      {!showResult && (
        <div className="setupContainter">
          <div className="tournament-setup">
            <h1>Criar torneio</h1>

            {/* Seleão de quantidade de jogador*/}
            <div className="form-group">
              <label htmlFor="numPlayers">Número de jogadores</label>
              <select
                id="numPlayers"
                value={numPlayers}
                onChange={handleNumPlayersChange}
              >
                {format === "elim" &&
                  // Mostrar apenas números que são potência de dois pulando o 1
                  [...Array(Math.floor(Math.log2(maxPlayers)))].map((_, i) => {
                    const powerOfTwo = 2 ** (i + 1); //pular o 1
                    return (
                      <option key={powerOfTwo} value={powerOfTwo}>
                        {powerOfTwo} Jogadores
                      </option>
                    );
                  })}
                {format === "robin" &&
                  [...Array(maxPlayers)].map((_, i) => (
                    <option key={i + 2} value={i + 2}>
                      {i + 2} Jogadores
                    </option>
                  ))}
              </select>
            </div>

            {/* Seleção de formato */}
            <div className="form-group">
              <label>Formato do torneio:</label>
              <div>
                <div className="labelContainer">
                  <label>
                    <input
                      type="radio"
                      value="elim"
                      checked={format === "elim"}
                      onChange={handleFormatChange}
                    />
                    Chave eliminatória
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
                    Grupo único
                  </label>
                </div>
              </div>
            </div>

            {/* Botão de gerar*/}
            <div className="buttonContainer">
              <button onClick={handleClick}>Gerar jogos</button>
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

  // usando hook para buscar dados da api
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
  }, [format, players]);

  if (format === "elim") {
    return (
      <div className="bracket">
        {tournamentData.map((roundData, roundIndex) => (
          <Round key={roundIndex} matches={roundData} />
        ))}
      </div>
    );
  }

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
      //ternário pra colocar o lado vencedor verde
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
              <th>Partida</th>
              <th>Jogador 1</th>
              <th>Jogador 2</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* index da partida*/}
                <td>{match.left.name}</td> {/* Jogador 1 */}
                <td>{match.right.name}</td> {/* Jogador 2 */}
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
      <button onClick={setState}>Voltar</button>
    </div>
  );
};

export default App;
