# How to write image align on Haroopad

문서를 작성하다 보면 가장 많이 삽입되는 외부 요소가 바로 이미지 입니다.  문서는 텍스트로 작성되고 이미지는 텍스트로 묘사하기 어렵거나 문서로 표현된 정보를 좀더 생생하게 전달하기 위해서 문서에 자주 첨부됩니다.

특히 하루패드와 같은 도구에서 작성하는 마크다운 문서에는 위지윅 방식의 문서 도구와는 다르게 간단하고 외우기 쉬운 구문을 통해 오프라인 뿐만아니라 온라인에 있는 이미지를 문서내에 손쉽게 표시할 수 있습니다.

## Image Syntax

`![]()` 와 같은 느낌표, 대괄호, 소괄호를 순서대로 나열한 다음 괄호 안에 필요한 정보를 추가하면 이미지를 표시할 수 있습니다.

간단하게 다음과 같이 컴퓨터에 있는 이미지를 표시할 수 있습니다.

```markdown
![](/path/to/image)
![](C:\Users\Images\myImage.jpg)
```

또한 인터넷 상에 있는 이미지도 문서에 표시할 수 있습니다.

**마크다운 표현법**

```markdown
![](http://bit.ly/1g1oUFW)
```

**결과**

![](http://bit.ly/1g1oUFW)

### References Style Image

문서내에서 자주 사용되는 로고나 이모티콘과 같은 이미지의 경우 고유 아이디를 부여해 재 사용을 할 수도 있습니다.

**마크다운 표현법**

```markdown
![][id]

[id]: http://bit.ly/1e35InU
```
**결과**

![][id]

[id]: http://bit.ly/1e35InU

### Alt Text and Title

웹 문서에서 이미지 요소의 속성중에는 지정한 경로에 이미지를 표시할 수 없을 때 표시하는 대체 텍스트(Alt)와 이미지를 설명하는 제목(Title)이 있습니다.

```markdown
![파리에서 먹었던 후루츠 칵테일](http://bit.ly/1e35InU "내가 좋아하는 과일 칵테일")
```

**결과**

> 이미지를 표시할 수 없는 경우 대체 텍스트가 이미지 영역에 표시됩니다.
> ![](images/alt.png)
>
> 이미지에 마우스를 오버할 경우 해당 이미지에 대한 설명으로 제목 속성이 표시됩니다.
>![](images/title.png)

여기까지의 설명은 기본적인 마크다운에 대한 설명으로 모든 마크다운 관련 서비스, 도구에서 통용됩니다. 다만 문서를 작성하다 보면 문서의 구조에 따라 이미지를 정렬하거나 사이즈를 변경하는 경우들이 동반합니다.

하지만 표준 마크다운에서는 이 부분을 제외하고 있어 종종 불편함을 느낍니다. 그래서 서비스나 도구들에 취향(Flavored)에 맞게 기본 마크다운을 확장, 개선시켜 사용하고 있습니다.

하루패드도 여러 고민과 실험끝에 기본 이미지 구문 `![]()` 에 한가지 속성을 더 추가하였습니다.

## CSS Attributes

웹 문서에서 문서의 스타일을 지정하는 CSS 를 그대로 활용하였습니다.

```markdown
![](path/to/image "title" "CSS")
```

**마크다운 표현법**

```markdown
![](http://bit.ly/1g1oUFW "title" "width:200px;height:100px")


![][id]
[id]: http://bit.ly/1g1oUFW "title" "width:200px;height:100px"


![](http://bit.ly/1g1oUFW "right" "width:200px;height:100px;float:right;padding-left:10px;")
```

**결과**

> ![](http://bit.ly/1g1oUFW "image size" "width:150px;height:70px")
>
> ![](http://bit.ly/1g1oUFW "right" "width:200px;height:100px;float:right;padding-left:10px;") 하루패드는 문서내에 이미지를 보기 좋게 정렬시키거나 사이즈를 조절하기 위해 이미지 구문에 CSS 속성을 추가하였습니다. 이를 통해 문서내에 이미지를 좀더 보기 좋게 표시할 수 있게 하였습니다.
>
> 이 이미지의 경우 `width:200px; height:100px; float:right; padding-left:10px` 속성이 추가되어 문서내에 우측 정렬된 이미지로 표현되고 있습니다.

물론 위의 예시에서는 간단한 정렬과 사이즈만 변경하였지만 CSS 를 응용하면 다양한 방식으로 문서내 이미지를 조절할 수 있습니다.

### Right way?

과연 경량의 마크다운 문법에 스타일 시트를 속성으로 추가한 것이 사용자들을 위한 배려인가 하루패드의 욕심인가에 대한 고민을 꾸준히 하고 있습니다.

또한 이런 변화에 대한 우려와 걱정도 함께 나눠 좋은 방향을 잡고 마크다운을 리드하는 커뮤니티의 방향에 어긋나지 않도록 노력할 계획입니다.

## See more

* http://daringfireball.net/projects/markdown/syntax#img
* https://rawgithub.com/fletcher/human-markdown-reference/master/index.html
* http://www.w3schools.com/css/