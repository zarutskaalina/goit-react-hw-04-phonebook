import style from './ContactList.module.css';

export const ContactsList = ({ contacts, onDeleteContact }) => {
  const handleDeleted = contactId => {
    onDeleteContact(contactId);
  };

  console.log(contacts);

  return (
    <ul className={style.contactList}>
      {contacts.map(contact => (
        <li key={contact.id} className={style.contactName}>
          {contact.name}: {contact.number}
          <button
            className={style.button}
            type="button"
            onClick={() => handleDeleted(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
