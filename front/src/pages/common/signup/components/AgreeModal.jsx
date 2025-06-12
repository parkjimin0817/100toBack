import styled from 'styled-components';

const AgreeModal = ({ onClose, onAgree, title, content }) => {
  return (
    <Overlay onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <ScrollArea>{content}</ScrollArea>
        <ButtonGroup>
          <Button type="close" onClick={onClose}>
            닫기
          </Button>
          <Button type="agree" onClick={onAgree}>
            동의
          </Button>
        </ButtonGroup>
      </Card>
    </Overlay>
  );
};

export default AgreeModal;

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background: white;
  width: 400px;
  max-height: 600px;
  border-radius: 12px;
  padding: 25px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: ${({ type }) => (type === 'agree' ? '10px' : '0')};
  background-color: ${({ type }) => (type === 'agree' ? '#F36B4D' : '#E0E0E0')};
  color: ${({ type }) => (type === 'agree' ? 'white' : 'black')};
`;
