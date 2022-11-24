const { isPathAbsolute, searchRoutesMds, linkValidate, readAllMd } = require("./funcionesPuras")

const mdLinks = (path, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    const absolutePaht = isPathAbsolute(path)
    const arrayMds = searchRoutesMds(absolutePaht)
    if (options.validate) {
      readAllMd(arrayMds)
      .then((arrayLinks) => linkValidate(arrayLinks)
      .then(res => resolve(res)))

    } else {
      readAllMd(arrayMds)
      .then((arrayLinks) => resolve(arrayLinks))

    }
  })

}

module.exports = {
  mdLinks,
  
}
