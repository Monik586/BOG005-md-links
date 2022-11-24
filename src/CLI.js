// leer los comandos de la terminal para poder decidir que cosa se le muestra al usuario
// solo utiliza mdl y la funcioon stats y broken

const { mdLinks } = require('../src/index.js');
const { stats, validatStats } = require("./statsBroken.js");
const rutaTerminal = process.argv[2]
const option = process.argv
// console.log(option)

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


// const opciones = process.argv
// validatStats
// console.log('opciones: ', opciones);

// const mdLinks = require('mdLinks.js');
// console.log(mdLinks)



// const file = Option[2];
// let sentValidate = false;
// let sentStats = false;

// if (Option[3] === '--validate') {
// 	sentValidate = true;
// }
// if (Option[3] === '--stats') {
// 	sentStats = true;
// }
// if (Option[4] === '--validate') {
// 	sentValidate = true;
// }
// if (Option[4] === '--stats') {
// 	sentStats = true;
// }

// console.log("sentValidate:" + sentValidate)
// console.log("sentStats" + sentStats)

// if (sentValidate === true && sentStats === false) {
// 	const p = mdLinks(file, {validate:true})
// }
// else if (sentValidate === false && sentStats === false) {
// 	const p = mdLinks(file, {validate:false})
// }
// else if (sentValidate === false && sentStats === true) {
// 	const p = mdLinks(file, {validate:true})
// }
// else if (sentValidate === true && sentStats === true) {
// 	const p = mdLinks(file, {validate:true})

// 	p.then(
// 		(links) =>{
// 			console.log(links)
// 		}
// 	)
// }


























// //cuando se ingresa validate y stats
// mdLinks(rutaTerminal, { validate: true })
//     .then(resp => console.log('validate y stats: ', broken(resp)))
//     .catch(err => console.log(err));


// //cuando se ingresa solo stats
// mdLinks(rutaTerminal)
//     .then(resp => console.log('SOLO STATS: ', stats(resp)))
//     .catch(err => console.log(err));


// Genesis recomienda:
// No publicar
// Hacer test de :  stats, validatStats y linkValidate

