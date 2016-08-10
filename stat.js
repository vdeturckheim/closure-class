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
