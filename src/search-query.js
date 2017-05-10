/*
 search-query.js
 BoxCast tvOS/TVML SDK

 Copyright (c) 2017 BoxCast. All rights reserved.
*/

// Utility method for turning a plaintext grammar into what the BoxCast API understands
// without throwing errors.
// Note, this is an abbreviated version of the more formal logic in
// boxcast_web_dashboard/src/app/utils/search-query-builder


export function textToQuery(phrase) {
  return splitQuoted(phrase).join(' ');
}


function splitSimple(text) {
  return text.split(' ');
}


function splitQuoted(text) {
  let result = [];
  let words = splitSimple(text);
  let phrase = null;
  words.forEach((word) => {
    if (!phrase && word.startsWith('"')) {
      // start of phrase
      if (word.endsWith('"')) {
        // single-word phrase
        phrase = '+' + word;
        result.push(phrase);
        phrase = null;
      } else {
        // multi-word phrase (need to keep looping)
        phrase = '+' + word;
      }
    }
    else if (phrase && word.endsWith('"')) {
      // end of current phrase
      phrase += ' ' + word;
      result.push(phrase);
      phrase = null;
    }
    else if (phrase) {
      // keep building...
      phrase += ' ' + word;
    } else {
      // just a plain word
      word = `+*${word}*`;
      result.push(word);
    }
  });

  if (phrase) {
    // fix unbalanced quote
    phrase += '"';
    result.push(phrase);
  }

  return result;
}
