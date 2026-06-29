import UserList from "./components/UserList";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto max-w-6xl">
        <UserList />

        <section className="mx-auto mt-16 max-w-2xl">
          <ContactForm />
        </section>
      </div>
    </main>
  );
}