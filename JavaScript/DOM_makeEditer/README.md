## DOM 조작 실습 - 간단한 에디터 만들어보기

### 구현한 것

`index.html`, `index.css` : 입력을 받을 영역과 입력 텍스트의 스타일을 변경할 툴바

`index.js` : 클릭된 툴바 버튼의 속성에 따라 execCommand()를 이용하여 스타일을 적용한다.

### 배운 것

> `<div contenteditable="true"></div>`

contnenteditable 속성에 true값을 주면 해당 요소 영역에서 편집이 가능하다!!
input 태그와 비슷한데 input 태그 속성은 이용할수 없다! 하지만, 편집 영역 안의 텍스트에 html 태그가 먹힌다!

> 코드 전체를 즉시 실행함수로 감싸는 이유
>
> 변수나 함수들이 window 객체 내에 사용되어 전역으로 사용된다. 따라서 전역 컨텍스트를 오염시키지 않기 위해 즉시 실행 함수를 사용하는게 좋다!

> [MDN - Document.execCommand()](https://developer.mozilla.org/ko/docs/Web/API/Document/execCommand)

명령어를 통해 편집 가능한 영역을 변경시킬 수 있다.

(사용이 권장되지 않는 함수가 되었지만 일부 브라우저 제외 이용할 수는 있다.)

> 함수화

각각의 툴바 버튼마다 이를 찾는 querySelector를 추가하는 번거로움을 없애기 위해 태그에 data-command 속성을 추가하여 함수처럼 사용할 수 있다.

### 실행화면

![실행화면](https://github.com/yejinleee/FEDC_code/assets/81412212/ed39d969-8755-4eba-82f6-ce47a3b17422)
