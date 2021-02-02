(function ($) {
    if (!$) {
        return;
    }
    class Salt extends Option {
        constructor(option) {
            super(option);
            console.log(this);
            console.log(Salt);
            this.__swapMinMax();
        }
        static create(min, max) {
            return new Salt({
                min: min,
                max: max
            });
        }
        get min() {
            return Number(this.__option.min);
        }
        set min(value) {
            this.__option.min = value;
        }
        get max() {
            return Number(this.__option.max);
        }
        set max(value) {
            this.__option.max = value;
        }
        __swapMinMax() {
            if (!isNaN(this.min) && !isNaN(this.max)) {
                if (this.min > this.max) {
                    let value = this.min;
                    this.min = this.max;
                    this.max = value;
                }
            }
        }
    }

    class RowOption extends Option {
        constructor(option) {
            super(option);
            if (option && option.solt) {
                this.solt = new Salt(option.solt);
            }
        }
        get name() {
            return getString(this.__option.name);
        }
        set name(value) {
            this.__option.name = value;
        }
        get method() {
            return this.__option.method !== 'accum' ? 'random' : 'accum';
        }
        set method(value) {
            this.__option.method = value;
        }
        get scale() {
            return Option.getNumber(this.__option.scale, 1.0);
        }
        set scale(value) {
            this.__option.scale = value;
        }
        //TODO 判断类型
        get solt() {
            return this.__option.solt;
        };
        set solt(value) { //TODO 判断类型
            this.__option.solt = value instanceof Salt ? value : new Salt(value);
        }

        get rowIndex() {
            return Option.getNumber(this.__option.rowIndex, null);
        }
        set rowIndex(value) {
            this.__option.rowIndex = value;
        }
        get data() {
            return this.__option.data;
        }
        set data(value) {
            this.__option.data = value;
        }
    }

    class ColumnOption extends Option {
        constructor(option) {
            super(option);
        }

        get name() {
            return Option.getString(this.__option.name);
        }
        set name(value) {
            this.__option.name = value;
        }
    }

    class GeneratorOption extends Option {
        constructor(option) {
            super(option);
            if (option) {
                if ($.isArray(option.rows) && option.rows.length) {
                    let _this = this;
                    option.rows.forEach(function (row) {
                        _this.rows.push(new RowOption(row));
                    });
                }
                if ($.isArray(option.columns) && option.columns.length) {
                    let _this = this;
                    option.columns.forEach(function (column) {
                        _this.columns.push(new ColumnOption(column));
                    });
                }
            }
        }

        get name() {
            return Option.getString(this.__option.name);
        }
        set name(value) {
            this.__option.name = value;
        }
        get min() {
            return Option.getNumber(this.__option.min);
        }
        set min(value) {
            this.__option.min = value;
        }
        get max() {
            return Option.getNumber(this.__option.max);
        }
        set max(value) {
            this.__option.max = value;
        }
        get baseline() {
            return $.isArray(this.__option.baseline) ? this.__option.baseline : null;
        }
        set baseline(value) {
            this.__option.baseline = value;
        }

        get withRowName() {
            return Option.getBoolean(this.__option.withRowName, true);
        }
        set withRowName(value) {
            this.__option.withRowName = value;
        }
        get withColumnName() {
            return Option.getBoolean(this.__option.withColumnName, true);
        }
        set withColumnName(value) {
            this.__option.withColumnName = value;
        }
        get precision() {
            return Option.getNumber(this.__option.precision, 2);
        }
        set precision(value) {
            this.__option.precision = value;
        }
        get rows() {
            return Option.getArray(this.__option.rows);
        }
        set rows(value) {
            this.__option.rows = this.value;
        }
        get columns() {
            return Option.getArray(this.__option.columns);
        }
        set columns(value) {
            this.__option.value = value;
        }
    };

    class DataGenerator {
        constructor(options) {
            this.random = new RandomGenerator();
            this.random.randomSeed(new Date().getMilliseconds())
            this.options = new GeneratorOption(options);
        }

        setOption(options, mergeOpt) {
            options = new GeneratorOption(options);
            if (mergeOpt) {
                this.options.__merge(options, mergeOpt);
            } else {
                this.options.__replace(options);
            }
        };
        generate(options, mergeOpt = true) {
            this.setOption(options, mergeOpt);
            var rows = [];
            if (this.options.withColumnName) {
                let headerline = [this.options.name];
                this.options.columns.forEach(function (column) {
                    headerline.push(column.name);
                });
                rows.push(headerline);
            }
            for (let i = 0; i < this.options.rows.length; i++) {
                var row = [];
                if (this.options.withRowName) {
                    row.push(this.options.rows[i].name);
                }
                var baseline;
                if (typeof this.options.rows[i].rowIndex === "number" &&
                    this.options.rows[i].rowIndex >= 0 &&
                    this.options.rows[i].rowIndex < this.options.rows.length) {
                    baseline = this.options.rows[this.options.rows[i].rowIndex].data;
                } else if (this.options.baseline) {
                    baseline = this.options.baseline;
                } else {
                    baseline = null;
                }
                if (this.options.rows[i].method === 'accum' && baseline) {
                    let accum = 0;
                    this.options.rows[this.options.rows[i].rowIndex].data.forEach(function (value, dataIndex) {
                        if (dataIndex == 0) return;
                        accum += value;
                        row.push(accum);
                    });
                    this.options.rows[i].data = row;
                    rows.push(row);
                    continue;
                }
                for (let j = 0; j < this.options.columns.length; j++) {
                    var value = 0;

                    if (baseline && j < this.options.baseline.length) {
                        value = this.options.baseline[j];
                    } else {
                        value = this.random.next(this.options.min, this.options.max);
                    }
                    value += value * this.random.next(this.options.rows[i].solt.min, this.options.rows[i].solt.max);
                    value *= this.options.rows[i].scale;
                    value = parseFloat(value.toFixed(this.options.precision));
                    row.push(value);
                }
                rows.push(row);
                this.options.rows[i].data = row;
            }
            return {
                source: rows
            };
        }
        static accumulate(data, start, end, precision) {
            var accumulated = [];
            if (typeof start == "number") {
                if (start > data.length) return;
                if (start < 0) start = 0;
            } else start = 0;
            if (typeof end === 'number') {
                if (end < start) return;
            }
            end = data.length - 1;
            let value = parseInt(precision);
            precision = isNaN(value) ? 2 : value;
            var sum = 0;
            for (let index = start; index <= end; index++) {
                sum += data[index];
                accumulated.push(parseFloat(sum.toFixed(precision)));
            }
            return accumulated;
        }
    }
    let salt = new Salt({
        min: 1,
        max: -11
    });


    salt.__merge({
        mi: 1,
        m: [2, 4]
    });

    if (salt instanceof Salt) {
        console.error('salt is instance of Salt');
    }

    console.log("salt");
    console.log(salt);
    console.log("min:" + salt.min);
    console.log('max:' + salt.max);

    $.extend({
        createGenerator: function (options) {
            return new DataGenerator(options);
        }
    });
}(window.jQuery));