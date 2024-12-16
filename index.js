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

    // base case: no data, nothing to delete
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
        // leaf node (no children)
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

  // finds the value in the tree. obviously.
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

  // goes top to bottom, left to right.
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

  // LEFT, ROOT, RIGHT
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

      // left subtree
      traverse(node.left);

      // calling callback on current node
      callback(node);

      // right subtree
      traverse(node.right);
    }

    // start the recursion (no need to define current = this.root)
    traverse(this.root);
  }

  // ROOT, LEFT, RIGHT
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

      // root
      callback(node);

      // left
      traverse(node.left);

      // right
      traverse(node.right);
    }

    traverse(this.root);
  }

  // LEFT, RIGHT, ROOT
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
      // left
      traverse(node.left);

      // right
      traverse(node.right);

      // root
      callback(node);
    }

    traverse(this.root);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    if (node.left === null && node.right === null) {
      return 0;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    let calculatedHeight = Math.max(leftHeight, rightHeight);
    return calculatedHeight + 1;
  }
}

const tree = new Tree([10, 7, 15, 5, 8, 18, 3]);

// Test height for various nodes
console.log('Height of root node (10):', tree.height(tree.root)); // Expected: 3
console.log('Height of node (7):', tree.height(tree.root.left)); // Expected: 2
console.log('Height of node (15):', tree.height(tree.root.right)); // Expected: 2
console.log('Height of node (3):', tree.height(tree.root.left.left.left)); // Expected: 0
console.log('Height of null node:', tree.height(null)); // Expected: -1
