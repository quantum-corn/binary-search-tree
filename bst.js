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

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  let fixedArray = fix(array);
  let sortedArray = sort(fixedArray);

  return { root, prettyPrint };
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];