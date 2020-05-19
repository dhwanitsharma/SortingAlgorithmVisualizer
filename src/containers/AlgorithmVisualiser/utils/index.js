export const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const swap = async (arr, a, b) => {
  await sleep(25);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

export const partition = async (arr, states, start, end) => {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }

  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i !== pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
};

