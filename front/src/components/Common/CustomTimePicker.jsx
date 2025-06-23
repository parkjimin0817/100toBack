import React from 'react';
import TimePicker from 'react-time-picker';
import styled from 'styled-components';
import 'react-time-picker/dist/TimePicker.css';

const CustomTimePicker = styled(TimePicker)`
  width: 150px;
  height: 30px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  padding: ${({ theme }) => theme.spacing[1]};
  outline: none;
  background-color: white;
  box-sizing: border-box;

  /* 감싸는 wrapper 스타일 */
  .react-time-picker__wrapper {
    border: none;
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  /* input 스타일 */
  .react-time-picker__inputGroup input {
    border: none;
    outline: none;
    width: 2.2rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    background: transparent;
    text-align: center;
    padding: 0;
    margin: 0;
  }
`;

export default CustomTimePicker;
