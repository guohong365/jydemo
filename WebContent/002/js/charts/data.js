(function ($) {
    if (!$) {
        return;
    }

    var RowOption = function (option) {
        this.name = '';
        this.method = 'random';
        this.scale = 1.0;
        this.solt = { min: 0, max: 0 },
            this.rowIndex = null;
        this.data = [];
    };

    var ColumnOption = function () {
        this.name = '';
    }

    var GeneratorOption = function () {
        this.name = '';
        this.min = 0;
        this.max = 100;
        this.baseline = null;
        this.dimention = null;
        this.withRowName = true;
        this.withColumnName = true;
        this.rows = [];
        this.columns = [];
    };

    var DataGenerator = function (options) {
        this.random = new RandomGenerator();
        this.random.randomSeed(new Date().getMilliseconds())

        this.option = new GeneratorOption();
        /*
                this.options = {
                    name: '',
                    min: 0,
                    max: 100,
                    count: 10,
                    baseline: null,
                    rows: [{
                        name: '',
                        scale: 1.0,
                        solt: { min: 0, max: 0 },
                        method: 'random', //'accum'
                        rowIndex: null, //当 methd=‘accum’时，为引用行的下标
                        data: []
                    }],
                    columns: [{
                        name: '',
                    }]
        
                };
        */
        this.setOption(options);
    };

    DataGenerator.prototype = {
        constructor: DataGenerator,
        setOption: function (options) {
            $.extend(true, this.options, options);
        },
        generate: function (options) {

            this.setOption(options);
            var rows = [];
            let headerline = [this.options.name];
            this.options.columns.forEach(function (column) {
                headerline.push(column.name);
            });
            for (let i = 0; i < this.options.rows.length; i++) {
                var row = [];
                row.push(this.options.rows[i].name);
                var baseline;
                if (typeof this.options.rows[i].rowIndex === "number"
                    && this.options.rows[i].rowIndex >= 0
                    && this.options.rows[i].rowIndex < this.options.rows.length) {
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
                    value = parseFloat(value.toFixed(2));
                    row.push(value);
                }
                rows.push(row);
                this.options.rows[i].data = row;
            }
            var source = [];
            source.push(headerline);
            this.options.rows.forEach(function (row) {
                source.push(row.data);
            });
            return { source: source };
        },
        accumulate: function (data, start, end) {
            var accumulated = [];
            if (typeof start == "number") {
                if (start > data.length) return;
                if (start < 0) start = 0;
            } else start = 0;
            if (typeof end === 'number') {
                if (end < start) return;
            }
            end = data.length - 1;
            var sum = 0;
            for (let index = start; index <= end; index++) {
                sum += data[index];
                accumulated.push(parseFloat(sum.toFixed(2)));
            }
            return accumulated;

        }
    };

    $.extend({ createGenerator: function (options) { return new DataGenerator(options); } });
}(window.jQuery));