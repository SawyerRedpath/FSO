import personService from './services/persons';
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      setSuccessMessage(`${returnedPerson.name} added to contacts`);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  const updatePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const changedPerson = { ...person, number: newNumber };

    personService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
        setSuccessMessage(`${returnedPerson.name} phone number updated`);

        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        alert(
          `the person '${person.name}' was already deleted from the server`
        );
        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  const addPersonOrUpdateNumber = (event) => {
    event.preventDefault();

    // Check if the person already exists
    const foundPerson = persons.find((person) => person.name === newName);

    if (foundPerson === undefined) {
      addPerson();
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, would you like to replace the old number with a new one?`
        )
      )
        updatePerson(foundPerson.id);
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
      <Notification message={successMessage} />
      <Filter value={newSearch} handleNewSearchChange={handleNewSearchChange} />
      <h3>add a new contact</h3>
      <PersonForm
        addPersonOrUpdateNumber={addPersonOrUpdateNumber}
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
