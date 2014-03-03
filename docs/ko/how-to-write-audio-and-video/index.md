## How to write Audio & Video

우리는 문서 작성 시 이미지뿐아니라 오디오와 비디오를 첨부하기도 합니다. 하지만 마크다운에서는 오디오와 비디오를 추가할 수 있는 문법이 정의되어 있지 않습니다.

하루패드에서는 v0.11.1 버젼부터 마크다운 문법의 이미지 문법으로 알려진 `![]()` 을 확장하였습니다.

사용법은 기존 이미지 문법과 동일하게 사용하면되며 확장자에 맞춰 동작합니다.

### Audio

예를 들어 오디오의 경우 `mp3` 와 `ogg` 를 지원합니다.

```markdown
![audio](http://v2v.cc/~j/theora_testsuite/320x240.ogg)
```

**결과**

![audio](http://v2v.cc/~j/theora_testsuite/320x240.ogg)

지원 확장자와 MIME 형식은 다음과 같습니다.

| Extension  | MIME       |
|------------|------------|
| mp3        | audio/mpeg |
| ogg        | audio/ogg  |

### Video

비디오의 경우 `mp4`, `ogv` 와 `webm` 을 지원합니다.

```markdown
![video](http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm)
```

**결과**

![video](http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm)

지원 확장자와 MIME 형식은 다음과 같습니다.

| Extension  | MIME       |
|------------|------------|
| mp4        | video/mpeg |
| ogv        | video/ogg  |
| webm       | video/webm |