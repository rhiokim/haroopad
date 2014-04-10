# Markdown Characters

[TOC "float:right"]

* \\ backslash
* \` backtick
* \* asterisk
* \_ underscore
* { } curly braces
* [ ] square brackets
* ( ) parentheses
* \# hash mark
* \+ plus sign
* \- minus sign (hyphen)
* \. dot
* ! exclamation
* ^ caret
* ~ tilde

## Gruber's Markdown

## Emphasis

Italic - *italic*

```markdown
*italic*
```

Bold - **bold**

```markdown
**bold** or __bold__
```


### Links

Inline - [link]()

```markdown
A [Link](http://example.com "Title")
```
Reference-style - [link][id]

```markdown
A [Link][id].

[id]: http://example.com "Title"
```

### Code

A `code span`

```markdown
A `code span`
```

### Image

Inline - Image

![Alt Text](http://bit.ly/1drEdWK "Title")

```markdown
![Alt Text](http://bit.ly/1drEdWK "Title")
```

Reference-style Image

![Alt Text][logo].

[logo]: http://bit.ly/1drEdWK "Title"

```markdown
A ![Alt Text][logo].

[logo]: http://bit.ly/1drEdWK "Title"
```

Image Style (Haroopad Flavored Markdown)

![Alt Text](http://bit.ly/1drEdWK "Title" "width:30px")
![Alt Text](http://bit.ly/1drEdWK "Title" "width:30px;float:right")

![Alt Text][logo].

[logo]: http://bit.ly/1drEdWK "Title" "width:50px"

```markdown
![Alt Text](http://bit.ly/1drEdWK "Title" "width:30px")
![Alt Text](http://bit.ly/1drEdWK "Title" "width:30px;float:right")

![Alt Text][logo].

[logo]: http://bit.ly/1drEdWK "Title" "width:50px"

```

### Headers

Setext-style
```markdown
Header 1
========

Header 2
--------
```

atx-style

```markdown
# Header 1
## Header 2
...
###### Header 6
```

### Lists

Ordered (numbered)

1. Red
2. Blue
3. Green

```markdown
1. Red
2. Blue
3. Green
```

Unordered (bulleted)

* Red
* Blue
* Green

```markdown
* Red
* Blue
* Green

- Red
- Blue
- Green

+ Red
+ Blue
+ Green
```

Nest Lists

* Colors
  1. Red
  2. Blue
  3. Green
  4. Yellow
    - Dark Yellow
    - Light Yellow
    - Green Yellow

```markdown
* Colors
  1. Red
  2. Blue
  3. Green
  4. Yellow
    - Dark Yellow
    - Light Yellow
    - Green Yellow
```

### Blockquotes

> This is the **Blockquotes**

```markdown
> This is the **Blockquotes**
```

### Horizontal Rules

Three or more hyphens(-), asterisks(*), or underscores(_)

Page break

```markdown
* * *
```

Section break

```markdown
- - -
```

Margin break (add margin bottom)

```markdown
_ _ _
```

## Github Flavored Markdown

### Line Breaks

End a line with tow or more spaces

Roses are red,  
Violets are blue.

```markdown
Roses are red,  
Violets are blue.
```

### Fenced Code Block 

<pre><code class="markdown">```
var your = 'code here';
```
</code></pre>

Syntax Highlight

<pre><code class="markdown">```[language name]
var your = 'code here';
```
</code></pre>

* Language names - http://highlightjs.org/static/test.html

Javascript

```javascript
function syntaxHighlight(a, b) {
  return a + b;
}
```

```cpp
#include <iostream>

int main(char *argv[]) {
  return -2e3 + 121;
}
```

### Table (GFM)

| name  | age | gender    | money  |
|-------|:---:|-----------|-------:|
| rhio  | 384 | robot     | $3,000 |
| haroo | .3  | bird      | $430   |
| jedi  | ?   | undefined | $0     |

```markdown
| name  | age | gender    | money  |
|-------|:---:|-----------|-------:|
| rhio  | 384 | robot     | $3,000 |
| haroo | .3  | bird      | $430   |
| jedi  | ?   | undefined | $0     |
```

## Multimarkdown

* [What is MultiMarkdown?](http://fletcherpenney.net/multimarkdown/)

Superscript - ^superscript^
```markdown
^superscript^
```

Subscript - ~subscript~
```markdown
~subscript~
```
Underline - ++underline++

```markdown
++underline++
```

## Haroopad Flavored Markdown

### Pharse Emphasis

Highlight - ==highlight==

```markdown
==highlight==
```

Strikethrough - ~~strikethrough~~

```markdown
~~strikethrough~~
```

### Horizontal Rules

Sentence break (add margin bottom)

```markdown
_ _ _
```

### Table of Content

```markdown
[TOC] or [toc]

[TOC "float:left"]
[TOC "float:right"]
```

### Math Expression

Inline Math expression

$$$x^2$$$

```markdown
$x^2$ or $$$x^2$$$
```

Block Math expression

$$
x^2
$$

```markdown
$$
x^2
$$
```

### Media Embed

This is Block syntax.
@[Alt Text](Content-URL "CSS")

@[2NE1 - Missing You](https://vimeo.com/70385914 "width:100%;height:350px")
```markdown
@[Alt Text](Content-URL "CSS")

@[2NE1 - Missing You](https://vimeo.com/70385914 "width:100%;height:350px")
```

## PHP Extras Markdown

### Footnotes

<p>This is footnote<sup class="footnote-ref" id="fnref-f1"><a href="#fn-f1">1</a></sup></p>
<ol class="footnotes"><li id="fn-f1">explanatory information

<a href="#fnref-f1">&#8617;</a></li></ol>

```markdown
This is footnote[^1]

[^1]: explanatory information
```

