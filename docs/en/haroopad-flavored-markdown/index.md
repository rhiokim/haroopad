# Haroopad Flavored Markdown

이번 0.8을 기준으로 하루패드에는 3가지의 새로운 마크다운 문법이 추가되었습니다.

하루패드는 앞으로도 John Gruber 의 마크다운과 Github Flavored Markdown 을 기반으로 하루패드에 어울리는 마크다운 포맷이 추가될 예정입니다.

여기서 중요한 것은 사용자에게 문서 작성에 편의성을 앞장 세워 마크다운 문법이 추가하지는 않을 것입니다.

늘 표준에 가깝고 마크다운 커뮤니티에서 지향하는 방향을 지키며 조금씩 변화할 계획입니다.

이 문서에서는 하루패드에서만 동작하는 문법에 대해서 설명합니다.

### Highlight(not syntax highlight)

**Highlight** (and highlights, highlighting, etc.) may refer to:

```markdown
Syntax ==highlighting==, **display of text** in different colors and/or fonts, depending upon its meaning in context (e.g. different parts of speech in a sentence, or ==function==  vs. ==variables names== in computer source code)
```

Syntax ==highlighting==, **display of text** in different colors and/or fonts, depending upon its meaning in context (e.g. different parts of speech in a sentence, or ==function== vs. ==variables names== in computer source code)

### Table of Contents

A table of contents, usually headed simply "Contents" and abbreviated informally as TOC, is a list of the parts of a book or document organized in the order in which the parts appear.

```
[TOC]

# Chapter 1: Getting Started
...

## Introduction
...

## Next Steps
...
```

* [Chapter 1: Getting Started]()
  - [Introduction]()
  - [Next Steps]()

**example**

TOC of this document

> [TOC]

### Media Embed

oEmbed is a format for allowing an embedded representation of a URL on third party sites. The simple API allows a website to display embedded content (such as photos or videos) when a user posts a link to that resource, without having to parse the resource directly.

Simply use `@[]()` syntax to link to external resources

```markdown
@[caption](content-url 'stylesheets')
@[](http://www.youtube.com/watch?v=jo_B4LTHi3I)
@[](http://www.flickr.com/photos/bees/2362225867/ 'width:300px')
```

@[](http://www.youtube.com/watch?v=jo_B4LTHi3I)

@[](http://www.flickr.com/photos/bees/2362225867/ 'width:300px')