# 마크다운과 수학 표현식이 만나다.

과거 오프라인에서만 작성하던 문서가 웹으로 확장되면서 복잡한 표현들에 대한 니즈들이 계속해서 생겨나고 있습니다.

그 중에 하나인 수식은 웹에서 표현하기 매우 어려웠습니다. 별도의 도구를 이용해 복잡한 과정을 거쳐야 했지만 현재는 다양한 오픈소스와 W3C 에서도 [MathML][1] 으로 Math 표현식에 대한 표준화를 진행중에 있습니다.

## What is LaTeX?

> LaTeX은 문서 작성 도구의 일종으로, 논문이나 출판물 등의 특수 형식 문서를 작성하는 데 쓰이는 시스템이다. LaTeX은 TeX의 확장성을 염두에 둔 개선판이다. TeX의 최초 개발자는 도널드 크누스로, 자신이 프로그래밍에 대한 책을 쓰려다 보니 적당한 조판 시스템이 없어 개발했다고 한다. 

> 보통 이를 Typesetting(타입세팅) 시스템이라 부르는데 MS 워드처럼 WYSIWYG(What You See Is What You Get)방식으로 문서를 작성하는 것과 반대로 마치 프로그래밍을 하듯 (혹은 마크업 랭귀지로 문서를 작성하듯이) 문서 작성을 하는 과정을 의미한다(WYSIWYM: What You See Is What You Mean).  <cite>via http://mirror.enha.kr/wiki/LaTeX</cite>

![](http://upload.wikimedia.org/wikipedia/commons/thumb/7/78/LaTeX_diagram.svg/400px-LaTeX_diagram.svg.png)

> LaTeX is a document preparation system for high-quality typesetting. It is most often used for medium-to-large technical or scientific documents but it can be used for almost any form of publishing. <cite>via http://www.latex-project.org/</cite>

## MathJax

![](http://www.mathjax.org/wp-content/themes/mathjax/images/logo.gif)

MathJax 도 LaTeX 을 적용해 웹에서 수학 기호나 수식을 사용할 수 있도록 자바스크립트 라이브러리화 한 것입니다.

> MathJax is an open source JavaScript display engine for mathematics that works in all browsers. <cite>via http://www.mathjax.org/</cite>

이 라이브러리는 또한 많은 서비스와 마크다운 에디터에서 활용되어지고 있습니다.

## 하루패드에서는...

![](http://pad.haroopress.com/assets/images/logo-small.png)

하루패드에서는 마크다운을 이용해 이 구문을 손쉽게 표현할 수 있도록 지원합니다.

==하루패드에서 수학 표현식 기능은 기본적으로 **비활성화**되어 있습니다.==

### 옵션

옵션은 환경설정(Preference) 윈도우 > 일반(General Tab)탭에 > ==Enable Mathematics Expression== 을 체크 상태로 바꾸면 활성화 됩니다.

![](images/001.png)

**LaTeX**

```
J_\alpha(x) = \sum\limits_{m=0}^\infty \frac{(-1)^m}{m! \, \Gamma(m + \alpha + 1)}{\left({\frac{x}{2}}\right)}^{2 m + \alpha}
```

### 달러 기호 ($)

대부분의 서비스나 애플리케이션에서 표기법은 `$` 을 통해서 제공하며 2가지 방식을 제공합니다.

첫번째는 인라인 방식으로 `$$$...$$$` 와 같이 3 연속되는 달러 기호를 통해 표현식을 묶어주면 됩니다.

두번째는 `$$..$$` 으로 감싸주게 되면 블럭 형태로 표현됩니다.

**사용예시**

```
이 구문은 $$$\sqrt{3x-1}+(1+x)^2$$$ 인라인 표기법 입니다.

아래의 구문은 블럭으로 표현됩니다.

$$
\sqrt{3x-1}+(1+x)^2
$$
```

**결과**

> 이 구문은 $$$\sqrt{3x-1}+(1+x)^2$$$ 인라인 표기법 입니다.

> 아래의 구문은 블럭으로 표현됩니다.

> $$
\sqrt{3x-1}+(1+x)^2
$$

### References

수학 표현식에 대해서 좀더 자세히 알고 싶다면 살펴보세요.

* http://www.latex-project.org/
* http://www.mathjax.org/
* http://ko.wikipedia.org/wiki/LaTeX
* http://mirror.enha.kr/wiki/LaTeX

[1]: http://www.w3.org/Math/
[2]: http://www.mathjax.org/