var Table = function (options) {
    this._formatter = options.formatter;
    this._table = $(options.table);
    this._data = options.data;
    this._sorter = options.sorter;
    this._header = options.header;
    this._lines = typeof (options.lines) === "number" ? options.lines : options.data.length;
    this._param = options.param;
};
Table.prototype = {
    constructor: Table,
    update: function (param) {
        var data = null;
        if (typeof this._data ==="function") {
            if(typeof param != "undefined"){
                data = this._data(param, this);
            } else if(typeof this._param != "undefined"){
                data = this._data(this._param, this);
            } else {
                data = this._data(this);
            }
        } else {
            data = this._data;
        }

        if (typeof this._sorter === "function") {
            data.sort(this._sorter);
        }
        var html = "";
        if (typeof this._header ==="function") {
            html += this._header();
        }
        else {
            html += this._header;
        }
        for (let index = 0; index < data.length && index < this.lines; index++) {
            html += formatter(data[index]);
        }
        this._table.html(html);
    }

};

