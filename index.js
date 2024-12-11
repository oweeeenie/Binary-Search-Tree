class Node {
  constructor(data) {
    this.data = data;
    this.left = null; // for smaller values
    this.right = null; // for larger values
  }
}

class Tree {
  constructor() {
    this.root = null;
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
}
