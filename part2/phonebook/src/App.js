import React, { useState } from 'react';
import Person from './Person';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '778-123-4567',
      id: 1,
    },
    {
      name: 'Harry Potter',
      number: '778-141-4533',
      id: 2,
    },
    {
      name: 'Remus Lupin',
      number: '604-721-5347',
      id: 3,
    },
    {
      name: 'Sirius Black',
      number: '403-771-7448',
      id: 4,
    },
    {
      name: 'Jean Ralphio',
      number: '443-221-2243',
      id: 5,
    },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    // Check if the person already exists
    if (persons.some((person) => person['name'] === newName)) {
      alert(`${newName} already exists in the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName('');
    }
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const personsToShow =
    newSearch === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        );

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <span>search for contact </span>{' '}
        <input value={newSearch} onChange={handleNewSearchChange} />
      </div>
      <div>
        <h2>add a new contact</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNewNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNewNumberChange} />
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Numbers</h2>
        {personsToShow.map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
      </div>
    </div>
  );
};

export default App;
