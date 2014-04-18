# 하루패드

**하루패드**는 웹 친화적인 문서를 작성하기 위한 마크다운 에디터입니다. 

여러분은 간단한 마크다운 문법을 이용해 웹 문서를 생성하거나 블로그, 이메일 그리고 복잡한 리포트 문서를 작성할 수 있습니다. 

그리고 하루패드는 윈도우, 리눅스, 맥을 지원하여 여러분이 원하는 플랫폼에서 똑같은 문서 편집 경험을 얻을 수 있습니다.

![haroopad icon](http://pad.haroopress.com/assets/images/logo-small.png)

### ==새로운 기능 (v0.12.0)==

* 각추 문법 추가
	- 각주: `[^1]`
	- 각주 참조: `[^1]: text`
* 마크다운 폴딩 기능 추가
* 다국어 지원 추가
	- 포루투칼 (Portuguese) - [alexandre mbm](https://github.com/alexandre-mbm)
	- 일본어 (Japanese) - [Toshiyuki Tega](https://github.com/Toshiyuki-Tega)

### ==중요 변경 사항==

* 버그
	- 이메일 기능: 보낸 메일 주소 자동완성 오류
	- 마크다운: `_text_` 구문 HTML 렌더링 오류
	- 파일오픈: 우분투에서 파일 클릭으로 오픈할 경우 오류
	- 마크다운: 헤더에 태그가 입력될 경우 렌더링 오류
	- 출력: HTML 파일로 내보내기 시 커스텀 테마가 적용되지 않는 오류
* 개선
	- 크로스 플랫폼 개행 개선 (CRLF / LF)
	- 1Byte 문자열이 라인 끝에서 자동으로 줄바뀜 되는 문제 개선
	- 상단 메뉴에 마크다운 입력의 구문 설명을 툴팁으로 변경
	- 마크다운: 리스트 내에 테이블 문법 렌더링 개선
	- 국제화: 적용되지 않았던 부분들 개선
	- 파일오픈: 최근 파일 오픈 시 기존 윈도우에서 띄워지도록 개선

### 주요기능

* 크로스 플랫폼을 지원
	- Window
	- Mac OS X
	- Linux 32/64
* 에디터 테마 추가 (30) 및 코드 하이라이팅 지원 
	- Solaraized Dark & Light 등 30 여가지의 테마
	- Ruby, Python, PHP, Javascript, C, HTML, CSS
	- CodeMirror 기반
* 라이브 뷰 테마를 지원
	- less 를 기반으로 한 7 가지의 테마
	- [markdown-css](https://github.com/rhiokim/markdown-css) 프로젝트 기반
* 코드 문법 하이라이팅 스타일을 지원
	- 71 가지의 언어에 대한 문법 강조를 지원
	- Solaraized, Tomorrow 등 44 가지의 스타일
	- highlight.js 기반
* 마크다운 자동완성 기능
	- 마크다운 문법의 자동완성을 이용해 문서의 작성의 효율을 높힐 수 있습니다.
* 사용자 테마 강화
  - 에디터, 뷰어 테마를 CSS 기반으로 좀더 쉽게 제공
* 폰트 사이즈 조절 기능
	- 환경설정 혹은 단축키를 이용해 에디터와 뷰어의 폰트 사이즈를 조절
* 스타일 적용 된 HTML 복사 기능
	- 위지윅 에디터 HTML 모드에 붙여넣으면 에디터와 동일하게 표시
* 리치 미디어 콘텐츠 스마트 임베딩 - v0.8
	- 영상, 음악, 3D 데이터, 텍스트, 오픈 그래프 등과 같은 웹 콘텐츠 임베딩
	- 전세계 주요(유튜브, 사운드 클라우드, 플리커 등) 100여개 웹 서비스 지원
	- 드래그 앤 드랍 콘텐츠 임베딩 지원
* 뷰모드 전환 기능 - v0.8
	- 기본, 리버스(뷰어:에디터), 에디터, 뷰어 (View > Mode)
* 현재 시간 입력 기능 - v0.8
	- 현재 시간을 다양한 포맷으로 입력 (Insert > Date & Time)
* HTML 마크다운 전환 기능 - v0.8
	- 브라우저 인용하고 싶은 문서를 선택하고 하루패드로 드래그 드랍해보세요.
* 마크다운 파서 옵션 설정기능 추가
* 개요보기 기능
* Vim 키 바인딩을 지원
* PDF, HTML 출력 지원
* 자동 임시저장 및 복원
* 들여쓰기 탭과 스페이스 지원
* 2,3 단 컬럼 레이아웃 지원
* 마크다운 구문 헬프 윈도우
* 환경설정 백업 내보내기/가져오기 기능 추가

### 국제화

- 영어 (English)
- 한국어 (Korea)
- 스페인 (Español) - [davegomez](https://github.com/davegomez)
- 중국어 간체 (中文) - [toiletfreak](https://github.com/toiletfreak)
- 독일어 (Deutsch) - [Tobias Mücksch](https://github.com/tobiasmuecksch)
- 베트남 (Vietnamese) - [nguyenkinh](https://github.com/nguyenkinh)
- 러시아 (Russian) - [aprilix ](https://github.com/aprilix)
- 그리스어 (Greek) - [pdudis](https://github.com/pdudis)
- 포루투칼 (Portuguese) - [alexandre mbm](https://github.com/alexandre-mbm)
- 일본어 (Japanese) - [Toshiyuki Tega](https://github.com/Toshiyuki-Tega)

### 향상된 마크다운 문법

* `[TOC]` 문법 추가
	- 문서의 목차를 문서에 손쉽게 포함할 수 있습니다.
	- 왼쪽정렬: `[TOC "float:left"]`
	- 오른쪽정렬: `[TOC "float:right"]`
* `![]()` 이미지 스타일 속성 추가
	- `![alt text](url "title" "css")`
* Github Flavord Markdown 지원
	- 구문강조
	- 테이블
	- URL 자동 링크
	- 취소선
	- Smartypants
* 수학 표현식(Mathematics Expression)
	- `$$$...$$$` 인라인 표현식
	- `$$...$$` 블럭 표현식
	- 인라인 수학 표현식 (**$**, $$$) 선택적 옵션추가
* 위첨자, 아래첨자 문법 추가
	- `위첨자^superscript^`, `아래첨자~subscript~`
* 이미지 문법 확장
	- 만약 `![](path/*.mp3)` 과 같이 audio 확장자(mp3, ogg) 인 경우 audio 요소로 표시
	- 만약 `![](path/*.mp4)` 와 같이 video 확장자(mp4, ogv, webm) 인 경우 video 요소로 표시

### 곧 출시될 기능

* 할일 목록 기능(tasklist)

### 추가 정보

* 공식 사이트 : [http://pad.haroopress.com][haroopad]
* 공식 블로그 및 메뉴얼 : [http://pad.haroopress.com/page.html][blog]
* 사용자 에코 시스템 : [http://haroopad.userecho.com][userecho]

하루패드 트위터 계정과 [@haroopad](https://twitter.com/haroopad) 개발자 계정  [@rhiokim](https://twitter.com/rhiokim) 을 팔로윙하고 최신 소식을 들으세요.

의견이나 버그 리포팅이 필요하시면 `Help` 메뉴에 `User Echo` 메뉴를 통해 남겨주세요.

[haroopad]: http://pad.haroopress.com
[blog]: http://pad.haroopress.com/page.html
[userecho]: http://haroopad.userecho.com