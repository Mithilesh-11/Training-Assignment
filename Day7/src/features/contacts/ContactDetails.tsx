import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import type { RootState } from "../../app/store";

export default function ContactDetails() {
  const { id } = useParams();
      
      if (!id || !/^\d+$/.test(id)) {
      return (
        <div className="border rounded-lg p-6">
          Invalid Contact ID
        </div>
      );
    }

  const contactId = Number(id);

  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((c) => c.id === contactId)
  );

  if (!contact) {
    return (
      <div className="border rounded-lg p-6">
        Contact Not Found
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Contact Details
      </h2>

      <div className="space-y-2">
        <p>
          <strong>ID:</strong>{" "}
          {contact.id}
        </p>

        <p>
          <strong>Name:</strong>{" "}
          {contact.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {contact.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {contact.phone}
        </p>
      </div>
    </div>
  );
}