import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import axios from 'axios'

const PORT = 1000

axios.defaults.baseURL = process.env.MC_SERVER_URL
axios.defaults.headers.common['key'] = process.env.API_KEY

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('にゃ')
})

const allowedGets = [
    '/ping',
    '/scoreboard',
    '/server',
    '/worlds',
    '/worlds/1ffd8169-5763-495d-9634-b1ae4747400e',
    '/server/whitelist',
    '/plugins',
    '/players',
    '/players/all'
]

const allowedPosts = [

]

for (let a of allowedGets) {
    app.get(a, (req, res) => {
        console.log(`get ${a} from ${req.ip}`)
        axios.get(a).then(r => {res.send(r.data)}).catch(e => {console.log(e)})
    })
}

for (let a of allowedPosts) {
    app.post(a, (req, res) => {
        console.log(`post ${a} from ${req.ip}`)
        axios.get(a).then(r => {res.send(r.data)})
    })
}

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})