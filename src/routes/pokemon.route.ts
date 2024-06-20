//pokemon.route.ts

// importo express
import express from 'express'
// importo el tipo requerido para las rutas
import { Pokemon } from '../types/pokemon.type'
// importo el servicio requerido para las rutas
import PokemonService from '../services/pokemon.service'
// importo passport
import passport from 'passport'
// importo el tipo UserRequestType para obtener el usuario por medio del request
import { UserRequestType } from '../types/user.type'
import { authorize } from '../middlewares/authorization'

//obtener el router de express, se necesita para crear una subruta en esta sección
const router = express.Router()

//creo una instancia del servicio en app.ts el nombre era pokemonSevice
const service = new PokemonService()

// Ruta Post guarda un pokemon en la base de datos
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize(['admin']), // Solo los administradores pueden agregar Pokémon
  async (req: UserRequestType, res, next) => {
    try {
      const pokemon: Pokemon = req.body
      //se crea al pokemon, y se guarda en la instancia newPokemon
      const newPokemon = await service.create(pokemon)
      //Envió la respuesta al cliente con ‘res’ y envió una respuesta del objeto newPokemon en formato JSON con código de estado 201
      res.status(201).json(newPokemon)
    } catch (error) {
      next(error)
    }
  }
)

// Ruta Get para obtener todos los Pokémon
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize(['user', 'admin']), // Los usuarios normales y administradores pueden consultar Pokémon
  async (req: UserRequestType, res, next) => {
    try {
      const { user } = req
      console.log(user) // console.log para mostrar los datos del paylot (id) del usuario en la terminal
      //busca todos lo pokemons
      const pokemons = await service.findAll()
      //200 por que busca si existen pokemons en el modelo
      res.status(200).json(pokemons)
    } catch (error) {
      next(error)
    }
  }
)

// Ruta Get para obtener un Pokémon por ID
router.get(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['user', 'admin']), // Los usuarios normales y administradores pueden consultar Pokémon por ID
  async (req: UserRequestType, res, next) => {
    try {
      //busca a un pokemon por id
      const pokemon = await service.findById(req.params.id)
      //200 por que busca si existe el pokemon en el modelo
      res.status(200).json(pokemon)
    } catch (error) {
      // sino lo encuentra se pasa al middleware
      next(error)
    }
  }
)

// Ruta Get para obtener un Pokémon por nombre
router.get(
  '/name/:name',
  passport.authenticate('jwt', { session: false }),
  authorize(['user', 'admin']), // Los usuarios normales y administradores pueden consultar Pokémon por nombre
  async (req: UserRequestType, res, next) => {
    try {
      // busca un Pokémon por nombre
      const pokemon = await service.findByName(req.params.name)
      // si se encuentra el Pokémon, devolverlo
      res.status(200).json(pokemon)
    } catch (error) {
      // si hay un error, pasarlo al middleware
      next(error)
    }
  }
)

// Ruta Put para actualizar un Pokémon por ID
router.put(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['admin']), // Solo los administradores pueden actualizar Pokémon
  async (req: UserRequestType, res, next) => {
    try {
      const updateData: Partial<Pokemon> = req.body
      const updatedPokemon = await service.updateById(req.params.id, updateData)
      res.status(200).json(updatedPokemon)
    } catch (error) {
      next(error)
    }
  }
)

// Ruta Delete para eliminar un Pokémon por ID
router.delete(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['admin']), // Solo los administradores pueden eliminar Pokémon
  async (req: UserRequestType, res, next) => {
    try {
      const deletedPokemon = await service.deleteById(req.params.id)
      res.status(200).json({
        message: 'Pokemon deleted successfully',
        pokemon: deletedPokemon
      })
    } catch (error) {
      next(error)
    }
  }
)

//exporto para que el main lo reciva y lo pueda ejecutar
export default router
