//evolution.model.ts

import { Schema, model } from 'mongoose'
import {
  Evolution,
  EvolutionMethods,
  EvolutionModel
} from '../types/evolution.type'
export const EVOLUTION_POKEMON_REFERENCE = 'Evolution'

const Evolutions = new Schema<Evolution, EvolutionModel, EvolutionMethods>({
  basePokemonId: {
    type: Schema.Types.ObjectId,
    ref: 'Pokemon',
    required: true
  },
  evolvesToPokemonId: {
    type: Schema.Types.ObjectId,
    ref: 'Pokemon',
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  condition: {
    type: String
  }
})

Evolutions.methods.toClient = function () {
  return {
    id: this._id as unknown as string,
    basePokemonId: this.basePokemonId,
    evolvesToPokemonId: this.evolvesToPokemonId,
    level: this.level,
    condition: this.condition
  }
}

export default model(EVOLUTION_POKEMON_REFERENCE, Evolutions)
