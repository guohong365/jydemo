(function ($) {
    if (!$) {
        return;
    }

    function swapMinMax(item) {
        if (item.min > item.max) {
            let value = item.min;
            item.min = item.max;
            item.max = value;
        }
    }

    function Solt(option) {
        this.min = 0;
        this.max = 0;
        if (option) {
            let value = parseFloat(option.min);
            if (!isNaN(value)) this.min = value;
            value = parseFloat(option.max);
            if (!isNaN(value)) this.max = value;
            swapMinMax(this);
        }
    }

    function RowOption(option) {
        this.name = '';
        this.method = 'random';
        this.scale = 1.0;
        this.solt = new Solt();
        this.rowIndex = null;
        this.data = [];
        if (option) {
            if (option.name) {
                this.name = option.name
            }
            if (option.method === 'accum') {
                let value = parseFloat(option.rowIndex);
                if (!isNaN(value)) {
                    this.method = 'accum';
                    this.rowIndex = value;
                }
            }
            if (option.scale) {
                let value = parseFloat(option.scale);
                if (!isNaN(value)) this.scale = value;
            }
            this.solt = new Solt(option.solt);
            $.extend(true, this.data, option.data);
        }
    };

    function ColumnOption(option) {
        this.name = '';
        if (option) {
            if (option.name) {
                this.name = option.name;
            } else {
                this.name = option;
            }
        }
    }

    function GeneratorOption(option) {
        this.name = '';
        this.min = 0;
        this.max = 100;
        this.baseline = null;
        this.withRowName = true;
        this.withColumnName = true;
        this.precision = 2;
        this.rows = [];
        this.columns = [];
        if (option) {
            if (option.name) {
                this.name = option.name;
            }
            let value = parseFloat(option.min);
            if (!isNaN(value)) this.min = value;
            value = parseFloat(option.max);
            if (!isNaN(value)) this.max = value;
            swapMinMax(this);
            if (option.baseline) {
                if (typeof option.baseline === "function") {
                    this.baseline = option.baseline();
                } else if ($.isArray(option.baseline)) {
                    this.baseline = [];
                    $.extend(this.baseline, option.baseline);
                }
            }
            if (option.withRowName === false) this.withRowName = false;
            if (option.withColumnName === false) this.withColumnName = false;
            value = parseInt(option.precision);
            if (!isNaN(value)) this.precision = value;
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
    };

    function DataGenerator(options) {
        this.random = new RandomGenerator();
        this.random.randomSeed(new Date().getMilliseconds())
        this.options = new GeneratorOption(options);
    };

    DataGenerator.prototype.setOption = function (options) {
        options = new GeneratorOption(options);
        $.extend(true, this.options, options);
    };
    DataGenerator.prototype.generate = function (options) {
        this.setOption(options);
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
    };
    DataGenerator.prototype.accumulate = function (data, start, end, precision) {
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

    };

    $.extend({
        createGenerator: function (options) {
            return new DataGenerator(options);
        }
    });
}(window.jQuery));