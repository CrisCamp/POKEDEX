// se recibe el error, pero como es parte de la ejecución de rutas tambien se
// recibe el req y el res pero no se utilizaran, para no utilizar de manera
// obligatoria una variable definida en los parametros JavaScript y en TypeScript,
// se puede poner el prefijo '_' de esta manera ya no marcara el error de que no
// se esta utlizando dicha variable
// este middleware simplemente registra el error en la consola y luego pasa el error al siguiente middleware con next(error).
const logErrors = (error, _req, _res, next) => {
  console.log(error) // loguear el error
  next(error) // despues manda a llamar lo que sea
} // meddleware

// Este es otro middleware de error que maneja los errores que no son de Boom
// (Boom es una librería para manejar errores de manera consistente).
// Si el error no es de Boom, devuelve un código de estado 500 (Internal Server Error)
// junto con el mensaje de error y la pila de llamadas (stack) en formato JSON.
const errorHandler = (error, _req, res, _next) => {
  if (!error.isBoom) {
    // internal server error
    res.status(500).json({
      message: error.message, // mostrar el error
      stack: error.stack // stack que mande el error
    })
  }
}

// Handler de BOOM
// Este middleware de error se ocupa de los errores que son de tipo Boom. Si el error es de Boom,
// extrae el objeto de salida (output) del error, que contiene el código de estado HTTP y el mensaje
// de error, y lo devuelve como respuesta en formato JSON.
const boomErrorHandler = (error, _req, res, next) => {
  if (error.isBoom) {
    //Objeto output
    const { output } = error
    res.status(output.statusCode).json(output.payload)
  }

  next(error)
}

export { logErrors, errorHandler, boomErrorHandler }
