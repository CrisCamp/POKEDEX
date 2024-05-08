// servicio para leer el archivo .env
import dotenv from 'dotenv'
// leer el archivo.env (ejecuto el servicio)
dotenv.config()

// guardo la configuracion y la exporto
export const config = {
  // ambiente de desarrollo
  env: process.env.NODE_ENV || 'development',
  // ver si estamos en producción
  isProd: process.env.NODE_ENV === 'production',
  // busca el puerto y sino encuentra informacion hará fallback a 3000
  port: process.env.PORT || 3000,
  // busca la url de mongo en la variable MONGO_URI y sino encuentra informacion hará fallback a vacio
  mongoUri: process.env.MONGO_URI || '',
  // busca el secreto establecido, sino lo encuentra hará fallback a vacio
  jwtSecret: process.env.JWT_SECRET || ''
}
