const Node = function (value, leftChild, rightChild) {
  return {
    value,
    leftChild,
    rightChild,
  };
};

const Tree = function (array) {
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

  const buildTree = function (array) {
    let rootValue, leftChild = null, rightChild = null;
    if (array.length == 0) return null;
    if (array.length == 1) rootValue = array[0];
    else {
      let middle = Math.floor(array.length / 2);
      rootValue = array[middle];
      leftChild = buildTree(array.slice(0, middle));
      rightChild = buildTree(array.slice(middle + 1));
    }
    let root = Node(rootValue, leftChild, rightChild);

    return root;
  };

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  console.log('Fixing the data...');
  let fixedArray = fix(array);
  console.log(fixedArray);
  console.log('Sorting the data...');
  let sortedArray = sort(fixedArray);
  console.log(sortedArray);
  console.log('Building the binary tree...');
  let root = buildTree(sortedArray);
  prettyPrint(root);

  return {};
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log('Received\n', array);
let test = Tree(array);
