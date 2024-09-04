import {EliminTournament} from "./elimination.js" 
import {robinTournament} from "./round-robin.js" 
import {Player,populatePlayers} from "./utils.js"
import express from 'express'

const app = express() 
const port = 3000

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/elim', (req,res) => {
    const players = populatePlayers(8)
    const elim = new EliminTournament(players)
    elim.simulate()
    res.send(JSON.stringify(elim.results,null, 2))
})

app

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})