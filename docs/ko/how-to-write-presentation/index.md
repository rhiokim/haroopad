# How to presentation with Haroopad.

간단한 텍스트 표현법이 이렇게 강력한 기능을 제공할 수 있을까? 하루패드 0.13 버젼부터는 프리젠테이션 기능이 탑재되었습니다.

기존의 마크다운 문법을 그대로 활용하였기 때문에 프리젠테이션을 위해서 새로운 문법이나 별도의 복잡한 기능을 학습할 필요는 없습니다.

## How to write.

작성법은 매우 간단합니다.

```markdown
## Slide title 1

Slide contents 1

***

## Slide title 2

Slide contents 2
```

위에 예시에서 알 수 있듯이 슬라이드를 구분하는 마크다운 표현 방법은 (`***`, `---` ) 으로 지정했습니다.

![presentation.png](images/presentation.png)

두 가지는 기본적으로 슬라이드를 구분하지만 향후 지원하는 프리젠테이션 모드에서는 수평, 수직 나눔의 두 가지 방식으로 쓰일 예정입니다.

> **이 구문은 상황에 따라 더 편리한 방법을 위해 변경될 수 있습니다.**

## How to slideshow

위와 같이 작성했다면 뷰(View) 메뉴에 `Presentation Mode` 메뉴를 클릭해보자. 혹은 단축키 <kbd>Command</kbd> ( or <kbd>Ctrl</kbd> ) + <kbd>Alt</kbd> + <kbd>P</kbd>

![menu.png](images/menu.png)

전체화면에 두개의 슬라이드가 보이고 원하는 슬라이드를 클릭하면 해당 슬라이드부터 프리젠테이션 모드로 진입해 진행 할 수 있게 됩니다.

![slide-mode.png](images/slide-mode.png "" "width:90%;margin:20px")

<kbd>esc</kbd> 키를 누르면 종료됩니다.

## Rules
한가지 규칙이 있습니다.

첫번째 슬라이드의 경우에는 제목(#)을 지정하는 것은 필수입니다. 제목이 없는 경우 검정색 화면으로만 표시됩니다.

그리고 문서를 작성하다보면 슬라이드 커버나 슬라이드 전체를 뒤덮는 이미지가 필요할 때가 있습니다. 이 방법도 간단하게 가능합니다.

```markdown
![cover](http://bit.ly/1uGE8FI)
```

![slide-mode-cover.png](images/slide-mode-cover.png "" "width:90%;margin:20px")

위의 구문과 같이 `[cover]` alt text 위치에 `cover` 라고 입력하면 됩니다. 만약 입력하지 않거나 다른 문자인 경우에는 이미지로 처리됩니다.

## Thinking Haroopad

프리젠테이션은 많은 내용의 정보를 전달해야 할때 그 내용을 축약해 효과적으로 전달하기 위한 수단입니다. 

하지만 대부분에 현대적인 도구들은 위지윅을 통해 다양하고 성숙한 프리젠테이션 기능을 제공합니다. 좀더 과장되게 표현하면 목적을 넘어서 타이포 그라피와 슬라이드 전화 효과등에 시간을 더 소비하게 합니다.

하루패드는 그에 비해 매우 미흡하지만 마크다운을 이용한 프리젠테이션 기능은 이런 현대적인 도구들의 형태를 지향하지는 않습니다.

**프리젠테이션 목적에 맞춰 군더더기 없이 전달하고자 하는 내용만 간단하게 입력하고 이를 프리젠테이션 형태로만 표시하고 작성자로 하여금 내용에만 집중할 수 있도록 하는데에 목적을 두고 개선해 나갈 계획입니다.**

## Sample Doc

```markdown
# Presentation Title
[Yours Truly](), Famous Inc.

![cover](http://www.dvd-ppt-slideshow.com/images/ppt-background/background-6.jpg)
***

## Header

Typewriter etsy messenger bag [fingerstache](), aesthetic vinyl semiotics twee **DIY** forage chillwave. Thundercats ennui messenger bag, squid carles chillwave shoreditch pickled cliche **letterpress**. DIY beard locavore occupy salvia, whatever single-origin ==coffee== fanny pack 3 wolf moon typewriter gastropub1 kale H20 chips. Ennui keffiyeh thundercats jean shorts biodiesel. Terry richardson, swag blog locavore umami vegan helvetica. Fingerstache kale chips.

<footer>
<p>DIY beard locavore <i>occupy</i> salvia, whatever single-origin <code>coffee</code> fanny pack 3 wolf moon <a href="">typewriter</a> gastropub<sup>1</sup> kale H<sub>2</sub>0 chips. Ennui <strong>keffiyeh</strong> thundercats jean <em>shorts</em> biodiesel. Terry richardson, swag blog locavore umami <b>vegan</b> helvetica. Fingerstache kale chips.</p>
</footer>
        
***

## Header

Thundercats ennui messenger bag, squid carles chillwave shoreditch pickled cliche letterpress. DIY beard locavore occupy salvia, whatever single-origin coffee fanny pack 3 wolf moon typewriter gastropub kale chips. Ennui keffiyeh thundercats jean shorts biodiesel. Terry richardson, swag blog locavore umami vegan helvetica. Fingerstache kale chips.

Typewriter etsy messenger bag fingerstache.

***

## Lists in English typography

* Ennui keffiyeh thundercats
* Jean shorts biodiesel
* Terry richardson, swag blog
	1. Locavore umami vegan helvetica
	2. Fingerstache kale chips
	3. Keytar sriracha gluten-free
* Before they sold out master

***

## Lists in Russian typography

- Ennui keffiyeh thundercats
- Jean shorts biodiesel
- Terry richardson, swag blog
	1. Locavore umami vegan helvetica
	2. Fingerstache kale chips
	3. Keytar sriracha gluten-free
- Before they sold out master

***

## Lists in English typography

1. Locavore umami vegan helvetica
2. Fingerstache kale chips
3. Keytar sriracha gluten-free

* Ennui keffiyeh thundercats
* Jean shorts biodiesel
* Terry richardson, swag blog

***

## Quote

> Typewriter etsy messenger bag fingerstache, aesthetic vinyl semiotics twee DIY forage chillwave. Thundercats ennui messenger bag, squid carles chillwave shoreditch pickled cliche letterpress. _**Author Name**_

DIY beard locavore occupy salvia, whatever single-origin coffee fanny pack 3 wolf moon typewriter gastropub kale chips.

***

## Table

| Locavore     | Umami        | Helvetica | Vegan     |
|--------------|--------------|-----------|-----------|
| Fingerstache | Kale         | Chips     | Keytar    |
| Sriracha     | Gluten-free  | Ennui     | Keffiyeh  |
| Thundercats  | Jean         | Shorts    | Biodiesel |
| Terry        | Richardson   | Swag      | Blog      |

Typewriter etsy messenger bag fingerstache.

*** 

## Numbered code listing

    <html lang="en">
    <head> <!--Comment-->
        <title>Shower</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="s/screen.css">
        <script src="j/jquery.js"></script>
    </head>
    
***

## You Can <br> Shout This Way

***

## [Linked Shout]()

***

## Growing Shout

***

## Shrinking Shout
```