import styled from 'styled-components';
import UserTypeSelectCard from './components/UserTypeSelectCard';
import parentImg from '../../../assets/image/parent.png';
import teacherImg from '../../../assets/image/teacher.png';
import centerImg from '../../../assets/image/center.png';
import logo from '../../../assets/image/logo.png';

const UserTypeSelect = () => {
  return (
    <>
      <img src={logo} />
      <Container>
        <UserTypeSelectCard
          title="학부모 회원가입"
          imgSrc={parentImg}
          description="학부모님은 자녀의 건강 및 생활 정보를 확인하고, 공지사항 열람과 소통 등 다양한 기능을 편리하게 이용하실 수 있습니다."
        />
        <UserTypeSelectCard
          title="교사 회원가입"
          imgSrc={teacherImg}
          description="교사는 본인의 스케줄 관리 및 행정 업무 처리 등 다양한 기능을 편리하게 이용하실 수 있습니다. "
        />
        <UserTypeSelectCard
          title="시설장 회원가입"
          imgSrc={centerImg}
          description="시설장은 시설을 등록하고 운영 관리 및 행정 업무 처리 등 다양한 기능을 편리하게 이용하실 수 있습니다."
        />
      </Container>
    </>
  );
};

export default UserTypeSelect;

const Container = styled.div`
  display: flex;
`;
