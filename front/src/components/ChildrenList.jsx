import React from 'react'
import styled from 'styled-components'
import Child from '../assets/Child.png'

const ChildrenList = () => {
  return (
    <Container>
      <TitleLine>아동목록</TitleLine>
      <CardLine>
        {/* 카드들은 배열로 받아서 map으로 쭉 받으면 될 듯 합니다. 일단 하드코딩! */}
        <Card>
          <PictureBox>
            <ChildPic src={Child} alt="아이사진" />
          </PictureBox>
          <NameBox>
            <NameLine>
              김승기
            </NameLine>
            <ClassLine>
              햇님반
            </ClassLine>
          </NameBox>
        </Card>
        <Card>
          <PictureBox>
            <ChildPic src={Child} alt="아이사진" />
          </PictureBox>
          <NameBox>
            <NameLine>
              김승기
            </NameLine>
            <ClassLine>
              햇님반
            </ClassLine>
          </NameBox>
        </Card>
        <Card>
          <PictureBox>
            <ChildPic src={Child} alt="아이사진" />
          </PictureBox>
          <NameBox>
            <NameLine>
              김승기
            </NameLine>
            <ClassLine>
              햇님반
            </ClassLine>
          </NameBox>
        </Card>
        <Card>
          <PictureBox>
            <ChildPic src={Child} alt="아이사진" />
          </PictureBox>
          <NameBox>
            <NameLine>
              김승기
            </NameLine>
            <ClassLine>
              햇님반
            </ClassLine>
          </NameBox>
        </Card>
        <Card>
          <PictureBox>
            <ChildPic src={Child} alt="아이사진" />
          </PictureBox>
          <NameBox>
            <NameLine>
              김승기
            </NameLine>
            <ClassLine>
              햇님반
            </ClassLine>
          </NameBox>
        </Card>
        <Card>
          <PictureBox>
            <ChildPic src={Child} alt="아이사진" />
          </PictureBox>
          <NameBox>
            <NameLine>
              김승기
            </NameLine>
            <ClassLine>
              햇님반
            </ClassLine>
          </NameBox>
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
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
  padding-top: 0;
  padding-bottom: 80px;
  flex-grow: 0;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

const TitleLine = styled.div`
  margin-left: 60px;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`

const CardLine = styled.div`
  max-height: 740px;     /* Container 높이 – TitleLine 높이 만큼 조절 */
  overflow-y: auto;      /* 세로 스크롤 */
  overflow-x: hidden;    /* 가로 스크롤 숨김 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 60px;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  align-items: flex-start;
`

const Card = styled.div`
  position: relative;        /* 기준 컨테이너 */
  width: 160px;
  height: 185px;
  margin-top: 55px;
  border: 2px solid white;
  flex: 0 0 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PictureBox = styled.div`
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

const NameBox = styled.div`
  position: absolute;        /* 절대위치 */
  bottom: 0;                 /* 카드 내부 바닥에 딱 */
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 50px;
  background-color: ${({theme}) => theme.colors.orange};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  flex-direction: column;
`


const NameLine = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white;
`

const ClassLine = styled.div`
  font-size: 10px;
  font-weight: normal;
  color: white;
`