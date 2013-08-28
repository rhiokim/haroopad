# Custom Theme

0.7 버젼부터 추가된 하루패드의 사용자 테마 기능은 매우 심플하면서 전문가스러움을 한꺼번에 추가되었다.

* CSS
* SASS(sass-lang.com)

CSS 는 일반적으로 HTML과 함께 쓰이는 문서 스타일을 지정하기 위한 언어로 하루패드의 모든 테마들도 모두 CSS 로 정의하고 있다.

SASS 는 좀더 프로그램적인 CSS 를 위한 스크립팅 언어로 중간에 인터프리터에 의해서 결과는 CSS 로 반환됩니다. 

쉽게는 변수를 사용하거나 재 사용이 가능한 스타일등 다양한 구문을 제공해 효과적인 스타일 시트를 작성할 수 있게 합니다.

> Sass (Syntactically Awesome Stylesheets) is a stylesheet language initially designed by Hampton Catlin and developed by Nathan Weizenbaum.[1][2] After its initial versions, Nathan Weizenbaum and Chris Eppstein have continued to extend Sass with SassScript, a simple scripting language used in Sass files.
> <small>- wikipedia</small>

## 하루패드 테마 작성

먼저 테마 작성을 이해하기 위해 아래의 단계별로 진행해보자.

1. 임의의 css 파일을 생성한다. (example.css)
2. css 파일을 열고 다음과 같은 코드를 추가한다.
```css
.custom {
	font-color: red;
}
```
3. 이렇게 작성된 css 파일을 하루패드 뷰 영역에 드래그 드랩해보자.
4. 대부분의 글자 색깔이 빨간색으로 변한다.

> 이렇게 적용된 테마는 해당 윈도우에서만 적용되기 때문에 새로운 윈도우를 띄우면 반영되지 않는다.  
> 뒤에서 좀더 자세히 설명한다.

그럼 좀더 그럴싸한 테마를 제작해보자.

## 하루패드 테마 고급

좀더 복잡한 스타일을 적용해보자.

* 배경색 변경
* 텍스트 그림자 추가
* 폰트 사이즈 변경
* 헤더 폰트 색상 변경

```css
.custom {
	background-color: #afafaf;
}

.custom p, 
.custom blockquote, 
.custom h1, 
.custom h2, 
.custom h3, 
.custom h4, 
.custom h5, 
.custom h6, 
.custom li, 
.custom pre, 
.custom dl, 
.custom dt {
	text-shadow: 1px 1px 1px rgba(255, 255, 255, 1);
}

.custom p {
	font-size: 15px;
}

.custom pre>code {
	text-shadow: none;
}
```

여기에 더해 웹 폰트도 적용해보자. Google Web Font 서비스나 TypeKit 과 같은 웹 서비스를 이용할 경우 당연하겠지만 인터넷이 되지 않는 환경에서는 폰트가 적용되지 않으니 이점을 유의하자.

```css
@import url(http://fonts.googleapis.com/css?family=Vollkorn:400italic,400,700);

.custom {
	font-family: 'Vollkorn', sans-serif;
	text-shadow: 1px 1px 1px #111;
}
```

위에 작성한 CSS 를 저장하고 하루패드 뷰 영역에 드래그 앤 드랍해보자. 해당 스타일이 변경된 것을 확인할 수 있다.

![CSS 테마 다운로드](res/example.css)

## 하루패드 기본 테마

하루패드에 기본적으로 추가되어 있는 뷰 테마는 [rhiokim/markdonw-css](https://github.com/rhiokim/markdown-css) 를 사용하고 있다.

이는 [less](http://lesscss.org) 를 기반으로 하고 있어 해당 프로젝트를 fork 해 원하는 스타일을 작성할 수도 있다.

이 프로젝트는 하루패드에 뷰 테마로 공식적으로 추가하기 위한 테마로 사용자 테마 작성 시 참고하면 유용하다.