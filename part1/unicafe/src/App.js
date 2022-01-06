import React, { useState } from 'react';

const Header = ({ text }) => <h2>{text}</h2>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ goodStats, neutralStats, badStats }) => {
  return (
    <div>
      <p>good = {goodStats}</p>
      <p>neutral = {neutralStats}</p>
      <p>bad = {badStats}</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header text='Give feedback' />
      <Button text='good' onClick={handleGoodClick} />
      <Button text='neutral' onClick={handleNeutralClick} />
      <Button text='bad' onClick={handleBadClick} />
      <Header text='Statistics' />
      <Statistics goodStats={good} badStats={bad} neutralStats={neutral} />
    </div>
  );
};

export default App;
