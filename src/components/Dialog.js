import React, { useState, useEffect } from "react";
import axios from "axios";
import {keyCurrentChat} from "../constans/constans";

const Dialog = (props) => {
  let { currentUserID, setCurrentUser } = props.listMessage;

  const [messageText, setMessageText] = useState("");
  const [currentChat, setcurrentChat] = useState([]);

  const url = 'https://api.chucknorris.io';
  
  useEffect(() => {
    const data = localStorage.getItem(`chat${currentUserID}`);

    if (data) {
      setcurrentChat([JSON.parse(data)]);
    }
    setCurrentUser(localStorage.getItem(keyCurrentChat));
  }, [currentUserID]);

  const getRandomMessage = () => {
    axios.get(`${url}/jokes/random`).then((res) => {
      const newCurrentChat = [
        {
          chatId: currentChat[0].chatId,
          messages: [
            ...currentChat[0].messages,
            {
              text: res.data.value,
              isMe: false,
              date: new Date(Date.now()).toLocaleString(),
            },
          ],
        },
      ];

      localStorage.setItem(
        `chat${currentUserID}`,
        JSON.stringify(newCurrentChat[0])
      );
      setcurrentChat(newCurrentChat);
    });
  };
  const sendMessage = () => {
    currentChat[0].messages.push({
      text: messageText,
      isMe: true,
      date: new Date(Date.now()).toLocaleString(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageText("");
    getRandomMessage();
  };

  return (
    <div className="chat">
      {currentChat.length === 0 ? (
        <div className="chat-start">
          <p>Select a chat to start messaging</p>
        </div>
      ) : (
        <div className="chat-messages">
          <div className="messages">
            {currentChat.map((message) => {
              return message.messages.map((item) => {
                return item.isMe ? (
                  <div className="my-message">
                    <p>{item.text}</p>
                    <span>{item.date}</span>
                  </div>
                ) : (
                  <div className="receive-message">
                    <div>
                      <p>{item.text}</p>
                    </div>
                    <span>{item.date}</span>
                  </div>
                );
              });
            })}
          </div>
          <div className="form-sent">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={messageText}
                placeholder="Write a message..."
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button type="submit" onClick={sendMessage}>
                <span class="material-icons">send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
