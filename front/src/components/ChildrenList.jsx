import React from 'react'
import styled from 'styled-components'
import ChildImg from '../assets/Child.png'

// 하드코딩된 예시 데이터
const List = [
  { id: 1, name: '김승기', className: '햇님반', createDate: '2025-06-13',role: 'child' },
  { id: 2, name: '정의철', className: '햇님반', createDate: '2025-06-12',role: 'child' },
  { id: 3, name: '양동민', className: '', createDate: '2025-06-11',role: 'child' },
  { id: 4, name: '정형일', className: '달님반', createDate: '2025-06-10',role: 'child' },
  { id: 5, name: '박지민', className: '', createDate: '2025-06-9',role: 'child' },
  { id: 6, name: '김승기', className: '별님반', createDate: '2025-06-8',role: 'child' },
  { id: 7, name: '정의철', className: '', createDate: '2025-06-7',role: 'child' },
  { id: 8, name: '양동민', className: '햇님반', createDate: '2025-06-6',role: 'child' },
  { id: 9, name: '정형일', className: '햇님반', createDate: '2025-06-5',role: 'child' },
  { id: 10, name: '박지민', className: '달님반', createDate: '2025-06-4',role: 'child'},
  { id: 11, name: '김승기', className: '햇님반', createDate: '2025-06-13',role: 'teacher' },
  { id: 12, name: '정의철', className: '햇님반', createDate: '2025-06-12',role: 'teacher' },
  { id: 13, name: '양동민', className: '', createDate: '2025-06-11',role: 'teacher' },
  { id: 14, name: '정형일', className: '달님반', createDate: '2025-06-10',role: 'teacher' },
  { id: 15, name: '박지민', className: '', createDate: '2025-06-9',role: 'teacher' },
  { id: 16, name: '김승기', className: '별님반', createDate: '2025-06-13',role: 'teacher' }
]

// ChildrenList.jsx 내부
const ChildrenList = ({ showAll, sortBy, roleBy, classFilter, Color }) => {
  let list = [...List]

  if (!showAll) {
    list = list.filter(child => !child.className)
  }

  if (sortBy === 'class') {
    list.sort((a, b) => a.className.localeCompare(b.className))
  } else if (sortBy === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === 'createDate') {
    list.sort((a,b) => new Date(b.createDate) - new Date(a.createDate))
  }

  // 역할(role) 필터링: 'child' 또는 'teacher'만 필터링
  if (roleBy === 'child' || roleBy === 'teacher') {
    list = list.filter(item => item.role === roleBy)
  }

  if (classFilter) {
     list = list.filter(item => item.className === classFilter)
  }
  

  return (
    <Container>
      <CardLine>
        {list.map(child => (
          <Card key={child.id}>
            <PictureBox Color={Color}>
              <ChildPic src={ChildImg} alt="아이사진" />
            </PictureBox>
            <NameBox Color={Color}>
              <NameLine>{child.name}</NameLine>
              <ClassLine>{child.className || '미배정'}</ClassLine>
            </NameBox>
          </Card>
        ))}
      </CardLine>
    </Container>
  )
}

export default ChildrenList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1026px;
  height: 740px;
  overflow-y: auto;
  margin: 0 auto;
  padding: 0 0 80px;
`

const CardLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0 0 60px;
`

const Card = styled.div`
  position: relative;
  width: 160px;
  height: 185px;
  margin-top: 55px;
  border: 2px solid white;
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
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  &:hover {
    border: solid 5px ${({ theme, Color }) => theme.colors[Color]};
    cursor: pointer;
  }
`

const ChildPic = styled.img`
  border-radius: 10px;
`

const NameBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 50px;
  background-color: ${({ theme, Color }) => theme.colors[Color]};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`

const NameLine = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white;
`

const ClassLine = styled.div`
  font-size: 10px;
  color: white;
`
