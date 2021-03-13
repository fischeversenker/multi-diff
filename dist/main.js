"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diff = void 0;
function diff() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var propsMap = new Map();
    var hasNoId = function (object) { return object.id === undefined || object.id === null; };
    // make sure all given objects have an id
    if (objects.some(hasNoId)) {
        throw new Error('objects to diff need to have an id!');
    }
    // collect all properties from all objects
    objects.forEach(function (object) {
        Object.entries(object).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var set = propsMap.get(key);
            if (!set) {
                set = new Set();
            }
            set.add(value);
            propsMap.set(key, set);
        });
    });
    // filter all properties that exist in more than one shape (except the id)
    // yields an array of all properties in which the objects differ
    var differentProps = Array.from(propsMap)
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return value.size > 1 && key !== 'id';
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return key;
    });
    return differentProps.reduce(function (acc, prop) {
        acc[prop] = objects.reduce(function (propAcc, object) {
            propAcc[object.id] = object[prop];
            return propAcc;
        }, {});
        return acc;
    }, {});
}
exports.diff = diff;
exports.default = diff;
