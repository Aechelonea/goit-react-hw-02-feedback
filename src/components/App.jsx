import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import Notification from './Notification';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import styles from './App.module.css';

const App = () => {
  const [currentView, setCurrentView] = useState('feedback');
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const switchView = viewName => {
    setCurrentView(viewName);
  };
  const leaveFeedback = type => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };
  const countTotalFeedback = () =>
    Object.values(feedback).reduce((acc, value) => acc + value, 0);
  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((feedback.good / total) * 100) : 0;
  };
  const addContact = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <button onClick={() => switchView('feedback')}>Feedback</button>
        <button onClick={() => switchView('contacts')}>Contacts</button>
      </nav>
      {currentView === 'feedback' && (
        <>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={Object.keys(feedback)}
              onLeaveFeedback={leaveFeedback}
            />
          </Section>

          <Section title="Statistics">
            {countTotalFeedback() > 0 ? (
              <Statistics
                good={feedback.good}
                neutral={feedback.neutral}
                bad={feedback.bad}
                total={countTotalFeedback()}
                positivePercentage={countPositiveFeedbackPercentage()}
              />
            ) : (
              <Notification message="There is no feedback" />
            )}
          </Section>
        </>
      )}

      {currentView === 'contacts' && (
        <>
          <Section title="Phonebook">
            <ContactForm onAddContact={addContact} />
          </Section>

          <Section title="Contacts">
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              contacts={getVisibleContacts()}
              onDeleteContact={deleteContact}
            />
          </Section>
        </>
      )}
    </div>
  );
};

export default App;
