import React from 'react';
import ContactItem from './ContactsItem';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getContactFilter,
  getContacts,
  getIsLoading,
  getError,
} from 'redux/selectors';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getContactFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getVisibilityContacts = () => {
    if (!filterValue || filterValue === '') {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  const filteredContacts = getVisibilityContacts();

  return (
    <ul>
      {isLoading && !error && <Loader />}
      {filteredContacts.map(contact => (
        <ContactItem
          id={contact.id}
          key={contact.id}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
