## Preferences

환경설정 옵션에서는 하루패드의 몇 가지 설정값을 통해 좀더 나은 마크다운 편집 경험을 제공한다.

환경설정은 하루패드에서 마우스 우측 클릭 팝업 메뉴에서 **Preferences** 를 선택하면 환경설정 다이얼로그가 열린다.

![](images/preferences.png)

설정이 완료되었다면 다이얼로그 주변을 클릭하면 닫힌다.

#### About

하루패드에 대한 간략한 소개와 공식 사이트, 제작자 정보를 제공한다.  

![](images/about.png)

#### General

일반(General)탭에는 하루패드의 기본적인 설정 옵션을 설정할 수 있다.

**Enable Sync Scroll** 를 체크 상태로 두면 에디터 영역과 뷰 영역의 스크롤 위치 동기화가 되며 긴 문서를 편집 시 에디터 스크롤 위치에 비례하여 뷰 영역의 스크롤이 알맞게 이동한다.

![](images/general.png)

#### Editor

에디터 탭에는 [테마](#configuration-editor)와 4가지 옵션을 제공한다.  테마 설정에 대한 내용은 별도의 페이지에서 설명한다.

![](images/editor.png)

* Indent Using Tab
* Display Line Number
* Vim Key Binding
* ==deprecated== ~~Insert 4 spaces insted of on tab (default 2)~~
* Auto Pair Characters ( [], (), "" )

**Indent Using Tab** 은 들여쓰기 방식을 탭과 스페이스 중 선택할 수 있다. 체크를 할 경우 들여쓰기는 탭 방식으로 동작하고 그렇지 않은 경우는 스페이스로 동작한다.

![](images/editor-tabsize.png)

위의 선택 박스에서 원하는 들여쓰기 사이즈를 2 ~ 8까지 선택할 수 있다.

**Display Line Number** 를 체크 상태로 두면 에디터의 줄 번호가 표시된다.

**Vim Key Binding** 를 체크 상태로 두면 VI 에디팅을 즐겨 쓰는 사람(흔히 개발자)들에게 익숙한 키 인터페이스를 제공하기 위한 옵션이다.

==deprecated== ~~**Insert 4 spaces insted of on tab** 에디터의 탭의 스페이스 사이즈를 지정하는 것이다. 하루패드는 기본적으로 탭 하나는 2개의 공백(space)를 의미한다.~~

**Auto Pair Characters** 는 프로그래밍에서 자주 쓰는 기능이나 마크다운 편집시에도 괄호나 큰따옴표등은 대부분 짝으로 필요하기 때문에 하나의 괄호만 치더면 자동으로 짝에 맞춰 글자를 생성해주는 옵션이다.

#### Viewer

뷰어 탭에는 [테마](), [코드 스타일]() 과 1개의 옵션을 제공한다.  테마 설정에 대한 내용은 별도의 페이지에서 설명한다.

* Make Links Clickable in Viewer

**Make Links Clickable in Viewer** 옵션은 문서에 링크가 포함된 경우 뷰 영역에서 실제로 링크를 클릭 동작 여부를 설정하게 된다. 체크한 상태라면 클릭 시 시스템 기본 브라우저에 링크가 열린다.

![](images/viewer.png)