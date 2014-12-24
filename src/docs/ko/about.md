# 하루패드

**하루패드**는 웹 친화적인 문서를 작성하기 위한 마크다운 에디터입니다. 

여러분은 간단한 마크다운 문법을 이용해 웹 문서를 생성하거나 블로그, 이메일 그리고 복잡한 리포트 문서를 작성할 수 있습니다. 

그리고 하루패드는 윈도우, 리눅스, 맥을 지원하여 여러분이 원하는 플랫폼에서 똑같은 문서 편집 경험을 얻을 수 있습니다.

![haroopad icon](http://pad.haroopress.com/assets/images/logo-small.png)

### ==새로운 기능 (v0.13.0)==

* 신규 기능
	- 프리젠테이션 기능 - [http://pad.haroopress.com/page.html?f=how-to-write-presentation](http://pad.haroopress.com/page.html?f=how-to-write-presentation)
	- 다이어그램(플로우차트, 시퀀스 다이어그램 등) - [http://pad.haroopress.com/page.html?f=how-to-draw-diagram](http://pad.haroopress.com/page.html?f=how-to-draw-diagram)
* 신규 문법
	- 타스크 리스트(GFM) - [http://pad.haroopress.com/page.html?f=how-to-manage-tasklist](http://pad.haroopress.com/page.html?f=how-to-manage-tasklist)
* 코드 하이라이팅 언어 및 테마 추가 - [http://pad.haroopress.com/page.html?f=how-to-write-fenced-code-block](http://pad.haroopress.com/page.html?f=how-to-write-fenced-code-block)
	- 총 112가지 언어 하이라이팅 및 49 테마 지원

### ==중요 변경 사항==

* 버그
	- [윈도우] 더블 클릭으로 마크다운 문서 파일 열기
	- 수정된 내용이 있는 윈도우 x 버튼 클릭 시 알림 없이 종료되는 버그 수정
* 개선
	- 에디터 버젼 업그레이드
	- 수학 표현식의 폰트 지원
	- 수학 표현식의 정렬 지원
	- 마크다운 테이블 내의 자동 줄바꿈 시 단어 단위로 잘리도록 개선
	- 연속되는 테이블 사이에 공백이 추가되도록 개선
	- 수학 표현식 Equation 렌더링 문제 개선
	- HTML 마크다운 변환 시 팬스 코드 블럭 지원

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
	- 86 가지의 언어에 대한 문법 강조를 지원
	- Solaraized, Tomorrow 등 49 가지의 스타일
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
* CLI(Command Line Interface) 지원 - v0.12.1
	- `$ haroopad -f [ /path/to/a.md ./path/to/b.md ]`: 파일 옵션
	- `$ haroopad --mode`: 뷰 or 에디팅 모드 옵션
		+ `$ haroopad --mode view`: 뷰 모드
		+ `$ haroopad --mode edit`: 에디팅 모드
* 개요보기 기능
* Vim 키 바인딩을 지원
* PDF, HTML 출력 지원
* 자동 임시저장 및 복원
* 들여쓰기 탭과 스페이스 지원
* 2,3 단 컬럼 레이아웃 지원
* 마크다운 구문 헬프 윈도우
* 마크다운 폴딩 지원
* 환경설정 백업 내보내기/가져오기 지원

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
- 이태리어 (Italiano) - [Zeriuno](https://github.com/Zeriuno)
- 인도어 (Bahasa Indonesia) - [Reza Faiz A. Rahman](https://github.com/rezafaizarahman)
- 터키어 (Türkçe) - [Eray AYDIN](https://github.com/erayaydin)
- 프랑스어 (Français) - [MarcBoyer](https://github.com/MarcBoyer), [Daniel Ménard](https://github.com/daniel-menard)


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
* 각주 문법
	- 각주: `[^1]`
	- 각주 참조: `[^1]: text`
		+ 각주 참조 내용에 마크다운 문법 지원

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