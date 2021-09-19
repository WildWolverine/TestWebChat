import React, { useState } from "react";
import {keyCurrentChat} from "../constans/constans";

const Sidebar = (props) => {
  let { listUsers, setCurrentUser, listMessage } = props.listUsers;
  const [searchInput, setsearchInput] = useState("");
  let lastMessages = [];

  listMessage.forEach((elem) => {
    return lastMessages.push({
      chatId: elem.chatId,
      lastMessage: elem.messages[elem.messages.length - 1],
    });
  });

  const handleChat = (user) => {
    setCurrentUser(user.id);
    localStorage.setItem(keyCurrentChat, user.id);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div>
          <i class="fas fa-user"></i>
          <i class="far fa-check-circle"></i>
        </div>
        <div className="sidebar-input-top">
          <i class="fa fa-search" aria-hidden="true"></i>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
            placeholder="Search or start new chat"
          />
        </div>
      </div>
      <div className="list-chats">
        <h1>Chats</h1>
        <ul className>
          {listUsers
            .filter((user) => {
              if (searchInput === "") return listUsers;
              return user.name
                .toLocaleLowerCase()
                .includes(searchInput.toLocaleLowerCase());
            })
            .map((user) => {
              return lastMessages.map((message) => {
                if (message.chatId === user.id)
                  return (
                    <li key={user.id} onClick={() => handleChat(user)}>
                      <p>{user.name}</p>
                      <p>{message.lastMessage.text}</p>
                      <p>{message.lastMessage.date}</p>
                    </li>
                  );
              });
            })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
