import styled from 'styled-components';
import UserTypeSelectCard from './components/UserTypeSelectCard';
import parentImg from '../../../assets/parent.png';
import teacherImg from '../../../assets/teacher.png';
import centerImg from '../../../assets/center.png';
import CommonFind from '../../../components/Common/CommonFind';
import { useNavigate } from 'react-router-dom';
import { useSignUpStore } from '../../../store/signupStore';

const UserTypeSelect = () => {
  const navigate = useNavigate();
  const { setType } = useSignUpStore();

  const handleClick = (type) => {
    setType(type);
    navigate('/signup/terms');
  };

  return (
    <CommonFind>
      <Container>
        <UserTypeSelectBox>
          <UserTypeSelectCard
            onClick={() => handleClick('parent')}
            title="학부모 회원가입"
            imgSrc={parentImg}
            description="학부모님은 자녀의 건강 및 생활 정보를 확인하고, 공지사항 열람과 소통 등 다양한 기능을 편리하게 이용하실 수 있습니다."
          />
          <UserTypeSelectCard
            onClick={() => handleClick('teacher')}
            title="교사 회원가입"
            imgSrc={teacherImg}
            description="교사는 본인의 스케줄 관리 및 행정 업무 처리 등 다양한 기능을 편리하게 이용하실 수 있습니다. "
          />
          <UserTypeSelectCard
            onClick={() => handleClick('manager')}
            title="시설장 회원가입"
            imgSrc={centerImg}
            description="시설장은 시설을 등록하고 운영 관리 및 행정 업무 처리 등 다양한 기능을 편리하게 이용하실 수 있습니다."
          />
        </UserTypeSelectBox>
        <Footer>
          <Foot>이용약관</Foot>
          <Foot style={{ width: '140px' }}>개인정보 처리방침</Foot>
          <Foot>고객센터</Foot>
          <Foot>@KB Corp</Foot>
        </Footer>
      </Container>
    </CommonFind>
  );
};

export default UserTypeSelect;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const UserTypeSelectBox = styled.div`
  display: flex;
  width: 1000px;
  margin: 0 auto;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;

const Foot = styled.div`
  width: 94px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
