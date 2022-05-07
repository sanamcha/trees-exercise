/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(!this.root) return 0;

    function minDepthFind(node){
      if(node.left === null && node.right === null) return 1;
      if(node.left === null) return minDepthFind(node.right) + 1;
      if(node.right === null) return minDepthFind(node.left) + 1;
      return (
        Math.min(minDepthFind(node.left), minDepthFind(node.right)) + 1
      );
    }

    return minDepthFind(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if(!this.root) return 0;

    function maxDepthFind(node) {
      if(node.left === null && node.right === null) return 1;
      if(node.left === null) return maxDepthFind(node.right) + 1;
      if(node.right === null) return maxDepthFind(node.left) + 1;

      return(
        Math.max(maxDepthFind(node.left), maxDepthFind(node.right)) + 1
      );
    }
    return maxDepthFind(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;
    function maxSumFind(node) {
      if(node === null) return 0;
      const leftSum = maxSumFind(node.left);
      const rightSum = maxSumFind(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);

      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }
    maxSumFind(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(!this.root) return null;

    let queue = [this.root];
    let closest = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;
      let higher = currentVal > lowerBound;
      let reassignClosest = currentVal < closest || closest === null;

      if(higher && reassignClosest) {
        closest = currentVal;
      }

      if(currentNode.left) queue.push(currentNode.left);
      if(currentNode.right) queue.push(currentNode.right);
    }

    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const values = [];
  
    function traverse(node) {
      if(node){
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#");
      }
    }
    
    traverse(tree.root);
    return values.join(" ");

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if(!stringTree) return null;
    const values = stringTree.split(" ");

    function buildTree() {
      if (values.length) {
        const currentVal = values.shift();

        if(currentVal === "#")
        return null;

        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }
    
    const root = buildTree();
    return new BinaryTree(root);

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode = this.root) {
    //for empty tree
    if(currentNode === null) return null;
    //root as targeted nodes
    if(currentNode === node1 || currentNode === node2) return currentNode;

    //search left sub-tree
    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    //search right sub-tree
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    //if both left and right is not null, currentNode is ancestor
    if(left !== null && right !== null) return currentNode;

    //if one node is not null, return 
    if(left != null || right !==null) return left || right;

    //left and right are both null, return null
    if(left === null && right === null) return null;
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
