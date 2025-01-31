const Node = function (value, leftChild, rightChild) {
  return {
    value,
    leftChild,
    rightChild,
  };
};

const Tree = function (array) {
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const fix = function (array) {
    let newArray = [];
    for (let item of array) if (!newArray.includes(item)) newArray.push(item);
    return newArray;
  };

  const merge = function (arr1, arr2) {
    let output = [];
    let target;
    while (true) {
      if (arr1.length == 0 && arr2.length == 0) break;
      else if (arr1.length == 0 && arr2.length != 0) target = arr2;
      else if (arr1.length != 0 && arr2.length == 0) target = arr1;
      else {
        if (arr1[0] > arr2[0]) target = arr2;
        else target = arr1;
      }
      output.push(target[0]);
      target = target.splice(0, 1);
    }
    return output;
  };

  const sort = function (arr) {
    let output = [];
    if (arr.length == 1) {
      output.push(arr[0]);
      return output;
    } else {
      let middle = Math.floor(arr.length / 2);
      let left = arr.slice(0, middle);
      let right = arr.slice(middle);
      let sortedLeft = sort(left);
      let sortedRight = sort(right);
      output = merge(sortedLeft, sortedRight);
      return output;
    }
  };

  const treeBuilder = function (array) {
    let rootValue,
      leftChild = null,
      rightChild = null;
    if (array.length == 0) return null;
    if (array.length == 1) rootValue = array[0];
    else {
      let middle = Math.floor(array.length / 2);
      rootValue = array[middle];
      leftChild = treeBuilder(array.slice(0, middle));
      rightChild = treeBuilder(array.slice(middle + 1));
    }
    let root = Node(rootValue, leftChild, rightChild);

    return root;
  };

  const buildTree = function (array) {
    let fixedArray = fix(array);
    let sortedArray = sort(fixedArray);
    return treeBuilder(sortedArray);
  }

  let root = buildTree(array);

  const findNode = function (targetValue, current = root, lastNode = null) {
    let output = null;
    if (current != null) {
      if (current.value == targetValue) return { output: current, lastNode };
      else if (current.value > targetValue)
        return findNode(targetValue, current.leftChild, current);
      else if (current.value < targetValue)
        return findNode(targetValue, current.rightChild, current);
    }
    return { output, lastNode };
  };

  const find = function (targetValue) {
    return findNode(targetValue).output;
  };

  const insert = function (newValue) {
    let search = find(newValue);
    if (search == null) {
      let last = findNode(newValue).lastNode;
      if (last.value > newValue) last.leftChild = Node(newValue, null, null);
      else last.rightChild = Node(newValue, null, null);
    }
  };

  const deleteItem = function (targetValue) {
    let {output, lastNode} = findNode(targetValue);
    let node = output, parent = lastNode;
    let nodeSide = parent.leftChild.value == targetValue ? 'leftChild' : 'rightChild' ;
    if (node != null) {
      let left = node.leftChild;
      let right = node.rightChild;
      if (left == null && right == null) node = null;
      else if (left == null && right != null) node = right;
      else if (left != null && right == null) node = left;
      else {
        let last = node;
        let newNode = node.rightChild;
        while (newNode.leftChild != null){
          last = newNode;
          newNode = newNode.leftChild;
        }
        node.value = newNode.value;
        last.leftChild = null;
      }
      parent[nodeSide] = node;
    }
  }

  return {root, prettyPrint, find, insert, deleteItem};
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let test = Tree(array);

test.insert(57);
test.prettyPrint(test.root);
test.deleteItem(3);
test.prettyPrint(test.root);
