/** @param {string} text */
function countWords(text) {
  const paragraphs = extractParagraphs(text);

  const count = paragraphs.flatMap((p) => {
    if (!p) return [];
    return checkDoubleWords(p);
  });

  return count;
}

/** @param {string} text */
function extractParagraphs(text) {
  return text.toLocaleLowerCase().split("\n");
}

/** @param {string} word */
function cleanWords(word) {
  // /[lista de caracteres a ser removidos]/global
  return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

/** @param {string} text */
function checkDoubleWords(text) {
  const words = text.split(" ");
  const result = {};

  words.forEach((word) => {
    if (word.length >= 3) {
      const cleanWord = cleanWords(word);
      result[cleanWord] = (result[cleanWord] || 0) + 1;
    }
  });

  return result;
}

export { countWords };
