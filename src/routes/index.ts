// index.ts

// importo express
import express from 'express'
// importo el router PokemonRouter
import PokemonRouter from './pokemon.route'
// importo el router UserRouter
import UserRouter from './user.route'
// importo el router AuthRouter
import AuthRouter from './auth.route'
// importo el router GenerationRouter
import GenerationRouter from './generation.route'

// funcion que recibe la aplicación
const routerApi = (app) => {
  //obtener el router de express
  const router = express.Router()
  // la aplicación va a utilzar una ruta "versionada" (versión 1)
  app.use('/api/v1', router)
  // subrouter pokemon
  router.use('/pokemons', PokemonRouter)
  // subrouter user
  router.use('/users', UserRouter)
  // subrouter auth
  router.use('/auth', AuthRouter)
  // subrouter auth
  router.use('/generations', GenerationRouter)
}

// exporto para que pueda comunicarse con el archivo app.ts
export default routerApi
