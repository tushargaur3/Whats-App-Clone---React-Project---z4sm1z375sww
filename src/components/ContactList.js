import React, { useState } from "react";
import styled from "styled-components";
import { contactList, messagesList } from "./MockData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex-basis: 400px;
  border-right: 1px solid #f2f2f2;
`;
const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 10px;
`;
const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const SearchBox = styled.div`
  display: flex;
  background: #f6f6f6;
  padding: 10px;
`;
export const SearcContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 16px;
  width: 100%;
  padding: 5px 10px;
  position: relative;
`;
const SearchIcon = styled.img`
  width: 28px;
  height: 28px;
`;
export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 15px;
  margin-left: 10px;
`;
const ContactItem = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  padding: 15px 12px;
  :hover {
    background: #ebebeb;
  }
`;
const ProfileIcon = styled(ProfileImage)`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 12px;
`;
const ContactName = styled.span`
  width: 100%;
  font-size: 16px;
  color: black;
`;
const MessageText = styled.span`
  width: 100%;
  font-size: 14px;
  margin-top: 3px;
  color: rgba(0, 0, 0, 0.8);
`;
const MessageTime = styled.p`
  font-size: 12px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
`;
const MsgCount = styled.p`
  font-size: 12px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.45);
  background: #ededed;
  border-radius: 100vmax;
  text-align: center;
  width: 20px;
  height: 20px;
  margin-inline: auto;
  line-height: 20px;
  white-space: nowrap;
  margin-top: 5px;
`;
const MsgCountContainer = styled.div`
  font-size: 12px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
`;

const ContactComponent = (props) => {
  const { userData, setSelectedChat, msgCount } = props;
  return (
    <ContactItem onClick={() => setSelectedChat(userData)}>
      <ProfileIcon src={userData.profilePic} />
      <ContactInfo>
        <ContactName>{userData.name}</ContactName>
        <MessageText>{userData.lastText}</MessageText>
      </ContactInfo>
      <MsgCountContainer>
        <MessageTime>{userData.lastTextTime}</MessageTime>
        {msgCount && <MsgCount>{msgCount}</MsgCount>}
      </MsgCountContainer>
    </ContactItem>
  );
};

const ContactList = (props) => {
  const [contacts, setContacts] = useState(contactList);

  const filterContact = (value) => {
    const searchVal = value.toLowerCase();
    const oldContact = [...contactList];
    const result = oldContact.filter((contact) =>
      contact.name.toLowerCase().includes(searchVal)
    );
    setContacts(result);
  };

  return (
    <Container>
      <ProfileInfoDiv>
        <ProfileImage src="dist/public/profile/Mike.jpg" />
      </ProfileInfoDiv>
      <SearchBox>
        <SearcContainer>
          <SearchIcon src={"dist/public/search-icon.svg"} />
          <SearchInput
            placeholder="Search user"
            onChange={(e) => filterContact(e.target.value)}
          />
        </SearcContainer>
      </SearchBox>
      {contacts.map((userData) => {
        const userId = userData.id;
        const msgCount = messagesList
          .filter((msg) => msg.id === userId)[0]
          ?.msgList.filter((item) => item.senderID !== 0).length;
        return (
          <ContactComponent
            userData={userData}
            setSelectedChat={props.setSelectedChat}
            msgCount={msgCount}
          />
        );
      })}
    </Container>
  );
};

export default ContactList;
