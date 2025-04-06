'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    function parseBankAccount(bankAccount) {
        // Map of OCR patterns to digits
        const digitMap = {
            ' _ | ||_|': '0',
            '     |  |': '1',
            ' _  _||_ ': '2',
            ' _  _| _|': '3',
            '   |_|  |': '4',
            ' _ |_  _|': '5',
            ' _ |_ |_|': '6',
            ' _   |  |': '7',
            ' _ |_||_|': '8',
            ' _ |_| _|': '9',
        };

        let lines = bankAccount.split('\n');

        if (lines.length < 3) return NaN;

        let numDigits = Math.floor(lines[0].length / 3);
        let result = '';

        for (let i = 0; i < numDigits; i++) {
            let digitPattern =
                lines[0].slice(i * 3, i * 3 + 3) +
                lines[1].slice(i * 3, i * 3 + 3) +
                lines[2].slice(i * 3, i * 3 + 3);

            result += digitMap[digitPattern] ?? '?';
        }

        return parseInt(result);
    }
}

/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    throw new Error('Not implemented');
}

/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0,
};

function getPokerHandRank(hand) {
    const rankOrder = '23456789TJQKA'; // Ordered values of poker cards
    const rankCount = {}; // Frequency of each rank
    const suitCount = {}; // Frequency of each suit
    let ranks = [];

    // Parse hand into ranks and suits
    hand.forEach((card) => {
        let rank = card[0],
            suit = card.slice(-1);
        ranks.push(rank);
        rankCount[rank] = (rankCount[rank] || 0) + 1;
        suitCount[suit] = (suitCount[suit] || 0) + 1;
    });

    let rankIndices = ranks
        .map((rank) => rankOrder.indexOf(rank))
        .sort((a, b) => a - b);

    const isAceLowStraight =
        JSON.stringify(rankIndices) === JSON.stringify([0, 1, 2, 3, 12]);
    if (isAceLowStraight) rankIndices = [0, 1, 2, 3, 4];

    const isStraight = rankIndices.every(
        (val, i, arr) => i === 0 || val === arr[i - 1] + 1
    );
    const isFlush = Object.keys(suitCount).length === 1;

    const counts = Object.values(rankCount).sort((a, b) => b - a);

    if (isStraight && isFlush) return PokerRank.StraightFlush;
    if (counts[0] === 4) return PokerRank.FourOfKind;
    if (counts[0] === 3 && counts[1] === 2) return PokerRank.FullHouse;
    if (isFlush) return PokerRank.Flush;
    if (isStraight) return PokerRank.Straight;
    if (counts[0] === 3) return PokerRank.ThreeOfKind;
    if (counts[0] === 2 && counts[1] === 2) return PokerRank.TwoPairs;
    if (counts[0] === 2) return PokerRank.OnePair;
    return PokerRank.HighCard;
}

/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |A\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\sn'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    throw new Error('Not implemented');
}

module.exports = {
    parseBankAccount: parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles,
};
