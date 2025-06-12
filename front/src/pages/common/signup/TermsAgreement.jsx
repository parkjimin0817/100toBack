import SignUpProgressBar from './components/SignUpProgressBar';

const steps = ['약관 동의', '기본 정보 입력', '시설 정보 입력', '가입 완료'];

const TermsAgreement = () => {
  const currentStep = 0;
  return (
    <>
      <SignUpProgressBar steps={steps} currentStep={currentStep} />
    </>
  );
};

export default TermsAgreement;
