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
  z-index: ${({ theme }) => theme.zIndices.dropdown};
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
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[5]}`};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  white-space: pre-wrap;
  text-align: left;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing[5]};
`;

const Button = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  margin-left: ${({ type }) => (type === 'agree' ? '10px' : '0')};
  background-color: ${({ type }) => (type === 'agree' ? '#F36B4D' : '#E0E0E0')};
  color: ${({ type }) => (type === 'agree' ? 'white' : 'black')};
`;
