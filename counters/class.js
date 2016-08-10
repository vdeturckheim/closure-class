/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const CountClass = class {

    constructor(fn, clone) {
        this.fn = fn;
        this.ctr = 0;
        this.clone = clone;
    }

    play() {

        const self = this;
        return this.clone(self.fn, () => {
            self.ctr++;
        })
    }
};

module.exports.wrap = function (clone, fn) {

    const tmp = new CountClass(fn, clone);
    return tmp.play();
};
