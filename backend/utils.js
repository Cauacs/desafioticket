export function populatePlayers(numPlayers) {
  const players = [];
  for (let i = 1; i < numPlayers + 1; i++) {
    const playername = "Jogador " + i;
    const player = new Player(playername);
    players.push(player);
  }
  return players;
}

export class Player {
  constructor(name) {
    this.name = name;
  }
}

export function isPowerOfTwo(number) {
  return (Math.log(number) / Math.log(2)) % 1 === 0;
}
