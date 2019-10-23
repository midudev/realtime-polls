import Cors from 'micro-cors'
import nanoid from 'nanoid'

const cors = Cors()

const voters = []
const votes = { react: 0, vue: 0, angular: 0, other: 0 }
const POLLS = ['holyjs']

function endpoint (req, res) {
  if (req.method === 'GET') {
    const totalVotes = Object.values(votes).reduce((prev, num) => prev + num)
    const percentatge = Object.keys(votes).reduce((percentatges, answer) => {
      const calculation = totalVotes === 0 ? totalVotes : votes[answer] / totalVotes * 100
      percentatges[answer] = Math.round(calculation * 100) / 100
      return percentatges
    }, {})

    res.json({
      raw: votes,
      percentatge,
      totalVotes
    })
  }

  if (req.method === 'POST') {
    const userId = nanoid()
    const { _vt: userIdFromCookie } = req.cookies
    const { poll, answer } = req.body

    const isCorrectPoll = POLLS.includes(poll)
    if (!isCorrectPoll) {
      return res.status(400).json({ STATUS: 'Incorrect poll' })
    }

    // const hasUserAlreadyVoted = voters.includes(userIdFromCookie)
    // if (hasUserAlreadyVoted) {
    //   return res.status(400).json({ STATUS: 'Already voted' })
    // }

    const answerVoted = typeof votes[answer] !== 'undefined' ? votes[answer]++ : false

    if (answerVoted === false) {
      return res.status(400).json({ STATUS: 'Invalid answer' })
    }

    voters.push(userId) // save voter
    res.setHeader('Set-Cookie', `_vt=${userId}`) // store the cookie
    res.json({ STATUS: 'OK' }) // send the response
  }
}

export default cors(endpoint)
