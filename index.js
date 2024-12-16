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

  levelOrder(callback) {
    if (this.root === null) {
      return null;
    }

    let queue = [];

    let current = this.root;
    queue.push(current);

    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    while (queue.length > 0) {
      let removedNode = queue.shift();
      callback(removedNode);

      if (removedNode.left !== null) {
        queue.push(removedNode.left);
      }
      if (removedNode.right !== null) {
        queue.push(removedNode.right);
      }
    }
  }
}

const myTree = new Tree();

myTree.insert(10); // Root node
myTree.insert(7); // Goes to the left of 10
myTree.insert(30); // Goes to the right of 10
myTree.insert(5); // Goes to the left of 7
myTree.insert(2); // Goes to the left of 5
myTree.insert(12); // Goes to the right of 10

console.log('Testing levelOrder method:');
myTree.levelOrder((node) => {
  console.log(node.data);
});
