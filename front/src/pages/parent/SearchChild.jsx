import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignUpInput from '../common/signup/components/SignUpInput';
import NextButton from '../common/signup/components/NextButton';
import ChildRRNInput from '../common/signup/components/ChildRRNInput';

const SearchChild = () => {
  const navigate = useNavigate();
  const headerButtons = [{ Title: '뒤로가기', func: () => navigate(-1) }];
  return (
    <>
      <Content>
        <ContentHeader Title={'아동 검색'} Color={'orange'} ButtonProps={headerButtons} />
        <ContentLine>
          <SignUpInput type="text" description="아동명을 정확하게 입력해주세요." label="아동 검색" />
          <ChildRRNInput label="아동 주민등록번호" />
          <NextButton to="/signup/complete">검색하기</NextButton>
        </ContentLine>
      </Content>
    </>
  );
};

export default SearchChild;

const Content = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ContentLine = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const Button = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 130px;
  height: 35px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  outline: none;
  background: ${({ theme }) => theme.colors.lightblue};
  margin-bottom: 50px;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;
