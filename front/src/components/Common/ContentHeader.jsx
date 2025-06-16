import React, { useEffect } from 'react';
import styled from 'styled-components';

// 모든 페이지에 공통으로 들어가는 컨텐츠 헤더.
/**
 * ? use Props
 * ! Title : 해당 페이지의 이름. ex) 아동 전체 목록.
 * ! Color : 해당 페이지의 테마 색상.
 * ! ButtonProps : 버튼의 이름과 클릭시 이벤트 함수를 가지는 배열.
 * ! ButtonProps[n].Title : 버튼의 이름.
 * ! ButtonProps[n].Func : 버튼의 함수.
 *
 * 실제 예시 :
 * Title={'HOME'}
 * Color={'lightblue'}
 * ButtonProps={
 *  [
 *    {Title : '뒤로가기', func : () => alert('뒤로가기~')},
 *    {Title : '앞으로가기', func : () => alert('앞으로가기~')},
 *  ]
 * }
 */

const ContentHeader = ({ Title, Color, ButtonProps, FontSize }) => {
  return (
    <ContentHeaderContainer $HeaderColor={Color}>
      <ContentHeaderTitle $HeaderFontSize={FontSize}>{Title}</ContentHeaderTitle>
      <ButtonContainer>
        {ButtonProps &&
          ButtonProps.length > 0 &&
          ButtonProps.map((ButtonProp, index) => (
            <HeaderButton 
              key={index + 'key'} 
              onClick={ButtonProp.func} 
              $HeaderColor={Color}
            >
              {ButtonProp.Title}
            </HeaderButton>
          ))}
      </ButtonContainer>
    </ContentHeaderContainer>
  );
};

const ContentHeaderContainer = styled.div`
  background-color: ${({ theme, $HeaderColor }) => theme.colors[$HeaderColor]};
  color: white;
  display: flex;
  padding: 15px 30px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ContentHeaderTitle = styled.h2`
  font-size: ${({ theme, $HeaderFontSize }) => theme.fontSizes[$HeaderFontSize]};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const HeaderButton = styled.button`
  background-color: white;
  color: ${({ theme, $HeaderColor }) => theme.colors[$HeaderColor]};
  padding: 5px 30px;
  border-radius: 5px;
  font-size: 12px;
`;

export default ContentHeader;
