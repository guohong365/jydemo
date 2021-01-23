(function($) {


    var DataGenerator = function(options) {
        this.random = function(min, max) {
            return Math.random() * (max - min) + min;
        }
        this.setOption = function(options) {
            if (options) {
                $.extend(true, this.options, options);
            }
        };

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

        this.setOption(options);

        this.generate = function(options) {
            if (options) {
                this.setOption(options);
            }
            var rows = [];
            var headerline = [this.options.name];
            this.options.columns.forEach(function(column) {
                headerline.push(column.name);
            });
            for (let i = 0; i < this.options.rows.length; i++) {
                var row = [];
                row.push(this.options.rows[i].name);
                var baseline;
                if (typeof this.options.rows[i].rowIndex === "number" && this.options.rows[i].rowIndex >= 0 && this.options.rows[i].rowIndex < this.options.rows.length) {
                    baseline = this.options.rows[this.options.rows[i].rowIndex].data;
                } else if (this.options.baseline) {
                    baseline = this.options.baseline;
                } else {
                    baseline = null;
                }
                if (this.options.rows[i].method === 'accum' && baseline) {
                    var accum = 0;
                    this.options.rows[this.options.rows[i].rowIndex].forEach(function(value) {
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
                        value = this.random(this.options.min, this.options.max);
                    }
                    value += this.random(this.options.rows[i].solt.min, this.options.rows[i].solt.max)
                    value *= this.options.rows[i].scale;
                    value = parseFloat(value.toFixed(2));
                    row.push(value);
                }
                rows.push(row);
                this.options.rows[i].data = row;
            }
            var source = [];
            source.push(headerline);
            this.options.rows.forEach(function(row) {
                source.push(row.data);
            });
            return { source: source };
        };
        this.accumulate = function(data, start, end) {
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
    $.extend({ createGenerator: function(options) { return new DataGenerator(options); } });
}(window.jQuery));