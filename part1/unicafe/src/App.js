import React, { useState } from 'react';

const Header = ({ text }) => <h2>{text}</h2>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ goodStats, neutralStats, badStats }) => {
  const totalStatsCollected = goodStats + neutralStats + badStats;
  const positiveStatsPercentage = (goodStats / totalStatsCollected) * 100;
  const averageScore =
    Math.round(((goodStats - badStats) / (goodStats + badStats)) * 100) / 100;

  if (totalStatsCollected > 0)
    return (
      <table>
        <tbody>
          <StatisticsLine text='good' value={goodStats} />
          <StatisticsLine text='neutral' value={neutralStats} />
          <StatisticsLine text='bad' value={badStats} />
          <StatisticsLine text='all' value={totalStatsCollected} />
          <StatisticsLine text='average' value={averageScore} />
          <StatisticsLine text='positive % ' value={positiveStatsPercentage} />
        </tbody>
      </table>
    );
  else return <p>No feedback given</p>;
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
