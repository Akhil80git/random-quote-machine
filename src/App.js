import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");
  const [tweetUrl, setTweetUrl] = useState("#");

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      setTweetUrl(
        `https://twitter.com/intent/tweet?text="${encodeURIComponent(
          data.content
        )}" - ${encodeURIComponent(data.author)}`
      );
    } catch (error) {
      setQuote("Failed to load quote. Click the button below to try again.");
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="quote-box">
      <div id="text">
        <i className="fas fa-quote-left"></i> {quote}
      </div>
      <div id="author">- {author}</div>
      <div className="buttons">
        <a
          id="tweet-quote"
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <button id="new-quote" onClick={fetchQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
