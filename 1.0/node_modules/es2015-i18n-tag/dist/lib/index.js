'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typeInfoRegex = /^:([a-z])(\(([^)]+)\))?/;
var formatOptionNumeric = 'numeric';
var formatOptionLong = 'long';
var formatOption2Digit = '2-digit';
var typeString = 'string';
var typeNumber = 'number';
var typeDate = 'date';
var numberStyleDecimal = 'decimal';
var numberStyleCurrency = 'currency';
var numberStylePercent = 'percent';

var configD = {
    weekday: undefined,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionNumeric,
    day: formatOptionNumeric,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
};

var configD_cap = {
    weekday: formatOptionLong,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionLong,
    day: formatOptionNumeric,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
};

var configF = {
    weekday: formatOptionLong,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionLong,
    day: formatOptionNumeric,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: undefined,
    timeZoneName: undefined
};

var configF_cap = {
    weekday: formatOptionLong,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionLong,
    day: formatOptionNumeric,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: formatOption2Digit,
    timeZoneName: undefined
};

var configG = {
    weekday: undefined,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionNumeric,
    day: formatOptionNumeric,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: undefined,
    timeZoneName: undefined
};

var configG_cap = {
    weekday: undefined,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionNumeric,
    day: formatOptionNumeric,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: formatOption2Digit,
    timeZoneName: undefined
};

var configM = {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: formatOptionLong,
    day: formatOptionNumeric,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
};

var configT = {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: undefined,
    day: undefined,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: undefined,
    timeZoneName: undefined
};

var configT_cap = {
    weekday: undefined,
    era: undefined,
    year: undefined,
    month: undefined,
    day: undefined,
    hour: formatOptionNumeric,
    minute: formatOption2Digit,
    second: formatOption2Digit,
    timeZoneName: undefined
};

var configY = {
    weekday: undefined,
    era: undefined,
    year: formatOptionNumeric,
    month: formatOptionLong,
    day: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined
};

var standardFormatSettings = {
    'd': configD,
    'D': configD_cap,
    'f': configF,
    'F': configF_cap,
    'g': configG,
    'G': configG_cap,
    'm': configM,
    'M': configM,
    't': configT,
    'T': configT_cap,
    'y': configY,
    'Y': configY
};

var Tag = function () {
    function Tag() {
        var _this = this;

        _classCallCheck(this, Tag);

        this.defaultConfig = {
            locales: undefined,
            translations: {},
            number: {
                currency: 'USD'
            },
            date: {},
            string: {}
        };

        this.configs = {
            '': this.defaultConfig
        };

        this.translationCache = {};

        this.keyCache = {};

        this.typeInfoCache = {};

        this._localizers = {
            s /*string*/: function s(config, v, format) {
                var formatted = void 0;
                if (format && (formatted = _this._runCustomFormatters(config, typeString, format, v)) !== null) {
                    return formatted;
                }
                if (v) {
                    return v.toLocaleString(config.locales);
                }
                return String(v);
            },
            n /*number*/: function n(config, v, format) {
                if (typeof v !== 'number') {
                    throw Error('value is not a number. type: ' + (typeof v === 'undefined' ? 'undefined' : _typeof(v)));
                }
                if (format) {
                    var fractionalDigits = parseInt(format);
                    if (!isNaN(fractionalDigits)) {
                        return v.toLocaleString(config.locales, Object.assign({}, config.number, { style: numberStyleDecimal, minimumFractionDigits: fractionalDigits, maximumFractionDigits: fractionalDigits }));
                    }
                    var formatted = void 0;
                    if ((formatted = _this._runCustomFormatters(config, typeNumber, format, v)) !== null) {
                        return formatted;
                    }
                }
                return v.toLocaleString(config.locales, Object.assign({}, config.number, { style: numberStyleDecimal, minimumFractionDigits: 0, maximumFractionDigits: 3 }));
            },
            t /*date*/: function t(config, v, format) {
                if (!(v instanceof Date)) {
                    throw Error('value is not a Date. type: ' + v.constructor.name);
                }
                if (format) {
                    switch (format.toUpperCase()) {
                        case 'R':
                            return v.toUTCString();
                        case 'O':
                            return v.toISOString();
                    }
                    var formatOptions = standardFormatSettings[format];
                    if (formatOptions) {
                        return v.toLocaleString(config.locales, Object.assign({}, config.date, formatOptions));
                    } else {
                        var formatted = _this._runCustomFormatters(config, typeDate, format, v);
                        if (formatted !== null) return formatted;
                    }
                }
                return v.toLocaleString(config.locales, Object.assign({}, config.date));
            },
            c /*currency*/: function c(config, v, currency) {
                if (typeof v !== 'number') {
                    throw Error('value is not a number. type: ' + (typeof v === 'undefined' ? 'undefined' : _typeof(v)));
                }
                return v.toLocaleString(config.locales, currency ? Object.assign({}, config.number, { style: numberStyleCurrency, currency: currency }) : Object.assign({}, config.number, { style: numberStyleCurrency }));
            },
            p /*percent*/: function p(config, v, minimumFractionDigits) {
                if (typeof v !== 'number') {
                    throw Error('value is not a number. type: ' + (typeof v === 'undefined' ? 'undefined' : _typeof(v)));
                }
                return v.toLocaleString(config.locales, minimumFractionDigits ? Object.assign({}, config.number, { style: numberStylePercent, minimumFractionDigits: minimumFractionDigits }) : Object.assign({}, config.number, { style: numberStylePercent }));
            }
        };
        this.i18n = this.i18n.bind(this);
        this.translate = this.translate.bind(this);
        this.i18nConfig = this.i18nConfig.bind(this);
        this._localize = this._localize.bind(this);
        this._extractTypeInfo = this._extractTypeInfo.bind(this);
    }

    _createClass(Tag, [{
        key: 'i18nConfig',
        value: function i18nConfig(_ref) {
            var locales = _ref.locales,
                translations = _ref.translations,
                group = _ref.group,
                number = _ref.number,
                date = _ref.date,
                standardFormatters = _ref.standardFormatters;

            // clear translation cache
            this.translationCache = {};
            var currentConfig = this.configs[group || ''] || this.defaultConfig;
            this.configs[group || ''] = Object.assign({}, currentConfig, {
                locales: locales || currentConfig.locales,
                translations: translations || currentConfig.translations,
                number: number || currentConfig.number,
                date: date || currentConfig.date,
                standardFormatters: standardFormatters || currentConfig.standardFormatters
            });
        }
    }, {
        key: 'i18n',
        value: function i18n(group, config, literals) {
            var _this2 = this;

            var translationKey = this._buildKey(literals);

            var _getCachedTranslation2 = this._getCachedTranslation(group, config, translationKey),
                configGroup = _getCachedTranslation2.configGroup,
                translatedKey = _getCachedTranslation2.translatedKey;

            var typeInfoForValues = literals.slice(1).map(this._extractTypeInfo);

            for (var _len = arguments.length, values = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                values[_key - 3] = arguments[_key];
            }

            var localizedValues = values.map(function (v, i) {
                return _this2._localize(configGroup, v, typeInfoForValues[i]);
            });
            return this._buildMessage.apply(this, [translatedKey].concat(_toConsumableArray(localizedValues)));
        }
    }, {
        key: 'translate',
        value: function translate(group, config, key) {
            var _this3 = this;

            if (typeof key === 'undefined' || key === null) {
                key = '';
            } else if (typeof key !== 'string') {
                key = String(key);
            }

            var _getCachedTranslation3 = this._getCachedTranslation(group, config, key),
                configGroup = _getCachedTranslation3.configGroup,
                translatedKey = _getCachedTranslation3.translatedKey;

            for (var _len2 = arguments.length, values = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
                values[_key2 - 3] = arguments[_key2];
            }

            var localizedValues = values.map(function (v) {
                if (v instanceof Object && v.constructor === Object) {
                    return _this3._localize(configGroup, v.value || '', { type: v.formatter || 's', options: v.format });
                }
                return _this3._localize(configGroup, v, { type: 's', options: '' });
            });
            return this._buildMessage.apply(this, [translatedKey].concat(_toConsumableArray(localizedValues)));
        }
    }, {
        key: '_getCachedTranslation',
        value: function _getCachedTranslation(group, config, translationKey) {
            var cacheKey = [group || '', config || '', translationKey].join();
            var cachedTranslation = this.translationCache[cacheKey];
            var configGroup = this.configs[config || ''] || this.defaultConfig;
            if (cachedTranslation) {
                return { configGroup: configGroup, translatedKey: cachedTranslation };
            }
            var translationString = this._getTranslation(group, configGroup, translationKey);
            this.translationCache[cacheKey] = translationString;
            return { configGroup: configGroup, translatedKey: translationString };
        }
    }, {
        key: '_getTranslation',
        value: function _getTranslation(group, configGroup, translationKey) {
            var translations = configGroup['translations'];
            var translationString = void 0;
            var translationGroup = void 0;
            if ((typeof group === 'undefined' ? 'undefined' : _typeof(group)) === typeString) {
                translationGroup = group;
            }
            if (translationGroup) {
                translationString = translations[translationGroup];
                if (translationString instanceof Object) {
                    translationString = translationString[translationKey];
                }
            }
            if (!translationString) {
                translationString = typeof translations[translationKey] === 'string' && translations[translationKey] || translationKey;
            }
            return translationString;
        }
    }, {
        key: '_runCustomFormatters',
        value: function _runCustomFormatters(config, type, format, value) {
            var formatted = null;
            if (config.standardFormatters) {
                var formatters = config.standardFormatters[type];
                if (formatters) {
                    var formatter = formatters[format];
                    if (formatter) {
                        formatted = formatter(config.locales, config[type], value);
                    }
                }
            }
            return formatted;
        }
    }, {
        key: '_extractTypeInfo',
        value: function _extractTypeInfo(literal) {
            var typeInfo = this.typeInfoCache[literal];
            if (typeInfo) {
                return typeInfo;
            }
            var match = typeInfoRegex.exec(literal);
            if (match) {
                typeInfo = { type: match[1], options: match[3] };
            } else {
                typeInfo = { type: 's', options: '' };
            }
            this.typeInfoCache[literal] = typeInfo;
            return typeInfo;
        }
    }, {
        key: '_localize',
        value: function _localize(config, value, _ref2) {
            var type = _ref2.type,
                options = _ref2.options;

            var localizer = this._localizers[type];
            if (localizer) {
                return localizer(config, value, options);
            }
            throw new Error('Type \'' + type + '\' is not supported. Supported types are: ' + Object.keys(this._localizers).join());
        }

        // e.g. this._buildKey(['', ' has ', ':c in the']) == '{0} has {1} in the bank'

    }, {
        key: '_buildKey',
        value: function _buildKey(literals) {
            var cacheKey = literals.join();
            var cachedKey = this.keyCache[cacheKey];
            if (cachedKey) {
                return cachedKey;
            }

            var stripType = function stripType(s) {
                return s.replace(typeInfoRegex, '');
            };
            var lastPartialKey = stripType(literals[literals.length - 1]);
            var prependPartialKey = function prependPartialKey(memo, curr, i) {
                return stripType(curr) + '${' + i + '}' + memo;
            };

            var key = literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey).replace(/\r\n/g, '\n');
            this.keyCache[cacheKey] = key;
            return key;
        }

        // e.g. this._formatStrings('{0} {1}!', 'hello', 'world') == 'hello world!'

    }, {
        key: '_buildMessage',
        value: function _buildMessage(str) {
            for (var _len3 = arguments.length, values = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                values[_key3 - 1] = arguments[_key3];
            }

            return str.replace(/\${(\d)}/g, function (_, index) {
                return values[Number(index)];
            });
        }
    }]);

    return Tag;
}();

var i18ntag = new Tag();
var i18nConfig = i18ntag.i18nConfig;


var i18n = function i18n(literals) {
    for (var _len4 = arguments.length, values = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        values[_key4 - 1] = arguments[_key4];
    }

    if (typeof literals === 'string') {
        if (values.length && typeof values[0] === 'string') {
            var delegate = function delegate(lit) {
                for (var _len5 = arguments.length, val = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                    val[_key5 - 1] = arguments[_key5];
                }

                return i18ntag.i18n.apply(i18ntag, [literals, values[0], lit].concat(val));
            };
            delegate.translate = function (key) {
                for (var _len6 = arguments.length, val = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                    val[_key6 - 1] = arguments[_key6];
                }

                return i18ntag.translate.apply(i18ntag, [literals, values[0], key].concat(val));
            };
            return delegate;
        } else {
            var _delegate = function _delegate(lit) {
                for (var _len7 = arguments.length, val = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                    val[_key7 - 1] = arguments[_key7];
                }

                return i18ntag.i18n.apply(i18ntag, [literals, null, lit].concat(val));
            };
            _delegate.translate = function (key) {
                for (var _len8 = arguments.length, val = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
                    val[_key8 - 1] = arguments[_key8];
                }

                return i18ntag.translate.apply(i18ntag, [literals, null, key].concat(val));
            };
            return _delegate;
        }
    } else {
        return i18ntag.i18n.apply(i18ntag, [null, null, literals].concat(values));
    }
};

i18n.translate = function (key) {
    for (var _len9 = arguments.length, values = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        values[_key9 - 1] = arguments[_key9];
    }

    return i18ntag.translate.apply(i18ntag, [null, null, key].concat(values));
};

var i18nGroup = function i18nGroup(group, config) {
    return function (target) {
        target.prototype.i18n = function (literals) {
            for (var _len10 = arguments.length, values = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
                values[_key10 - 1] = arguments[_key10];
            }

            return i18n(group, config).apply(undefined, [literals].concat(values));
        };
        target.prototype.i18n.translate = function (key) {
            for (var _len11 = arguments.length, values = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
                values[_key11 - 1] = arguments[_key11];
            }

            return i18ntag.translate.apply(i18ntag, [group, config, key].concat(values));
        };
        return target;
    };
};

if (typeof window !== 'undefined') {
    window.i18n = i18n;
    window.i18nConfig = i18nConfig;
    window.i18nGroup = i18nGroup;
}

exports.default = i18n;
exports.i18nConfig = i18nConfig;
exports.i18nGroup = i18nGroup;
//# sourceMappingURL=index.js.map