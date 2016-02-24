고위공직자 재산 공개
---------------
매년 3월말 공개되는 고위공직자 재산 정보를 기반으로 누구나 쉽게 공직자들의 재산 내역을 검색해볼 수 있는 프로젝트입니다.

Development
===========

1. Database 설정(추후 자동화 필요)
: MySQL에 `publicassets` 데이터베이스 설치

```mysql
create database publicassets default character set utf8 default collate utf8_general_ci;
```

2. 실행

```bash
npm install
bower install
gulp
```
