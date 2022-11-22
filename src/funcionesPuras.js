const path = require('path');
const fs = require('fs');
const marked = require('marked');
// const fetch = require('node-fetch');
// const argsTerminal = process.argv
// const routeTerminal = process.argv[2]
const axios = require('axios')

// const isPathExist = (route) => {
//   if (!fs.existsSync(route)) {
//     console.log('Path does not exist')
//   } else {
//     console.log('path exists.')
//   }
// };

/**
 * 
 * @param {string} route 
 * @returns string de ruta convertida
 */
const isPathAbsolute = (route) => {
  if (!path.isAbsolute(route)) {
    // console.log('The path is relative')
    // console.log('Pathname is absolute ', path.resolve(route))
    return path.resolve(route)
  } else {
    // console.log('is absolute')
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
    // let absolutePath = elementos.map((fileName) => path.join(route, fileName));
    elementos.forEach((elementoName) => {
      let childRoute = path.join(route, elementoName)
      if (fs.statSync(childRoute).isDirectory()) {
        arrayMds = arrayMds.concat(searchRoutesMds(childRoute));
      } else {
        arrayMds.push(childRoute)
      }
    });
  }
  // console.log(arrayMds);
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
            // console.log(infoLinks,69);
            if (infoLinks.href.includes('http')) {
              arrayLinks.push(infoLinks);
              // console.log(arrayLinks,72);
              resolve(arrayLinks);
            }
          };
          marked.marked(data, { renderer });
        }
      });
    })


  });
};

/* function fixArrayObjects(MDfileSet) {
 let arrayPromises = [];
 arrayPromises = MDfileSet.map((element) => {
return getLinks(element)
 });
 return Promise.all(arrayPromises).then((res) => res.flat());
};*/

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
    return axios.get(obj.href).then((response) => {
      obj.status = response.status,
      obj.ok = '✔'
      //console.log(obj, 102);
      return obj;
    }).catch((error) => {
      obj.status = 404;
      obj.ok = "Fail";
      return obj;
    });
  })
  return Promise.all(arrayLinksMod).then(res => res);
}

// new Promise((resolve, reject)=>{})
// const resolveValidate = (links, route) => {
//   console.log(links, route,98);
//   links.forEach(({ id, href }) =>
//     linksValidatePromises.push(linkValidate(id, href))
//   );
//   Promise.all(linksValidatePromises)
//     .then((stats) => {
//       resolve(
//         links.map((link) => ({
//           ...link,
//           ...stats.find(({ id }) => id === link.id),
//         }))
//       );
//     })
//     .catch(() => reject(new Error(`There are no valid links ${route}`)));
// };

/*isPathExist(routeTerminal);
isPathAbsolute(routeTerminal);
console.log(searchRoutesMds(routeTerminal), 119);
// readArrayRoutsMd(searchRoutesMds(routeTerminal)).then(res => console.log('resultado de los links; ', res))
// readRouts(argsTerminal[2]);
readAllMd(searchRoutesMds(routeTerminal)).then((arrayLinks) => {
  // console.log(arrayLinks,125)
  (linkValidate(arrayLinks)).then(res => console.log(res)) 
})*/

module.exports = {
  // isPathExist,
  isPathAbsolute,
  searchRoutesMds,
  readAllMd,
  linkValidate,
}


