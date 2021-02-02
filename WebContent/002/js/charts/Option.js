class Option {
    constructor(option) {
        Object.defineProperty(this, '__option', {
            enumerable: false,
            configurable: false,
            writable: true,
            value: {}
        });
        this.__option = Option.__copy(option, true);
        this.__build();
    }
    static getString(value, defaultValue = '') {
        return typeof value === 'undefined' || value == null ? defaultValue : String(value);
    }
    static getNumber(value, defaultValue = Number.NaN) {
        return isNaN(value) ? defaultValue : Number(value);
    }
    static getObject(value, defaultValue = null) {
        return typeof value === 'object' ? value : defaultValue;
    }
    static getArray(value, defaultValue = []) {
        return $.isArray(value) ? value : defaultValue;
    }
    static getBoolean(value, defaultValue) {
        if (typeof value === 'boolean') return value;
        return Boolean(defaultValue);
    }

    __clear() {
        for (const key in this) {
            delete this[key];
        }
    }

    __replace(obj) {
        this.__clear();
        this.__option = Option.__copy(obj, {
            deep: true
        });
        this.__build();
    };
    static __copy(obj, deep) {
        if (typeof obj === "undefined") {
            return undefined;
        }
        if (typeof obj === 'object') {
            if (obj == null) {
                return null;
            }

            let clone = $.isArray(obj) ? [] : {};
            for (const key in obj) {
                let value = obj[key];
                if (deep) {
                    clone[key] = Option.__copy(value, true);
                } else {
                    clone[key] = obj[key];
                }

            }
            return clone;

        }
        return obj;
    }
    static __mergeOpt(target, option, deep) {
        if (typeof target !== 'object' || target == null) return
        if (typeof option !== 'object' || option == null) return;
        for (let key in option) {
            if (!deep) {
                target[key] = option[key];
            } else {
                if (typeof target[key] === 'object') {
                    if (typeof option[key] === 'object') {
                        Option.__mergeOpt(target[key], option[key], deep);
                    } else {
                        if (typeof option[key] !== 'undefined') { //option is primitive type
                            target[key] = option[key]; //overwrite
                        }
                        /*
                        else { //ignore undefined

                        } 
                        */
                    }
                } else {
                    target[key] = option[key]; // target is primitive type, overwrite
                }
            }
        }
    }
    __merge(option, mergeOpt) {
        if (!option) return;
        this.__clear();
        let opt = Option.__copy(option, mergeOpt);
        Option.__mergeOpt(this.__option, option, mergeOpt && typeof mergeOpt === 'object' ? mergeOpt.deep : false);
        this.__build();
    }
    __build() {
        for (const key in this.__option) {
            this[key] = this.__option[key];
        }
    }
}