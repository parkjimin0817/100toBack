import styled from 'styled-components';
import SignUpProgressBar from './components/SignUpProgressBar';
import { IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';
import AgreeModal from './components/AgreeModal';
import modalContents from '../../../assets/agreement';
import CommonFind from '../../../components/Common/CommonFind';
import NextButton from './components/NextButton';

const steps = ['약관 동의', '기본 정보 입력', '근무 정보 입력', '가입 완료'];

const TermsAgreement = () => {
  const currentStep = 0;
  //열려있는 모달 항목
  const [openModalKey, setOpenModalKey] = useState(null);
  //각 항목 체크박스 체크 여부
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    sensitive: false,
  });
  //세 항목이 모두 동의했을때 모두 동의 체크 박스 켜짐
  const isAllAgreed = agreements.service && agreements.privacy && agreements.sensitive;
  const toggleAll = () => {
    const newValue = !isAllAgreed;
    setAgreements({
      service: newValue,
      privacy: newValue,
      sensitive: newValue,
    });
  };
  const handleAgree = () => {
    setAgreements((prev) => ({ ...prev, [openModalKey]: true }));
    setOpenModalKey(null);
  };
  const handleCloseModal = () => {
    setOpenModalKey(null);
  };

  return (
    <CommonFind>
      <Container>
        <SignUpProgressBar steps={steps} currentStep={currentStep} />
        <Title>다음 내용에 동의해주세요</Title>
        <Wrapper>
          <AgreeAllBox>
            <Checkbox type="checkbox" checked={isAllAgreed} onChange={toggleAll} />
            <Text>모두 동의</Text>
            <Info>필수 항목에 모두 동의</Info>
          </AgreeAllBox>
          <AgreeBox>
            <Checkbox
              type="checkbox"
              checked={agreements.service}
              onChange={() => setAgreements((prev) => ({ ...prev, service: !prev.service }))}
            />
            <TextWrapper>
              <Text>킨더브릿지 서비스 이용약관 동의 (필수)</Text>
              <IoIosArrowForward size={20} onClick={() => setOpenModalKey('service')} />
            </TextWrapper>
          </AgreeBox>
          <AgreeBox>
            <Checkbox
              type="checkbox"
              checked={agreements.privacy}
              onChange={() => setAgreements((prev) => ({ ...prev, privacy: !prev.privacy }))}
            />
            <TextWrapper>
              <Text>개인정보 수집 및 이용 동의 (필수)</Text>
              <IoIosArrowForward size={20} onClick={() => setOpenModalKey('privacy')} />
            </TextWrapper>
          </AgreeBox>
          <AgreeBox>
            <Checkbox
              type="checkbox"
              checked={agreements.sensitive}
              onChange={() => setAgreements((prev) => ({ ...prev, sensitive: !prev.sensitive }))}
            />
            <TextWrapper>
              <Text>민감정보 수집 및 이용 동의 (필수)</Text>
              <IoIosArrowForward size={20} onClick={() => setOpenModalKey('sensitive')} />
            </TextWrapper>
          </AgreeBox>
          <NextButton to="/signup/info">다음 단계</NextButton>
        </Wrapper>
        {openModalKey && (
          <AgreeModal
            title={modalContents[openModalKey].title}
            content={modalContents[openModalKey].content}
            onClose={handleCloseModal}
            onAgree={handleAgree}
          />
        )}
      </Container>
    </CommonFind>
  );
};

export default TermsAgreement;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  display: block;
  margin: ${({ theme }) => theme.spacing[8]} 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  margin: ${({ theme }) => theme.spacing[4]};
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.borderRadius.none};
  appearance: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.orange};
  }
`;

const AgreeAllBox = styled.div`
  background: #ededed;
  width: 430px;
  height: 65px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Info = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
  margin: 0 0 0 15px;
`;

const AgreeBox = styled.div`
  width: 430px;
  height: 65px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 370px;
  align-items: center;
  justify-content: space-between;
`;
