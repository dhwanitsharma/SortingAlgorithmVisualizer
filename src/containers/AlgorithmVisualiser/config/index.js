import { swap, partition, sleep } from "../utils";

export const ALGORITHMS = {
  BUBBLE_SORT: "BUBBLE_SORT",
  QUICK_SORT: "QUICK_SORT",
  COCKTAIL_SORT: "COCKTAIL_SORT",
  INSERTION_SORT: "INSERTION_SORT",
  SHELL_SORT: "SHELL_SORT",
  SELECTION_SORT: "SELECTION_SORT",
  GNOME_SORT: "GNOME_SORT",
};

export const ALGORITHMS_CONFIG = {
  [ALGORITHMS.BUBBLE_SORT]: {
    NAME: "Bubble Sort",
    COMPLEXITY: "The complexity of this algorithm is On^2. Bubble sort will start by comparing the first element of the array with the second element, if the first element is greater than the second element, it will swap both the elements, and then move on to compare the second and the third element, and so on.",
    USE_ARRAY_FOR_DRAW: false,
    LOGIC: async (values, states) => {
      for (let i = 0; i < values.length - 1; i++) {
        for (let j = 0; j < values.length - i - 1; j++) {
          let a = values[j];
          let b = values[j + 1];
          states[j + 1] = 0;
          if (a > b) {
            await swap(values, j, j + 1);
          }
          states[j] = -1;
        }
      }
    },
    W: 10
  },
  [ALGORITHMS.QUICK_SORT]: {
    NAME: "Quick Sort",
    COMPLEXITY: "On average quick sort runs in O(n log n). This algorithm is using Lamuto Partition Scheme for selecting the pivot",
    USE_ARRAY_FOR_DRAW: false,
    LOGIC: async (arr, states, start = 0, end = arr.length - 1) => {
      if (start >= end) {
        return;
      }

      let i = await partition(arr, states, start, end);

      states[i] = -1;
      await Promise.all([
        ALGORITHMS_CONFIG[ALGORITHMS.QUICK_SORT].LOGIC(arr, states, start, i - 1),
        ALGORITHMS_CONFIG[ALGORITHMS.QUICK_SORT].LOGIC(arr, states, i + 1, end)
      ]);
    },
    W: 5
  },
  [ALGORITHMS.COCKTAIL_SORT]: {
    NAME: "Cocktail Sort",
    COMPLEXITY: "The average time complexity of Cocktail Sort is O(n^2). Cocktail Sort is a variation of Bubble sort. The Bubble sort algorithm always traverses elements from left and moves the largest element to its correct position in first iteration and second largest in second iteration and so on. Cocktail Sort traverses through a given array in both directions alternatively.",
    USE_ARRAY_FOR_DRAW: false,
    LOGIC: async (values, states) => {
      var temp = 0;
      var is_swapped = 1;
      var begin = 0;
      var end = values.length - 1;
      var i;
      while (is_swapped) {
        is_swapped = 0;
        for (i = begin; i < end; ++i) {
          if (values[i] > values[i + 1]) {
            states[i] = 0;
            states[i + 1] = 1;
            await sleep(5);
            temp = values[i];
            values[i] = values[i + 1];
            values[i + 1] = temp;
            is_swapped = 1;
            states[i] = -1;
            states[i + 1] = -1;
          }
        }
        if (!is_swapped)
          break;
        is_swapped = 0;
        for (i = end - 1; i >= begin; --i) {
          if (values[i] > values[i + 1]) {
            states[i] = 0;
            states[i + 1] = 1;
            await sleep(5);
            temp = values[i];
            values[i] = values[i + 1];
            values[i + 1] = temp;
            is_swapped = 1;
            states[i] = -1;
            states[i + 1] = -1;
          }
        }
        begin = begin + 1;
      }
    },
    W: 5
  },
  [ALGORITHMS.INSERTION_SORT]: {
    NAME: "Insertion Sort",
    COMPLEXITY: "The complexity of this algorithm is O(n^2).Insertion sort is a sorting algorithm that places an unsorted element at its suitable place in each iteration.",
    USE_ARRAY_FOR_DRAW: false,
    LOGIC: async (values, states) => {
      for (var i = 0; i < values.length; i++) {
        let value = values[i]
        // store the current item value so it can be placed right
        states[i + 1] = 0;
        for (var j = i - 1; j > -1 && values[j] > value; j--) {
          // loop through the items in the sorted array (the items from the current to the beginning)
          // copy each item to the next one
          values[j + 1] = values[j]
          states[j + 1] = 1;
        }
        await sleep(100);
        // the last item we've reached should now hold the value of the currently sorted item
        values[j + 1] = value;
        states[j + 1] = 0;
      }
    },
    W: 5
  },
  [ALGORITHMS.SHELL_SORT]: {
    NAME: "Shell Sort",
    COMPLEXITY: "The average time complexity of this algorithm is O(n log n) and worst case is (O n^2). In shell sort, elements at a specific interval are sorted. The interval between the elements is gradually decreased based on the sequence used.",
    USE_ARRAY_FOR_DRAW: false,
    LOGIC: async (values, states) => {
      var i = 0;
      var increment = values.length / 2;
      while (increment > 0) {
        for (i = increment; i < values.length; i++) {
          var j = i;
          var temp = values[i];
          states[i] = 1;

          while (j >= increment && values[j - increment] > temp) {
            states[j - increment] = 0;
            values[j] = values[j - increment];
            j = j - increment;
            await sleep(50);
          }
          for (let i = 0; i < states.length; i++) {
            if (states[i] === 0)
              states[i] = -1;
          }
          states[i] = -1;
          values[j] = temp;

        }
        if (increment === 2) {
          increment = 1;
        } else {
          increment = parseInt(increment * 5 / 11);
        }
      }
      for (let i = 0; i < states.length; i++) {
        states[i] = -1;
      }
    },
    W: 5
  },
  [ALGORITHMS.SELECTION_SORT]: {
    NAME: "Selection Sort",
    COMPLEXITY: "The complexity of this algorithm is O(n^2).The selection sort algorithm sorts an array by repeatedly finding the minimum element from unsorted part and putting it at the beginning",
    USE_ARRAY_FOR_DRAW: false,
    LOGIC: async (values, states) => {
      var i=0; var j=0;
      var len = values.length,min;
      for (i = 0; i < len; i++) {
        //set minimum to this position
        min = i;
        //check the rest of the array to see if anything is smaller
        for (j = i + 1; j < len; j++) {
          if (values[j] < values[min]) {
            min = j;
          }
        }
        states[min] = 0;
        //if the minimum isn't in the position, swap it
        if (i !== min) {
          await swap(values, i, min);
        }
        states[min] = -1; 
        states[i] = 0;
      }
    },
    W: 5
  },
  [ALGORITHMS.GNOME_SORT]: {
    NAME: "Gnome Sort",
    COMPLEXITY: "The complexity of this algorithm is O(n^2).The algorithm always finds the first place where two adjacent elements are in the wrong order, and swaps them. It takes advantage of the fact that performing a swap can introduce a new out-of-order adjacent pair only next to the two swapped elements.",
    USE_ARRAY_FOR_DRAW: true,
    LOGIC: async (values, states) => {
      debugger;
      var position = 1;
      window.valueArrays = [];
  
      if ( values ) {
        window.valueArrays = values.map(function(item) { return item; });
      }
      
      while ( position < values.length ) {
        if ( window.valueArrays[position] >= window.valueArrays[position - 1] ) {
          position++;
        }
        else {
          await swap(window.valueArrays, position, position - 1);
          states[position] = 1;
          if ( position > 1 ) {
            position--;
          }    
        }
        states[position] = -1;
      }
      for(let i = 0;i<values.length;i++){
        states[i]=-1;
      }
      
      return window.valueArrays;
    },
    W: 5
  },
};
