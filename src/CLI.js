// leer los comandos de la terminal para poder decidir que cosa se le muestra al usuario
// solo utiliza mdl y la funcioon stats y broken

const { mdLinks } = require(".");
const { stats, broken } = require("./statsBroken");
const rutaTerminal = process.argv[2]
const opciones = process.argv

console.log('opciones: ', opciones);

//cuando se ingresa solo la ruta
mdLinks(rutaTerminal)
    .then(resp => console.log(resp, 'solo ruta'))
    .catch(err => console.log(err));


//cuando se ingresa la ruta y validate
mdLinks(rutaTerminal, {validate:true})
    .then(resp => console.log(resp, 'ruta y validate'))
    .catch(err => console.log(err));

//cuando se ingresa validate y stats
mdLinks(rutaTerminal, { validate: true })
    .then(resp => console.log('validate y stats: ', broken(resp)))
    .catch(err => console.log(err));


//cuando se ingresa solo stats
mdLinks(rutaTerminal)
    .then(resp => console.log('SOLO STATS: ', stats(resp)))
    .catch(err => console.log(err));

