import style from './ContactsForm.module.css';
import { useState } from 'react';

export const ContactsForm = ({ handleAddName }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    // const number = e.target.number;

    switch (name) {
      case 'name': {
        setName(value);
        return;
      }
      case 'number': {
        setNumber(value);
        return;
      }
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contactsData = {
      name: e.currentTarget.elements.name.value,
      number: e.currentTarget.elements.number.value,
    };

    handleAddName(contactsData);

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label>
        <p className={style.labelText}>Name</p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        <p className={style.labelText}>Number</p>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};
