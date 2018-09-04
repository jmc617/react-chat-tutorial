const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const Chatkit = require('pusher-chatkit-server')
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:0071078a-4454-426a-96df-41cfc0c2f68f',
    key: 'c6c50442-be69-48ed-9c3d-efdcbd618258:EatUszgaSVOe3COdUBDPHrZmhm7tLlPm2lKj0R9FSjk=',
  })

app.post('/users', (req, res) => {
    const { username } = req.body
    chatkit
      .createUser({ 
  	    id: username, 
  	    name: username 
       })
      .then(() => res.sendStatus(201))
      .catch(error => {
        if (error.error_type === 'services/chatkit/user_already_exists') {
          res.sendStatus(200)
        } else {
          res.status(error.status).json(error)
        }
      })
  })
    
    app.post('/authenticate', (req, res) => {
      const authData = chatkit.authenticate({ userId: req.query.user_id })
      res.status(authData.status).send(authData.body)
    })

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
