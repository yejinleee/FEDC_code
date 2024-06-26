export default function Nodes({ $target, initialState, onClick, onPrevClick }) {
  const $nodes = document.createElement("div");
  $nodes.classList.add("nodes");
  $target.appendChild($nodes);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isRoot, nodes } = this.state;
    $nodes.innerHTML = `
      ${
        isRoot
          ? ""
          : `
      <div class="Node">
        <img src="http://cdn.roto.codes/images/prev.png">
      </div>
      `
      }
      ${nodes
        .map(
          (node) => `
          <div class="Node" data-id="${node.id}">
            <img src="${
              node.type === "DIRECTORY"
                ? "https://cdn.roto.codes/images/directory.png"
                : "https://cdn.roto.codes/images/file.png"
            }">
            ${node.name}
          </div>
        `
        )
        .join("")}
    `;
  };
  this.render();

  $nodes.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");
    const { id } = $node.dataset;
    if (!id) {
      onPrevClick();
      //id가 없는 경우 === 뒤로가기 ㅋ ㅡㄹ릭
    } else {
      const node = this.state.nodes.find((node) => node.id === id);
      if (node) {
        onClick(node);
      } else {
        //방어
        alert("올바르지 않은 Node입니다.");
      }
    }
  });
}
