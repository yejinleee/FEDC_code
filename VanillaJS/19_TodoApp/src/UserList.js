export default function UserList({ $target, initialState, onSelect }) {
  const $userList = document.createElement("div");
  $target.appendChild($userList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $userList.innerHTML = `
      <h1>Users</h1>
      <ul>
        ${this.state
          .map((username) => `<li data-username="${username}">${username}</li>`)
          .join("")}
        <li>
          <form>
            <input class="new-user" type = "text" placeholder="add username">
          </form>
        </li>
      </ul>
    `;
  };

  this.render();

  $userList.addEventListener("click", (e) => {
    const $li = e.target.closest("li[data-username]");
    if ($li) {
      const { username } = $li.dataset;

      onSelect(username);
    }
  });

  // 새로운 유저입력 input 창 또한 이벤트 델리게이션을 이용해서 걸수 있다.
  $userList.addEventListener("submit", (e) => {
    const $newUser = $userList.querySelector(".new-user");
    const newUserValue = $newUser.value;

    if (newUserValue.length > 0) {
      onSelect($newUser.value); // 기존 목록중 선택한거 뿐만아니라 새로운 유저 추가시에도 그 유저의 투두 목록 보여줘야하니까
      $newUser.value = "";
    }
  });
}
