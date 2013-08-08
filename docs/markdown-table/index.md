> 이 문서에서는 하루패드에서 테이블(표) 작업을 위한 방법을 가이드합니다.

## 테이블 (table)

문서를 작성하다 보면 테이블을 자주 사용한다.  [존 그루버](http://daringfireball.net/projects/markdown/syntax)가 정한 스펙에는 테이블은 존재하지 않고 사용하고 싶으면 HTML을 그대로 사용하도록 가이드하고 있다.

마크다운에서 일반적인 테이블의 사용은 다음과 같다.

```markdown
| Column | Column | Column |
|--------|--------|--------|
| value  | value  |        |
```

파이프 (|) 문자를 이용해 컬럼을 분리하고 컬럼 헤드 영역과 셀 영역을 분리하기 위해 (-) 마이너스 연산자를 사용한다. 

### 정렬 (alignment)

먼저 정렬을 적용한 표를 보자.

| Left align | Right align | Center align |
|:-----------|------------:|:------------:|
| This       |        This |     This     |
| column     |      column |    column    |
| will       |        will |     will     |
| be         |          be |      be      |
| left       |       right |    center    |
| aligned    |     aligned |   aligned    |

컬럼의 정렬은 의외로 간단하다.

```markdown
| Left align | Right align | Center align |
|:-----------|------------:|:------------:|
| This       |        This |     This     |
```

컬럼 헤더와 분리하는 영역에 콜론(:)을 정렬 방향의 끝에 위치시키면 된다. 이 포맷은 멀티 마크다운을 지원하는 에디터 혹은 서비스들에 사실상 표준에 가깝게 사용되고 있다.

물론 위의 예시들에서는 컬럼과 셀의 분리와 영역의 사이즈가 동일하게 되어있지만 꼭 컬럼의 영역의 사이즈를 맞추지 않아도 된다.

```markdown
|Left align|Right align|Center align|
|:---------|----------:|:----------:|
|This|This|This|
|column|column|column|
|will|will|will|
|be|be|be|
|left|right|center|
|aligned|aligned|aligned|
```

위와 같이 작성하더라도 바로 위의 결과와 일치한다. 다만 마크다운 문서 자체의 가독성이 떨어지고 편집할 때 실수할 수 있다는 단점이 있을 뿐이다.

## 아이디어 및 제안
> 이 부분은 커뮤니티 제안 예정이거나 마크다운에서 테이블에 대한 사용성을 개선하기 위한 아이디어를 정리한 것으로 실제로 지원하는 마크다운은 아닙니다.

#### dotted table

**markdown**

```markdown
| Column | Column | Column |
|........|........|........|
| value  | value  |        |
```

**result**

<table>
<thead style="
    border-bottom: 2px dotted #dfdfdf;
">
<tr>
<th>Column</th>
<th>Column</th>
<th>Column</th>
</tr>
</thead>
<tbody>
<tr>
<td>value</td>
<td>value</td>
<td>value</td>
</tr>
</tbody>
</table>

#### bold table

**markdown**


```markdown
| Column | Column | Column |
|********|********|********|
| value  | value  |        |
```

**result**

<table>
<thead style="
    border-bottom: 2px solid #dfdfdf;
">
<tr>
<th>Column</th>
<th>Column</th>
<th>Column</th>
</tr>
</thead>
<tbody>
<tr>
<td>value</td>
<td>value</td>
<td>value</td>
</tr>
</tbody>
</table>

#### dashed table

**markdown**

```markdown
| Column | Column | Column |
|- - - - |- - - - |- - - - |
| value  | value  |        |
```

**result**

<table>
<thead style="
    border-bottom: 2px dashed #dfdfdf;
">
<tr>
<th>Column</th>
<th>Column</th>
<th>Column</th>
</tr>
</thead>
<tbody>
<tr>
<td>value</td>
<td>value</td>
<td>value</td>
</tr>
</tbody>
</table>

#### double table

**markdown**

```markdown

| Column | Column | Column |
|========|========|========|
| value  | value  |        |
```

**result**

<table>
<thead style="
    border-bottom: 4px double #dfdfdf;
">
<tr>
<th>Column</th>
<th>Column</th>
<th>Column</th>
</tr>
</thead>
<tbody>
<tr>
<td>value</td>
<td>value</td>
<td>value</td>
</tr>
</tbody>
</table>