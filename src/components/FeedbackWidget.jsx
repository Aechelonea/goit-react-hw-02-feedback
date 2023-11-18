import React from 'react';
import PropTypes from 'prop-types';
import styles from './FeedbackWidget.module.css';

const FeedbackWidget = ({ good, neutral, bad, onLeaveFeedback }) => {
  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((good / total) * 100) : 0;
  };

  return (
    <div className={styles.feedbackWidget}>
      <h1>Please leave feedback</h1>
      <div>
        <button
          className={styles.button}
          onClick={() => onLeaveFeedback('good')}
        >
          Good
        </button>
        <button
          className={styles.button}
          onClick={() => onLeaveFeedback('neutral')}
        >
          Neutral
        </button>
        <button
          className={styles.button}
          onClick={() => onLeaveFeedback('bad')}
        >
          Bad
        </button>
      </div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {countTotalFeedback()}</p>
      <p>Positive feedback: {countPositiveFeedbackPercentage()}%</p>
    </div>
  );
};

FeedbackWidget.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};

export default FeedbackWidget;
