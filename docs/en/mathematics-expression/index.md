# 마크다운과 수학 표현식이 만나다.

과거 오프라인에서만 작성하던 문서가 웹으로 확장되면서 복잡한 표현들에 대한 니즈들이 계속해서 생겨나고 있습니다.

그 중에 하나인 수식은 웹에서 표현하기 매우 어려웠습니다. 별도의 도구를 이용해 복잡한 과정을 거쳐야 했지만 현재는 다양한 오픈소스와 W3C 에서도 [MathML][1] 으로 Math 표현식에 대한 표준화를 진행중에 있습니다.

## What is LaTeX?

> LaTeX 소프트웨어는 LaTeX Project Public License(LPPL)로 제공되는 자유 소프트웨어이다. 현재, Mac OS X과 Solaris 등의 UNIX, Linux와 BSD 계열 OS 등의 UNIX 호환 OS, Microsoft Windows 등 다양한 OS에서 사용할 수 있다. <cite>via http://ko.wikipedia.org/wiki/LaTeX</cite>

![](http://upload.wikimedia.org/wikipedia/commons/thumb/7/78/LaTeX_diagram.svg/400px-LaTeX_diagram.svg.png)

> LaTeX is a document preparation system for high-quality typesetting. It is most often used for medium-to-large technical or scientific documents but it can be used for almost any form of publishing. <cite>via http://www.latex-project.org/</cite>

## MathJax

![](http://www.mathjax.org/wp-content/themes/mathjax/images/logo.gif)

사실 상 표준인 LaTeX 는 이미 많은 영역에서 활용되고 있습니다. MathJax 도 LaTeX 을 웹에서 자유롭게 사용할 수 있도록 자바스크립트로 라이브러리화 한 것입니다.

> MathJax is an open source JavaScript display engine for mathematics that works in all browsers. <cite>via http://www.mathjax.org/</cite>

이 라이브러리는 이미 많은 서비스와 마크다운 에디터에서 활용되어지고 있습니다.

## 하루패드에서는...

![](http://pad.haroopress.com/assets/images/logo-small.png)

하루패드에서는 마크다운을 이용해 이 구문을 손쉽게 표현할 수 있도록 지원합니다.

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

[1]: http://www.w3.org/Math/
[2]: http://www.mathjax.org/