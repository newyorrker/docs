const langs = ['ru', 'en'],
  dictionaries = ['common', 'idea', 'problem', 'documentRequest'],
  temp: any = {};

dictionaries.forEach(item => {
  langs.forEach(lang => {
    try {
      const value = require('./' + lang + '/' + item + '.json');
      if (!temp[lang]) {
        temp[lang] = {};
      }
      temp[lang][item] = value;
    } catch (e) {}
  });
});

const messages = Object.freeze(temp);

export { messages };
