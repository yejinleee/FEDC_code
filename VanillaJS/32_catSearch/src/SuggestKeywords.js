export default function SuggestKeywords({
  $target,
  initialState,
  onKeywordSelect,
}) {
  const $suggest = document.createElement("ul");
  $suggest.className = "Keywords";
  $target.appendChild($suggest);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    const { keywords, cursor } = this.state;
    $suggest.innerHTML = `
      <ul>
        ${keywords
          .map(
            (keyword, i) => `
        <li class="${cursor === i ? "active" : ""}">${keyword}</li>
      `
          )
          .join("")}
      </ul>
    `;
    $suggest.style.display = keywords.length > 0 ? "block" : "none";
  };
  this.render();

  $suggest.addEventListener("click", (e) => {
    const $li = e.target.closest("li");

    if ($li) {
      onKeywordSelect($li.textContent);
    }
  });

  window.addEventListener("keydown", (e) => {
    if ($suggest.style.display !== "none") {
      const { key } = e;
      if (key === "ArrowUp") {
        // 방향키 아래
        const nextCursor = this.state.cursor - 1;
        this.setState({
          ...this.state,
          cursor: nextCursor < 0 ? this.state.keywords.length - 1 : nextCursor,
        });
      } else if (key === "ArrowDown") {
        // 방향키 위
        const nextCursor = this.state.cursor + 1;
        this.setState({
          ...this.state,
          cursor: nextCursor > this.state.keywords.length - 1 ? 0 : nextCursor,
        });
      } else if (key === "Enter") {
        // 엔터
        if (this.state.cursor > -1) {
          onKeywordSelect(this.state.keywords[this.state.cursor]);
        }
      }
    }
  });
}
