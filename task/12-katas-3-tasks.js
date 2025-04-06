'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ];
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    if (!puzzle || puzzle.length === 0 || searchStr.length === 0) return false;

    const rows = puzzle.length;
    const cols = puzzle[0].length;
    const wordLength = searchStr.length;

    const directions = [
        [1, 0], // Down
        [-1, 0], // Up
        [0, 1], // Right
        [0, -1], // Left
    ];

    function dfs(r, c, index, visited) {
        if (index === wordLength) return true;

        if (
            r < 0 ||
            r >= rows ||
            c < 0 ||
            c >= cols ||
            puzzle[r][c] !== searchStr[index] ||
            visited.has(`${r},${c}`)
        ) {
            return false;
        }

        visited.add(`${r},${c}`);

        for (const [dr, dc] of directions) {
            if (dfs(r + dr, c + dc, index + 1, visited)) return true;
        }

        visited.delete(`${r},${c}`);

        return false;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (puzzle[r][c] === searchStr[0]) {
                if (dfs(r, c, 0, new Set())) return true;
            }
        }
    }

    return false;
}

/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 *
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    if (chars.length === 0) {
        yield prefix;
    } else {
        for (let i = 0; i < chars.length; i++) {
            const remaining = chars.slice(0, i) + chars.slice(i + 1);
            yield* getPermutations(remaining, prefix + chars[i]);
        }
    }
}

/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing.
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let maxProfit = 0;
    let maxFuturePrice = 0;

    for (let i = quotes.length - 1; i >= 0; i--) {
        maxFuturePrice = Math.max(maxFuturePrice, quotes[i]);
        maxProfit += Math.max(0, maxFuturePrice - quotes[i]);
    }

    return maxProfit;
}

/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 *
 * @class
 *
 * @example
 *
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 *
 */
function UrlShortener() {
    this.urlAllowedChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz' +
        "0123456789-_.~!*'();:@&=+$,/?#[]";

    this.encode = function (url) {
        return Buffer.from(url)
            .toString('base64')
            .replace(/=+$/, '') // Remove padding
            .replace(/\+/g, '-') // URL-safe
            .replace(/\//g, '_');
    };

    this.decode = function (shortUrl) {
        shortUrl = shortUrl.replace(/-/g, '+').replace(/_/g, '/');
        return Buffer.from(shortUrl, 'base64').toString();
    };
}

UrlShortener.prototype = {
    encode: function (url) {
        throw new Error('Not implemented');
    },

    decode: function (code) {
        throw new Error('Not implemented');
    },
};

module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener,
};
