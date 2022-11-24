const { mdLinks } = require(".")

/**
 * stats
 * @param {array} arrayObjects (href,file,text) 
 * @returns un nuevo objeto
 * total, unique
 */
const stats = (arrayLinks) => {
    return {
        total: arrayLinks.length,
        unique: new Set(arrayLinks.map((arrayobjects) => arrayobjects.href)).size,
    };
}

/**
 * validate + stats
 * @param {array} arrayObjects (href,file,text,status,ok) 
 * @returns un nuevo objeto
 * total, unique, broken
 */
const validatStats = (arrayLinks) => {
    const brokenLinks = arrayLinks.filter((link) => link.status == 404).length
    return {
        total: arrayLinks.length,
        unique: new Set(arrayLinks.map((arrayobjects) => arrayobjects.href)).size,
        broken:brokenLinks 
    };
};
    module.exports = {
        
        stats,
        validatStats,
    }


