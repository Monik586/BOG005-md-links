const path = require('path');
const fs = require('fs');
const marked = require('marked');
const axios = require('axios')

/**
 * 
 * @param {string} route 
 * @returns string de ruta convertida
 */
const isPathAbsolute = (route) => {
  if (!path.isAbsolute(route)) {
    return path.resolve(route)
  } else {
    return param
  }
};

/**
 * 
 * @param {string} route 
 * @returns array de strings las rutas md
 */
const searchRoutesMds = (route) => {
  let arrayMds = [];
  if (fs.statSync(route).isFile() === true) {
    arrayMds.push(route)
  } else {
    const elementos = fs.readdirSync(route);
    elementos.forEach((elementoName) => {
      let childRoute = path.join(route, elementoName)
      if (fs.statSync(childRoute).isDirectory()) {
        arrayMds = arrayMds.concat(searchRoutesMds(childRoute));
      } else {
        arrayMds.push(childRoute)
      }
    });
  }

  return arrayMds.filter(ele => path.extname(ele) === '.md')
};

/**
 * 
 * @param {array} arrayFileMd 
 * @returns promesa de array de objetos
 * href,file,text
 */
const readAllMd = (arrayFileMd) => {
  const arrayLinks = [];
  return new Promise((resolve, reject) => {
    arrayFileMd.forEach((fileMd) => {
      fs.readFile(fileMd, 'UTF-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const renderer = new marked.Renderer();
          renderer.link = (href, title, text) => {
            const infoLinks = {
              'href': href,
              'file': fileMd,
              'text': text
            };

            if (infoLinks.href.includes('http')) {
              arrayLinks.push(infoLinks);

              resolve(arrayLinks);
            }
          };
          marked.marked(data, { renderer });
        }
      });
    })

  });
};

/**
 * 
 * @param {array} arrayLinks
 * array de objetos href,file,text 
 * @returns promesa resuelta
 * array de objetos modificado
 * href,file,text,status,ok
 */
const linkValidate = (arrayLinks) => {

  let arrayLinksMod = arrayLinks.map((obj) => {
    return axios.get(obj.href)
      .then((response) => {
        obj.status = response.status,
          obj.ok = '✔'
        return obj;
      }).catch((error) => {
        obj.status = 404;
        obj.ok = "Fail";
        return obj;
      });
  })
  return Promise.all(arrayLinksMod).then(res => res);
}
module.exports = {

  isPathAbsolute,
  searchRoutesMds,
  readAllMd,
  linkValidate,

}


