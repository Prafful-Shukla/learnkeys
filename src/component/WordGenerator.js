import React, { useState } from 'react';

  const WordGenerator = () => {
  const [wordString, setWordString] = useState('');

  const generateWords = () => {
    const letters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
    const wordCount = 20; // Number of words to generate
    const words = [];

    for (let i = 0; i < wordCount; i++) {
      const wordLength = Math.floor(Math.random() * 6) + 5; // Random word length between 5 and 10
      let word = '';
      for (let j = 0; j < wordLength; j++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        word += letters[randomIndex];
      }
      words.push(word);
    }

    return words.join(' ');
  };

    const generatedString = generateWords();
    // setWordString(generatedString);


  return (
    <div>
      <p>{generatedString}</p>
    </div>
  );
};

export default WordGenerator;





// import React from 'react';
// import generate from 'random-words';
// const WordsContainingLetters = () => {
//   const letters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
//   const words = generate({ exactly: 10, maxLength: 10 });
//   const filteredWords = words.filter(word => {
//     return letters.every(letter => word.includes(letter));
//   });

//   const filteredWordsString = filteredWords.join(' ');

//   return (
//     <div>
//       <p>{filteredWordsString}</p>
//     </div>
//   );
// };

// export default WordsContainingLetters;
// import React from 'react';
// import { generate } from 'random-words';

// const WordGenerator = () => {
//     const generateRandomWords = () => {
//         const validLetters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
//         const filteredWords = [];
//         while (filteredWords.length < 10) {
//             const word = generate({ exactly: 1, maxLength: 10 })[0];
//             const isValid = validLetters.every(letter => word.includes(letter));
//             if (isValid) {
//                 filteredWords.push(word);
//             }
//         }
//         return filteredWords.join(', '); // Join the filtered words with a separator
//     };

//     const randomWordsString = generateRandomWords();

//     return (
//         <p>{randomWordsString}</p>
//     );
// };

// export default WordGenerator;