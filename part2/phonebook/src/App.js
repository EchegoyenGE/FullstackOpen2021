import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(returnedPersons => {
            setPersons(returnedPersons)
        })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }

    const addContact = (event) => {
        event.preventDefault()

        const isInPhonebook = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

        if (!(isInPhonebook)) {
            if (!(newName === '')) {

                if (!(newPhone === '')) {
                    const newPerson = {
                        id: persons.length + 1,
                        name: newName,
                        number: newPhone
                    }
                    personService
                        .create(newPerson)
                        .then(returnedPerson => {
                            setPersons([...persons, returnedPerson])
                            setSuccessMessage(`Added ${newPerson.name}`)
                            setTimeout(() => {
                                setSuccessMessage('')
                            }, 3000)
                        })
                        .catch(error => {
                            setErrorMessage('Name must be larger than 3 and number must be larger than 8')
                            setTimeout(() => {
                                setErrorMessage('')
                            }, 3000)
                        })
                    setNewName('')
                    setNewPhone('')
                } else {
                    alert('Please add the phone')
                }
            } else {
                alert('Please select a contact name')
            }
        } else {
            const replaceNum = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

            if (replaceNum) {
                const person = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
                const newPerson = {...person, number: newPhone}
                personService
                    .updateNumber(person.id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => (p.id !== person.id) ? p : returnedPerson))
                        setSuccessMessage(`Updated ${newPerson.name} new number`)
                        setTimeout(() => {
                            setSuccessMessage('')
                        }, 3000)
                    })
                    .catch(error => {
                        setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
                        setTimeout(() => {
                            setErrorMessage('')
                        }, 3000)
                    })
                    setNewName('')
                    setNewPhone('')
            } 
        }
    }

    const handleChangeSearch = (event) => {
        setNewSearch(event.target.value)
    }

    const handleDelete = (id) => {

        const name = persons.filter(n => n.id === id)[0].name
        const sure = window.confirm(`Are you sure you want to delete ${name}`)

        if (sure) {
            personService
            .deletePerson(id)
            .then(response => {
                setPersons(persons.filter(n => n.id !== id))
            })
        }        
    }

    const personsToShow = (persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))) 

    return (
        <div>
            <h1>Phonebook</h1>
            <br />
            {
                successMessage
                    ? <Notification message={successMessage} success={true} />
                    : <Notification message={errorMessage} success={false} />
            }
            <h4>Search contact</h4>
            <Filter
                newSearch={newSearch}
                handleChangeSearch={handleChangeSearch} />

            <br />

            <h4>Add contact</h4>
            <PersonForm
                addContact={addContact}
                newName={newName}
                newPhone={newPhone}
                handleNameChange={handleNameChange}
                handlePhoneChange={handlePhoneChange} />
            
            <h2>Numbers</h2>
            <Persons persons={personsToShow} handleDelete={handleDelete}/>
        </div>
    )
}

export default App