import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import style from './ContactForm.module.css';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target.elements;
    const form = event.currentTarget;
    const filteredName = contacts.filter(contact =>
      contact.name.includes(name.value)
    );
    if (filteredName.length > 0) {
      alert(`${filteredName[0].name} is already in contacts.`);
      form.reset();
      return;
    }

    const contact = {
      name: name.value,
      number: number.value,
    };
    dispatch(addContact(contact));
    form.reset();
  };

  return (
    <form className={style.form} onSubmit={e => handleSubmit(e)}>
      <label className={style.label}>Name</label>
      <input
        type="text"
        name="name"
        className={style.input}
        placeholder="Add a name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      />

      <label className={style.label}>Number</label>
      <input
        type="tel"
        name="number"
        className={style.input}
        placeholder="Add a number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit" className={style.btn}>
        Add
      </button>
    </form>
  );
};
export default ContactForm;
