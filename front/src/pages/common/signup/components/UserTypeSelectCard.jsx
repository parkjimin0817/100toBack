import styled from 'styled-components';

const UserTypeSelectCard = ({ onClick, title, imgSrc, description }) => {
  return (
    <Card onClick={onClick}>
      <Title>{title}</Title>
      <Img src={imgSrc} draggable="false" />
      <Description>{description}</Description>
    </Card>
  );
};

export default UserTypeSelectCard;

const Card = styled.div`
  width: 300px;
  height: 600px;
  margin: 30px;
  border: 1px solid rgb(150, 150, 150);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.md};

  &:hover {
    transform: translateY(2px);
    transition: all 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadows.md};
    cursor: pointer;
  }
`;

const Title = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
`;

const Img = styled.img`
  width: 250px;
  height: 300px;
  object-fit: contain;
  margin: 20px 0 20px 0;
`;

const Description = styled.p`
  display: block;
  width: 230px;
  min-height: 100px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;
