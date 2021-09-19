import "./App.css";
import React, { useState, useEffect } from "react";
import Dialog from "./components/Dialog";
import Sidebar from "./components/Sidebar";
import listUsers from "./users.json";
import listMessage from "./messages.json";
import TopDialog from "./components/TopDialog";

function App() {
  let [currentUserID, setCurrentUser] = useState(0);

  useEffect(() => {
    listMessage.forEach((user) => {
      const key = `chat${user.chatId}`;

      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(user));
      }
    });
  });

  return (
    <div className="wrapper">
      <Sidebar listUsers={{ listUsers, setCurrentUser, listMessage }} />
      <div className="chat-container">
        <TopDialog listUsers={{ listUsers, currentUserID }} />
        <Dialog listMessage={{ currentUserID, setCurrentUser }} />
      </div>
      <div className="bottom" />
    </div>
  );
}

export default App;
