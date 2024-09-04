class Player{
    constructor(name) {
        this.name = name;
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


class Match {
    constructor(leftCompetitor, rightCompetitor) {
        this.left = leftCompetitor;
        this.right = rightCompetitor;
    }
}


class Tournament {
    constructor(players) {
        this.matches = [];
        this.createMatches(players);
    }

    createMatches(players) {
        if (players.length < 2) {
            throw new Error("At least two players are required to create a tournament.");
        }
        
        for (let i = 0; i < players.length; i++) {
            for (let j = i + 1; j < players.length; j++) {
                this.matches.push(new Match(players[i], players[j]));
            }
        }
    }

    getCurrentMatches() {
        return this.matches;
    }
}

players = populatePlayers(8)
console.log(players)
const tournament = new Tournament(players)
console.log(tournament.getCurrentMatches())