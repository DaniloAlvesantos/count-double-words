function filterOccurrences(paragraph) {
  return Object.keys(paragraph).filter((key) => paragraph[key] > 1);
}

export function mountOutputFile(wordsList) {
  let output = "";

  wordsList.forEach((paragraph, index) => {
    // .join is used to convert the array of repeated words into a string, with each word separated by a comma and a space.
    const repeatedWords = filterOccurrences(paragraph).join(", ");
    if (repeatedWords.length) {
      output += `Repeated Words on paragraph ${index + 1}: ${repeatedWords}\n`;
    }
  });

  return output;
}
