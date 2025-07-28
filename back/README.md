# 백엔드 (Spring Boot)

## 프로젝트 구조
- Spring Boot 기반 REST API 서버
- JWT를 활용한 인증/인가 구현
- JPA를 활용한 객체지향적인 엔티티 설계 및 데이터베이스 연동 구현

## 주요 라이브러리
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring WebSocket
- Gradle
- JWT (JSON Web Token)
- AWS S3
- MySQL

## 실행 방법

```bash
cd back
./gradlew bootRun
```

## API 명세

| 메서드 | 엔드포인트        | 설명           |
| ------ | ---------------- | -------------- |
| GET | /api/members/checkId | 아이디 중복 체크 |
| POST | /api/members/manager | 시설장(시설) 생성 |
| POST | /api/members/teacher | 교사 생성 |
| POST | /api/members/parent | 학부모 생성, 아동 등록 |
| POST | /api/members/login | 로그인 |
| GET | /api/members/teacher/select/{centerNo} | 시설 별 교사 목록 불러오기 for 셀렉트바 |
| GET | /api/members/teacher/list/{centerNo} | 시설 별 교사 목록 조회 for 목록 페이지 |
| GET | /api/members/teacher/{memberNo} | 교사 조회 memberNo으로 |
| POST | /api/members/searchId | 멤버 ID 조회(이름, 생년월일) |
| GET | /api/members/mypage | 마이페이지에서 정보 조회 |
| PATCH | /api/members/mypage | 마이페이지에서 정보 수정(교사일 경우 본인 이름,전화번호만 수정 가능, 시설장일 경우 시설정보까지 수정 가능) |
| PATCH | /api/members/mypage/parent | 학부모 마이페이지 수정 |
| POST | /api/members/pwdSearchId | 멤버 PWD 찾기(아이디 비교) |
| PATCH | /api/members/pwdUpdate | 비밀번호 변경 |
| GET | /api/members/get | 멤버 번호로 멤버 가져오기 |
| GET | /api/members/getteacher | 시설장 선생 목록 가져오기(시설 번호를 받아서) |
| PATCH | /api/members/updateclass | 멤버 번호로 반 수정하기 |
| GET | /api/members/introList | 센터 번호로 교사 소개 리스트 가져오기 |
| GET | /api/members/memberList | 센터별 멤버 목록 조회 |
| POST | /api/members/health/create | 기록 생성 |
| GET | /api/members/health/list | 기록 리스트 불러오기 |
| GET | /api/members/health/detail | 기록 상세보기 |
| PATCH | /api/members/health/edit | 기록 수정 |
| DELETE | /api/members/health/delete | 기록 삭제 |
| GET | /api/members/health/main/avg/{memberNo} | 지난주, 이번주 스트레스 평균 |
| GET | /api/center | 시설 목록 가져오기 |
| GET | /api/center/detail | 시설 정보 불러오기 |
| GET | /api/childs | 반 번호로 아동 목록 가져오기 |
| POST | /api/childs/add | 아동 생성 |
| POST | /api/childs/link | 로그인된 부모의 아동 연결 |
| GET | /api/childs/all | 시설장 아동 목록 가져오기 |
| GET | /api/childs/get | 아동 번호로 아동 가져오기 |
| PATCH | /api/childs/updateclass | 아동 번호로 반 수정하기 |
| GET | /api/childs/healthlog | 아동 번호로 해당 아동의 건강 로그 데이터 리스트 불러오기(매일 기록하는거) |
| GET | /api/childs/health | 아동 번호로 해당 아동의 건강 데이터 불러오기(복약정보,예방접종,알레르기) |
| GET | /api/childs/activitylog | 아동 번호로 해당 아동의 행동 로그 데이터 불러오기(매일 적는 거) |
| GET | /api/childs/activity | 아동 번호로 해당 아동의 생활 데이터 불러오기 |
| GET | /api/childs/attendance | 아동 번호로 해당 아동의 출석 내역 리스트 불러오기 |
| GET | /api/childs/detail | 아동 상세보기에 필요한 데이터들 가져오기 |
| PATCH | /api/childs/updateInfoDetail | 아동 상세보기 수정 |
| PATCH | /api/childs/updatehealthdata | 아동 상세보기에서 건강 데이터 수정 |
| PATCH | /api/childs/updateactivitydata | 아동 상세보기에서 생활 데이터 수정 |
| GET | /api/childs/healthlog/class | 아동 건강 로그 체크리스트 날짜,반 별로 조회 |
| GET | /api/childs/activitylog/class | 아동 생활 로그 체크리스트 날짜,반 별로 조회 |
| GET | /api/childs/parentChild | 부모 번호로 해당 연결된 아동 리스트 가져오기 |
| PATCH | /api/childs/updatehealthlog | 아동 건강 로그 체크리스트 데이터 삽입,수정 |
| PATCH | /api/childs/updateactivitylog | 아동 생활 로그 체크리스트 데이터 삽입,수정하기 |
| GET | /api/childs/healthlog/parent | 부모 번호로 선택 날짜의 아동 건강 로그 체크리스트 불러오기(본인 아동들의 건강 로그 데이터) |
| GET | /api/childs/activitylog/parent | 부모 번호로 선택 날짜의 아동 생활 로그 체크리스트 불러오기(본인 아동들의 생활 로그 데이터) |
| GET | /api/childs/phoneNumber/{centerNo} | 학부모 전화번호 조회 |
| GET | /api/approval/lists | 시설 승인 대기 리스트 |
| PATCH | /api/approval/decision/center | 시설장, 시설 승인거절 결정 |
| GET | /api/approval/lists/{centerNo} | 승인 대기 리스트 |
| PATCH | /api/approval/decision/member | 교사,학부모 승인거절 결정 |
| PATCH | /api/approval/decision/child | 아동 승인거절 결정 |
| PATCH | /api/approval/reapproval | 시설 재가입 요청 |
| GET | /api/attendance/today/{memberNo} | 로그인 시 당일 출퇴근 기록 불러오기 |
| POST | /api/attendance/workin/{memberNo} | 출근 시간 기록하기 |
| PATCH | /api/attendance/workout/{memberNo} | 퇴근 시간 기록하기 |
| GET | /api/attendance/teacher | 달별 교사 근태 기록 불러오기 |
| PATCH | /api/attendance/teacher/update/{attendanceNo} | 교사 근태 정보 수정하기 |
| POST | /api/attendance/teacher/create | 교사 근태 정보 생성 |
| POST | /api/attendance/createChildAttendance | 반 번호로 출결 상태 생성 |
| PATCH | /api/attendance/updateAttendance | 반 출결 상태를 변경 |
| POST | /api/boards/create | 게시글 생성 |
| GET | /api/boards/{boardNo} | 게시글 상세 조회 |
| PUT | /api/boards/{boardNo} | 게시글 수정 |
| DELETE | /api/boards/{boardNo} | 게시글 삭제 |
| GET | /api/boards/type/NOTICE | 공지사항 게시글 목록 조회 |
| GET | /api/boards/type/FAMILY_NOTICE | 가정통신문 게시글 목록 조회 |
| GET | /api/boards/type/NOTE | 알림장 목록 조회 |
| GET | /api/boards/type/PHOTO | 사진 게시글 목록 조회 |
| GET | /api/boards/type/MEAL_PLAN | 식단표 게시글 목록 조회 |
| GET | /api/boards/recent3/{centerNo} | 메인페이지 최근 게시물 3개 불러오기 |
| POST | /api/boards/documents | 개인 서류 업로드 |
| GET | /api/boards/documents/list | 개인 서류 목록 불러오기 |
| PATCH | /api/boards/documents/viewed/{boardNo} | 개인 서류 최근 열람 날짜 업데이트 |
| GET | /api/boards/documents/recent | 개인 최근 열람한 5개 목록 불러오기 |
| GET | /api/boards/type/Note/parent/{memberNo}/{centerNo} | 멤버 번호(부모)의 본인 아동의 알림장만 불러오기 |
| GET | /api/boards/type/Note/teacher/{classNo}/{centerNo} | 반 번호로 본인 반의 알림장만 불러오기 |
| POST | /api/classroom/create | 반 생성하기 |
| GET | /api/classroom/list/{centerNo} | 시설 별 반 목록 불러오기 |
| GET | /api/classroom/main/attendance-rate/{centerNo} | 반별 출석률 |
| GET | /api/classroom/main/attendance-class-rate/{classNo} | 반의 출석률 |
| GET | /api/classroom/main/healthlog-progress/{centerNo} | 반별 건강 로그 완료 현황 |
| GET | /api/classroom/main/class-healthlog-progress/{classNo} | 반 건강 로그 완료 현황 |
| PUT | /api/classroom/update/{classNo} | 반 수정하기 |
| DELETE | /api/classroom/delete/{classNo} | 반 삭제하기 |
| POST | /api/counsel/add | 상담일정 생성 |
| GET | /api/counsel | 해당 반의 상담일정 리스트 조회 |
| PATCH | /api/counsel/update | 상담 번호로 상담 일정 수정 |
| DELETE | /api/counsel/delete | 상담 번호로 상담 일정 삭제 |
| GET | /api/counsel/parent | 멤버 번호(학부모)로 상담 일정 불러오기 |
| GET | /api/counsel/getall | 시설 번호로 상담 일정 불러오기 |
| GET | api/holiday | 공휴일 리스트 불러오기 |
| GET | /api/leave/{memberNo} | 연차 기록 불러오기 |
| PATCH | /api/resign/member | 퇴사처리 |
| POST | /api/schedule/create | 스케줄 생성 |
| GET | /api/schedule/lists | 스케줄 리스트 불러오기 |
| GET | /api/schedule/lists/main | 오늘 스케줄 리스트 불러오기 |
| PATCH | /api/schedule/edit | 스케줄 수정하기 |
| DELETE | /api/schedule/delete | 스케줄 삭제하기 |
| POST | /api/schedule/dailyCreate | 반 일과표 생성하기 |
| GET | /api/schedule/dailyList | 반 일과표 조회 |
| PATCH | /api/schedule/dailyUpdate | 반 일과표 등록(수정) |
| DELETE | /api/schedule/dailyDelete/{scheduleNo} | 반 일과표 삭제 |
| POST | /api/vacation/request | 휴가 신청 |
| GET | /api/vacation/{memberNo} | 멤버 별 휴가 목록 불러오기 |
| DELETE | /api/vacation/delete/{vacationNo} | 휴가 신청 삭제하기 |
| GET | /api/vacation/all | 시설 별 휴가 목록 불러오기 |
| PATCH | /api/vacation/approve/{vacationNo} | 휴가 승인 |
| PATCH | /api/vacation/reject/{vacationNo} | 휴가 거절 |
| POST | /api/chat/room/private/create | 1:1채팅방 생성 또는 조회 |
| GET | /api/chat/history/{chatRoomNo} | 특정 채팅방의 이전 메세지 목록 조회 |
| GET | /api/chat/room/group/list | 센터별 그룹채팅목록 조회 |
| POST | /api/chat/room/group/create | 그룹채팅방 개설 |
| POST | /api/chat/room/group/{chatRoomNo}/join | 그룹채팅방 참여 |
| GET | /api/chat/my/chatRooms | 내 채팅방 목록 조회 : roomId, roomName, 그룹채팅여부, 메세지 읽을 개수 |
| POST | /api/chat/room/{chatRoomNo}/read | 채팅메세지 읽음 처리 |
| DELETE | /api/chat/room/group/{chatRoomNo}/leave | 채팅방 나가기. 채팅방 남은인원 없을시 삭제 |
| POST | /api/file/presigned-url | 파일 명 S3의 presigned-url 로 변경 |
| GET | /api/file/{boardNo}/board-download-url | 게시판 파일 다운로드 |
| GET | /api/file/{vacationNo}/vacation-download-url | 휴가/워케이션 파일 다운로드 |
| POST | /api/sms/sendOne | 해당 전화번호에 인증번호 전송 후 데이터베이스에 저장 |
| POST | /api/sms/authNumber | 전화번호 인증번호를 받고 데이터베이스 인증번호와 비교 |
| POST | /api/sms/sendMessage | 회원가입 시 본인확인 용 인증번호 |
| GET | /api/alarm | 알람 리스트 불러오기 |
| PATCH | /api/alarm/{alarmNo} | 알람 읽음 처리 |

## 환경 변수
- `application.yml`에서 DB 및 JWT 시크릿 키 설정
- AWS S3 버킷 및 자격 증명 정보 설정 (이미지 업로드 등에서 사용)
- 문자 인증을 위한 Solapi API 키 설정
- 공공 API를 통한 공휴일 정보 연동을 위한 인증키 설정
- 파일 업로드 및 서버 인코딩 관련 설정 포함 (UTF-8, 최대 파일 용량 등)
