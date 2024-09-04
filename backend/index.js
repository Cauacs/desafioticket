import {EliminTournament} from "./elimination.js" 
import {robinTournament} from "./round-robin.js" 
import {Player,populatePlayers} from "./utils.js"
import express from 'express'
import cors from 'cors'


const app = express() 
app.use(cors())
const port = 4000

app.get('/', (req, res) => {
    res.send("Hello World")
})

// /elim?players=8
app.get('/elim', (req,res) => {
    
    const players = populatePlayers(parseInt(req.query.players))
    const elim = new EliminTournament(players)
    elim.simulate()
    res.json(elim.results)
    //res.send(JSON.stringify(elim.results,null, 2))
})

// /robin?players=8
app.get('/robin', (req, res) => {
    const players = populatePlayers(parseInt(req.query.players))
    const robin = new robinTournament(players)
    res.json(robin.getCurrentMatches())
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})