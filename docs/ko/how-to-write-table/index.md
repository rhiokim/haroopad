# How to write table on Haroopad

마크다운 문서와 일반적인 문서 도구의 가장 큰 차이점은 바로 **테이블** 입니다.  표준 마크다운에는 테이블에 대한 정의는 없습니다.

문서 작성 시 데이터를 표시하기 위해 자주 쓰이는 테이블의 불편함을 개선하고자 [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown#tables) 와 [PHP Markdown Extra](http://michelf.ca/projects/php-markdown/extra/#table) 는 별도의 테이블 문법을 정의하고 위지윅의 도움 없이 가장 간단한 구문으로 테이블을 표현할 수 있도록 정의하고 있습니다.

그럼 간단한 테이블 작성법을 이해해보도록 하겠습니다.

## Table Syntax

테이블 구문은 `-`, `|` 의 두가지 문자로 작성할 수 있습니다. 기본적인 예제는 다음과 같습니다. 

```markdown
Column | Column | Column     <- Header row
-------|--------|--------    <- Split bar
value  | value  | value      <- Row
...    |        |            <- Row
value  |        |            <- Row
```

**결과**

Column | Column | Column
-------|--------|--------
value  | value  | value
value  | value  | value

보기에도 간단하고 잘 정리된 테이블 형태를 뛰고 있습니다.  중요한 부분은 바로 **헤더와 구분 바**를 꼭 지정해주어야 합니다.

또한 다음과 같이 행의 처음과 끝을 `|` 으로 처리해도 동일한 결과를 얻을 수 있습니다.
아래의 표현이 좀더 완성된 테이블의 느낌을 줍니다.

```markdown
| Column | Column | Column |
|--------|--------|--------|
| value  | value  | value  |
```

사실 처음과 끝을 `|` 으로 하는 이유가 또 하나 있습니다. 바로 컬럼의 정렬입니다.

## Alignment

테이블의 행과 열의 요소들의 정렬이 필요할 때가 있습니다. 이때 사용하는 문자는 `:` 입니다.

```markdown
|  Column  |  Column  |  Column  |
|---------:|:--------:|:---------|  <- Split bar
| right    | center   | left     |
```
위와 같이 정렬을 하려는 방향에 맞춰 구분바(Split bar) 컬럼의 양 끝에 콜론(`:`)을 작성하면 됩니다.

**결과**

|  Column  |  Column  |  Column  |
|---------:|:--------:|:---------|
| right    | center   | left     |

마크다운 테이블 표현 구문은 여기까지 유저들 사이에 즐겨 사용하고 있습니다. 여기에 더 나아가 [멀티 마크다운](https://rawgithub.com/fletcher/human-markdown-reference/master/index.html) 에서는 셀/로우 병합도 지원하고 있습니다.

## Merge Cells and Rows

테이블은 정렬 이외에도 병합 기능을 자주 사용합니다.  하지만 하루패드에서는 아직 _지원하지 않습니다._

## Problem, Fixed width Font

테이블은 폰트에 따라서 컬럼의 넓이가 행마다 달라질 수 있습니다. 그렇기 때문에 일반적으로 마크다운 문서를 작성할 때에는 [고정폭 폰트](http://www.dafont.com/theme.php?cat=503)를 사용하는 것을 권장합니다.

## See more
* http://michelf.ca/projects/php-markdown/extra/
* https://rawgithub.com/fletcher/human-markdown-reference/master/index.html
* https://help.github.com/articles/github-flavored-markdown
* http://www.tablesgenerator.com/markdown_tables