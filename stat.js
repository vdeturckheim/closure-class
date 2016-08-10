/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const types = ['none', 'class', 'closure'];

const mean = function (list) {

    return (list.reduce((a, b) => a + b)) / list.length;
};

module.exports = function (results) {

    const keys = Object.keys(results);
    const aggregate = {
        none: {},
        closure: {},
        class: {}
    };

    keys.forEach((key) => {

        types.forEach((type) => {
            const nList = Object.keys(results[key][type]);
            nList.forEach((n) => {


                aggregate[type][n] = aggregate[type][n] || [];
                aggregate[type][n].push(results[key][type][n])
            })
        });
    });

    types.forEach((type) => {

        const nList = Object.keys(aggregate[type]);
        nList.forEach((n) => {

            aggregate[type][n] = mean(aggregate[type][n]);
        })
    });

    return aggregate;
};

module.exports.table = function (agg) {

    const nList = Object.keys(agg[types[0]]);
    let result = '';
    result += 'n\n' + nList.join('\n');

    types.forEach((type) => {

        result += '\n\n' + type + '\n' + Object.keys(agg[type]).map((key) => agg[type][key]).join('\n');
    });
    return result;
};
