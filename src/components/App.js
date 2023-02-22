import styled from "styled-components";
import React, { useState } from "react";
import ContactList from "./ContactList";
import Conversation from "./Conversation";
import "../styles/app.css";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  background: f8f9fb;
`;

const Placeholder = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  gap: 10px;
  span {
    font-size: 32px;
    color: #525252;
  }
`;
const ChatPlaceHolder = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: contain;
`;

const App = () => {
  const [selectedChat, setSelectedChat] = useState();
  return (
    <Container>
      <ContactList setSelectedChat={setSelectedChat} />
      {selectedChat ? (
        <Conversation selectedChat={selectedChat} />
      ) : (
        <Placeholder>
          <ChatPlaceHolder src="dist/public/welcome-placeholder.jpeg" />
          <span>Keep your phone connected</span>
          Whatsapp connects to your phone to sync messages.
        </Placeholder>
      )}
    </Container>
  );
};
export default App;
