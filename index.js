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
      parent = current;

      if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      } else {
        // leaf node
        if (current.left === null && current.right === null) {
          if (parent === null) {
            this.root = null;
          } else if (parent.left === current) {
            parent.left = null;
          } else if (parent.right === current) {
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
      return -1;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
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
}

// Test cases
const tree = new Tree([10, 5, 15, 3, 7, 12, 18]);

console.log(tree.depth(tree.root)); // 0
const node7 = tree.find(7);
console.log(tree.depth(node7)); // 2
const node3 = tree.find(3);
console.log(tree.depth(node3)); // 2 (balanced tree)
const node20 = tree.find(20);
console.log(tree.depth(node20)); // -1
