// 트리 구조이니까 그래프처럼 트라이를 이루는 노드 필요
class Node {
  constructor(value = "") {
    this.value = value;
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  // 입력 문자열의 한글자씩 순회하며 삽입
  // 다음 글자를 children으로 가지고 있지 않으면 { 다음 글자 => Node }로 저장합니다.
  //    이때, Node의 value에는 currentNode.value + char, 즉 다음글자까지 누적의 문자열이 들어갑니다. (각 노드까지의 문자열을 알 수 있다. )
  insert(string) {
    let currentNode = this.root;
    for (const char of string) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new Node(currentNode.value + char));
      }
      currentNode = currentNode.children.get(char); // 다음노드로 이동
    }
  }

  // 문자열이 존재하는지 체크
  // 문자열 한글자씩 순회하면서 다음 노드에 해당 글자가 있다면 그 노드로 이동합니다.
  // 순회 중 다음 노드에 글자가 이어져있지 않으면 False, 종료없이 순회를 모두 마쳤다면 True
  have(string) {
    let currentNode = this.root;
    for (const char of string) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char);
    }
    return true;
  }
}

const trie = new Trie();
trie.insert("cat");
trie.insert("can");
console.log(trie.have("cat")); //true
console.log(trie.have("can")); //true
console.log(trie.have("cap")); //false
