// app.ts

import express from 'express'
import mongoose from 'mongoose'
// importacion de los middlewares
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'
// importo los routers de ./routes/index.ts NO SE PONE index.ts
import routerApi from './routes'
// importo la configuración de config.ts
import { config } from './config/config'
// importo passport para que la aplicación la utilice
import passport from 'passport'
// importo el archivo que contiene las estrategias de autenticación ./utils/auth/index.ts NO SE PONE index.ts
import './utils/auth'

// establesco las variables para configuraciones
const { mongoUri, port } = config

const MONGO_URI = mongoUri

// creo la aplicacion de express
const app = express()
// hacer que la app pueda recibir json con el middleware
app.use(express.json())
// hago que la app inicie passport
app.use(passport.initialize())
// hacer que routerApi sepa que utlizando la aplicacion "app"
routerApi(app)

const connectDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Connected to Database :)')
    })
    .catch((error) => {
      console.log('Could not connect to Database', error)
    })
}

//ruta normal
app.get('/', (req, res) => {
  res.send('Hola saludame, :)')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  connectDB() //conecto la base de datos pokedex
})

app.use(logErrors) //error que se muestra en el servidor (en la terminal)
app.use(boomErrorHandler)
app.use(errorHandler) // error 500
