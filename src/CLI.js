/*
  . arguments('path')
  . option('-v, --validate', 'validate the broken links') 
  . option('-s, --stats', 'calculates the stats of the links') 
  . action(mdLinks)
  . parse(process.argv);
*/
/*const option = {
validate: program.validate,
stats: program.stats
};
const route = program.args[0];*/

/*const option = {
    validate: true,
    stats: false,
}
/*const route ="C:\Users\monic\BOGOO5-mdl-28\BOG005-md-links\pruebas\readme.md";
if (!route) {
  console.log('enter a path');
} else {
  mdLinks(route, option)
    .then(arrLinks => {
      if (arrLinks.length === 0) {
        console.log('No links to show');
      } else if (option.validate && option.stats) {
        console.log(`Total: ${totalLinks(arrLinks)} \nUnique: ${uniqueLinks(arrLinks)}  \nBroquen: ${brokenLinks(arrLinks)}`);
      } else if (option.stats) {
        console.log(`Total: ${totalLinks(arrLinks)}  \nUnique: ${uniqueLinks(arrLinks)}`);
      } else if (option.validate) {
        arrLinks.forEach(element =>
          console.log(`${element.file}  ${element.href}  ${element.status}  ${element.statusText}  ${element.text}`));
      } else {
        arrLinks.forEach(element =>
          console.log(`${element.file}  ${element.href}  ${element.text}`));
      }
    }).catch(err => (err));
};*/