const axios = require('axios');
const { linkValidate } = require('../src/funcionesPuras');

jest.mock('axios');

describe('linkValidate', () => {
  it('should validate a valid link', () => {
    const array = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        file: 'C:\\Users\\monic\\BOGOO5-mdl-28\\BOG005-md-links\\pruebas\\function.md',
        text: 'Markdown'
      }
    ]
    const arrayRes = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        file: 'C:\\Users\\monic\\BOGOO5-mdl-28\\BOG005-md-links\\pruebas\\function.md',
        text: 'Markdown',
        status: undefined,
        ok: '✔'
      }
    ]
    
    axios.get = () => {
      return Promise.resolve('hola');
    }

    return linkValidate(array)
      .then((res) => {
        console.log('RES:::',res);
        expect(res).toStrictEqual(arrayRes);
      });
  });
})


