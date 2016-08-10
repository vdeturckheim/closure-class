/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';

const Wrap = require('./counters/' + process.argv[2]).wrap;
const MAX_RUN = process.argv[3];

const clone = function (fn, onCall) {

    const result = function () {

        onCall();

        if (new.target) {
            return Reflect.construct(fn, arguments, new.target);
        }
        return fn.apply(this, arguments);
    };

    Object.setPrototypeOf(result, Object.getPrototypeOf(fn));

    Object.getOwnPropertyNames(fn).forEach((prop) => {

        Object.defineProperty(result, prop, Object.getOwnPropertyDescriptor(fn, prop));
    });

    return result;
};

const fct = function (){};

const wrapped = Wrap(clone, fct);

const t0 = new Date();
for (let i = 0; i < MAX_RUN; ++i) {
    wrapped();
}
const delta = (new Date()) - t0;
process.stdout.write('' + delta);

