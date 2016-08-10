/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
module.exports.wrap = function (clone, fn) {

    let ctr = 0;

    return clone(fn, () => {

        ctr++;
    });
};
