/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const TOTAL = 10;

const NB_ROUND = 20;
const MAX_ROUND = Math.pow(10, 9);
const ROUND_SIZE = MAX_ROUND / NB_ROUND;

const SpawnSync = require('child_process').spawnSync;
const Fs = require('fs');
const Stats = require('./stat');

const run = function (target, count) {

    return parseInt(SpawnSync('node', ['--max-old-space-size=10240', 'runner.js', target, `${count}`]).output[1].toString());
};

const counts = [];
for (let i = 0; i < MAX_ROUND; i = i + ROUND_SIZE) {
    counts.push(i);
}
counts.push(MAX_ROUND);
const targets = ['none', 'closure', 'class'];

const total = {};
const bench = function (results){

    results.none = {};
    results.closure = {};
    results.class = {};

    counts.forEach((ct, r) => {

        const t0 = new Date();
        process.stdout.write('' + (ct )+ '(' + (r + 1) + ' / ' + counts.length + ')' + ' -> ');
        targets.forEach((target) => {
            process.stdout.write(target);
            results[target][ct] = run(target, ct);
            process.stdout.write('...');
        });
        process.stdout.write(' ' + ((new Date()) - t0 )/1000 + 's');
        console.log();
    });
};

for (let i = 0; i < TOTAL; ++i) {

    console.time(i + '');
    console.log('--------------------------------------------');
    console.log(i + 1 + ' / ' + TOTAL);
    console.log('--------------------------------------------');

    total[i] = {};
    bench(total[i]);
    console.timeEnd(i + '');
    console.log();
}

Fs.writeFileSync('./benchmark-result.json', JSON.stringify(total));
Fs.writeFileSync('./stats-result.json', JSON.stringify(Stats(total)));
Fs.writeFileSync('./stats-result.txt', Stats.table(Stats(total)));

