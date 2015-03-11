# How to manage my task list using by Haroopad

우리는 일상에 많은 할일들이 있습니다. 특히나 하루패드를 이용하거나 마크다운을 이용하는 사람이라면 자신만의 효율적인 할일 관리 기법을 가지고 있으리라 생각합니다.

노트앱을 이용하거나 스마트폰에 앱을 이용하거나 아날로그 방식으로 수첩에 기록해 관리하기도 할꺼구요.

이번 기능은 깃허브 마크다운 문법에서 기본적으로 제공하는 타스크 리스트 구문을 소개합니다.

## How to write tasklist?

우리는 일반적으로 할일을 작성할 때 해야할 일을 나열하고 처리한 일에는 별도의 체크 표시를 합니다.

```markdown
- [x] send email
- [ ] meet with my boss
- [ ] date with my girl friend
- [ ] write techical reporting about javascript
```

하루패드에서도 이와 유사한 방식으로 리스트를 나타내는 `-`, `*` 와 체크박스를 연상하게 하는 `[ ]` 를 더해 `- [ ]` 의 구문을 통해 할일을 나열할 수 있습니다.

**결과**

- [x] send email
- [ ] meet with my boss
- [ ] date with my girl friend
- [ ] write techical reporting about javascript

이렇게 나열된 할일 목록은 프리뷰 영역에서는 체크박스로 표시됩니다.

처리한 목록은 위의 예시처럼 `[x]` 처럼 x로 처리 표시를 하면 프리뷰 영역에서는 체크된 상태로 표시됩니다.

### Badge

문서내에 타스크 리스트가 있는 경우에는 애플리케이션 독 아이콘에 뱃지로 완료되지 않은 타스크 개수를 다음의 이미지와 같이 표시합니다. *이 기능은 v0.13.1 에서 추가된 기능입니다.*

![tasklist.png](images/tasklist-badge.png "" "height:100px")

이 기능은 마크다운 문서로 할일을 관리할 때 유용한 기능입니다.



## Haroopad Thinking

사실 이 기능은 할일관리에 초첨이 맞춰져 있는게 아닙니다. 할일 관리에 초첨이 맞춰진 수 많은 앱들이 있는데 실상 마크다운 문서로 할일을 전문적으로 관리한다는 것은 상황에 따라 비효율적일 수 있습니다.

위에서는 할일 관리 기능이라고 소개를 했지만 하루패드는 마크다운 문서 도구이고 그런 관점에 비춰보면 문서 작성의 상태를 표시하는데 더 큰 목적을 둡니다. 