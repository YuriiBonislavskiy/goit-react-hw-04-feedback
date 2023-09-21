import { useReducer } from 'react';
import css from './App.module.css';
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';
import { Statistics } from '../Statistics/Statistics';
import { Section } from '../Section/Section';
import { Notification } from '../Notification/Notification';

const optionsReducer = (state, action) => {
  const { type, payload } = action;
  return { ...state, [type]: state[type] + payload };
};

const App = () => {
  const [options, dispatch] = useReducer(optionsReducer, {
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onChangeStats = event => {
    const { name } = event.target;
    dispatch({ type: name, payload: 1 });
  };

  const countTotalFeedback = () => {
    let total = 0;
    for (const key in options) {
      total += options[key];
    }
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = options;
    return Math.round((good / countTotalFeedback()) * 100);
  };

  return (
    <div className={css.container}>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={Object.keys(options)}
          onLeaveFeedback={onChangeStats}
        />
      </Section>
      {countTotalFeedback() ? (
        <Section title={'Statistics'}>
          <Statistics
            good={options.good}
            neutral={options.neutral}
            bad={options.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Notification massage={'There is no feedback'} />
      )}
    </div>
  );
};

export default App;
