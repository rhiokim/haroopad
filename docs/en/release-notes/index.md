## Haroopad v0.12.1

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#374             | ==Added== Cannot open more than one file on cli  
#                | ==Added== 15 languages(swift, gradle ...) and 5 themes for code block
#                | ==Added== Internationalization - Italy (Italiano) - 
**Bugs**         |
#363             | Fixed Haroopad won't start for the second time
#353             | Fixed Embedding content using by D&D HTML object
#360             | Fixed Subscript syntax conflict with Strikethrough
**Enhancements** |
#343             | Support markdown syntax within footnote
#                | Improve HTML to Markdown
#354             | Improve css selection color
#351             | Not Case-sensitive language name in fenced code block
#375             | Error while loading shared libraries: libudev.so.0

##### Github Issue tracker

* v0.12.1 -- https://github.com/rhiokim/haroopad/issues?q=milestone%3Av0.12.1+is%3Aclosed

##### Download

> * Windows MSI: https://www.dropbox.com/s/ovwxer3lif37qck/haroopad-v0.12.1-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/0zp5fq079pzrr5x/haroopad-v0.12.1.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/zlp608oak1vif53/haroopad-v0.12.1_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/x0qbu91zgf4cncw/haroopad-v0.12.1-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/rhvtz64rthv3djl/haroopad-v0.12.1_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/7tfcroz2zcl76j5/haroopad-v0.12.1_amd64.deb

## Haroopad v0.12.0

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#317             | ==Added== Markdown folding
#13              | ==Added== Multimarkdown Footnotes syntax
**Bugs**         |
#335             | Supports Autocompletion for sent email address
#331             | Fixed _text_ don't make italic as *text* and GitHub Flavored Markdown
#329             | Fixed strange preview with <i></i> in Header
#330             | Fixed Haroopad don't open second file onclick
#312             | Fixed export html with custom theme
**Enhancements** |
#334             | Line break on cross platform (CRLF / LF)
#325             | Word newline
#323             | Fancy at menu edit
#320             | Supports tables in lists like github
#169             | Replace current windows instead of opening a new one

##### Github Issue tracker

* v0.12.0 -- https://github.com/rhiokim/haroopad/issues?labels=&milestone=38&page=1&state=closed

##### Download

> * Windows MSI: https://www.dropbox.com/s/7fwdzam2ipfoqg6/haroopad-v0.12.0-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/yvjb90ywib551ex/haroopad-v0.12.0.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/q3gglhci8mx4ysh/haroopad-v0.12.0_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/9kw4w5gl319erth/haroopad-v0.12.0-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/mk9e2wyjjuva9jl/haroopad-v0.12.0_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/urnoicuv5euqfwm/haroopad-v0.12.0_amd64.deb

## Haroopad v0.11.1

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#309             | ==Added== Superscript Syntax `Superscript^superscript^`
#308             | ==Added== Subscript Syntax `Subscript~subscript~`
#302             | ==Added== Support Audio & Video with Image Syntax extention
#191             | ==Added== Internationalization - Greek (Ελληνικά)
#293             | ==Added== Enhanced Context menu
#283             | ==Added== Option inline mathematics expression (**$**, $$$) 
#266             | ==Changed== Underline Syntax `_underline_` -> `++underline++`
**Bugs**         |
#310             | Application is not started on Mint15/64bit
#305             | Window postion x,y error
#301, #271, #261 | NVCtrl extension does not exist
#299             | Chinese language error
**Enhancements** |
#307             | Continous List Item (ol, li)
#306             | Smart resource path when exporting html file
#304,#294, #258  | Removed Ctrl + Alt shortcut at all for global keyboard shortcut
#296             | TOC starts with "TABLE OF CONTENTS" (en-us) string in v 0.11

##### Github Issue tracker

* v0.11.1 -- https://github.com/rhiokim/haroopad/issues?milestone=39&page=1&state=closed

##### Download

> * Windows MSI: https://dl.dropbox.com/s/aqz9deb54le3b1b/haroopad-v0.11.1-i386.msi
> * Mac OS X DMG: https://dl.dropbox.com/s/dhclfu538188yox/haroopad-v0.11.1.dmg
> * Linux 32-bit Binary: https://dl.dropbox.com/s/rnvq59dcytz6z8z/haroopad-v0.11.1_i386.tar.gz
> * Linux 32-bit Debian Package: https://dl.dropbox.com/s/d1x3fap7sk57p02/haroopad-v0.11.1-i386.deb
> * Linux 64-bit Binary: https://dl.dropbox.com/s/2ncg44ybixjezzq/haroopad-v0.11.1_amd64.tar.gz
> * Linux 64-bit Debian Package: https://dl.dropbox.com/s/2km44jkax2lsarf/haroopad-v0.11.1_amd64.deb

## Haroopad v0.11.0

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#288             | ==Added== Current line highlighting
#289, #287       | ==Added== Align attribute for Image `![](path "title" "css")`
#275             | ==Added== Align attribute for TOC `[TOC "float:right"]`
#257             | ==Added== Import and Export settings
#189             | ==Added== German(Deutsch) translation by [Tobias Mücksch](https://github.com/tobiasmuecksch)
                 | ==Added== Syntax highlighting 71 languages, 44 styles
                 | ==Added== Themes for editor 30 styles
                 | ==Added== Syntax highlighting in fenced code block on editor <br>(Ruby, PHP, Python, C, Javascript, HTML, CSS)
**Font Issues**  | 
#282             | Font Issues
#269, #242       | monospace/fixed-width font <br>equals and minus characters different width if followed by space
**Markdown**     | 
#264             | ==Added== GFM Line Break
                 | ==Added== Support Smartypants
**Bugs**         |
#286             | Fixed li > blockquote parse error
#278, #272       | Fixed export HTML file 
#276             | Fixed Absolutely image path error on non-saved file
**Enhancements** |
#238             | Syntax highlighting has some problems
#290             | Update base ui framework 
#245             | Lazy-loading image resouces 


##### Github Issue tracker

* v0.11.0 -- https://github.com/rhiokim/haroopad/issues?milestone=32&page=1&state=closed
* v0.10.1 -- https://github.com/rhiokim/haroopad/issues?milestone=36&page=1&state=closed

##### Download

> * Windows MSI: https://www.dropbox.com/s/q7j7feiry65zywu/haroopad-v0.11.0-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/30wgt7osktvhpb5/haroopad-v0.11.0.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/c4k13pbp9rt0fi1/haroopad-v0.11.0_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/fhmy9fssd8m0hrr/haroopad-v0.11.0-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/oveh9gvbjld46pw/haroopad-v0.11.0_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/qroboui3on1kxu2/haroopad-v0.11.0_amd64.deb

## Haroopad v0.10.0

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#255             | ==Added== **Markdown Syntax Help**
#253             | ==Added== **4 Viewer's themes**
#240             | ==Added== Math (block/inline) menu-item in Insert Menu
#239             | ==Added== Highlight & Underline menu-item in Insert Menu
#231             | ==Added== **Markdown Autocompletion** ( !, -, =, _, *, `, ~, $, @ )
#224             | ==Added== Shortcut for Mathematics `Ctrl(COMMAND) + Alt + M`
#164             | ==Added== **New Markdown Syntax `[TOC]`** for table of contents
#88              | ==Added== **Internationalization** (English/Korean/Chinese/Spanish)
**Bugs**         |
#236             | Fixed Filename is not correct on window
#230             | Fixed Word count problem
**Enhancements** |
#260             | Keep syntax highlighting only for fenced code block, not pre blocks
#247             | Disable last used file auto-open on startup
#244             | Change the default file name when saving


##### Github Issue tracker

* https://github.com/rhiokim/haroopad/issues?milestone=30&page=1&state=closed

##### Download

> * Windows MSI: https://www.dropbox.com/s/xkopo54ikj4pm86/haroopad-v0.10.0-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/vpq1l0racrky8vp/haroopad-v0.10.0.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/a8nrq54hf0esauw/haroopad-v0.10.0_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/z0bapcxguzgh8df/haroopad-v0.10.0-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/g4du6i4foc4y502/haroopad-v0.10.0_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/6zkglx8v2j3dimx/haroopad-v0.10.0_amd64.deb


## Haroopad v0.9.1 - ==hotfix==

Issue Number     | Description
----------------:|-----------------------------------------------
**Bugs**         |
#227             | Fixed relative image path


##### Github Issue tracker

* https://github.com/rhiokim/haroopad/issues/227

##### Download

> * Windows MSI: https://www.dropbox.com/s/1d2gwcdiypyw8cx/haroopad-v0.9.1-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/virlns1wo817ci5/haroopad-v0.9.1.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/ayqin4fevcllvms/haroopad-v0.9.1_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/iqlq7zirnr0ogvw/haroopad-v0.9.1-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/wwwq1zeaodt0gfd/haroopad-v0.9.1_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/16weidzgl3ln9pq/haroopad-v0.9.1_amd64.deb


## Haroopad v0.9.0

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#10              | ==Added== **Mathematical Expression** based on MathJax
#63, #212        | ==Added== Font Size Option
#183             | ==Added== Copy inline styled html for WYSWIG
#215             | ==Added== Toggle Vim-mode menu
#214             | ==Added== Shortcuts for inserting date & time
#217             | ==Added== Shortcut for Print
#                | ==Added== Shortcut for Header 
**Bugs**         |
#196             | Fixed Auto Set email title
#                | Fixed Hidden Edit menu
#                | Fixed Tabindex into save modal dialog when close window
**Enhancements** |
#209             | Enhance embeded contents look when sending email
#                | Change font-family priorty `Malgun Gothic > Arial` in editor, viewer (only Hangul)


##### Github Issue tracker

* https://github.com/rhiokim/haroopad/issues?milestone=29&state=closed

##### Download

> * Windows MSI https://www.dropbox.com/s/uhagga4dpf3pqsv/haroopad-v0.9.0-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/a9z6qr5mt9y16ap/haroopad-v0.9.0.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/jnnhzwfrc7o4r05/haroopad-v0.9.0_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/kli6khbzds8hh4l/haroopad-v0.9.0-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/hhnq8ty40c169wd/haroopad-v0.9.0_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/njpzetygyoports/haroopad-v0.9.0_amd64.deb

## Haroopad v0.8.0

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#208             | ==Added== OLE Object Drag & Drop support
#203             | ==Added== **Editor and View Mode**
#200             | ==Added== **Smart Embedding Rich Media Contents**
#192             | ==Added== Add shortcut for "Export to HTML"
#190             | ==Added== **Change Action Menu -> Insert**
                 | ==Added== **Insert Date & Time**
                 | ==Added== **Insert Horizontal Line (Page & Section Break - -  - and \* \* \*)**
                 | ==Added== **Insert Filename**
#184             | ==Added== Show only TOC
#174             | ==Added== oEmbed & Open Graph support
#128             | ==Added== Set Default filename when save, save as, export html
**Bugs**         |
#196             | Fixed style when export html (Window)
#195             | Fixed Conflicted Shortcut at Vim Mode
#186             | Fixed Immediately apply theme when change style in preferences window
**Enhancements** |
#182             | Enhanced Sending email when keypress enter
#181             | White space should be excluded from the number of characters.

##### Github Issue tracker

* https://github.com/rhiokim/haroopad/issues?milestone=27&state=closed

##### Download

> * Windows MSI https://www.dropbox.com/s/2j55edvc0qqpo0l/haroopad-v0.8.0-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/upivzqnpzocc5b0/haroopad-v0.8.0.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/l1t4ceize4047jn/haroopad-v0.8.0_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/kmrh3u52b97tzyo/haroopad-v0.8.0-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/jrbksg1vvoy0jm1/haroopad-v0.8.0_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/6zm9cln6tt8gl1u/haroopad-v0.8.0_amd64.deb

## Haroopad v0.7.0

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#174             | ==Added== Outlie View
#177, #130       | ==Added== Custom Theme based on CSS
#159, #143       | ==Added== Link application for markdown doc on Linux
#180             | ==Added== Sending email when keypress enter in dialog
**Bugs**         |
#168             | Fixed Favicon when pressing Alt+Tab
#160             | Fixed Allow multiple instance of Haroopad to open (Win, Linux)
**Enhancements** |
#175             | Enhanced current state document (remove 0 state)
#182             | Enhanced Sending email when keypress enter

##### Github Issue tracker

* https://github.com/rhiokim/haroopad/issues?milestone=17&page=1&state=closed


##### Download

> * Windows MSI https://www.dropbox.com/s/kw392p2mjghfiwz/haroopad-v0.7.0-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/r2uizj3vyy2nu98/haroopad-v0.7.0.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/dymhl2mpu8tl1b1/haroopad-v0.7.0_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/pgum0b1dirko2lk/haroopad-v0.7.0-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/z9qc6e04rm0th0e/haroopad-v0.7.0_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/8kopt6ndr4zkkj8/haroopad-v0.7.0_amd64.deb


## Haroopad v0.6.0

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#167             | Add cusor activity information
#166             | Add current editor status (analytics elements)
#165			       | Add Multi-column layout (idea by @andrwj)
#158			       | Add Underline(\_word\_) and Highlight(&#61;&#61;word&#61;&#61;)
#153, #144       | Add spaces instead of tabs
**Bugs**         |
#172             | Fixed Attachments image when sending emal
#160					   | Allow multiple window when dbl-clicking file open
#138             | Fixed menu items ordering
**Enhancements** |

##### Github Issue tracker

* https://github.com/rhiokim/haroopad/issues?milestone=5&state=closed

##### Download

> * Windows MSI installer: https://www.dropbox.com/s/a5efmje2oupzy0k/haroopad-v0.6.0-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/fkmsvk4fw3togp7/haroopad-v0.6.0.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/q1bsgtxy7pogif8/haroopad-v0.6.0_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/r82207grqp3vrjo/haroopad-v0.6.0-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/ks4w2kaix4jncy3/haroopad-v0.6.0_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/95ghf659ynrosy4/haroopad-v0.6.0_amd64.deb

## Haroopad v0.5.0

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
                | **Sending email or Posting to tumblr** <span class="label label-important"> New!</span>
#146             | **Copy to HTML** shortcut
                 | Add shortcut to toggle fullscreen ([Shortcuts](http://pad.haroopress.com/page.html?f=show-shortcuts))
**Bugs**         |
#145             | **\[a:b\]\(\)** - markdown parsing error
#151             | Drag and Drop on dock icon
**Enhancements** |
#141             | Remember fullscreen mode
#131             | Remember directory path that lastest opened file
#                | Set markdown document icon on Mac


##### Github Issue tracker

* https://github.com/rhiokim/haroopad/issues?milestone=4&state=closed

##### Download

> * Windows MSI installer: https://www.dropbox.com/s/n9dqix5fjujv701/haroopad-v0.5.0-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/p8419o0wtqlr1s6/haroopad-v0.5.0.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/kldpurazcmt480o/haroopad-v0.5.0_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/d5uzi4khsbzk8ex/haroopad-v0.5.0-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/db0y2rl5do0wg4r/haroopad-v0.5.0_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/s9r8n5mqorqpcg1/haroopad-v0.5.0_amd64.deb


## Haroopad v0.4.9

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#131             | Add 5 new themes
**Bugs**         |
#146             | Fixed recently file list blank error
#145             | Fixed disabling "Auto pair characters"
#140             | Fixed Context menu positon error on Window
#135             | Fixed Context menu positon in fullscreen mode.
#134             | Add shortcuts for escape fullscreen mode
#136             | Fixed donation link
**Enhancements** |
#141             | Enhancement close app logic
#131             | Update codemirror 3.15
#127             | file open (CLI)
#137             | Fixed dont's run in ubuntu 13.04 (libudev.so.0 problem)


##### Github Issue tracker

* https://github.com/rhiokim/haroopad/issues?milestone=23&page=1&state=closed

##### Download

> * Windows MSI installer: https://www.dropbox.com/s/tka88058kws5wrl/haroopad-v0.4.9-i386.msi
> * Mac OS X DMG: https://www.dropbox.com/s/cmgr27ocwkz8jvv/haroopad-v0.4.9.dmg
> * Linux 32-bit Binary: https://www.dropbox.com/s/ftbyys0leu1ia6w/haroopad-v0.4.9_i386.tar.gz
> * Linux 32-bit Debian Package: https://www.dropbox.com/s/yxecp3j36bf89t1/haroopad-v0.4.9-i386.deb
> * Linux 64-bit Binary: https://www.dropbox.com/s/vebgfulty6ralzd/haroopad-v0.4.9_amd64.tar.gz
> * Linux 64-bit Debian Package: https://www.dropbox.com/s/brakb4fr3rpbk63/haroopad-v0.4.9_amd64.deb

## Haroopad v0.4.8

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
**Bugs**         |
#122             | Fixed focused window
**Enhancements** |
                 | Update Documents & Refactoring for next step

##### Download
> * Windows MSI installer:[https://www.dropbox.com/s/498tpv91tso9ccy/haroopad-v0.4.8-i386.msi](https://www.dropbox.com/s/498tpv91tso9ccy/haroopad-v0.4.8-i386.msi)
> * Mac OS X DMG: [https://www.dropbox.com/s/1atxt755y0wkffa/haroopad-v0.4.8.dmg](https://www.dropbox.com/s/1atxt755y0wkffa/haroopad-v0.4.8.dmg)
> * Linux 32-bit Binary:[https://www.dropbox.com/s/eieqz1qag3lg76e/haroopad-v0.4.8_i386.tar.gz](https://www.dropbox.com/s/eieqz1qag3lg76e/haroopad-v0.4.8_i386.tar.gz)
> * Linux 32-bit Debian Package:[https://www.dropbox.com/s/g4c4yp5kp42rnu3/haroopad-v0.4.8-i386.deb](https://www.dropbox.com/s/g4c4yp5kp42rnu3/haroopad-v0.4.8-i386.deb)
> * Linux 64-bit Binary: [https://www.dropbox.com/s/k020giml8xl5qm8/haroopad-v0.4.8_amd64.tar.gz](https://www.dropbox.com/s/k020giml8xl5qm8/haroopad-v0.4.8_amd64.tar.gz)
> * Linux 64-bit Debian Package: [https://www.dropbox.com/s/seyaly8n1tyl5b4/haroopad-v0.4.8_amd64.deb](https://www.dropbox.com/s/seyaly8n1tyl5b4/haroopad-v0.4.8_amd64.deb)


## Haroopad v0.4.7

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
**Bugs**         |
#122             | Fixed display BundleName error on mac
#119             | Fixed file change monitoring error
#                | Fixed applicatin name error on Linux 64bit
**Enhancements** |
#116             | Package enhance on mac
#                | Change Documentation path into package

##### Github Issue tracker

* [https://github.com/rhiokim/haroopad/issues?milestone=21&page=1&state=closed](https://github.com/rhiokim/haroopad/issues?milestone=16&page=1&state=closed)

##### Download
> * Windows NSIS installer:[https://www.dropbox.com/s/3w33sjiy02jgi6v/haroopad-v0.4.7-i386.msi](https://www.dropbox.com/s/3w33sjiy02jgi6v/haroopad-v0.4.7-i386.msi)
> * Mac OS X DMG: [https://www.dropbox.com/s/fsdjhjpkn3wp9vr/haroopad-v0.4.7.dmg](https://www.dropbox.com/s/fsdjhjpkn3wp9vr/haroopad-v0.4.7.dmg)
> * Linux 32-bit Binary:[https://www.dropbox.com/s/cr48rby6ido2c4m/haroopad-v0.4.7_i386.tar.gz](https://www.dropbox.com/s/cr48rby6ido2c4m/haroopad-v0.4.7_i386.tar.gz)
> * Linux 32-bit Debian Package:[https://www.dropbox.com/s/k3gyfrevjr6lkgq/haroopad-v0.4.7-i386.deb](https://www.dropbox.com/s/k3gyfrevjr6lkgq/haroopad-v0.4.7-i386.deb)
> * Linux 64-bit Binary: [https://www.dropbox.com/s/00ml48vr205wco7/haroopad-v0.4.7_amd64.tar.gz](https://www.dropbox.com/s/00ml48vr205wco7/haroopad-v0.4.7_amd64.tar.gz)
> * Linux 64-bit Debian Package: [https://www.dropbox.com/s/wjh8kajme4qsvin/haroopad-v0.4.7_amd64.deb](https://www.dropbox.com/s/wjh8kajme4qsvin/haroopad-v0.4.7_amd64.deb)

## Haroopad v0.4.6

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#118             | Add twitter link at help menu
#115             | Embed help documents 
#114             | Add version information at About tab in preference dialog
#113             | Add haroopad update notification
**Bugs**         |
**Enhancements** |
#116             | Fixed line number area redraw UI when window resize
#110             | Remove text, txt registry (window)

##### Github Issue tracker

* [https://github.com/rhiokim/haroopad/issues?milestone=16&page=1&state=closed](https://github.com/rhiokim/haroopad/issues?milestone=16&page=1&state=closed)

##### Download
> * Windows NSIS installer:[https://www.dropbox.com/s/519t4mw956bpm09/haroopad-v0.4.6-i386.msi](https://www.dropbox.com/s/519t4mw956bpm09/haroopad-v0.4.6-i386.msi)
> * Mac OS X DMG: [https://www.dropbox.com/s/8mckh2mk9c8jig8/haroopad-v0.4.6.dmg](https://www.dropbox.com/s/8mckh2mk9c8jig8/haroopad-v0.4.6.dmg)
> * Linux 32-bit Binary:[https://www.dropbox.com/s/po2abm69zlwx6j6/haroopad-v0.4.6_i386.tar.gz)
> * Linux 32-bit Debian Package:[https://www.dropbox.com/s/kml9e6kifvg5xt5/haroopad-v0.4.6-i386.deb](https://www.dropbox.com/s/kml9e6kifvg5xt5/haroopad-v0.4.6-i386.deb)
> * Linux 64-bit Binary: [https://www.dropbox.com/s/l2ogw9y89x9wrw6/haroopad-v0.4.6_amd64.tar.gz](https://www.dropbox.com/s/l2ogw9y89x9wrw6/haroopad-v0.4.6_amd64.tar.gz)
> * Linux 64-bit Debian Package: [https://www.dropbox.com/s/9qo76wzp4uneysj/haroopad-v0.4.6_amd64.deb](https://www.dropbox.com/s/9qo76wzp4uneysj/haroopad-v0.4.6_amd64.deb)


## Haroopad v0.4.5

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#27              | Add action menus for markdown
#100             | Registering the File Types Your App Supports [Mac] 
**Bugs**         |
#109             | Fixed new window focus error 
#107             | Fixed pre>code conflict inline pre tag
#105             | When close, confirm dialog! 
#104             | Disable code block auto html escape 
**Enhancements** |
#99              | Ubuntu package information 
#51              | Opened file monitoring

##### Github Issue tracker

* [https://github.com/rhiokim/haroopad/issues?milestone=15&page=1&state=closed](https://github.com/rhiokim/haroopad/issues?milestone=15&page=1&state=closed)

<!--
##### Download
> * Windows NSIS installer:[https://www.dropbox.com/s/htt1d23vwbg2jkm/haroopad-win32-v0.4.5.exe](https://www.dropbox.com/s/htt1d23vwbg2jkm/haroopad-win32-v0.4.5.exe)
> * Mac OS X DMG: [https://www.dropbox.com/s/0zq8lblf5bn8dpo/haroopad-v0.4.5.dmg](https://www.dropbox.com/s/0zq8lblf5bn8dpo/haroopad-v0.4.5.dmg)
> * Linux 32-bit Binary:[https://www.dropbox.com/s/51ehqczuvcla8fc/haroopad-v0.4.5_i386.tar.gz](https://www.dropbox.com/s/51ehqczuvcla8fc/haroopad-v0.4.5_i386.tar.gz)
> * Linux 32-bit Debian Package:[https://www.dropbox.com/s/997h0nbzth6zdrm/haroopad-v0.4.5-i386.deb](https://www.dropbox.com/s/997h0nbzth6zdrm/haroopad-v0.4.5-i386.deb)
> * Linux 64-bit Binary: [https://www.dropbox.com/s/zghlhy909clmgtx/haroopad-v0.4.5_amd64.tar.gz](https://www.dropbox.com/s/zghlhy909clmgtx/haroopad-v0.4.5_amd64.tar.gz)
> * Linux 64-bit Debian Package: [https://www.dropbox.com/s/gsaagmjxnreyxwf/haroopad-v0.4.5_amd64.deb](https://www.dropbox.com/s/gsaagmjxnreyxwf/haroopad-v0.4.5_amd64.deb)
-->

## Haroopad v0.4.4

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#27              | Add Search & Replace
								 | Add bug report in Help menu
								 | Add donattion in Help Menu
**Enhancements** |
#94              | **Ehancement markdown rendering performance (x??)**
#93              | Prevent anti virus dectect
#82              | Advertisements (export html)
								 | Editing line auto position at viewer
                 | Change Help menu action (Mac Only)

##### Github Issue tracker

* [https://github.com/rhiokim/haroopad/issues?milestone=14&state=closed](https://github.com/rhiokim/haroopad/issues?milestone=14&state=closed)

##### Download
> * Windows NSIS installer:[https://www.dropbox.com/s/9nx1cnujh04hn72/haroopad-win32-v0.4.4.exe](https://www.dropbox.com/s/9nx1cnujh04hn72/haroopad-win32-v0.4.4.exe)
> * Mac OS X DMG: [https://www.dropbox.com/s/y9uh2pcgldia1na/haroopad-v0.4.4.dmg](https://www.dropbox.com/s/y9uh2pcgldia1na/haroopad-v0.4.4.dmg)
> * Linux 32-bit Binary:[https://www.dropbox.com/s/9i5wcml8ilzn095/haroopad-v0.4.4-i386.tar.gz](https://www.dropbox.com/s/9i5wcml8ilzn095/haroopad-v0.4.4-i386.tar.gz)
> * Linux 32-bit Debian Package:[https://www.dropbox.com/s/ei3q0coqigbuwv8/haroopad-v0.4.4-i386.deb](https://www.dropbox.com/s/ei3q0coqigbuwv8/haroopad-v0.4.4-i386.deb)
> * Linux 64-bit Binary: [https://www.dropbox.com/s/g10kzmzc7g6ivjz/haroopad-v0.4.4-x64.tar.gz](https://www.dropbox.com/s/g10kzmzc7g6ivjz/haroopad-v0.4.4-x64.tar.gz)
> * Linux 64-bit Debian Package: [https://www.dropbox.com/s/k0t55oyh7nrpcuf/haroopad-v0.4.4-x64.deb](https://www.dropbox.com/s/k0t55oyh7nrpcuf/haroopad-v0.4.4-x64.deb)


## Haroopad v0.4.3

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#27              | Safe your writing when crash
**Bugs**         | 
#83              | Fixed vim toggling shortcut error
#61              | Block unlimited new window test
                 | Fixed export html
**Enhancements** |
#86, #70         | Enhance security
#85              | Update major modules(platform, editor)
#74              | Default save folder

##### Github Issue tracker

* [https://github.com/rhiokim/haroopad/issues?milestone=13&state=closed](https://github.com/rhiokim/haroopad/issues?milestone=13&state=closed)

##### Download
> * Windows NSIS installer:[https://www.dropbox.com/s/aox3yuue3v6uvqb/haroopad-win32-v0.4.3.exe](https://www.dropbox.com/s/aox3yuue3v6uvqb/haroopad-win32-v0.4.3.exe)
> * Mac OS X DMG: [https://www.dropbox.com/s/63jctqlh2f7czpq/haroopad-v0.4.3.dmg](https://www.dropbox.com/s/63jctqlh2f7czpq/haroopad-v0.4.3.dmg)
> * Linux 32-bit Binary:[https://www.dropbox.com/s/l70g879ir4op0vi/haroopad-v0.4.3-i386.tar.gz](https://www.dropbox.com/s/l70g879ir4op0vi/haroopad-v0.4.3-i386.tar.gz)
> * Linux 32-bit Debian Package:[https://www.dropbox.com/s/91sq33lxyrpgr7h/haroopad-v0.4.3-i386.deb](https://www.dropbox.com/s/91sq33lxyrpgr7h/haroopad-v0.4.3-i386.deb)
> * Linux 64-bit Binary:[https://www.dropbox.com/s/2ddutu86563op8t/haroopad-v0.4.3-x64.tar.gz](https://www.dropbox.com/s/2ddutu86563op8t/haroopad-v0.4.3-x64.tar.gz)
> * Linux 64-bit Debian Package:[https://www.dropbox.com/s/al771sv8idls4v0/haroopad-v0.4.3-x64.deb](https://www.dropbox.com/s/al771sv8idls4v0/haroopad-v0.4.3-x64.deb)


## Haroopad v0.4.2

Issue Number     | Description
----------------:|-----------------------------------------------
**New Features** |
#79, #69         | Add markdown preferences
#76              | Add shortcut table link at Help Menu
#54              | Support print document & export PDF
#57              | Add clear recently file list
**Bugs**         | 
#77              | Unlimit width & height size when fullscreen
**Enhancements** |
#73              | Default font-family for viewer area on window
#72              | **Critical issue**: prevent node.js memory leak detaction

<!--
##### Download
> * Windows NSIS installer:[https://www.dropbox.com/s/3ix0t59hh6acwau/haroopad-win32-v0.3.1.exe](https://www.dropbox.com/s/3ix0t59hh6acwau/haroopad-win32-v0.3.1.exe)
> * Mac OS X DMG: [https://www.dropbox.com/s/ht4ldva42u5ukj6/haroopad-v0.3.1.dmg](https://www.dropbox.com/s/ht4ldva42u5ukj6/haroopad-v0.3.1.dmg)
> * Linux 32-bit Binary:[https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb](https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb)
> * Linux 64-bit Binary:[https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb](https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb)
> * Linux 32-bit Debian Package:[https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb](https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb)
> * Linux 64-bit Debian Package:[https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb](https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb)
-->

## Haroopad v0.4.0

> We did not release v0.4.0 because some critical issues.

New Features     | Description
----------------:|-----------------------------------------------
**Bugs**         | 
#42, 55          | Disabled auto hr tag in editor
#49              | Recent file open error
#32              | CMD + ` shortcut on mac
**Enhancements** |
#59              | Error editor/viewer theme
#58              | Disable responsive dialog
#56              | **Critical issue**: separate node-webkit native function / editor function
                 | Preference UX enhancements

## Haroopad v0.3.2

New Features    | Description
---------------:|-----------------------------------------------
#36             | 'Save AS'
**Bugs**        | 
#50             | cursor position shake at last line
#44             | preview Link target, fixed shift+click link error
[#41][41]       | Reopening a file does not refresh the file 
#31             | image path error at changing theme time
#22             | modified status error when opening file
**Enhancements**|
#48             | add preference menu 'File' > 'Preferences'
#37             | add '.md' extension automation when saving file 

## Haroopad v0.3.1

##### New Features
##### Bug fixes

* error context menu position #15

##### Enhancements

* enhance markdown css for viewer area #21


[https://github.com/rhiokim/haroopad/issues?milestone=2&page=1&state=closed](https://github.com/rhiokim/haroopad/issues?milestone=2&page=1&state=closed)

##### Download
* Windows NSIS installer:[https://www.dropbox.com/s/3ix0t59hh6acwau/haroopad-win32-v0.3.1.exe](https://www.dropbox.com/s/3ix0t59hh6acwau/haroopad-win32-v0.3.1.exe)
* Mac OS X DMG: [https://www.dropbox.com/s/ht4ldva42u5ukj6/haroopad-v0.3.1.dmg](https://www.dropbox.com/s/ht4ldva42u5ukj6/haroopad-v0.3.1.dmg)
* Linux 32-bit Binary:[https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb](https://www.dropbox.com/s/t7vrs09nsghoqqu/haroopad-v0.3.1.deb)

## Haroopad v0.3.0

* The first public beta
	- Basic figure for instant markdown editor
	- Support GFM
	- Support Window, Mac OS X, Linux
	- Custom Themes for editor and live viewer
	- Export to only HTML

* Site
	- Open Official site : http://pad.haroopress.com
  
[41]: https://github.com/rhiokim/haroopad/issues/41
