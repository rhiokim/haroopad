# 표준 마크다운

* \\   backslash
* \`   backtick
* \*   asterisk
* \_   underscore
* \{\}  curly braces
* \[\]  square brackets
* \(\)  parentheses
* \#   hash mark
* \+   plus sign
* \-   minus sign (hyphen)
* \.   dot
* \!   exclamation mark

##### 헤더

    This is an H1
    =============
    
    This is an H2
    -------------

헤더 대상이 되는 텍스트 바로 아래줄로 '=' 혹은 '-' 기호를 연달아 작성하면 된다.

    # This is an H1
    
    ## This is an H2
    
    ###### This is an H6

그리고 위와 같이 '#' 기호를 1 에서 6개까지 구분하여 헤더를 작성할 수 있다.

##### 블럭 인용구
    > This is the first level of quoting.
    >
    > > This is nested blockquote.
    >
    > Back to the first level.

블럭 인용구는 헤더, 목록, 코드 블럭등 마크다운 문법을 다시 포함할 수 있다.
    > ## This is a header.
    > 
    > 1.   This is the first list item.
    > 2.   This is the second list item.
    > 
    > Here's some example code:
    > 
    >     return shell_exec("echo $input | $markdown_script");

##### 목록

목록을 작성할 때는 '*', '+', '-' 등의 기호를 줄 단위로 맨앞에 위치시키면 된다.

    *   Red
    *   Green
    *   Blue

    +   Red
    +   Green
    +   Blue

    -   Red
    -   Green
    -   Blue

만약 숫자를 입력하는 경우에는 정렬된 숫자로 목록이 작성되게 된다.

    1.  Bird
    2.  McHale
    3.  Parish

##### 코드 블럭
    
    This is a normal paragraph:
    
        This is a code block.
        
코드 블럭은 기본 4개의 스페이스 혹은 1개의 탭을 입력하면 된다.
    
    Here is an example of AppleScript:
    
        tell application "Foo"
            beep
        end tell

##### 수평 선

문장의 혹은 페이지의 분리 표현을 위해 다음과 같은 기호로 수평 선을 표시할 수 있다.

    * * *
    
    ***
    
    *****
    
    - - -
    
    ---------------------------------------

##### 링크

'[링크 텍스트](웹_페이지_URL)' 과 같이 작성하면 링크를 나타낸다. 여기에 링크의 풍선 도움말을 위해서 
'[링크 텍스트](웹_페이지_URL "풍선도움말")' 처럼 1개의 스페이스 후 큰 따옴표에 감싸진 텍스트를 입력하면 된다.

    This is [an example](http://example.com/ "Title") inline link.
    
    [This link](http://example.net/) has no title attribute.
    
그리고 중복되는 링크가 많은 경우 레퍼런스 타입의 링크도 있다.  '[링크 텍스트][레퍼런스 아이디]' 와 같이 입력하면 된다.

    I get 10 times more traffic from [Google][] than from
    [Yahoo][] or [MSN][].
    
      [google]: http://google.com/        "Google"
      [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
      [msn]:    http://search.msn.com/    "MSN Search"

##### 중요표시

중요 표시는 다음과 같이 표시한다.

    *single asterisks*
    
    _single underscores_
    
    **double asterisks**
    
    __double underscores__

##### 인라인 코드

'backquote' 혹은 'backtick' 라 불리는 '`' 기호를 사용하면 된다.

    Use the `printf()` function.

##### IMAGES

이미지는 링크와 그 구성이 유사하다. 링크에서 맨앞에 느낌표를 하나 추가한 구문이 링크가 된다.
'![이미지 alt 속성](이미지_경로)' 과 같이 작성하면 이미지 나타낸다. 여기에 이미지의 풍선 도움말을 위해서 
'![이미지 alt 속성](이미지_경로 "풍선도움말")' 처럼 1개의 스페이스 후 큰 따옴표에 감싸진 텍스트를 입력하면 된다.

    ![Alt text](/path/to/img.jpg)
    
    ![Alt text](/path/to/img.jpg "Optional title")

    ![Alt text][id]
    [id]: /path/to/img.jpg "Optional title"

##### EMAIL

    Contact to <example@example.com>.


# 멀티 마크다운 (GFM)

멀티 마크다운 문법은 에디터 혹은 서비스마다 지원 여부가 다를 수 있다.

> 아래의 예시 및 설명은 [Github Floverd Markdown](https://help.github.com/articles/github-flavored-markdown) 을 참조하였습니다.

##### 강제 개행

강제 개행이 필요한 문장의 끝에 두개의 스페이스를 입력하면 된다.

    Haroopad
    The next document processor

**becomes**

Haroopad  
The next document processor

##### 다중 밑줄 구문

마크다운 문법에서 '_' 는 강조 기호에 해당하지만 문서 혹은 파일명을 작성하다보면 언더바를 여러개를 한꺼번에 
사용하는 경우가 발생한다. 이런 경우 멀티 마크다운에서는 강조 기호가 아닌 일반 문장으로 인식한다.

    perform_complicated_task
    do_this_and_do_that_and_another_thing

**becomes**

perform_complicated_task
do_this_and_do_that_and_another_thing

##### URL 자동링크

웹 문서를 작성하다보면 링크는 매우 자주 등장하기 마련이다. 그때마다 '[]()' 기호를 작성하지 않고 자동으로 
링크 주소를 인식해 링크 형태로 변경해준다.

##### 팬스 코드블럭

일반적인 코드 블럭은 4개의 공백 혹은 1개의 탭을 입력해야 하지만 팬스 코드블럭은 처음과 끝에 'backtic' 3개로 이뤄진
구문을 작성하면 된다. 이것은 코드 블럭 라인마다 스페이스나 탭을 지정해주어야 하는 불편함을 해소해준다.

예시:

```
function test() {
  console.log("notice the blank line before this function?");
}
```

##### 코드 구문 강조

프로그래머들은 글을 작성하다보면 코드를 예시로 드는 경우가 많다. 코드 구문 강조를 위해서 팬스 코드블럭에 구문 강조를
위한 프로그래밍 언어를 지정해주면 된다.

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

