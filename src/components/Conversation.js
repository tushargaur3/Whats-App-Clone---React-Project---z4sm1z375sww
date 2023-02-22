import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";
import { SearcContainer, SearchInput } from "./ContactList";
import { messagesList } from "./MockData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 12;
  background: #f6f7f8;
`;
const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 10px;
  align-items: center;
  gap: 10px;
`;
const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const ChatBox = styled.div`
  display: flex;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  buttom: 0;
`;
const EmojiImage = styled.img`
  width: 28px;
  height: 28px;
  opacity: 0.5;
  cursor: pointer;
`;
const MessageContainer = styled.div`
  display: flex;
  background: #e5ddd6;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;
const MessageDiv = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
  margin: 5px 15px;
`;
const Message = styled.div`
  background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
  max-width: 50%;
  color: #303030;
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 5px;
`;

const SendButton = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 12px;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  max-width: 23px;
  max-height: 23px;
`;

const Conversation = (props) => {
  const { selectedChat } = props;
  const userId = selectedChat.id;

  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState(messagesList);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const allMessage = [...messageList];
    const userMessage =
      allMessage.filter((message) => message.id === userId)[0]?.msgList || [];
    setMessages(userMessage);
  }, [selectedChat, messageList]);

  const sendMessage = () => {
    const messages = [...messageList];
    const index = messages.findIndex((item) => item.id === userId);
    if (!text || text === "") {
      return;
    }
    if (index === -1) {
      const newMsg = {};
      newMsg.id = userId;
      newMsg.msgList = [
        {
          id: 0,
          messageType: "TEXT",
          text,
          senderID: 0,
          addedOn: "12:00 PM",
        },
      ];
      messages.push(newMsg);
    } else {
      messages[index].msgList.push({
        id: 0,
        messageType: "TEXT",
        text,
        senderID: 0,
        addedOn: "12:00 PM",
      });
    }
    setMessageList(messages);
    setText("");
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };


  return (
    <Container>
      <ProfileHeader>
        <ProfileImage src={selectedChat.profilePic} />
        {selectedChat.name}
      </ProfileHeader>
      <MessageContainer>
        {messages.map((messageData) => (
          <MessageDiv isYours={messageData.senderID === 0}>
            <Message isYours={messageData.senderID === 0}>
              {messageData.text}
            </Message>
          </MessageDiv>
        ))}
      </MessageContainer>
      <ChatBox>
        <SearcContainer>
        
          <EmojiImage src="/src/public/data.svg" />
          <SearchInput
            placeholder="Type a message"
            value={text}
            onKeyDown={onEnterPress}
            onChange={(e) => setText(e.target.value)}
          />
          <SendButton onClick={sendMessage}>
            <img src="/src/public/send-button.png" alt="" />
          </SendButton>
        </SearcContainer>
      </ChatBox>
    </Container>
  );
};

export default Conversation;
