// src/types/evolution.type.ts
import { Schema, Model } from 'mongoose'

export type Evolution = ToClientEvolution & {
  createdAt?: Date
  lastModified?: Date
}

export type ToClientEvolution = {
  id?: string
  basePokemonId: Schema.Types.ObjectId // Referencia a IPokemon
  evolvesToPokemonId: Schema.Types.ObjectId // Referencia a IPokemon
  level: number
  condition?: string
}

export type EvolutionMethods = {
  toClient: () => ToClientEvolution
}

export type EvolutionModel = Model<Evolution, {}, EvolutionMethods>
