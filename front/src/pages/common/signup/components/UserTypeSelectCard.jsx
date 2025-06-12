import styled from 'styled-components';

const UserTypeSelectCard = ({ title, imgSrc, description }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Img src={imgSrc} draggable="false" />
      <Description>{description}</Description>
    </Card>
  );
};

export default UserTypeSelectCard;

const Card = styled.div`
  width: 300px;
  height: 650px;
  margin: 30px;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 0px rgba(150, 150, 150, 0.2);

  &:hover {
    transform: translateY(2px);
    transition: all 0.2s ease;
    box-shadow: 2px 2px 0px rgba(180, 180, 180, 0.2);
    cursor: pointer;
  }
`;

const Title = styled.h2``;

const Img = styled.img`
  width: 280px;
  height: 330px;
  object-fit: contain;
`;

const Description = styled.p`
  display: block;
  width: 280px;
  min-height: 100px;
`;
