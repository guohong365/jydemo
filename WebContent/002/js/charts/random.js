var RandomGenerator = function () { // variables used for random number generators

    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    this.m = 4294967296;
    // a - 1 should be divisible by m's prime factors
    this.a = 1664525;
    // c and m should be co-prime
    this.c = 1013904223;
    this.y2 = 0;
    this.stateProperty = null;
    this.randomSeed(new Date().getMilliseconds());
};

RandomGenerator.prototype = {
    constructor: RandomGenerator,
    _lcg: function () {
        // define the recurrence relationship
        this.stateProperty = (this.a * this.stateProperty + this.c) % this.m;
        // return a float in [0, 1)
        // we've just used % m, so / m is always < 1
        return this.stateProperty / this.m;
    },

    _lcgSetSeed: function (val) {
        // pick a random seed if val is undefined or null
        // the >>> 0 casts the seed to an unsigned 32-bit integer
        this.stateProperty = (val == null ? Math.random() * this.m : val) >>> 0;
    },

    randomSeed: function (seed) {
        this._lcgSetSeed(seed);
        this._gaussian_previous = false;
    },
    next: function (min, max) {
        let rand;
        if (this.stateProperty != null) {
            rand = this._lcg();
        } else {
            rand = Math.random();
        }
        if (typeof min === 'undefined') {
            return rand;
        } else if (typeof max === 'undefined') {
            if (min instanceof Array) {
                return min[Math.floor(rand * min.length)];
            } else {
                return rand * min;
            }
        } else {
            if (min > max) {
                const tmp = min;
                min = max;
                max = tmp;
            }

            return rand * (max - min) + min;
        }
    },
    nextGaussian: function (mean, sd = 1) {
        let y1, x1, x2, w;
        if (this._gaussian_previous) {
            y1 = this.y2;
            this._gaussian_previous = false;
        } else {
            do {
                x1 = this.next(2) - 1;
                x2 = this.next(2) - 1;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1);
            w = Math.sqrt(-2 * Math.log(w) / w);
            y1 = x1 * w;
            this.y2 = x2 * w;
            this._gaussian_previous = true;
        }
        const m = mean || 0;
        return y1 * sd + this.m;
    }
};