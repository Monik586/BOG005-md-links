const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
const argsTerminal = process.argv
const routeTerminal = process.argv[2]

const isPathExist = (route) => {
  if (!fs.existsSync(route)) {
    console.log('Path does not exist')
  } else {
    console.log('path exists.')
  }
};

const isPathAbsolute = (route) => {
  if (!path.isAbsolute(route)) {
    console.log('The path is relative')
    console.log('Pathname is absolute ', path.resolve(route))
    return path.resolve(route)
  } else {
    console.log('is absolute')
    return param
  }
};

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








const readOneMd = (fileMd) => {
  const arrayLinks = [];
  return new Promise((resolve, reject) => {
    fs.readFile(fileMd, 'UTF-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const renderer = new marked.Renderer();
        renderer.link = (href, title, text) => {
          const infoLinks = {
            href: link,
            title: text,
            file: fileMd,
          };
          if (infoLinks.href.includes('http')) {
            arrayLinks.push(infoLinks);
          }
        };
        marked.marked(data, { renderer });
      }
    });
    resolve(arrayLinks);
  });
};

// function fixArrayObjects(MDfileSet) {
//   let arrayPromises = [];
//   arrayPromises = MDfileSet.map((element) => {
//     return getLinks(element)
//   });
//   return Promise.all(arrayPromises).then((res) => res.flat());
// };


const linkValidate = (id, url) =>
  new Promise((resolve) =>
    axios(url)
      .then((res) =>
        resolve({ id, status: res.status, statusText: res.statusText })
      )
      .catch(() => resolve({ id, status: 404, statusText: 'fail' }))
  );
// new Promise((resolve, reject)=>{})
const resolveValidate = (links, route) => {
  console.log(links, route,98);
  links.forEach(({ id, href }) =>
    linksValidatePromises.push(linkValidate(id, href))
  );
  Promise.all(linksValidatePromises)
    .then((stats) => {
      resolve(
        links.map((link) => ({
          ...link,
          ...stats.find(({ id }) => id === link.id),
        }))
      );
    })
    .catch(() => reject(new Error(`There are no valid links ${route}`)));
};

isPathExist(routeTerminal);
isPathAbsolute(routeTerminal);
console.log(searchRoutesMds(routeTerminal));
// readArrayRoutsMd(searchRoutesMds(routeTerminal)).then(res => console.log('resultado de los links; ', res))
// readRouts(argsTerminal[2]);

module.exports = {
  isPathExist,
  isPathAbsolute,
  searchRoutesMds,
  readOneMd,
  linkValidate,
  resolveValidate,
  // readArrayRoutsMd,
}


// Extraer links de un archivo - Recibe el path a un archivo
// 1. Leer el contenido de un archivo => fs.readFileSync()
// 2. Usar expresiones regulares para ubicar patrones de texto dentro del contenido leido en el paso 1 .match(regex)
// 3. Limpiar los links de los matches obtenidos en el paso 2 => regex, .replace()
// 4. Armar un array de objetos con las attributos necesarios

/*
resultado paso 2
const arrLinks = [
  "[1. Preámbulo](http://google.com)",
  "[2. Preámbulo](http://google.com)",
  "[3. Preámbulo](http://google.com)",
  "[4. Preámbulo](http://google.com)",
]

resulta paso 3 y 4
const arrObj = [
  {
    text: "1. Preámbulo",
    href: "http://google.com",
  },
  {
    text: "2. Preámbulo",
    href: "http://google.com",
  },
  {
    text: "3. Preámbulo",
    href: "http://google.com",
  },
  {
    text: "4. Preámbulo",
    href: "http://google.com",
  },
]

*/

