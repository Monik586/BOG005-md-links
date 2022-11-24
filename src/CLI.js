const { mdLinks } = require('../src/index.js');
const { stats, validatStats } = require("./statsBroken.js");
const rutaTerminal = process.argv[2]
const option = process.argv

// Solo stats
if ( option.includes('--stats') === true && option.includes('--validate') === false ) {
    mdLinks(rutaTerminal, { validate: true })
        .then(resp => {
            stats(resp)
            console.table(stats(resp));
        })
        .catch(err => console.log(err));
}
// Solo validate
if (option.includes('--validate') === true &&  option.includes('--stats') === false) {

        //cuando se ingresa la ruta y validate
        mdLinks(rutaTerminal, { validate: true })
            .then(resp => console.log(resp, 'ruta y validate', 13))
            .catch(err => console.log(err));
  
}else if (option.includes('--validate') === false  &&  option.includes('--stats') === false) {
    //cuando se ingresa solo la ruta
    mdLinks(rutaTerminal)
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
}else if(option.includes('--validate') === true  &&  option.includes('--stats') === true){
    mdLinks(rutaTerminal, { validate: true })
        .then(resp => {
            stats(resp)
            console.table(validatStats(resp));
        })
        .catch(err => console.log(err));

}

// Genesis recomienda:
// No publicar
// Hacer test de :  stats, validatStats y linkValidate

