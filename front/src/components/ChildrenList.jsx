import React from 'react'
import styled from 'styled-components'
import Child from '../assets/Child.png'

const ChildrenList = () => {
  return (
    <Container>
      <TitleLine>아동목록</TitleLine>
      <CardLine>
        <Card>
          <CardBox>
            <ChildPic src={Child} alt="아이사진" />
          </CardBox>
        </Card>
      </CardLine>
    </Container>
  )
}

export default ChildrenList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 1026px;
  max-height: 840px;
  margin: 0 auto;
  padding-top: 0;
  padding-bottom: 80px;
  flex-grow: 0;
  border: 1px solid black;
`

const TitleLine = styled.div`
  margin-left: 60px;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`

const CardLine = styled.div`
  display: flex;
  flex-direction: row;
`

const Card = styled.div`
 margin-top: 55px;
 width: 160px;
 height: 185px;
 border: 2px solid white;
`

const CardBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`

const ChildPic = styled.img`
  border-radius: 10px;
`