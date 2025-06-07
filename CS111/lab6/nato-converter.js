// NATO Phonetic Alphabet Arrays
const natoLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
   "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
   "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const natoWords = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel",
 "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa",
 "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray",
 "Yankee", "Zulu", "One", "Two", "Three", "Four", "Five", "Six", 
 "Seven", "Eight", "Nine", "Zero"];

/**
* Converts a single character to its NATO phonetic equivalent
* @param {string} ch - The character to convert
* @return {string} The NATO phonetic word or the original character
*/
function chToNato(ch) {
// 1. Convert the input character to uppercase
const upperCh = ch.toUpperCase();

// 2. Find the index of the character in the natoLetters array
const index = natoLetters.indexOf(upperCh);

// 3. If character is found, return the corresponding NATO word
if (index !== -1) {
return natoWords[index];
}

// 4. If not found (punctuation, etc.), return the original character
return ch;
}

/**
* Converts a word to its NATO phonetic equivalent
* @param {string} word - The word to convert
* @return {string} Space-separated NATO phonetic words
*/
function wordToNato(word) {
// 1. Split the word into an array of characters
const characters = word.split("");

// 2. Convert each character to NATO using chToNato
const natoArray = characters.map(ch => chToNato(ch));

// 3. Join the NATO words with spaces
return natoArray.join(" ");
}

/**
* Converts a sentence to its NATO phonetic equivalent
* @param {string} sentence - The sentence to convert
* @return {string} Space-separated NATO phonetic representation
*/
function sentenceToNato(sentence) {
// 1. Split the sentence into words
const words = sentence.split(" ");

// 2. Convert each word to NATO using wordToNato
const natoWordsArray = words.map(word => wordToNato(word));

// 3. Join the NATO sequences with spaces
return natoWordsArray.join(" ");
}

/**
* Converts the input string to NATO phonetic alphabet
*/
function verbalize() {
// 1. Get the input value from the input field
const input = document.getElementById("inputString").value;

// 2. Convert the input string to NATO format
const natoConverted = sentenceToNato(input);

// 3. Display the result in the natoResult element
document.getElementById("natoResult").textContent = natoConverted;
}

/**
* Clears the NATO converter input and result fields
*/
function clearNATOInputs() {
// 1. Clear the input field
document.getElementById("inputString").value = "";

// 2. Clear the output field
document.getElementById("natoResult").textContent = "";
}