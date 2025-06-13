import React from 'react'
import List from '../../components/ChildrenList'
import ContentHeader from '../../components/Common/ContentHeader'
import { useNavigate } from 'react-router-dom'

const ChildList = () => {
  const navigator = useNavigate();
  const buttons = [
    { Title: '반 목록', func: () => navigator('/classlist') },
    { Title: '뒤로가기', func: () => navigator(-1) }
  ];
  return (
    <>
      <ContentHeader 
        Title="아동 목록"
        Color="orange"
        ButtonProps={buttons}
      />
      <List 
        Color="orange"
        showAll={true}
        sortBy="createDate"
        roleBy="child"
        classFilter="햇님반"
        // 여기 classFilter에다가 세션에 있는 교사의 소속 반 변수를 넣으면 필터링되어 아동목록이 나타남
      />
    </>
    
  )
}

export default ChildList;