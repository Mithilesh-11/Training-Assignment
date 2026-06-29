import { useEffect } from "react";
import {useDispatch,useSelector,} from "react-redux";
import { Link } from "react-router-dom";
import {fetchContacts,} from "./contactsSlice";
import type { AppDispatch,RootState,} from "../../app/store";

export default function ContactsList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    contacts,
    status,
    error,
  } = useSelector(
    (state: RootState) =>
      state.contacts
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (status === "loading")
    return (
      <p>Loading contacts...</p>
    );

  if (error)
    return <p>{error}</p>;

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Contacts
      </h2>

      <div className="space-y-3">
        {contacts.map(
          (contact) => (
            <Link
              key={contact.id}
              to={`/contacts/${contact.id}`}
              className="block border rounded p-3 hover:bg-gray-100 hover:text-black transition"
            >
              <div className="font-medium">
                {contact.name}
              </div>

              <div className="text-sm opacity-70">
                {contact.email}
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}