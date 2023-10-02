class Node {
  constructor(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}
class BinarySearchTree {
  constructor(node) {
    this.root = node;
  }

  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let currentNode = this.root;
    while (true) {
      if (value === currentNode.value) {
        return console.log("중복된 값입니다");
      }
      if (value < currentNode.value) {
        if (currentNode.leftNode) {
          currentNode = currentNode.leftNode;
        } else {
          currentNode.leftNode = newNode;
          return;
        }
      }
      if (value > currentNode.value) {
        // value > currentNode.value
        if (currentNode.rightNode) {
          currentNode = currentNode.rightNode;
        } else {
          currentNode.rightNode = newNode;
          return;
        }
      }
    }
  }
  // 전위순회 : 루트->left->right
  preorderTree(node) {
    let result = [];
    function traversal(currentNode) {
      result.push(currentNode.value);
      if (currentNode.leftNode) {
        traversal(currentNode.leftNode);
      }
      if (currentNode.rightNode) {
        traversal(currentNode.rightNode);
      }
    }
    traversal(node);
    console.log(result);
  }

  // 중위순회 : left->루트->right
  inorderTree(node) {
    let result = [];
    function traversal(currentNode) {
      if (currentNode.leftNode) {
        traversal(currentNode.leftNode);
      }
      result.push(currentNode.value);
      if (currentNode.rightNode) {
        traversal(currentNode.rightNode);
      }
    }
    traversal(node);
    console.log(result);
  }

  // 후위순위 : left->right->루트
  postorderTree(node) {
    let result = [];
    function traversal(currentNode) {
      if (currentNode.leftNode) {
        traversal(currentNode.leftNode);
      }
      if (currentNode.rightNode) {
        traversal(currentNode.rightNode);
      }
      result.push(currentNode.value);
    }
    traversal(node);
    console.log(result);
  }
}

const tree = new BinarySearchTree(new Node(7));
tree.insert(3);
tree.insert(8);
tree.insert(1);
tree.insert(5);
tree.insert(10);

console.log("전위순회");
tree.preorderTree(tree.root);
console.log("중위순회");
tree.inorderTree(tree.root);
console.log("후위순회");
tree.postorderTree(tree.root);

// 전위순회
// [ 7, 3, 1, 5, 8, 10 ]
// 중위순회
// [ 1, 3, 5, 7, 8, 10 ]
// 후위순회
// [ 1, 5, 3, 10, 8, 7 ]

//         9
//     3       8
// 2      5        7
//          4
