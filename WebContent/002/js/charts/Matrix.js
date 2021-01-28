(function ($) {
    if (!$) {
        console.error('jquery must be loaded before.');
        return;
    }



    var DataSet = function DataSet(matrix) {
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
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    };

    DataSet.prototype.orderBy = function (columns, orders) {

    }

    DataSet.prototype.select = function (filter, dataBlock) {
        let result =
            this.source.map(function (row, index, matrix) {
                return filter(row, index, matrix);
            }).filter(function (row) {
                return typeof row !== 'undefined';
            });
        result.splice(0, 1, this.dimension);
        return result;
    };

    DataSet.prototype.selectDistinct = function (filter) {
        let rows = this.select(filter);
        let result = [];
        for (let i = 0; i < rows.length; i++) {
            let j = i + 1;
            while (j < rows.length) {
                if (rows[i].equals(rows[j])) {
                    rows.splice(j, 1);
                    let dup = [].concat(rows);
                    continue;
                }
                j++;
            }
            result.push(rows[i]);
        }
        result.splice(0, 1, this.dimension);
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
                        key = this.getGroupKeys(row, groupBy[i], { value: 'array: ' });
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

    DataSet.prototype.sum = function (column, groupBy) {
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
            }
            else {
                dataRow = [keys[i], result[keys[i]]];
            }
            rows.push(dataRow);
        }
        let dimension = this.getGroupKeys(this.dimension, groupBy);
        dimension.push('sum');
        rows.splice(0, 0, dimension);
        return new DataSet(rows);
    }
    $.extend({ createDataSet: function (rawData) { return new DataSet(rawData); } });

}(window.jQuery));