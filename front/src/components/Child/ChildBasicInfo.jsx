import React from 'react'
import styled from 'styled-components';
import defaultimg from '../../assets/defaultimg.png';

const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;

const ChildBasicInfo = ({ child }) => {
  const getBirthAndAge = (jumin) => {
    if (!jumin || jumin.length !== 6) return '';

    const yy = parseInt(jumin.slice(0, 2), 10);
    const mm = parseInt(jumin.slice(2, 4), 10);
    const dd = parseInt(jumin.slice(4, 6), 10);

    const currentYear = new Date().getFullYear();
    const currentTwoDigitYear = currentYear % 100;
    const century = yy <= currentTwoDigitYear ? 2000 : 1900;
    const fullYear = century + yy;

    const birthDate = new Date(`${fullYear}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`);
    if (isNaN(birthDate.getTime())) return '';

    let age = currentYear - fullYear;
    const today = new Date();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${fullYear}.${String(mm).padStart(2, '0')}.${String(dd).padStart(2, '0')} (만 ${age}세)`;
  };

  return (
    <ChildBasicInfoContainer>
      <ChildProfileImg 
        src={child.child_profile ? 
          `${CLOUDFRONT_URL}/${child.child_profile}` : 
          defaultimg}
        alt="아동 프로필"
      />
      <ChildInfoContainer>
        <ChildNameAndClass>{child.child_name}</ChildNameAndClass>
        <ChildInfoBox>
          <ChildInfoLabel>생년월일</ChildInfoLabel>
          <ChildInfoSpan>{getBirthAndAge(child.child_birthday)}</ChildInfoSpan>
        </ChildInfoBox>
        <ChildInfoBox>
          <ChildInfoLabel>키</ChildInfoLabel>
          <ChildInfoSpan>{child.child_height} cm</ChildInfoSpan>
        </ChildInfoBox>
        <ChildInfoBox>
          <ChildInfoLabel>몸무게</ChildInfoLabel>
          <ChildInfoSpan>{child.child_weight} kg</ChildInfoSpan>
        </ChildInfoBox>
        <ChildInfoBox>
          <ChildInfoLabel>주소</ChildInfoLabel>
          <ChildInfoSpan>{child.child_address}</ChildInfoSpan>
        </ChildInfoBox>
      </ChildInfoContainer>
      <ChildInfoContainer>
        <ChildNameAndClass>{child.class_name === '미배정' ? '미배정' : `${child.class_name}반`}</ChildNameAndClass>
        <ChildInfoBox>
          <ChildInfoLabel>학부모</ChildInfoLabel>
          <ChildInfoSpan>부:{child.father_name}, 모:{child.mother_name}</ChildInfoSpan>
        </ChildInfoBox>
        <ChildInfoBox>
          <ChildInfoLabel>비상연락처</ChildInfoLabel>
          <ChildInfoSpan>
            <p>부:{child.father_phone}</p>
            <p>모:{child.mother_phone}</p>
          </ChildInfoSpan>
        </ChildInfoBox>
      </ChildInfoContainer>
    </ChildBasicInfoContainer>
  )
}

export default ChildBasicInfo;

const ChildBasicInfoContainer = styled.div`
  display: flex;
  padding : 30px;
`;

const ChildProfileImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 40px;
`;

const ChildInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  gap: 10px;
`;

const ChildNameAndClass = styled.h2``;

const ChildInfoBox = styled.div`
  display: flex;
  gap: 10px;
`;

const ChildInfoLabel = styled.label`
  text-align: left;
  min-width : 80px;
  font-weight: bold;
`;

const ChildInfoSpan = styled.span``;



