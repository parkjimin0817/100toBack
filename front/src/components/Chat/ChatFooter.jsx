import React from 'react'
import styled from 'styled-components';
import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";

const ChatFooter = ({ 
    type, 
    onChange, 
    newMessage, 
    onMessageChange, 
    onKeyPressFunc, 
    sendMessage 
  }) => {
  return (
    <Footer>
      {type === "chatRoom" ? (
        <>
          <MessageInput 
            type='text'
            value={newMessage}
            placeholder='메세지 입력'
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={onKeyPressFunc}
          ></MessageInput>
          <SendButton onClick={sendMessage}>전송</SendButton>
        </>
      ) : (
        <FooterButtonBox>
          <FooterButton onClick={() => onChange('members', '사용자들')}><FaUserFriends /></FooterButton>
          <FooterButton onClick={() => onChange('chatRooms', '채팅방')}><IoChatboxEllipses /></FooterButton>
        </FooterButtonBox>
      )}
    </Footer>
  )
}

export default ChatFooter

{/* <Footer>
  <ImageUpload type="file" accept=".png, .jpg, .jpeg" multiple id="imageUpload" />
  <ImageUploadLabel htmlFor="imageUpload"><FaPlus></FaPlus></ImageUploadLabel>
  <MessageInput placeholder="Type a message"
    // onChange={(e: ChangeEvent<HTMLInputElement>)=> setMessage(e.target.value)}
    // onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
  />
  <SendButton>전송</SendButton>
</Footer> */}

const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ccc;
`;

const ImageUpload = styled.input`
  display: none;
`;

const ImageUploadLabel = styled.label`
  margin-right: 10px;
  width: 30px;
  cursor: pointer;
`

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FooterButtonBox = styled.div`
  width: 100%;
  display: flex;
`;

const FooterButton = styled.button`
  padding: 10px;
  display: flex;
  flex: 1;
  justify-content: center;  

  & > svg {
    width: 30px;
    height: 30px;
  }
`;