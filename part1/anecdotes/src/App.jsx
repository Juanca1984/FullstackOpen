import { useState } from 'react';

const App = () => {
  const quotes = [
    'Pain is a signal to do it more often.',
    'Adding more people to a delayed project only delays it further.',
    'The first 90% of the code takes 10% of the time, while the last 10% takes 90% of the time.',
    'Anyone can write code a machine understands; great developers write code humans understand.',
    'Optimizing too early is the root of many problems.',
    'Debugging is harder than coding. If you write overly clever code, you might not be clever enough to debug it.',
    'Coding without logs is like diagnosing without tests.',
    'The fastest way to go is to do it right.'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [voteCounts, setVoteCounts] = useState(new Array(quotes.length).fill(0));

  const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentIndex(randomIndex);
  };

  const addVote = () => {
    const updatedVotes = [...voteCounts];
    updatedVotes[currentIndex] += 1;
    setVoteCounts(updatedVotes);
  };

  const highestVoteCount = Math.max(...voteCounts);
  const topQuoteIndex = voteCounts.indexOf(highestVoteCount);

  return (
    <div>
      <h1>Quote of the Day</h1>
      <p>{quotes[currentIndex]}</p>
      <p>Votes: {voteCounts[currentIndex]}</p>
      <button onClick={addVote}>Vote</button>
      <button onClick={showRandomQuote}>Next Quote</button>

      <h1>Top Voted Quote</h1>
      {highestVoteCount > 0 ? (
        <div>
          <p>{quotes[topQuoteIndex]}</p>
          <p>Votes: {highestVoteCount}</p>
        </div>
      ) : (
        <p>No votes yet.</p>
      )}
    </div>
  );
};

export default App;