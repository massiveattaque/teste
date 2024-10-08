// 'DOMContentLoaded' event ensures that the JavaScript runs after the DOM has loaded
window.addEventListener("DOMContentLoaded", () => {
	const calendar = new Calendar(".clock"); // Instantiate the calendar by selecting the element with the 'clock' class
  });
  
  class Calendar {
	// Initializes an empty array to store the date
	date = [];
  
	constructor(el) {
	  this.el = document.querySelector(el); // Selects the DOM element based on the passed selector
	  this.init(); // Calls the initializer method
	}
  
	init() {
	  this.dateUpdate(); // Updates the date on startup
	}
  
	// Method that returns the current date as an object (day, month, year)
	get dateAsObject() {
	  const date = new Date();
	  const day = date.getDate();
	  const month = date.getMonth(); // 0 = January
	  const year = date.getFullYear();
	  const weekday = date.getDay(); // 0 = Sunday
	  return { day, month, year, weekday };
	}
  
	// Converts the date to words
	get dateInWords() {
	  const { day, month, year, weekday } = this.dateAsObject;
  
	  // Dictionary of days of the week, days and months in words
	  const weekdays = [
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	  ];
  
	  const days = {
		1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth", 6: "sixth",
		7: "seventh", 8: "eighth", 9: "ninth", 10: "tenth", 11: "eleventh", 12: "twelfth",
		13: "thirteenth", 14: "fourteenth", 15: "fifteenth", 16: "sixteenth", 17: "seventeenth",
		18: "eighteenth", 19: "nineteenth", 20: "twentieth", 21: "twenty-first",
		22: "twenty-second", 23: "twenty-third", 24: "twenty-fourth", 25: "twenty-fifth",
		26: "twenty-sixth", 27: "twenty-seventh", 28: "twenty-eighth", 29: "twenty-ninth",
		30: "thirtieth", 31: "thirty-first"
	  };
  
	  const months = [
		"January", "February", "March", "April", "May", "June", "July",
		"August", "September", "October", "November", "December"
	  ];
  
	  // Converts the year to words (two thousand and 4)
	  const yearInWords = this.convertYearToWords(year);
  
	  return `${weekdays[weekday]} the ${days[day]} of ${months[month]} of ${yearInWords}`;
	}
  
	// Function to convert the year to words
	convertYearToWords(year) {
	  const thousands = Math.floor(year / 1000);
	  const hundreds = Math.floor((year % 1000) / 100);
	  const tens = Math.floor((year % 100) / 10);
	  const units = year % 10;
  
	  const words = [];
  
	  if (thousands === 2) words.push("two thousand");
	  // For the year 2024, adds "twenty-four" instead of "four"
	  if (hundreds === 0 && tens === 0 && units === 0) return "two thousand"; // for exact years like 2000
	  if (hundreds === 0 && tens === 0) words.push(units === 1 ? "one" : units === 2 ? "two" : units === 3 ? "three" : units === 4 ? "four" : units === 5 ? "five" : units === 6 ? "six" : units === 7 ? "seven" : units === 8 ? "eight" : units === 9 ? "nine" : "");
  
	  if (tens === 2) words.push("twenty");
	  else if (tens === 3) words.push("thirty");
  
	  if (tens > 1) {
		words.push(units === 0 ? "and" : "and " + (units === 1 ? "one" : units === 2 ? "two" : units === 3 ? "three" : units === 4 ? "four" : units === 5 ? "five" : units === 6 ? "six" : units === 7 ? "seven" : units === 8 ? "eight" : units === 9 ? "nine" : ""));
	  }
  
	  return words.join(" ");
	}
  
	// Updates the displayed date
	dateUpdate() {
	  const flyInClass = "clock__word--fade-fly-in"; // Animation class for the words
	  const date = this.dateInWords.split(" "); // Splits the date into words
  
	  const dateWordEls = Array.from(this.el.querySelectorAll(".clock__word")); // Selects the words
  
	  // Updates each word
	  for (let i = 0; i < dateWordEls.length; ++i) {
		const wordEl = dateWordEls[i];
		wordEl.innerText = date[i] || ""; // Updates the text
		if (date[i] !== this.date[i]) wordEl.classList.add(flyInClass); // Adds animation
		else wordEl.classList.remove(flyInClass); // Removes animation if there's no change
	  }
  
	  this.date = date; // Stores the current date
	  clearTimeout(this.dateUpdateLoop); // Clears any previous updates
	  this.dateUpdateLoop = setTimeout(this.dateUpdate.bind(this), 1e4); // Updates the date every 10 seconds
	}
  }
  