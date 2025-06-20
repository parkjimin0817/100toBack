import { useEffect, useState } from 'react';
import styled from 'styled-components';

const CenterSearchInput = ({ onSelect, label, data = [], loading = false, error }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  //center data 예시
  // [
  // {center_name : '땡땡유치원',
  //   center_no: 1,
  //   center_address: '주소주소'
  //   status: "APPROVED"
  // },
  // ]

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropDown(false);
      return;
    }

    const filtered = data.filter((center) => center.center_name.includes(query));
    setResults(filtered);
    setShowDropDown(true);
  }, [data]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    const filtered = data.filter((center) => center.center_name.includes(e.target.value));
    setResults(filtered);
    setShowDropDown(true);
  };

  const handleSelect = (center) => {
    setQuery(center.center_name);
    setResults([]);
    setShowDropDown(false);
    onSelect && onSelect(center.center_no);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputRow>
        <Input
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          placeholder="시설명 입력 후 선택해주세요"
        />
      </InputRow>
      {loading ? (
        <p>로딩중 ...</p>
      ) : (
        showDropDown && (
          <Dropdown>
            {results.length > 0 ? (
              results.map((center) => (
                <DropdownItem key={center.center_no} onClick={() => handleSelect(center)}>
                  {center.center_name}({center.center_address})
                </DropdownItem>
              ))
            ) : (
              <NoResult>검색 결과가 없습니다.</NoResult>
            )}
          </Dropdown>
        )
      )}
      {error && <Message>{error}</Message>}
    </Wrapper>
  );
};

export default CenterSearchInput;

const Wrapper = styled.div`
  width: 400px;
  height: 130px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing[3]};
  position: relative;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing[3]};
  padding-right: ${({ theme }) => theme.spacing[24]};
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const Button = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing[2]};
  height: 30px;
  padding: ${({ theme }) => `${theme.spacing[0]} ${theme.spacing[3]}`};
  outline: none;
  background-color: ${({ theme }) => theme.colors.lightblue};
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightblue};
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-top: none;
  z-index: ${({ theme }) => theme.zIndices.docked};
`;

const DropdownItem = styled.li`
  padding: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const NoResult = styled.li`
  padding: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 4px;
  margin-left: 4px;
  text-align: left;
`;
