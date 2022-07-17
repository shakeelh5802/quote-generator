const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true; 
}

// Hide Loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//  Show New Quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // if (!quote.author) {
  //   authorText.textContent = 'Unknown';
  // } else {
  //   authorText.textContent = quote.author;
  // }
  authorText.textContent = quote.En_Sanad
  if (quote.En_Text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.En_Text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = 'https://ahadith-api.herokuapp.com/api/ahadith/all/en';
  try {
    const response = await fetch(apiUrl);
    jsonRes = await response.json();
    apiQuotes = jsonRes.AllChapters;
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
} 

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuotes();