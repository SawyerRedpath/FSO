import personService from './services/persons';
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id).then((response) => {
        console.log(response);
        setPersons(
          persons.filter((person) => {
            return person.id !== id;
          })
        );
      });
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
      <h2>Phonebook</h2>
      <Filter value={newSearch} handleNewSearchChange={handleNewSearchChange} />
      <h3>add a new contact</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <div>
        <h3>Numbers</h3>
        <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
      </div>
    </div>
  );
};

export default App;
