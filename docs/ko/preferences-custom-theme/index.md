# Custom Theme

0.7 버젼부터 추가된 하루패드의 사용자 테마 기능은 매우 심플 개발되었다.

* CSS

CSS 는 일반적으로 HTML과 함께 쓰이는 문서 스타일을 지정하기 위한 언어로 하루패드의 모든 테마들도 모두 CSS 로 정의하고 있다.

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

뿐만아니라 최신의 CSS3(애니메이션, 트랜지션 등)을 모두 적용할 수 있다. 테스트를 위해 여러가지 스타일을 적용해 보았지만 문서를 위한 가장 기본적인 스타일만 적용하기를 권장한다.

> 기본적인 문서 요소에 대한 스타일을 제외한 CSS 이미지, 애니메이션, 트렌시션등의 스타일은 하루패드 기능(메일, PDF/HTML 출력 등)의 일부에서 원하는 데로 동작하지 않을 수 있습니다.

[CSS 테마 다운로드](/docs/preferences-custom-theme/res/example.css)


## 하루패드 기본 테마

하루패드에 사용자 테마를 적용하기 위한 셀렉터 구성은 마크다운을 이해하고 있어야 쉽다. 

하지만 여기서 모든것을 설명할 수 없으니 현재 하루패드에 탑재된 테마의 소스를 살펴보기를 권장한다.

하루패드에 기본적으로 추가되어 있는 뷰 테마는 [rhiokim/markdonw-css](https://github.com/rhiokim/markdown-css) 를 사용하고 있다.

이는 [less](http://lesscss.org) 를 기반으로 하고 있어 해당 프로젝트를 fork 해 원하는 스타일을 작성할 수도 있다.

이 프로젝트는 하루패드에 뷰 테마로 공식적으로 추가하기 위한 테마로 사용자 테마 작성 시 참고하면 유용하다.

> 이 프로젝트를 기반으로 테마를 제작해서 공유해주면 확인 후 이름과 함께 공식 테마로 등록할 예정입니다.

## 테마 공유

현재는 하루패드 사용자가 만든 테마를 유저간에 공유할 수 있는 통로가 없다. 향후 멋진 사용자 테마를 랭킹하고 유저간에 공유할 수 있는 공간을 만들 예정이다.