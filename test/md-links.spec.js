const { mdLinks } = require('../src/index.js');

jest.mock('axios');

describe("mdLinks", () => {
  it("should be a array object with href, text and file", () => {
    return mdLinks('test/test.md', { validate: false })
      .then((data) => {
        //console.log(data, 80);
        expect(data).toStrictEqual(    [
          {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            file: 'C:\\Users\\monic\\BOGOO5-mdl-28\\BOG005-md-links\\test\\test.md',
            text: 'Markdown'
          }
        ]);
      });
  })
  it("should be an array object with href, text,file, status and ok", () => {
    return mdLinks('test/test.md', { validate: true })
      .then((data) => {
        //console.log(data, 80);
        expect(data).toStrictEqual(    [
          {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            file: 'C:\\Users\\monic\\BOGOO5-mdl-28\\BOG005-md-links\\test\\test.md',
            text: 'Markdown',
            status:undefined,
            ok:'✔'
          }
        ]);
      });
  })
})
