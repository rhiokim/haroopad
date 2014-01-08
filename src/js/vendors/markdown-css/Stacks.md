# markdown css projects

## why?
이 프로젝트는 마크다운 테마를 제작하기 위한 표준 스타일 가이드를 less 로 작성되었습니다.  최초 시작은 [하루패드](http://pad.haroopress.com)에 마크다운 테마를 위해 시작되었으나 별도의 환경에서도 마크다운 테마를 활용할 수 있도록 하기 위해서 별도의 프로젝트로 진행되고 있습니다.

## less or saas
처음 시작은 진입 장벽이 좀더 낮은 `less` 로 시작했지만 중간에 @fantalon, @seti222 에 의해서 `sass` 를 추천하여 좀더 살펴본 이후에 `sass` 로 전향할 예정입니다.

## structure

**Gruntfile.js**
노드에 경험이 있는 사람이라면 [Grunt.js](http://gruntjs.com) 에 대해서는 들어봤을 것이다. 

이 프로젝트에서는 less 빌드 자동화를 위해서 사용되고 있다.

```bash
$ grunt

Running "less:development" (less) task
File build/markdown.css created.
File build/clearness-dark.css created.
File build/clearness.css created.
File build/github.css created.
File build/solarized-dark.css created.
File build/solarized-light.css created.
```

사용법은 위와 같이 grunt 를 실행하면 `default` 타스크가 실행되면서 less 를 `build` 디렉토리로 빌드한다.

**themes**
테마 디렉토리로 실제 makrdown 스타일로 css 로 빌드하기 전 less 파일들이 존재한다.

**assets**
css 파일이 최종 생성되는 위치이고 데모 페이지에서 css 파일을 바라보는 위치이다.

**lib**
less 를 사용하다보면 함수형 문법을 지원하는데 이때 패키지처럼 `@import` 구문으로 로드할 수 있는 라이브러리들의 위치로 이 프로젝트에서는 `element.less` 를 사용하고 있다.

**node_modules**
굳이 설명하지 않아도 되는 디렉토리지만 이 프로젝트에서 필요한 노드 모듈들이 위치한다.


