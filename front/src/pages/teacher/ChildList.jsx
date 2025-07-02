// 시설장 아동목록
import React, { useEffect } from 'react';
import List from '../../components/ChildrenList';
import ContentHeader from '../../components/Common/ContentHeader';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useLoginStore from '../../store/loginStore';

const ChildList = () => {
  const member = useLoginStore((state) => state.member);
  const navigator = useNavigate();

  const { classNo: paramClassNo } = useParams(); //url로 받은 반 번호

  useEffect(() => {
    if (!member) {
      alert('로그인이 필요합니다.');
      navigator('/'); // 로그인 페이지로 이동
    }
  }, [member, navigator]);

  // 로그인 되기 전에는 화면 렌더링하지 않도록
  if (!member) return null;

  const classNo = member.classNo; //멤버의 반번호
  const centerNo = member.centerNo;
  const memberType = member.memberType;

  const buttons = [{ Title: '반 목록', func: () => navigator('/class/list') }];

  return (
    <Content>
      <ContentHeader Title="아동 목록" Color="orange" ButtonProps={buttons} />
      <List
        Color="orange"
        showAll={true}
        sortBy="createDate"
        roleBy="child"
        //시설장인 경우 필터링 null -> url에 있으면 url , 교사일 경우 url 우선 -> 해당 교사 반
        classFilter={memberType === 'MANAGER' ? (paramClassNo ?? null) : paramClassNo || classNo}
        centerNo={centerNo}
      />
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  min-height: 300px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export default ChildList;
