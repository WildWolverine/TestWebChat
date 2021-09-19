import React from "react";

const TopDialog = (props) => {
  const { listUsers, currentUserID } = props.listUsers;

  return (
    <div className="chat-top">
      {!currentUserID ? (
        <div></div>
      ) : (
        listUsers
          .filter((user) => {
            return user.id === currentUserID;
          })
          .map((user) => {
            return (
              <div className="chat-top-user" key={user.id}>
                <p>{user.name}</p>
              </div>
            );
          })
      )}
    </div>
  );
};

export default TopDialog;
