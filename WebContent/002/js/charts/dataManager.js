(function($) {
    if (!$) {
        console.error('jquery must be loaded before.');
        return;
    }

    function DataManager() {
        this.yearly = null;
        this.monthly = null;
        this.daily = null;
        this.hourly = null;
    }

    DataManager.prototype.filte = function() {

    };

    DataManager.prototype.getGroupKey = function(data, row, groupBy) {
        let type = $.type(groupBy);
        let key = null;
        let keyIndex = -1;
        switch (type) {
            case 'string':
                keyIndex = data[0].indexOf(groupBy);
                if (keyIndex >= 0 && keyIndex < data[0].length) key = row[keyIndex];
                break;
            case 'number':
                keyIndex = parseInt(groupBy);
                if (keyIndex >= 0 && keyIndex < data[0].length) key = row[keyIndex];
                break;
            case 'array':
                if (groupBy.length > 0) {
                    key = this.getGroupKey(data, row, String(groupBy[0]));
                    for (let i = 1; i < groupBy.length; i++) {
                        key += '-' + this.getGroupKey(data, row, String(groupBy[i]));
                    }
                }
                break;
            case 'function':
                key = groupBy(row);
                break;
        }
        return key;
    };


    DataManager.prototype.sum = function(data, column, groupBy) {
        console.log(data);
        let result = {};
        for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
            let row = data[rowIndex];
            let key = this.getGroupKey(data, row, groupBy);
            console.log(key);
            let value = row[column];
            let last = result[key]
            if (typeof last !== 'undefined') {
                result[key] += value;
            } else {
                result[key] = value;
            }
        }
        console.log(result);
        return result;
    }

    $.extend({ dataManager: new DataManager() });

}(window.jQuery));