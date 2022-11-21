const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    
  })

}

/*const { readAllFilesMds } = require("./links");
const { isPathAbsolute } = require("./path");
const { getMdFiles } = require("./readDir");*/

const rutaTerminal = process.argv[2]

const mdLinks = (path, options={validate:false}) => {
    return new Promise((resolve, reject) =>{
        const absolutePaht = isPathAbsolute(path)
        const arrayMds = getMdFiles(absolutePaht)
        if(options.validate===true) {
            readAllFilesMds(arrayMds)
            .then(response=> resolve(response))
        } else {
            readAllFilesMds(arrayMds)
            .then(response=> validarHttp(response))
            .then(resp => resolver(resp))
        }
    })

}

mdLinks(rutaTerminal)
.then(rest => console.log(`respuesta md-lnks:
${rest}`))
.catch(err=>console.log(err));


// mdLinks(xxxx).then(res=>console.log(res))



module.exports = () => {
  // ...
};
