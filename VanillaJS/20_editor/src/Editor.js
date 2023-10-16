export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  let isInit = true;
  this.render = () => {
    if (isInit) {
      $editor.innerHTML = `
      <input type="text" name="title" style="width:400px" value = "${this.state.title}" />
      <textarea name ="content" style="width:300px; height:200px">${this.state.content}</textarea>
    `;
      isInit = false;
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: e.target.value };

      this.setState(nextState);
      onEditing(nextState);
    }
  });
}
