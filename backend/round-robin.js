
class Match {
    constructor(leftCompetitor, rightCompetitor) {
        this.left = leftCompetitor;
        this.right = rightCompetitor;
    }
}


export class robinTournament {
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