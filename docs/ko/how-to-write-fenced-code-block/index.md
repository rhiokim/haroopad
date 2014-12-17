# How to use fenced code block

하루패드는 **71 가지 언어**의 구문 강조를 지원하고 **44 가지의 구문 강조 테마**를 제공합니다.

## Fenced code block Syntax

하루패드는 간단한 방법으로 코드 구문 강조 기능을 사용 할수 있습니다.  먼저 마크다운에서 코드 블럭을 지정하는 방법을 알아봅니다.

마크다운에서 기본 코드 블럭은 한개의 탭 혹은 세개의 공백입니다.

<pre><code class="markdown">    function syntaxHighlight(code, lang) {
       var foo = 'rhio';
       var bar = 33;
    }
</code></pre>

**결과**

    function syntaxHighlight(code, lang) {
       var foo = 'rhio';
       var bar = 33;
    }

위와 같이 코드 블럭이지만 우리가 흔히 개발 도구에서 보던 구문 강조가 되지 않아 문서내에 코드 가독성이 조금 떨어지고 익숙하지 않게 느껴집니다.

그래서 마크다운을 즐겨쓰는  [Github.com](http://github.github.com/github-flavored-markdown/) 에서는 서비스 특성상 마크다운 문서에 코드 블럭이 많기 때문에 이점을 보안, 개선했습니다.  3개의 <code>`</code> (backtick) 을 연달아 작성하는 것으로 구문강조 코드 블럭을 지원하면서 **Fenced Code Block**이 코드 블럭의 기본 방식처럼 되어가고 있습니다.

그외에 `~` (tilde) 3개를 이용해 코드 블럭을 지정하는 방법도 있습니다.

<pre><code class="markdown">```ruby
code block
```

~~~cpp
fenced code block
~~~

~~~javascript
function syntaxHighlight(code, lang) {
   var foo = 'rhio';
   var bar = 33;
}
~~~
</code></pre>

**결과**

```js
function syntaxHighlight(code, lang) {
   var foo = 'rhio';
   var bar = 33;
}
```

**라이브 데모** -- ==클릭해보세요==

<a style="cursor:pointer;" onclick="loadCodeCss('default');">default</a>, <a style="cursor:pointer;" onclick="loadCodeCss('arta');">arta</a>, <a style="cursor:pointer;" onclick="loadCodeCss('ascetic');">ascetic</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-dune.dark');">atelier-dune.dark</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-dune.light');">atelier-dune.light</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-forest.dark');">atelier-forest.dark</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-forest.light');">atelier-forest.light</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-heath.dark');">atelier-heath.dark</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-heath.light');">atelier-heath.light</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-lakeside.dark');">atelier-lakeside.dark</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-lakeside.light');">atelier-lakeside.light</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-seaside.dark');">atelier-seaside.dark</a>, <a style="cursor:pointer;" onclick="loadCodeCss('atelier-seaside.light');">atelier-seaside.light</a>, <a style="cursor:pointer;" onclick="loadCodeCss('brown_paper');">brown\_paper</a>, <a style="cursor:pointer;" onclick="loadCodeCss('docco');">docco</a>, <a style="cursor:pointer;" onclick="loadCodeCss('far');">far</a>, <a style="cursor:pointer;" onclick="loadCodeCss('foundation');">foundation</a>, <a style="cursor:pointer;" onclick="loadCodeCss('github');">github</a>, <a style="cursor:pointer;" onclick="loadCodeCss('googlecode');">googlecode</a>, <a style="cursor:pointer;" onclick="loadCodeCss('idea');">idea</a>, <a style="cursor:pointer;" onclick="loadCodeCss('ir_black');">ir\_black</a>, <a style="cursor:pointer;" onclick="loadCodeCss('magula');">magula</a>, <a style="cursor:pointer;" onclick="loadCodeCss('mono-blue');">mono-blue</a>, <a style="cursor:pointer;" onclick="loadCodeCss('monokai_sublime');">monokai\_sublime</a>, <a style="cursor:pointer;" onclick="loadCodeCss('obsidian');">obsidian</a>, <a style="cursor:pointer;" onclick="loadCodeCss('paraiso.dark');">paraiso.dark</a>, <a style="cursor:pointer;" onclick="loadCodeCss('paraiso.light');">paraiso.light</a>, <a style="cursor:pointer;" onclick="loadCodeCss('pojoaque');">pojoaque</a>, <a style="cursor:pointer;" onclick="loadCodeCss('railscasts');">railscasts</a>, <a style="cursor:pointer;" onclick="loadCodeCss('rainbow');">rainbow</a>, <a style="cursor:pointer;" onclick="loadCodeCss('school_book');">school\_book</a>, <a style="cursor:pointer;" onclick="loadCodeCss('solarized_dark');">solarized\_dark</a>, <a style="cursor:pointer;" onclick="loadCodeCss('solarized_light');">solarized\_light</a>, <a style="cursor:pointer;" onclick="loadCodeCss('sunburst');">sunburst</a>, <a style="cursor:pointer;" onclick="loadCodeCss('tomorrow-night-blue');">tomorrow-night-blue</a>, <a style="cursor:pointer;" onclick="loadCodeCss('tomorrow-night-bright');">tomorrow-night-bright</a>, <a style="cursor:pointer;" onclick="loadCodeCss('tomorrow-night-eighties');">tomorrow-night-eighties</a>, <a style="cursor:pointer;" onclick="loadCodeCss('tomorrow-night');">tomorrow-night</a>, <a style="cursor:pointer;" onclick="loadCodeCss('tomorrow');">tomorrow</a>, <a style="cursor:pointer;" onclick="loadCodeCss('vs');">vs</a>, <a style="cursor:pointer;" onclick="loadCodeCss('xcode');">xcode</a>, <a style="cursor:pointer;" onclick="loadCodeCss('zenburn');">zenburn</a>

#### Other Example

**ruby**

```ruby
def syntaxHighlight
  @haroo = 'press'
  return @haroo
end
```

**python**

```python
def syntaxHighlight():
    haroo = "press"
    return haroo
```

**php**

```php
<?php
$a1=array("a"=>"red","b"=>"green","c"=>"blue");
$a2=array("a"=>"red","c"=>"blue","d"=>"pink");

$result=array_intersect_key($a1,$a2);
print_r($result);
?>
```

**java**

```java
/* HelloWorld.java
 */
public class HelloWorld
{
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}
```

### Languages

위의 예시와 같이 코드에 적합한 언어를 지정해주면 언어에 맞게 구문 강조가 됩니다. 앞서 소개한것 처럼 하루패드는 다음과 같이 다양한 언어의 구문 강조를 지원합니다.

언어는 `key` 중에 선택하면 됩니다.


| Language                              | key            |
|:-------------------------------------:|:--------------:|
| 1C                                    | 1c             |
| ActionScript                          | actionscript   |
| Apache                                | apache         |
| AppleScript                           | applescript    |
| AsciiDoc                              | asciidoc       |
| AspectJ                               | asciidoc       |
| AutoHotkey                            | autohotkey     |
| AVR Assembler                         | avrasm         |
| Axapta                                | axapta         |
| Bash                                  | bash           |
| BrainFuck                             | brainfuck      |
| Cap’n Proto                           | capnproto      |
| Clojure REPL                          | clojure        |
| Clojure                               | clojure        |
| CMake                                 | cmake          |
| CoffeeScript                          | coffeescript   |
| C++                                   | cpp            |
| C#                                    | cs             |
| CSS                                   | css            |
| D                                     | d              |
| Dart                                  | d              |
| Delphi                                | delphi         |
| Diff                                  | diff           |
| Django                                | django         |
| DOS .bat                              | dos            |
| Dust                                  | dust           |
| Elixir                                | elixir         |
| ERB (Embedded Ruby)                   | erb            |
| Erlang REPL                           | erlang-repl    |
| Erlang                                | erlang         |
| FIX                                   | fix            |
| F#                                    | fsharp         |
| G-code (ISO 6983)                     | gcode          |
| Gherkin                               | gherkin        |
| GLSL                                  | glsl           |
| Go                                    | go             |
| Gradle                                | gradle         |
| Groovy                                | groovy         |
| Haml                                  | haml           |
| Handlebars                            | handlebars     |
| Haskell                               | haskell        |
| Haxe                                  | haxe           |
| HTTP                                  | http           |
| Ini file                              | ini            |
| Java                                  | java           |
| JavaScript                            | javascript     |
| JSON                                  | json           |
| Lasso                                 | lasso          |
| Less                                  | less           |
| Lisp                                  | lisp           |
| LiveCode                              | livecodeserver |
| LiveScript                            | livescript     |
| Lua                                   | lua            |
| Makefile                              | makefile       |
| Markdown                              | markdown       |
| Mathematica                           | mathematica    |
| Matlab                                | matlab         |
| MEL (Maya Embedded Language)          | mel            |
| Mercury                               | mercury        |
| Mizar                                 | mizar          |
| Monkey                                | monkey         |
| nginx                                 | nginx          |
| Nimrod                                | nimrod         |
| Nix                                   | nix            |
| NSIS                                  | nsis           |
| Objective C                           | objectivec     |
| OCaml                                 | ocaml          |
| Oxygene                               | oxygene        |
| Parser 3                              | parser3        |
| Perl                                  | perl           |
| PHP                                   | php            |
| PowerShell                            | powershell     |
| Processing                            | processing     |
| Python's profiler output              | profile        |
| Protocol Buffers                      | protobuf       |
| Puppet                                | puppet         |
| Python                                | python         |
| Q                                     | q              |
| R                                     | r              |
| RenderMan RIB                         | rib            |
| Roboconf                              | roboconf       |
| RenderMan RSL                         | rsl            |
| Ruby                                  | ruby           |
| Oracle Rules Language                 | ruleslanguage  |
| Rust                                  | rust           |
| Scala                                 | scala          |
| Scheme                                | scheme         |
| Scilab                                | scilab         |
| SCSS                                  | scss           |
| Smali                                 | smali          |
| SmallTalk                             | smalltalk      |
| SML                                   | sml            |
| SQL                                   | sql            |
| Stata                                 | stata          |
| STEP Part 21 (ISO 10303-21)           | step21         |
| Stylus                                | stylus         |
| Swift                                 | swift          |
| Tcl                                   | tcl            |
| TeX                                   | tex            |
| Thrift                                | thrift         |
| Twig                                  | twig           |
| TypeScript                            | typescript     |
| Vala                                  | vala           |
| VB.NET                                | vbnet          |
| VBScript in HTML                      | vbscript-html  |
| VBScript                              | vbscript       |
| Verilog                               | verilog        |
| VHDL                                  | vhdl           |
| Vim Script                            | vim            |
| Intel x86 Assembly                    | x86asm         |
| XL                                    | xl             |
| XML, HTML                             | xml            |

### Themes

개발 도구의 구문 강조 테마로 잘 알려진 Solarized, Tomorrow 씨리즈는 기본으로 Github 스타일도 제공합니다.

하루패드에서 코드 구문 강조를 위한 테마는 환경설정에서 지정할 수 있습니다.

![코드 구문강조 설정](images/001.png)

위의 그림과 같이 "환경설정(Preference) > 코드(Code) 탭 > 테마(Themes) 섹션' 에서 선택할 수 있습니다. 설정이 변경되면 모든 코드 블럭에 지정한 테마가 적용됩니다.

테마 라이브 데모는 [여기](http://softwaremaniacs.org/media/soft/highlight/test.html)를 참고하세요.

## See more

* https://help.github.com/articles/github-flavored-markdown#syntax-highlighting
* http://highlightjs.org/