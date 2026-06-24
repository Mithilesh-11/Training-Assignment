import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import ContactForm from "../components/ContactForm";
import { Contact } from "../types";

function ContactsPage () {
  const { data, loading, error, retry } = useFetch<Contact[]>("https://jsonplaceholder.typicode.com/users");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const filteredContacts = (data ?? []).filter(
    (contact) =>
      contact.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      contact.phone.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="contacts-page">
      <header className="contacts-page__header">
        <h1 className="contacts-page__title">Contacts</h1>
        <button
          className="btn btn--primary"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "Close Form" : "+ Add Contact"}
        </button>
      </header>

      {showForm && (
        <div className="contacts-page__form">
          <ContactForm />
        </div>
      )}

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="contacts-page__list">
        {loading && (
          <div className="state-message state-message--loading">
            <span className="spinner" />
            <span>Loading...</span>
          </div>
        )}

        {!loading && error && (
          <div className="state-message state-message--error">
            <span>Failed to load contacts</span>
            <button className="btn btn--secondary" onClick={retry}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredContacts.length === 0 && (
          <div className="state-message state-message--empty">
            <span>📭</span>
            <p>No contacts found</p>
          </div>
        )}

        {!loading && !error && filteredContacts.map((contact) => (
            <UserCard
              key={contact.id}
              name={contact.name}
              email={contact.email}
              phone={contact.phone}
            />
          ))}
      </div>
    </div>
  );
};

export default ContactsPage;
