
class Player {
    constructor(name) {
        this.name = name
    }
}

function populatePlayers(numPlayers) {
    players = []
    for(let i = 1; i < numPlayers + 1; i++){
        playername = "Player " + i;
        player = new Player(playername)
        players.push(player)
    }
    return players
}

function testPlayers(players){
    for (let i = 0; i < players.length; i += 2){
        console.log('---')
        console.log(players[i])
        console.log(players[i + 1])
        console.log('---')
    }
}

class Match {
    constructor(leftPlayer, rightPlayer ) {
        this.left = leftPlayer
        this.right = rightPlayer
        this.winner = null
    }

    setWinner(winner) {
        if(winner === this.left || winner === this.right){
            this.winner = winner
        }
        else {
            throw new Error("Wrong winner")
        }
    }
}

class Tournament {
    //players array
    constructor(players){
        this.matchs = [];
        this.createMatches(players)
    }

    createMatches(players) {
    for (let i = 0; i < players.length; i += 2){
        const match = new Match(players[i], players[i+1])
        this.matchs.push(match)
        }
    }

    getCurrentMatches() {
        return this.matchs;
    }
}


players = populatePlayers(8)

const tournament = new Tournament(players)
console.log(tournament.getCurrentMatches())

