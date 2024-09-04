export function populatePlayers(numPlayers) {
    const players = []
    for(let i = 1; i < numPlayers + 1; i++){
        const playername = "Player " + i;
        const player = new Player(playername)
        players.push(player)
    }
    return players
}

export class Player {
    constructor(name) {
        this.name = name
    }
}

