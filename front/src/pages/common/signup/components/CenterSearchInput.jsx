import { useEffect, useState } from 'react';
import styled from 'styled-components';

const mockCenters = [
  { id: 1, name: '서울1유치원' },
  { id: 2, name: '서울2유치원' },
  { id: 3, name: '서울3유치원' },
  { id: 4, name: '서울4유치원' },
  { id: 5, name: '서울4유치원' },
  { id: 6, name: '서울4유치원' },
  { id: 7, name: '서울4유치원' },
];

const CenterSearchInput = ({ onSelect, label }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false); // 선택 후에는 자동검색 안 함
      return;
    }

    if (!query.trim()) {
      setShowDropDown(false);
      setResults([]);
      return;
    }
    const filtered = mockCenters.filter((center) => center.name.includes(query));
    setResults(filtered);
    setShowDropDown(true);
  }, [query]);

  //검색기능 (일단x)
  //   const handleSearch = () => {
  //     if (!query.trim()) return;
  //     const filtered = mockCenters.filter((center) => center.name.includes(query));
  //     setResults(filtered);
  //     setShowDropDown(true);
  //   };

  const handleSelect = (center) => {
    setIsSelecting(true);
    setShowDropDown(false);
    setQuery(center.name);
    onSelect && onSelect(center);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputRow>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              //   handleSearch();
            }
          }}
          placeholder="시설명을 검색해주세요."
        />
        <Button>검색</Button>
      </InputRow>

      {showDropDown && (
        <Dropdown>
          {results.length > 0 ? (
            results.map((center) => (
              <DropdownItem key={center.id} onClick={() => handleSelect(center)}>
                {center.name}
              </DropdownItem>
            ))
          ) : (
            <NoResult>검색 결과가 없습니다.</NoResult>
          )}
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default CenterSearchInput;

const Wrapper = styled.div`
  width: 400px;
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
