import {Routes,Route,} from "react-router-dom";
import Layout from "./layouts/Layout";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import ContactDetails from "./features/contacts/ContactDetails";
import CountdownTimer from"./components/CountdownTimer";
import Users from"./components/Users";
import Posts from"./components/Posts";

function Home() {
  return (
    <>
      <CountdownTimer />
      <Users />
      <Posts />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts/:id" element={ <ContactDetails /> } />
      </Route>
    </Routes>
  );
}