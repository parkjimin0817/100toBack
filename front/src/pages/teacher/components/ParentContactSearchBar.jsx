import React from 'react';
import styled from 'styled-components';
import { IoSearch } from 'react-icons/io5';

const ParentContactSearchBar = ({ selectedClass, setSelectedClass, searchKeyword, setSearchKeyword, value }) => {
  const uniqueClassNames = [...new Set(value.map((item) => item.class_name))];
  return (
    <Wrapper>
      <SearchDiv>
        <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">전체</option>
          {uniqueClassNames.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </Select>
      </SearchDiv>
      <SearchDiv>
        <InputWrapper>
          <Input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="아동 이름을 검색해주세요."
          />
          <SearchIcon />
        </InputWrapper>
      </SearchDiv>
    </Wrapper>
  );
};

export default ParentContactSearchBar;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
`;

const SearchDiv = styled.div`
  width: 200px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`;
const Select = styled.select`
  width: 180px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-align: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const SearchIcon = styled(IoSearch)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 18px;
  pointer-events: none;
`;
const Input = styled.input`
  width: 200px;
  height: 40px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
