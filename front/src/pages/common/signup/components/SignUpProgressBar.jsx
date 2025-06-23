import React from 'react';
import styled from 'styled-components';

const SignUpProgressBar = ({ steps, currentStep }) => {
  return (
    <Wrapper>
      {steps.map((label, index) => (
        <Step key={index}>
          <Circle $active={index <= currentStep} />
          {index < steps.length - 1 && <Bar $active={index < currentStep} />}
          <Label $active={index <= currentStep}>{label}</Label>
        </Step>
      ))}
    </Wrapper>
  );
};

export default SignUpProgressBar;

const Wrapper = styled.div`
  display: flex;
  width: 750px;
  margin: 0 auto;
`;

const Step = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? '#F36B4D' : '#BCBCBC')};
  z-index: 1;
`;

const Bar = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  left: 50%;
  width: 100%;
  height: 5px;
  background-color: ${(props) => (props.$active ? '#F36B4D' : '#BCBCBC')};
  z-index: ${({ theme }) => theme.zIndices.base};
`;

const Label = styled.span`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${(props) => (props.$active ? 900 : 400)};
  text-align: center;
  color: #444;
`;
