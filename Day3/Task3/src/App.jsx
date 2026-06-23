import { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { getUser, removeUser, saveUser } from "./storage";
import "./App.css";
import React from "react";


export default function App() {
  const [user, setUser] = useState(() => getUser());
 
  return user ? (
    <Dashboard user={user} setUser= {setUser}  />
  ) : (
    <Login setUser= {setUser}/>
  );
}
