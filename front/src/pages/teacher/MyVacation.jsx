import React, { useEffect, useState } from 'react';
import ContentHeader from '../../components/Common/ContentHeader';
import styled from 'styled-components';
import VacationForm from './components/VacationForm';
import VacationDateInfoBox from './components/VacationDateInfoBox';
import MyVacationList from './components/MyVacationList';
import { vacationService } from '../../api/vacation';
import useLoginStore from '../../store/loginStore';

const MyVacation = () => {
  const { member } = useLoginStore();
  const memberNo = member?.memberNo;
  const [vacations, setVacations] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await vacationService.getVacationList(memberNo);
    setVacations(data);
  };

  const handleRefresh = () => {
    fetchData();
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Wrapper>
      <ContentHeader Title={'휴가 관리'} Color={'blue'} />
      <Content>
        <VacationForm onSuccess={handleRefresh} />
        <VacationDateInfoBox memberNo={memberNo} refreshKey={refreshKey} />
      </Content>
      <Content>
        <MyVacationList vacations={vacations} onDeleteSuccess={handleRefresh} />
      </Content>
    </Wrapper>
  );
};

export default MyVacation;

const Wrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;
const Content = styled.div`
  width: 100%;
  display: flex;
`;
