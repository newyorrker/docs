var sanitizeHtml = require('sanitize-html');

function processLinks(text: string) {
  return (text || '').replace(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi, function(match, space, url) {
    let hyperlink = url;
    if (!hyperlink.match('^https?://')) {
      hyperlink = 'http://' + hyperlink;
    }
    return space + '<a href="' + hyperlink + '" target="_blank">' + url + '</a>';
  });
}

function breaks(text: string) {
  return text.split('\n').join('<br/>');
}

function emailInBrackets(text: string) {
  //&lt;test@mail.ru&gt;someNeededString&lt;/test@mail.ru&gt; -> &lt;test@mail.ru&gt;someNeededString

  const re = /&lt;\/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))&gt;/gi;

  const result = text.replace(re, '');

  return result;
}

const escapeHtml = (text: string, allowedTags = [], escapeDisallowed = false) => {
  allowedTags = allowedTags.length ? allowedTags : sanitizeHtml.defaults.allowedTags.concat(['img']);
  return sanitizeHtml(text, {
    allowedTags: allowedTags,
    disallowedTagsMode: escapeDisallowed ? 'escape' : 'discard',
    allowedAttributes: {
      a: ['href', 'name', 'target', 'class'],
      img: ['src', 'width', 'height', 'style', 'class'],
      iframe: ['src', 'width', 'height', 'style', 'class', 'frameborder', 'scrolling', 'allowfullscreen', 'allow'],
      div: ['class'],
    },
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'forms'],
  });
};

const process = (message: string, allowedTags = [], escapeDisallowed = false) => {
  let result = message || '';
  result = escapeHtml(message || '', allowedTags, escapeDisallowed);
  result = processLinks(result);
  result = breaks(result);
  result = emailInBrackets(result);
  return result;
};

export { process, escapeHtml };
