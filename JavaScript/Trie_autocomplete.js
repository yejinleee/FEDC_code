class Node {
  constructor(value = "") {
    this.value = value;
    this.end = false; // 마지막 리프 노드인지 여부
    this.children = new Map();
  }
}
class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(string) {
    let currentNode = this.root;
    for (const char of string) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new Node(currentNode.value + char));
      }
      currentNode = currentNode.children.get(char);
    }
    currentNode.end = true;
  }

  // 문자열이 존재하는지 체크
  exists(string) {
    let currentNode = this.root;
    for (const char of string) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char);
    }
    return currentNode;
  }

  // 문자열을 자동완성 가능한지 체크
  autocompleteDFS(string) {
    string = string.replace(" ", ""); // 첫글자 공백시 무시 처리
    if (!string) {
      // 빈 입력 예외처리
      return "검색어를 입력하세요";
    }
    let currentNode = this.root;
    let madeword = [];
    currentNode = this.exists(string);
    if (currentNode) {
      madeword.push(string);
    } else {
      return `입력한 문자열: ${string} || 자동완성 가능한 단어 없음`;
    }

    let result = [];
    let stack = [];
    for (const n of currentNode.children) {
      stack.push(n);
    }
    while (stack.length > 0) {
      let next = stack.pop();
      if (next[1].end) {
        // 단어 단위로 출력하자.
        result.push(next[1].value);
      }

      for (const n of next[1].children) {
        stack.push(n);
      }
    }
    return `입력한 문자열: ${string} || 자동완성 가능한 단어 ${result.join(
      ", "
    )}`;
  }
  autocompleteBFS(string) {
    string = string.replace(" ", "");
    if (!string) {
      return "검색어를 입력하세요";
    }
    let currentNode = this.root;
    let madeword = [];
    currentNode = this.exists(string);
    if (currentNode) {
      madeword.push(string);
    } else {
      return `입력한 문자열: ${string} || 자동완성 가능한 단어 없음`;
    }

    let result = [];
    let queue = [currentNode];
    // let visited = new Set(); // 방문처리가 필요하지 않다.
    while (queue.length > 0) {
      let q = queue.shift();
      for (const next of q.children) {
        queue.push(next[1]);
        if (next[1].end) {
          result.push(next[1].value);
        }
      }
    }
    return `입력한 문자열: ${string} || 자동완성 가능한 단어 ${result.join(
      ", "
    )}`;
  }
}

const trie = new Trie();

trie.insert("programmers");
trie.insert("program");
trie.insert("pro");
trie.insert("proto");
trie.insert("pro gram");
trie.insert("prgrm");
trie.insert("p");
trie.insert("dev");
trie.insert("dev course");

console.log(trie.autocompleteDFS("pro"));
console.log(trie.autocompleteDFS("d"));
console.log(trie.autocompleteDFS("dd"));
console.log(trie.autocompleteDFS(" "));
console.log("----------------------------");
console.log(trie.autocompleteBFS("pro"));
console.log(trie.autocompleteBFS("d"));
console.log(trie.autocompleteBFS("doremi"));
console.log(trie.autocompleteBFS(""));
