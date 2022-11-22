const { isPathAbsolute, searchRoutesMds, linkValidate, readOneMd } = require("./path")


const rutaTerminal = process.argv[2]


const mdLinks = (path, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    const absolutePaht = isPathAbsolute(path)
    const arrayMds = searchRoutesMds(absolutePaht)
    if (options.validate === true) {
      readOneMd(arrayMds).then((arrayLinks) => linkValidate(arrayLinks).then(res => resolve(res)))

    } else {
      readOneMd(arrayMds).then((arrayLinks) => resolve(arrayLinks))

    }
  })

}

mdLinks(rutaTerminal)
  .then(rest => console.log(`respuesta md-lnks:
${rest}`))
  .catch(err => console.log(err));


// mdLinks(xxxx).then(res=>console.log(res))



module.exports = () => {
  // ...
};
