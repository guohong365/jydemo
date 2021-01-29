(function ($) {
    if (!$) {
        console.error('jquery must be loaded before.');
        return;
    }



    var DataSet = function (matrix) {
        if (!matrix) {
            this.dimension = [];
            this.source = [];
            return;
        }
        if (matrix.length > 1) {
            this.dimension = matrix.slice(0, 1)[0];
        }
        this.source = matrix.slice(1);
    }
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time 
        if (this.length != array.length)
            return false;

        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            } else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };
    DataSet.prototype.isEmpty = function () {
        return this.source.length == 0;
    };
    DataSet.prototype.empty = function () {
        return new DataSet();
    };
    DataSet.prototype.orderBy = function (sorter, groupBy) {
        let groupColumns = [];
        let groupKeys = this.getGroupKeys(this.dimension, groupBy);
        for (let i = 0; i < groupKeys.length; i++) {
            let index = this.dimension.indexOf(groupKeys[i]);
            if (index >= 0 && index < this.dimension.length) {
                groupColumns.push(index);
            }
        }
        this.source.sort(sorter);
        //TODO: uncompleted
    }

    DataSet.prototype.parseBlock = function (param) {
        let block = {};
        if ($.type(param) === "array") {
            if (param.length > 0) {
                if ($.type(parseInt(param[0])) === "number") { //as four number
                    block = {
                        left: parseInt(param[0]),
                        top: parseInt(param[1]),
                        right: parseInt(param[2]),
                        bottom: parseInt(param[3])
                    };
                } else if ($.type(param[0]) === "array") { //as to arrary
                    if (param[0].length > 0) {
                        block.left = parseInt(param[0][0]);
                        block.top = parseInt(param[0][1]);
                    }
                    if ($.type(param[1]) === 'array') {
                        block.right = parseInt(param[1][0]);
                        block.bottom = parseInt(param[1][1]);
                    }
                }
            }
        } else if ($.type(param) === "object") {
            block.left = param.left;
            block.top = param.top;
            block.right = param.right;
            block.bottom = param.bottom;
        }
        if ($.type(block.left) !== 'number' || block.left < 0) block.left = 0;
        if ($.type(block.top) !== 'number' || block.top < 0) block.top = 0;
        if ($.type(block.right) !== 'number') block.right = -1;
        if ($.type(block.bottom) !== 'number') block.bottom = -1;
        return block;
    };
    //filter : function judge if row be selected
    //dataBlock: {left: 0, top : , right :  , buttom : }
    //dataBlock: [startColumn, startRow, endColumn, endRow];
    //dataBlock: [[left, top],[right, bottom]];
    DataSet.prototype.select = function (filter, dataBlock) {
        let block = this.parseBlock(dataBlock);
        if ((block.right >= 0 && block.right < block.left) ||
            (block.bottom >= 0 && block.bottom > block.top)) {
            return this.empty();
        }
        let result = [];
        if ($.type(filter) === 'function') {
            result = this.source.filter(filter);
        }
        if (result.length == 0) return this.empty();

        result = result.map(function (row) {
            let newRow = [];
            for (let i = block.left; i < row.length && (block.right >= 0 && i <= block.right); i++) {
                newRow.push(row[i]);
            }
            return newRow;
        });
        let dimension = [];
        for (let i = block.left; i < row.length && (block.right >= 0 && i <= block.right); i++) {
            dimension.push(this.dimension[i]);
        }
        result.splice(0, 0, dimension);
        return new DataSet(result);
    };

    DataSet.prototype.selectDistinct = function (filter, dataBlock) {
        let dataset = this.select(filter, dataBlock);
        let rows = dataset.source;
        let result = [];
        for (let i = 0; i < rows.length; i++) {
            let j = i + 1;
            while (j < rows.length) {
                if (rows[i].equals(rows[j])) {
                    rows.splice(j, 1);
                    continue;
                }
                j++;
            }
            result.push(rows[i]);
        }
        result.splice(0, 0, dataset.dimension);
        return new DataSet(result);
    }

    DataSet.prototype.at = function (row, column) {
        row = parseInt(row);
        column = parseInt(column);
        if (!isNaN(row)) {

            if (row >= 0 && row < this.source.length) {
                let current = this.source[row];
                if (isNaN(column)) return current;
                if (column >= 0 && column < current.length) return current[column];
            }
        }
        if (!isNaN(column)) {
            return this.select(function (dataRow) {
                if (column >= 0 && column < dataRow.length) {
                    return dataRow[column];
                }
                return undefined;
            });
        }
    };

    DataSet.prototype.getGroupKeys = function (row, groupBy, tag) {
        let t = typeof tag !== "undefined" ? (typeof tag.value !== 'undefined' ? tag.value : '') : '';
        let type = $.type(groupBy);
        let keys = [];
        let key = null;
        let keyIndex = -1;
        switch (type) {
            case 'string':
                keyIndex = this.dimension.indexOf(groupBy);
                if (keyIndex >= 0 && keyIndex < row.length) key = row[keyIndex];
                if (key != null) return [key];
                break;
            case 'number':
                keyIndex = parseInt(groupBy);
                if (keyIndex >= 0 && keyIndex < row.length) {
                    key = row[keyIndex];
                    if (key != null) {
                        return [key];
                    }
                }
                break;
            case 'array':
                if (groupBy.length > 0) {
                    for (let i = 0; i < groupBy.length; i++) {
                        key = this.getGroupKeys(row, groupBy[i], {
                            value: 'array: '
                        });
                        keys = keys.concat(key);
                    }
                }
                return keys;
            case 'function':
                key = groupBy(row);
                if (key != null) return [key];
                break;
        }
        return keys;
    };

    DataSet.prototype.sum = function (column, groupBy, sumName) {
        let result = {};

        for (let rowIndex = 0; rowIndex < this.source.length; rowIndex++) {
            let row = this.source[rowIndex];
            let key = this.getGroupKeys(row, groupBy);
            let value = row[column];
            let last = result[key]
            if (typeof last !== 'undefined') {
                result[key] += value;
            } else {
                result[key] = value;
            }
        }
        console.log(result);
        let keys = Object.keys(result);
        let rows = [];
        for (let i = 0; i < keys.length; i++) {
            let dataRow = [];
            if ($.type(groupBy) === "array") {
                group = keys[i].split(',');
                dataRow = group;
                dataRow.push(result[keys[i]]);
            } else {
                dataRow = [keys[i], result[keys[i]]];
            }
            rows.push(dataRow);
        }
        let dimension = this.getGroupKeys(this.dimension, groupBy);
        dimension.push(sumName || 'sum');
        rows.splice(0, 0, dimension);
        return new DataSet(rows);
    }
    $.extend({
        createDataSet: function (rawData) {
            return new DataSet(rawData);
        },
        dataSource: {}
    });

}(window.jQuery));