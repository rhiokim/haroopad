## why?

## haroopad?
하루패드는 마크다운 에디터로 크로스 플랫폼에서 동일한 에디팅과 뷰잉을 지원합니다.

특히 마크다운 포맷의 고유의 기능을 잘 살려 원하는 에디팅 테마와 뷰어 테마를 제공하여 경량의 마크다운 문서가 고품질의 문서로 출력해줍니다.

멀티 마크다운을 기본적으로 지원하고 그에 더불어 하루패드만의 확장 마크다운을 지원합니다. 이 확장 마크다운은 온라인 환경에 의존하는 오픈 컨텐츠 미디어(유튜브, 슬라이드쉐어, 트윗등을)를 손쉽게 문서내에 포함시킬 수 있습니다. 

하루패드를 사용하여 새로운 문서 편집의 경험을 느껴보세요.

* [official site](http://pad.haroopress.com)
* [official repository](https://github.com/rhiokim/haroopad)

## features
* cross platform markdown editor
	- support Window, Linux, Mac OS
* support multi-markdown
* editor theme, syntax highlight, markdown theme
* vim key binding
* auto publishing to sites(tumblr, github)

## example

**header**

## This is an H2
### This is an H3
#### This is an H4
##### This is an H5
###### This is an H6


**blockquote**

> ## This is a H2.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
> ```js
> function syntaxHighlight() {
>   return true;
> }
> ```

**list**

* li1
	- li1-1
   - li1-2
     * li-2-1
     * li-2-2
       1. li-2-2-1
       2. li-2-2-2

** Image **

![](http://placekitten.com/g/160/180)
![](http://placekitten.com/g/160/180)
![](http://placekitten.com/g/160/180)

**Syntax highlighting**

`code`

```js
function syntaxHighlight() {
  var name = 'haroopad';
}
```

```xml
<html>
 <head>
   <title>haroopad example</title>
 </head>
 <body>
   <span class="text-info">cross-platform markdown editor</span>
 </body>
</html>
```

```css
body {
	font-size: 1em;
}
```

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

**GFM style table**

name | age | gender
---|---|---|
rhio | 33 | male
edina | 28 | female
jedi | 44 | robot


**URL autolinking**

* http://pad.haroopress.com

**Multiple underscores in words**

perform_complicated_task
do_this_and_do_that_and_another_thing


