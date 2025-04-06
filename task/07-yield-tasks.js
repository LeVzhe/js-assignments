'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/

/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * NOTE: Please try to complete this task faster then original song finished:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {
    const lines = [
        // Rows
        [
            [0, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ],

        // Columns
        [
            [0, 0],
            [1, 0],
            [2, 0],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 2],
            [1, 2],
            [2, 2],
        ],

        // Diagonals
        [
            [0, 0],
            [1, 1],
            [2, 2],
        ],
        [
            [0, 2],
            [1, 1],
            [2, 0],
        ],
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        const valA = position[a[0]]?.[a[1]];
        const valB = position[b[0]]?.[b[1]];
        const valC = position[c[0]]?.[c[1]];

        if (valA && valA === valB && valA === valC) {
            return valA;
        }
    }

    return undefined; // No winner
}

/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
    let a = 0,
        b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b]; // Update a and b to the next Fibonacci numbers
    }
}

/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
function* depthTraversalTree(root) {
    if (!root) return; // Проверяем, что корень существует

    yield root; // Сначала отдаем корень

    if (root.children) {
        // Если у узла есть потомки
        for (let child of root.children) {
            // Рекурсивно обходим всех потомков
            yield* depthTraversalTree(child); // Важный момент: используем yield* для рекурсии
        }
    }
}

/**
 * Traverses a tree using the breadth-first strategy
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
function* breadthTraversalTree(root) {
    if (!root) return; // Проверяем, что корень есть

    let queue = [root]; // Очередь для BFS

    while (queue.length > 0) {
        let node = queue.shift(); // Извлекаем первый элемент
        yield node; // Возвращаем узел

        if (node.children) {
            queue.push(...node.children); // Добавляем всех потомков в очередь
        }
    }
}
function* breadthTraversalTree(root) {
    if (!root) return; // Проверяем, что корень есть

    let queue = [root]; // Очередь для BFS

    while (queue.length > 0) {
        let node = queue.shift(); // Извлекаем первый элемент
        yield node; // Возвращаем узел

        if (node.children) {
            queue.push(...node.children); // Добавляем всех потомков в очередь
        }
    }
}

/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
function* mergeSortedSequences(source1, source2) {
    const iterator1 = source1[Symbol.iterator]();
    const iterator2 = source2[Symbol.iterator]();

    let next1 = iterator1.next();
    let next2 = iterator2.next();

    // Continue merging while there are elements in either sequence
    while (!next1.done || !next2.done) {
        // If source1 is exhausted, yield elements from source2
        if (next1.done) {
            yield next2.value;
            next2 = iterator2.next();
        }
        // If source2 is exhausted, yield elements from source1
        else if (next2.done) {
            yield next1.value;
            next1 = iterator1.next();
        }
        // If both sequences have elements, yield the smaller one
        else {
            if (next1.value <= next2.value) {
                yield next1.value;
                next1 = iterator1.next();
            } else {
                yield next2.value;
                next2 = iterator2.next();
            }
        }
    }
}

module.exports = {
    get99BottlesOfBeer: get99BottlesOfBeer,
    getFibonacciSequence: getFibonacciSequence,
    depthTraversalTree: depthTraversalTree,
    breadthTraversalTree: breadthTraversalTree,
    mergeSortedSequences: mergeSortedSequences,
};
