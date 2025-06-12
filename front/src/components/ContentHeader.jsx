import React from 'react'
import styled from 'styled-components'

// 모든 페이지에 공통으로 들어가는 컨텐츠 헤더.
/**
 * ? use Props
 * ! Title : 해당 페이지의 이름. ex) 아동 전체 목록.
 * ! Color : 해당 페이지의 테마 색상.
 * ! ButtonProps : 버튼의 이름과 클릭시 이벤트 함수를 가지는 배열.
 * ! ButtonProps[n].Title : 버튼의 이름. 
 * ! ButtonProps[n].Func : 버튼의 함수.
 */

const ContentHeader = ({Title, Color, ButtonProps}) => {
  return (
    <ContentHeaderContainer Color={Color}>
      <ContentHeaderTitle>{Title}</ContentHeaderTitle>
      <ButtonContainer>
        {ButtonProps.length > 0 && 
          ButtonProps.map((ButtonProp) => {
            <HeaderButton onClick={ButtonProp.func}>
              {ButtonProp.Title}
            </HeaderButton>
          })
        }
      </ButtonContainer>
    </ContentHeaderContainer>
  )
}

const ContentHeaderContainer = styled.div`
  background-color: ${({ theme, Color }) => theme.colors[Color]}
`;

const ContentHeaderTitle = styled.h2`
`;

const ButtonContainer = styled.div``;

const HeaderButton = styled.button``;

export default ContentHeader