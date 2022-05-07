function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  
  function lowestCommonAncestor(root, p, q) {
    // root is null 
    if (root === null) {
      return null;
    }
  
    //root is one of the target nodes 
    if (root === p || root === q) {
      return root;
    }
  
    // recursively search the left sub-tree 
    const left = lowestCommonAncestor(root.left, p, q);
  
    // recursively search the right sub-tree 
    const right = lowestCommonAncestor(root.right, p, q);
  
    // if both left and right are valid, root is the ancestor 
    if (left !== null && right !== null) {
      return root;
    }
    //otherwise, if one node was legit and not the other,return whichever node was legit
    
    else if (left !== null || right !== null) {
      return left || right;
    }

    // if neither left nor right were legit, return null 
    else if (left === null && right === null) {
      return null;
    }
  }
  
  
   
  function lowestCommonAncestorShorthand(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    return left && right ? root : left || right;
  }
  
  module.exports = { TreeNode, lowestCommonAncestor };