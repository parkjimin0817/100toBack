# 프론트엔드 (React)

## 프로젝트 구조
- React 기반 SPA
- JWT 토큰을 활용한 인증 처리

## 주요 라이브러리
- React
- Zustand
- Styled-components
- React Hook Form
- Axios
- React Calendar / Datepicker / Time Picker
- React Toastify
- React Spinners
- Vite

## 실행 방법

```bash
cd front
npm install
npm start
```

## 주요 페이지
### 공용
- 로그인/회원가입 페이지
- 유치원 내 사용자들과의 채팅

### 시설장/교사
- 메인페이지(데시보드)
- 마이페이지(프로필)
- 시설 공용 게시판(공지사항, 가정통신문, 알림장, 사진게시판) 열람/작성
- 개인/유치원 일정 작성
- 시설장의 해당 시설 회원가입 승인/거부
- 교사의 담당반 아동 건강 밎 생활 기록
- 교사의 담당반 일정 작성
- 휴가/워케이션 신청
- 개인 서류 업로드 및 다운로드

### 학부모
- 시설에 아동 등록
- 시설 공용 게시판 열람
- 아동이 속한 반의 일정 확인
- 교사가 기록한 아동 정보 열람

### ETC
- 인증이 필요한 페이지 접근 시 토큰 검증
- coolsms를 통한 회원가입 시 전화번호 인증

## 환경 변수
- `.env` 파일에서 API 서버 주소 설정
