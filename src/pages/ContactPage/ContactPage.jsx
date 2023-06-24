import ContactForm from '../../components/ContactsForm/ContactForm';
import ContactList from '../../components/ContactsList/ContactsList';
import Filter from '../../components/Filter/Filter';
import style from './ContactPage.module.css';

const ContactPage = () => {
  return (
    <div className={style.ContactWrapper}>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactPage;
