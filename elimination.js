import {populatePlayers, Player} from './utils.js'       


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

export class EliminTournament {
    //players array
    constructor(players){
        this.matchs = [];
        this.createMatches(players)
        this.results = []
    }

    createMatches(players) {
    for (let i = 0; i < players.length; i += 2){
        const match = new Match(players[i], players[i+1])
            this.matchs.push(match)
        }
    }

    advanceTournament() {
        const winners = []

        for(const match of this.matchs){
            const winner = Math.random() < 0.5 ? match.left : match.right;
            match.setWinner(winner)
            winners.push(match.winner)
        }
        this.results.push(this.matchs)
        if (this.hasWinner())
            return
        this.matchs = []; //reset the matches array
        this.createMatches(winners);
    }

    hasWinner() {
        return this.matchs.length === 1 && this.matchs[0].winner !== null;
    }

    simulate() {
        while(!this.hasWinner()){
            this.advanceTournament()
        }
    }

}
