const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
          // bodyParser
          const bodyParser = require('body-parser')
          app.use(bodyParser.urlencoded({ extended: false }))
          app.use(bodyParser.json())


// socket.io server
const socket = require('./server/config/socket')
io.on('connection', socket )

nextApp.prepare().then(() => {






      // router user :
      app.use('/user' , require('./server/router/api_user'))
      // router api :
      app.use('/api', require('./server/router/api_data'))








  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen( process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
