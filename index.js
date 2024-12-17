class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(this.processArray(array));
  }

  processArray(input) {
    if (!Array.isArray(input)) {
      return null;
    }

    if (input.length === 0) {
      return null;
    }

    input.sort((a, b) => a - b);
    let mySet = new Set(input);
    return Array.from(mySet);
  }

  buildTree(array) {
    if (!array || array.length === 0) {
      return null;
    }
    let middleIndex = Math.floor(array.length / 2);
    let currentNode = new Node(array[middleIndex]);

    currentNode.left = this.buildTree(array.slice(0, middleIndex));
    currentNode.right = this.buildTree(array.slice(middleIndex + 1));

    return currentNode;
  }

  insert(value) {
    let current = this.root;
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    while (current !== null) {
      if (value < current.data) {
        if (current.left === null) {
          current.left = new Node(value);
          return;
        }
        current = current.left;
      } else if (value > current.data) {
        if (current.right === null) {
          current.right = new Node(value);
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }

  deleteItem(value) {
    let current = this.root;
    let parent = null;

    if (this.root === null) {
      console.log('Tree is empty.');
      return;
    }

    while (current !== null) {
      if (value < current.data) {
        parent = current;
        current = current.left;
      } else if (value > current.data) {
        parent = current;
        current = current.right;
      } else {
        // leaf node
        if (current.left === null && current.right === null) {
          if (parent === null) {
            this.root = null;
          } else if (parent.left === current) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        }
        // node with one child
        else if (current.left === null || current.right === null) {
          let child = current.left !== null ? current.left : current.right;

          if (parent === null) {
            this.root = child;
          } else if (parent.left === current) {
            parent.left = child;
          } else if (parent.right === current) {
            parent.right = child;
          }
        }
        // node with two children
        else {
          let successorParent = current;
          let successor = current.right;

          while (successor.left !== null) {
            successorParent = successor;
            successor = successor.left;
          }

          current.data = successor.data;

          if (successorParent.left === successor) {
            successorParent.left = successor.right;
          } else {
            successorParent.right = successor.right;
          }
        }
        return;
      }
    }
  }

  find(value) {
    let current = this.root;

    while (current !== null && value !== current.data) {
      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      }
    }
    return current;
  }

  levelOrder(callback) {
    if (this.root === null) {
      return null;
    }

    const queue = [this.root];

    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    while (queue.length > 0) {
      const removedNode = queue.shift();
      callback(removedNode.data);

      if (removedNode.left !== null) {
        queue.push(removedNode.left);
      }
      if (removedNode.right !== null) {
        queue.push(removedNode.right);
      }
    }
  }

  inOrder(callback) {
    if (this.root === null) {
      return;
    }

    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    function traverse(node) {
      if (node === null) {
        return;
      }
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }
    traverse(this.root);
  }

  preOrder(callback) {
    if (this.root === null) {
      return;
    }

    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    function traverse(node) {
      if (node === null) {
        return;
      }
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
  }

  postOrder(callback) {
    if (this.root === null) {
      return;
    }

    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    function traverse(node) {
      if (node === null) {
        return;
      }
      traverse(node.left);
      traverse(node.right);
      callback(node);
    }
    traverse(this.root);
  }

  height(node) {
    if (node === null) {
      return 0;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    const nodeHeight = 1 + Math.max(leftHeight, rightHeight);
    return nodeHeight;
  }

  depth(node) {
    if (node === this.root) {
      return 0;
    }

    function depthHelper(currentNode, currentDepth) {
      if (currentNode === null) {
        return -1;
      }
      if (currentNode === node) {
        return currentDepth;
      }
      let leftDepth = depthHelper(currentNode.left, currentDepth + 1);
      if (leftDepth !== -1) return leftDepth;

      let rightDepth = depthHelper(currentNode.right, currentDepth + 1);
      return rightDepth;
    }
    return depthHelper(this.root, 0);
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    const leftBalance = this.isBalanced(node.left);
    const rightBalance = this.isBalanced(node.right);

    return leftBalance && rightBalance;
  }

  rebalance() {
    const array = [];
    this.inOrder((node) => array.push(node.data));

    const buildBalancedTree = (array) => {
      if (array.length === 0) {
        return null;
      }
      const midIndex = Math.floor(array.length / 2);
      const rootNode = new Node(array[midIndex]);

      rootNode.left = buildBalancedTree(array.slice(0, midIndex));
      rootNode.right = buildBalancedTree(array.slice(midIndex + 1));

      return rootNode;
    };

    const balancedRoot = buildBalancedTree(array);

    this.root = balancedRoot;
  }
}

// --- RANDOM NUMBERS FUNCTION ---
function generateRandomNumbers() {
  let numbers = [];
  for (let i = 0; i < 15; i++) {
    numbers.push(Math.floor(Math.random() * 100));
  }
  return numbers;
}

/* // --- TEST CODE ---
const numbers = generateRandomNumbers();
const tree = new Tree(numbers);

// 1. Create tree from random numbers
console.log('Initial tree (in-order):');
tree.inOrder((node) => console.log(node.data));

// 2. Check if balanced
console.log('\nIs the tree balanced?');
console.log(tree.isBalanced());

// 3. Print all traversals
console.log('\nLevel Order Traversal:');
tree.levelOrder((data) => console.log(data));

console.log('\nIn Order Traversal:');
tree.inOrder((node) => console.log(node.data));

console.log('\nPre Order Traversal:');
tree.preOrder((node) => console.log(node.data));

console.log('\nPost Order Traversal:');
tree.postOrder((node) => console.log(node.data));

// 4. Unbalance the tree by adding numbers > 100
console.log('\nUnbalancing the tree:');
tree.insert(150);
tree.insert(200);
tree.insert(250);

console.log('\nIs the tree balanced after unbalancing?');
console.log(tree.isBalanced());

// 5. Rebalance the tree
console.log('\nRebalancing the tree:');
tree.rebalance();

console.log('\nIs the tree balanced now?');
console.log(tree.isBalanced());

// 6. Print all traversals again
console.log('\nTree after rebalancing (in-order):');
tree.inOrder((node) => console.log(node.data));

console.log('\nLevel Order Traversal after rebalancing:');
tree.levelOrder((data) => console.log(data));

console.log('\nPre Order Traversal after rebalancing:');
tree.preOrder((node) => console.log(node.data));