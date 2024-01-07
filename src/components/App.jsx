import { Section } from './Section/Section';
import { ContactsForm } from './ContactForm/ContactsForm';
import { ContactsList } from './ContactList/ContactsList';
import { nanoid } from 'nanoid';
import { SearchFile } from './SearchFile/SearchFile';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (!parsedContacts) {
      return defaultContacts;
    } else {
      return parsedContacts;
    }
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContact = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContact);
  }, [contacts]);

  const handleAddName = contactsData => {
    const { name, number } = contactsData;

    if (!contacts) {
      console.error('Contacts array is null or undefined.');
      return;
    }

    const existingContact = contacts.some(contact => contact.name === name);

    if (existingContact) {
      alert(`${name} is already in contacts.`);
    } else {
      const finalContact = { name, number, id: nanoid() };

      setContacts(prevState => [...prevState, finalContact]);
    }
  };

  const handleFilterInput = evt => {
    setFilter(evt.target.value);
  };

  const getFindContact = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : contacts;

    return filteredContacts;
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const findContacts = getFindContact();
  return (
    <div>
      <Section title="Phonebook">
        <ContactsForm handleAddName={handleAddName} />
      </Section>

      <Section title="Contacts">
        <SearchFile onChange={handleFilterInput} filter={filter} />
        <ContactsList
          contacts={findContacts}
          onDeleteContact={handleDeleteContact}
        />
      </Section>
    </div>
  );
};
