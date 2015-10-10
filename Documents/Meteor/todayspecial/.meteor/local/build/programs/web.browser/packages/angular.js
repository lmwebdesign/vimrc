//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EJSON = Package.ejson.EJSON;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var _ = Package.underscore._;
var Session = Package.session.Session;
var Mongo = Package.mongo.Mongo;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/angular/packages/angular.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
(function(){                                                                                                         // 1
                                                                                                                     // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                            //     // 4
// packages/angular/lib/diff-array.js                                                                         //     // 5
//                                                                                                            //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                              //     // 8
'use strict';                                                                                                 // 1   // 9
                                                                                                              // 2   // 10
var module = angular.module('diffArray', ['getUpdates']);                                                     // 3   // 11
                                                                                                              // 4   // 12
module.factory('diffArray', ['getUpdates',                                                                    // 5   // 13
  function(getUpdates) {                                                                                      // 6   // 14
    var idStringify = LocalCollection._idStringify || Package['mongo-id'].MongoID.idStringify;                // 7   // 15
    var idParse = LocalCollection._idParse || Package['mongo-id'].MongoID.idParse;                            // 8   // 16
                                                                                                              // 9   // 17
    // Calculates the differences between `lastSeqArray` and                                                  // 10  // 18
    // `seqArray` and calls appropriate functions from `callbacks`.                                           // 11  // 19
    // Reuses Minimongo's diff algorithm implementation.                                                      // 12  // 20
    // XXX Should be replaced with the original diffArray function here:                                      // 13  // 21
    // https://github.com/meteor/meteor/blob/devel/packages/observe-sequence/observe_sequence.js#L152         // 14  // 22
    // When it will become nested as well, tracking here: https://github.com/meteor/meteor/issues/3764        // 15  // 23
    function diffArray(lastSeqArray, seqArray, callbacks, preventNestedDiff) {                                // 16  // 24
      preventNestedDiff = !!preventNestedDiff;                                                                // 17  // 25
                                                                                                              // 18  // 26
      var diffFn = Package.minimongo.LocalCollection._diffQueryOrderedChanges ||                              // 19  // 27
        Package['diff-sequence'].DiffSequence.diffQueryOrderedChanges;                                        // 20  // 28
                                                                                                              // 21  // 29
      var oldObjIds = [];                                                                                     // 22  // 30
      var newObjIds = [];                                                                                     // 23  // 31
      var posOld = {}; // maps from idStringify'd ids                                                         // 24  // 32
      var posNew = {}; // ditto                                                                               // 25  // 33
      var posCur = {};                                                                                        // 26  // 34
      var lengthCur = lastSeqArray.length;                                                                    // 27  // 35
                                                                                                              // 28  // 36
      _.each(seqArray, function (doc, i) {                                                                    // 29  // 37
        newObjIds.push({_id: doc._id});                                                                       // 30  // 38
        posNew[idStringify(doc._id)] = i;                                                                     // 31  // 39
      });                                                                                                     // 32  // 40
                                                                                                              // 33  // 41
      _.each(lastSeqArray, function (doc, i) {                                                                // 34  // 42
        oldObjIds.push({_id: doc._id});                                                                       // 35  // 43
        posOld[idStringify(doc._id)] = i;                                                                     // 36  // 44
        posCur[idStringify(doc._id)] = i;                                                                     // 37  // 45
      });                                                                                                     // 38  // 46
                                                                                                              // 39  // 47
      // Arrays can contain arbitrary objects. We don't diff the                                              // 40  // 48
      // objects. Instead we always fire 'changedAt' callback on every                                        // 41  // 49
      // object. The consumer of `observe-sequence` should deal with                                          // 42  // 50
      // it appropriately.                                                                                    // 43  // 51
      diffFn(oldObjIds, newObjIds, {                                                                          // 44  // 52
        addedBefore: function (id, doc, before) {                                                             // 45  // 53
          var position = before ? posCur[idStringify(before)] : lengthCur;                                    // 46  // 54
                                                                                                              // 47  // 55
          _.each(posCur, function (pos, id) {                                                                 // 48  // 56
            if (pos >= position) posCur[id]++;                                                                // 49  // 57
          });                                                                                                 // 50  // 58
                                                                                                              // 51  // 59
          lengthCur++;                                                                                        // 52  // 60
          posCur[idStringify(id)] = position;                                                                 // 53  // 61
                                                                                                              // 54  // 62
          callbacks.addedAt(                                                                                  // 55  // 63
            id,                                                                                               // 56  // 64
            seqArray[posNew[idStringify(id)]],                                                                // 57  // 65
            position,                                                                                         // 58  // 66
            before                                                                                            // 59  // 67
          );                                                                                                  // 60  // 68
        },                                                                                                    // 61  // 69
                                                                                                              // 62  // 70
        movedBefore: function (id, before) {                                                                  // 63  // 71
          var prevPosition = posCur[idStringify(id)];                                                         // 64  // 72
          var position = before ? posCur[idStringify(before)] : lengthCur - 1;                                // 65  // 73
                                                                                                              // 66  // 74
          _.each(posCur, function (pos, id) {                                                                 // 67  // 75
            if (pos >= prevPosition && pos <= position)                                                       // 68  // 76
              posCur[id]--;                                                                                   // 69  // 77
            else if (pos <= prevPosition && pos >= position)                                                  // 70  // 78
              posCur[id]++;                                                                                   // 71  // 79
          });                                                                                                 // 72  // 80
                                                                                                              // 73  // 81
          posCur[idStringify(id)] = position;                                                                 // 74  // 82
                                                                                                              // 75  // 83
          callbacks.movedTo(                                                                                  // 76  // 84
            id,                                                                                               // 77  // 85
            seqArray[posNew[idStringify(id)]],                                                                // 78  // 86
            prevPosition,                                                                                     // 79  // 87
            position,                                                                                         // 80  // 88
            before                                                                                            // 81  // 89
          );                                                                                                  // 82  // 90
        },                                                                                                    // 83  // 91
        removed: function (id) {                                                                              // 84  // 92
          var prevPosition = posCur[idStringify(id)];                                                         // 85  // 93
                                                                                                              // 86  // 94
          _.each(posCur, function (pos, id) {                                                                 // 87  // 95
            if (pos >= prevPosition) posCur[id]--;                                                            // 88  // 96
          });                                                                                                 // 89  // 97
                                                                                                              // 90  // 98
          delete posCur[idStringify(id)];                                                                     // 91  // 99
          lengthCur--;                                                                                        // 92  // 100
                                                                                                              // 93  // 101
          callbacks.removedAt(                                                                                // 94  // 102
            id,                                                                                               // 95  // 103
            lastSeqArray[posOld[idStringify(id)]],                                                            // 96  // 104
            prevPosition                                                                                      // 97  // 105
          );                                                                                                  // 98  // 106
        }                                                                                                     // 99  // 107
      });                                                                                                     // 100
                                                                                                              // 101
      _.each(posNew, function (pos, idString) {                                                               // 102
        if (!_.has(posOld, idString)) return;                                                                 // 103
                                                                                                              // 104
        var id = idParse(idString);                                                                           // 105
        var newItem = seqArray[pos] || {};                                                                    // 106
        var oldItem = lastSeqArray[posOld[idString]];                                                         // 107
        var updates = getUpdates(oldItem, newItem, preventNestedDiff);                                        // 108
        var setDiff = updates.$set;                                                                           // 109
        var unsetDiff = updates.$unset;                                                                       // 110
                                                                                                              // 111
        if (setDiff)                                                                                          // 112
          setDiff._id = newItem._id;                                                                          // 113
                                                                                                              // 114
        if (unsetDiff)                                                                                        // 115
          unsetDiff._id = newItem._id;                                                                        // 116
                                                                                                              // 117
        if (setDiff || unsetDiff)                                                                             // 118
          callbacks.changedAt(id, setDiff, unsetDiff, pos, oldItem);                                          // 119
      });                                                                                                     // 120
    }                                                                                                         // 121
                                                                                                              // 122
    diffArray.deepCopyChanges = function (oldItem, newItem) {                                                 // 123
      var setDiff = getUpdates(oldItem, newItem).$set;                                                        // 124
                                                                                                              // 125
      _.each(setDiff, function(v, deepKey) {                                                                  // 126
        setDeep(oldItem, deepKey, v);                                                                         // 127
      });                                                                                                     // 128
    };                                                                                                        // 129
                                                                                                              // 130
    diffArray.deepCopyRemovals = function (oldItem, newItem) {                                                // 131
      var unsetDiff = getUpdates(oldItem, newItem).$unset;                                                    // 132
                                                                                                              // 133
      _.each(unsetDiff, function(v, deepKey) {                                                                // 134
        unsetDeep(oldItem, deepKey);                                                                          // 135
      });                                                                                                     // 136
    };                                                                                                        // 137
                                                                                                              // 138
    var setDeep = function(obj, deepKey, v) {                                                                 // 139
      var split = deepKey.split('.');                                                                         // 140
      var initialKeys = _.initial(split);                                                                     // 141
      var lastKey = _.last(split);                                                                            // 142
                                                                                                              // 143
      initialKeys.reduce(function(subObj, k, i) {                                                             // 144
        var nextKey = split[i + 1];                                                                           // 145
                                                                                                              // 146
        if (isNumStr(nextKey)) {                                                                              // 147
          if (subObj[k] == null) subObj[k] = [];                                                              // 148
          if (subObj[k].length == parseInt(nextKey)) subObj[k].push(null);                                    // 149
        }                                                                                                     // 150
                                                                                                              // 151
        else if (subObj[k] == null || !isHash(subObj[k])) {                                                   // 152
          subObj[k] = {};                                                                                     // 153
        }                                                                                                     // 154
                                                                                                              // 155
        return subObj[k];                                                                                     // 156
      }, obj);                                                                                                // 157
                                                                                                              // 158
      getDeep(obj, initialKeys)[lastKey] = v;                                                                 // 159
      return v;                                                                                               // 160
    };                                                                                                        // 161
                                                                                                              // 162
    var unsetDeep = function(obj, deepKey) {                                                                  // 163
      var split = deepKey.split('.');                                                                         // 164
      var initialKeys = _.initial(split);                                                                     // 165
      var lastKey = _.last(split);                                                                            // 166
      return delete getDeep(obj, initialKeys)[lastKey];                                                       // 167
    };                                                                                                        // 168
                                                                                                              // 169
    var getDeep = function(obj, keys) {                                                                       // 170
      return keys.reduce(function(subObj, k) {                                                                // 171
        return subObj[k];                                                                                     // 172
      }, obj);                                                                                                // 173
    };                                                                                                        // 174
                                                                                                              // 175
    var isHash = function(obj) {                                                                              // 176
      return _.isObject(obj) &&                                                                               // 177
             Object.getPrototypeOf(obj) === Object.prototype;                                                 // 178
    };                                                                                                        // 179
                                                                                                              // 180
    var isNumStr = function(str) {                                                                            // 181
      return str.match(/^\d+$/);                                                                              // 182
    };                                                                                                        // 183
                                                                                                              // 184
    return diffArray;                                                                                         // 185
}]);                                                                                                          // 186
                                                                                                              // 187
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 196
                                                                                                                     // 197
}).call(this);                                                                                                       // 198
                                                                                                                     // 199
                                                                                                                     // 200
                                                                                                                     // 201
                                                                                                                     // 202
                                                                                                                     // 203
                                                                                                                     // 204
(function(){                                                                                                         // 205
                                                                                                                     // 206
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 207
//                                                                                                            //     // 208
// packages/angular/lib/get-updates.js                                                                        //     // 209
//                                                                                                            //     // 210
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 211
                                                                                                              //     // 212
'use strict';                                                                                                 // 1   // 213
                                                                                                              // 2   // 214
// https://github.com/DAB0mB/get-updates                                                                      // 3   // 215
(function() {                                                                                                 // 4   // 216
  var module = angular.module('getUpdates', []);                                                              // 5   // 217
                                                                                                              // 6   // 218
  var utils = (function() {                                                                                   // 7   // 219
    var rip = function(obj, level) {                                                                          // 8   // 220
      if (level < 1) return {};                                                                               // 9   // 221
                                                                                                              // 10  // 222
      return _.reduce(obj, function(clone, v, k) {                                                            // 11  // 223
        v = _.isObject(v) ? rip(v, --level) : v;                                                              // 12  // 224
        clone[k] = v;                                                                                         // 13  // 225
        return clone;                                                                                         // 14  // 226
      }, {});                                                                                                 // 15  // 227
    };                                                                                                        // 16  // 228
                                                                                                              // 17  // 229
    var toPaths = function(obj) {                                                                             // 18  // 230
      var keys = getKeyPaths(obj);                                                                            // 19  // 231
      var values = getDeepValues(obj);                                                                        // 20  // 232
      return _.object(keys, values);                                                                          // 21  // 233
    };                                                                                                        // 22  // 234
                                                                                                              // 23  // 235
    var getKeyPaths = function(obj) {                                                                         // 24  // 236
      var keys = _.keys(obj).map(function(k) {                                                                // 25  // 237
        var v = obj[k];                                                                                       // 26  // 238
        if (!_.isObject(v) || _.isEmpty(v)) return k;                                                         // 27  // 239
                                                                                                              // 28  // 240
        return getKeyPaths(v).map(function(subKey) {                                                          // 29  // 241
          return k + '.' + subKey;                                                                            // 30  // 242
        });                                                                                                   // 31  // 243
      });                                                                                                     // 32  // 244
                                                                                                              // 33  // 245
      return _.flatten(keys);                                                                                 // 34  // 246
    };                                                                                                        // 35  // 247
                                                                                                              // 36  // 248
    var getDeepValues = function(obj) {                                                                       // 37  // 249
      var values = _.values(obj).map(function(v) {                                                            // 38  // 250
        if (!_.isObject(v) || _.isEmpty(v))                                                                   // 39  // 251
          return v;                                                                                           // 40  // 252
        else                                                                                                  // 41  // 253
          return getDeepValues(v);                                                                            // 42  // 254
      });                                                                                                     // 43  // 255
                                                                                                              // 44  // 256
      return flatten(values);                                                                                 // 45  // 257
    };                                                                                                        // 46  // 258
                                                                                                              // 47  // 259
    var flatten = function(arr) {                                                                             // 48  // 260
      return arr.reduce(function(flattened, v, i) {                                                           // 49  // 261
        if (_.isArray(v) && !_.isEmpty(v))                                                                    // 50  // 262
          flattened.push.apply(flattened, flatten(v));                                                        // 51  // 263
        else                                                                                                  // 52  // 264
          flattened.push(v);                                                                                  // 53  // 265
                                                                                                              // 54  // 266
        return flattened;                                                                                     // 55  // 267
      }, []);                                                                                                 // 56  // 268
    };                                                                                                        // 57  // 269
                                                                                                              // 58  // 270
    var setFilled = function(obj, k, v) {                                                                     // 59  // 271
      if (!_.isEmpty(v)) obj[k] = v;                                                                          // 60  // 272
    };                                                                                                        // 61  // 273
                                                                                                              // 62  // 274
    var assert = function(result, msg) {                                                                      // 63  // 275
      if (!result) throwErr(msg);                                                                             // 64  // 276
    };                                                                                                        // 65  // 277
                                                                                                              // 66  // 278
    var throwErr = function(msg) {                                                                            // 67  // 279
      throw Error('get-updates error - ' + msg);                                                              // 68  // 280
    };                                                                                                        // 69  // 281
                                                                                                              // 70  // 282
    return {                                                                                                  // 71  // 283
      rip: rip,                                                                                               // 72  // 284
      toPaths: toPaths,                                                                                       // 73  // 285
      getKeyPaths: getKeyPaths,                                                                               // 74  // 286
      getDeepValues: getDeepValues,                                                                           // 75  // 287
      setFilled: setFilled,                                                                                   // 76  // 288
      assert: assert,                                                                                         // 77  // 289
      throwErr: throwErr                                                                                      // 78  // 290
    };                                                                                                        // 79  // 291
  })();                                                                                                       // 80  // 292
                                                                                                              // 81  // 293
  var getDifference = (function() {                                                                           // 82  // 294
    var getDifference = function(src, dst, isShallow) {                                                       // 83  // 295
      var level;                                                                                              // 84  // 296
                                                                                                              // 85  // 297
      if (isShallow > 1)                                                                                      // 86  // 298
        level = isShallow;                                                                                    // 87  // 299
      else if (isShallow)                                                                                     // 88  // 300
        level = 1;                                                                                            // 89  // 301
                                                                                                              // 90  // 302
      if (level) {                                                                                            // 91  // 303
        src = utils.rip(src, level);                                                                          // 92  // 304
        dst = utils.rip(dst, level);                                                                          // 93  // 305
      }                                                                                                       // 94  // 306
                                                                                                              // 95  // 307
      return compare(src, dst);                                                                               // 96  // 308
    };                                                                                                        // 97  // 309
                                                                                                              // 98  // 310
    var compare = function(src, dst) {                                                                        // 99  // 311
      var srcKeys = _.keys(src);                                                                              // 100
      var dstKeys = _.keys(dst);                                                                              // 101
                                                                                                              // 102
      var keys = _.chain([])                                                                                  // 103
        .concat(srcKeys)                                                                                      // 104
        .concat(dstKeys)                                                                                      // 105
        .uniq()                                                                                               // 106
        .without('$$hashKey')                                                                                 // 107
        .value();                                                                                             // 108
                                                                                                              // 109
      return keys.reduce(function(diff, k) {                                                                  // 110
        var srcValue = src[k];                                                                                // 111
        var dstValue = dst[k];                                                                                // 112
                                                                                                              // 113
        if (_.isDate(srcValue) && _.isDate(dstValue)) {                                                       // 114
          if (srcValue.getTime() != dstValue.getTime()) diff[k] = dstValue;                                   // 115
        }                                                                                                     // 116
                                                                                                              // 117
        if (_.isObject(srcValue) && _.isObject(dstValue)) {                                                   // 118
          var valueDiff = getDifference(srcValue, dstValue);                                                  // 119
          utils.setFilled(diff, k, valueDiff);                                                                // 120
        }                                                                                                     // 121
                                                                                                              // 122
        else if (srcValue !== dstValue) {                                                                     // 123
          diff[k] = dstValue;                                                                                 // 124
        }                                                                                                     // 125
                                                                                                              // 126
        return diff;                                                                                          // 127
      }, {});                                                                                                 // 128
    };                                                                                                        // 129
                                                                                                              // 130
    return getDifference;                                                                                     // 131
  })();                                                                                                       // 132
                                                                                                              // 133
  var getUpdates = (function() {                                                                              // 134
    var getUpdates = function(src, dst, isShallow) {                                                          // 135
      utils.assert(_.isObject(src), 'first argument must be an object');                                      // 136
      utils.assert(_.isObject(dst), 'second argument must be an object');                                     // 137
                                                                                                              // 138
      var diff = getDifference(src, dst, isShallow);                                                          // 139
      var paths = utils.toPaths(diff);                                                                        // 140
                                                                                                              // 141
      var set = createSet(paths);                                                                             // 142
      var unset = createUnset(paths);                                                                         // 143
      var pull = createPull(unset);                                                                           // 144
                                                                                                              // 145
      var updates = {};                                                                                       // 146
      utils.setFilled(updates, '$set', set);                                                                  // 147
      utils.setFilled(updates, '$unset', unset);                                                              // 148
      utils.setFilled(updates, '$pull', pull);                                                                // 149
                                                                                                              // 150
      return updates;                                                                                         // 151
    };                                                                                                        // 152
                                                                                                              // 153
    var createSet = function(paths) {                                                                         // 154
      var undefinedKeys = getUndefinedKeys(paths);                                                            // 155
      return _.omit(paths, undefinedKeys);                                                                    // 156
    };                                                                                                        // 157
                                                                                                              // 158
    var createUnset = function(paths) {                                                                       // 159
      var undefinedKeys = getUndefinedKeys(paths);                                                            // 160
      var unset = _.pick(paths, undefinedKeys);                                                               // 161
                                                                                                              // 162
      return _.reduce(unset, function(result, v, k) {                                                         // 163
        result[k] = true;                                                                                     // 164
        return result;                                                                                        // 165
      }, {});                                                                                                 // 166
    };                                                                                                        // 167
                                                                                                              // 168
    var createPull = function(unset) {                                                                        // 169
      var arrKeyPaths = _.keys(unset).map(function(k) {                                                       // 170
        var split = k.match(/(.*)\.\d+$/);                                                                    // 171
        return split && split[1];                                                                             // 172
      });                                                                                                     // 173
                                                                                                              // 174
      return _.compact(arrKeyPaths).reduce(function(pull, k) {                                                // 175
        pull[k] = null;                                                                                       // 176
        return pull;                                                                                          // 177
      }, {});                                                                                                 // 178
    };                                                                                                        // 179
                                                                                                              // 180
    var getUndefinedKeys = function(obj) {                                                                    // 181
      return _.keys(obj).filter(function (k) {                                                                // 182
        var v = obj[k];                                                                                       // 183
        return _.isUndefined(v);                                                                              // 184
      });                                                                                                     // 185
    };                                                                                                        // 186
                                                                                                              // 187
    return getUpdates;                                                                                        // 188
  })();                                                                                                       // 189
                                                                                                              // 190
  module.value('getUpdates', getUpdates);                                                                     // 191
})();                                                                                                         // 192
                                                                                                              // 193
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 406
                                                                                                                     // 407
}).call(this);                                                                                                       // 408
                                                                                                                     // 409
                                                                                                                     // 410
                                                                                                                     // 411
                                                                                                                     // 412
                                                                                                                     // 413
                                                                                                                     // 414
(function(){                                                                                                         // 415
                                                                                                                     // 416
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 417
//                                                                                                            //     // 418
// packages/angular/modules/angular-meteor-subscribe.js                                                       //     // 419
//                                                                                                            //     // 420
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 421
                                                                                                              //     // 422
'use strict';                                                                                                 // 1   // 423
var angularMeteorSubscribe = angular.module('angular-meteor.subscribe', []);                                  // 2   // 424
                                                                                                              // 3   // 425
angularMeteorSubscribe.service('$meteorSubscribe', ['$q',                                                     // 4   // 426
  function ($q) {                                                                                             // 5   // 427
    var self = this;                                                                                          // 6   // 428
                                                                                                              // 7   // 429
    this._subscribe = function(scope, deferred, args) {                                                       // 8   // 430
      var subscription = null;                                                                                // 9   // 431
      var lastArg = args[args.length - 1];                                                                    // 10  // 432
                                                                                                              // 11  // 433
      // User supplied onStop callback                                                                        // 12  // 434
      // save it for later use and remove                                                                     // 13  // 435
      // from subscription arguments                                                                          // 14  // 436
      if (angular.isObject(lastArg) &&                                                                        // 15  // 437
          angular.isFunction(lastArg.onStop)) {                                                               // 16  // 438
        var onStop = lastArg.onStop;                                                                          // 17  // 439
                                                                                                              // 18  // 440
        args.pop();                                                                                           // 19  // 441
      }                                                                                                       // 20  // 442
                                                                                                              // 21  // 443
      args.push({                                                                                             // 22  // 444
        onReady: function() {                                                                                 // 23  // 445
          deferred.resolve(subscription);                                                                     // 24  // 446
        },                                                                                                    // 25  // 447
        onStop: function(err) {                                                                               // 26  // 448
          if (!deferred.promise.$$state.status) {                                                             // 27  // 449
            if (err)                                                                                          // 28  // 450
              deferred.reject(err);                                                                           // 29  // 451
            else                                                                                              // 30  // 452
              deferred.reject(new Meteor.Error("Subscription Stopped",                                        // 31  // 453
                "Subscription stopped by a call to stop method. Either by the client or by the server."));    // 32  // 454
          } else if (onStop)                                                                                  // 33  // 455
            // After promise was resolved or rejected                                                         // 34  // 456
            // call user supplied onStop callback.                                                            // 35  // 457
            onStop.apply(this, Array.prototype.slice.call(arguments));                                        // 36  // 458
                                                                                                              // 37  // 459
        }                                                                                                     // 38  // 460
      });                                                                                                     // 39  // 461
                                                                                                              // 40  // 462
      subscription =  Meteor.subscribe.apply(scope, args);                                                    // 41  // 463
                                                                                                              // 42  // 464
      return subscription;                                                                                    // 43  // 465
    };                                                                                                        // 44  // 466
                                                                                                              // 45  // 467
    this.subscribe = function(){                                                                              // 46  // 468
      var deferred = $q.defer();                                                                              // 47  // 469
      var args = Array.prototype.slice.call(arguments);                                                       // 48  // 470
      var subscription = null;                                                                                // 49  // 471
                                                                                                              // 50  // 472
      self._subscribe(this, deferred, args);                                                                  // 51  // 473
                                                                                                              // 52  // 474
      return deferred.promise;                                                                                // 53  // 475
    };                                                                                                        // 54  // 476
  }]);                                                                                                        // 55  // 477
                                                                                                              // 56  // 478
angularMeteorSubscribe.run(['$rootScope', '$q', '$meteorSubscribe',                                           // 57  // 479
  function($rootScope, $q, $meteorSubscribe) {                                                                // 58  // 480
    Object.getPrototypeOf($rootScope).$meteorSubscribe = function() {                                         // 59  // 481
      var deferred = $q.defer();                                                                              // 60  // 482
      var args = Array.prototype.slice.call(arguments);                                                       // 61  // 483
                                                                                                              // 62  // 484
      var subscription = $meteorSubscribe._subscribe(this, deferred, args);                                   // 63  // 485
                                                                                                              // 64  // 486
      this.$on('$destroy', function() {                                                                       // 65  // 487
        subscription.stop();                                                                                  // 66  // 488
      });                                                                                                     // 67  // 489
                                                                                                              // 68  // 490
      return deferred.promise;                                                                                // 69  // 491
    };                                                                                                        // 70  // 492
}]);                                                                                                          // 71  // 493
                                                                                                              // 72  // 494
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 495
                                                                                                                     // 496
}).call(this);                                                                                                       // 497
                                                                                                                     // 498
                                                                                                                     // 499
                                                                                                                     // 500
                                                                                                                     // 501
                                                                                                                     // 502
                                                                                                                     // 503
(function(){                                                                                                         // 504
                                                                                                                     // 505
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 506
//                                                                                                            //     // 507
// packages/angular/modules/angular-meteor-stopper.js                                                         //     // 508
//                                                                                                            //     // 509
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 510
                                                                                                              //     // 511
'use strict';                                                                                                 // 1   // 512
                                                                                                              // 2   // 513
var angularMeteorStopper = angular.module('angular-meteor.stopper',                                           // 3   // 514
  ['angular-meteor.subscribe']);                                                                              // 4   // 515
                                                                                                              // 5   // 516
angularMeteorStopper.factory('$meteorStopper', ['$q', '$meteorSubscribe',                                     // 6   // 517
  function($q, $meteorSubscribe) {                                                                            // 7   // 518
    function $meteorStopper($meteorEntity) {                                                                  // 8   // 519
      return function() {                                                                                     // 9   // 520
        var args = Array.prototype.slice.call(arguments);                                                     // 10  // 521
        var meteorEntity = $meteorEntity.apply(this, args);                                                   // 11  // 522
                                                                                                              // 12  // 523
        angular.extend(meteorEntity, $meteorStopper);                                                         // 13  // 524
        meteorEntity.$$scope = this;                                                                          // 14  // 525
                                                                                                              // 15  // 526
        this.$on('$destroy', function () {                                                                    // 16  // 527
          meteorEntity.stop();                                                                                // 17  // 528
          if (meteorEntity.subscription) meteorEntity.subscription.stop();                                    // 18  // 529
        });                                                                                                   // 19  // 530
                                                                                                              // 20  // 531
        return meteorEntity;                                                                                  // 21  // 532
      };                                                                                                      // 22  // 533
    }                                                                                                         // 23  // 534
                                                                                                              // 24  // 535
    $meteorStopper.subscribe = function() {                                                                   // 25  // 536
      var args = Array.prototype.slice.call(arguments);                                                       // 26  // 537
      this.subscription = $meteorSubscribe._subscribe(this.$$scope, $q.defer(), args);                        // 27  // 538
      return this;                                                                                            // 28  // 539
    };                                                                                                        // 29  // 540
                                                                                                              // 30  // 541
    return $meteorStopper;                                                                                    // 31  // 542
}]);                                                                                                          // 32  // 543
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 544
                                                                                                                     // 545
}).call(this);                                                                                                       // 546
                                                                                                                     // 547
                                                                                                                     // 548
                                                                                                                     // 549
                                                                                                                     // 550
                                                                                                                     // 551
                                                                                                                     // 552
(function(){                                                                                                         // 553
                                                                                                                     // 554
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 555
//                                                                                                            //     // 556
// packages/angular/modules/angular-meteor-collection.js                                                      //     // 557
//                                                                                                            //     // 558
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 559
                                                                                                              //     // 560
'use strict';                                                                                                 // 1   // 561
                                                                                                              // 2   // 562
var angularMeteorCollection = angular.module('angular-meteor.collection',                                     // 3   // 563
  ['angular-meteor.stopper', 'angular-meteor.subscribe', 'angular-meteor.utils', 'diffArray']);               // 4   // 564
                                                                                                              // 5   // 565
// The reason angular meteor collection is a factory function and not something                               // 6   // 566
// that inherit from array comes from here:                                                                   // 7   // 567
// http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/                     // 8   // 568
// We went with the direct extensions approach.                                                               // 9   // 569
angularMeteorCollection.factory('AngularMeteorCollection', [                                                  // 10  // 570
  '$q', '$meteorSubscribe', '$meteorUtils', '$rootScope', '$timeout', 'diffArray',                            // 11  // 571
  function($q, $meteorSubscribe, $meteorUtils, $rootScope, $timeout, diffArray) {                             // 12  // 572
    function AngularMeteorCollection(curDefFunc, collection, diffArrayFunc, autoClientSave) {                 // 13  // 573
      var data = [];                                                                                          // 14  // 574
      // Server backup data to evaluate what changes come from client                                         // 15  // 575
      // after each server update.                                                                            // 16  // 576
      data._serverBackup = [];                                                                                // 17  // 577
      // Array differ function.                                                                               // 18  // 578
      data._diffArrayFunc = diffArrayFunc;                                                                    // 19  // 579
      // Handler of the cursor observer.                                                                      // 20  // 580
      data._hObserve = null;                                                                                  // 21  // 581
      // On new cursor autorun handler                                                                        // 22  // 582
      // (autorun for reactive variables).                                                                    // 23  // 583
      data._hNewCurAutorun = null;                                                                            // 24  // 584
      // On new data autorun handler                                                                          // 25  // 585
      // (autorun for cursor.fetch).                                                                          // 26  // 586
      data._hDataAutorun = null;                                                                              // 27  // 587
                                                                                                              // 28  // 588
      if (angular.isDefined(collection)) {                                                                    // 29  // 589
        data.$$collection = collection;                                                                       // 30  // 590
      } else {                                                                                                // 31  // 591
        var cursor = curDefFunc();                                                                            // 32  // 592
        data.$$collection = $meteorUtils.getCollectionByName(cursor.collection.name);                         // 33  // 593
      }                                                                                                       // 34  // 594
                                                                                                              // 35  // 595
      angular.extend(data, AngularMeteorCollection);                                                          // 36  // 596
      data._startCurAutorun(curDefFunc, autoClientSave);                                                      // 37  // 597
                                                                                                              // 38  // 598
      return data;                                                                                            // 39  // 599
    }                                                                                                         // 40  // 600
                                                                                                              // 41  // 601
    AngularMeteorCollection._startCurAutorun = function(curDefFunc, autoClientSave) {                         // 42  // 602
      var self = this;                                                                                        // 43  // 603
      self._hNewCurAutorun = Tracker.autorun(function() {                                                     // 44  // 604
        // When the reactive func gets recomputated we need to stop any previous                              // 45  // 605
        // observeChanges.                                                                                    // 46  // 606
        Tracker.onInvalidate(function() {                                                                     // 47  // 607
          self._stopCursor();                                                                                 // 48  // 608
        });                                                                                                   // 49  // 609
        if (autoClientSave) {                                                                                 // 50  // 610
          self._setAutoClientSave();                                                                          // 51  // 611
        }                                                                                                     // 52  // 612
        self._updateCursor(curDefFunc(), autoClientSave);                                                     // 53  // 613
      });                                                                                                     // 54  // 614
    };                                                                                                        // 55  // 615
                                                                                                              // 56  // 616
    AngularMeteorCollection.subscribe = function() {                                                          // 57  // 617
      $meteorSubscribe.subscribe.apply(this, arguments);                                                      // 58  // 618
      return this;                                                                                            // 59  // 619
    };                                                                                                        // 60  // 620
                                                                                                              // 61  // 621
    AngularMeteorCollection.save = function(docs, useUnsetModifier) {                                         // 62  // 622
      // save whole collection                                                                                // 63  // 623
      if (!docs) docs = this;                                                                                 // 64  // 624
      // save single doc                                                                                      // 65  // 625
      docs = [].concat(docs);                                                                                 // 66  // 626
                                                                                                              // 67  // 627
      var promises = docs.map(function(doc) {                                                                 // 68  // 628
        return this._upsertDoc(doc, useUnsetModifier);                                                        // 69  // 629
      }, this);                                                                                               // 70  // 630
                                                                                                              // 71  // 631
      var allPromise = $q.all(promises);                                                                      // 72  // 632
                                                                                                              // 73  // 633
      allPromise.finally(function() {                                                                         // 74  // 634
        // calls digestion loop with no conflicts                                                             // 75  // 635
        $timeout(angular.noop);                                                                               // 76  // 636
      });                                                                                                     // 77  // 637
                                                                                                              // 78  // 638
      return allPromise;                                                                                      // 79  // 639
    };                                                                                                        // 80  // 640
                                                                                                              // 81  // 641
    AngularMeteorCollection._upsertDoc = function(doc, useUnsetModifier) {                                    // 82  // 642
      var deferred = $q.defer();                                                                              // 83  // 643
      var collection = this.$$collection;                                                                     // 84  // 644
      var upsertResult = function(action, _id) {                                                              // 85  // 645
        return {_id: _id, action: action }                                                                    // 86  // 646
      }                                                                                                       // 87  // 647
      var fulfill, createFulfill;                                                                             // 88  // 648
                                                                                                              // 89  // 649
      // delete $$hashkey                                                                                     // 90  // 650
      doc = $meteorUtils.stripDollarPrefixedKeys(doc);                                                        // 91  // 651
      var docId = doc._id;                                                                                    // 92  // 652
      var isExist = collection.findOne(docId);                                                                // 93  // 653
                                                                                                              // 94  // 654
      // update                                                                                               // 95  // 655
      if (isExist) {                                                                                          // 96  // 656
        // Deletes _id property (from the copy) so that                                                       // 97  // 657
        // it can be $set using update.                                                                       // 98  // 658
        delete doc._id;                                                                                       // 99  // 659
        var modifier = useUnsetModifier ? {$unset: doc} : {$set: doc};                                        // 100
        createFulfill = _.partial(upsertResult, 'updated');                                                   // 101
        fulfill = $meteorUtils.fulfill(deferred, null, createFulfill);                                        // 102
        // NOTE: do not use #upsert() method, since it does not exist in some collections                     // 103
        collection.update(docId, modifier, fulfill);                                                          // 104
      // insert                                                                                               // 105
      } else {                                                                                                // 106
        createFulfill = _.partial(upsertResult, 'inserted');                                                  // 107
        fulfill = $meteorUtils.fulfill(deferred, null, createFulfill);                                        // 108
        collection.insert(doc, fulfill);                                                                      // 109
      }                                                                                                       // 110
                                                                                                              // 111
      return deferred.promise;                                                                                // 112
    };                                                                                                        // 113
                                                                                                              // 114
    AngularMeteorCollection.remove = function(keyOrDocs) {                                                    // 115
      var keys;                                                                                               // 116
      // remove whole collection                                                                              // 117
      if (!keyOrDocs) {                                                                                       // 118
        keys = _.pluck(this, '_id');                                                                          // 119
      } else {                                                                                                // 120
        // remove docs                                                                                        // 121
        keys = _.map([].concat(keyOrDocs), function(keyOrDoc) {                                               // 122
          return keyOrDoc._id || keyOrDoc;                                                                    // 123
        });                                                                                                   // 124
      }                                                                                                       // 125
      // Checks if all keys are correct.                                                                      // 126
      check(keys, [Match.OneOf(String, Mongo.ObjectID)]);                                                     // 127
                                                                                                              // 128
      var promises = keys.map(function(key) {                                                                 // 129
        return this._removeDoc(key);                                                                          // 130
      }, this);                                                                                               // 131
                                                                                                              // 132
      var allPromise = $q.all(promises);                                                                      // 133
                                                                                                              // 134
      allPromise.finally(function() {                                                                         // 135
        $timeout(angular.noop);                                                                               // 136
      });                                                                                                     // 137
                                                                                                              // 138
      return allPromise;                                                                                      // 139
    };                                                                                                        // 140
                                                                                                              // 141
    AngularMeteorCollection._removeDoc = function(id) {                                                       // 142
      var deferred = $q.defer();                                                                              // 143
      var collection = this.$$collection;                                                                     // 144
      var fulfill = $meteorUtils.fulfill(deferred, null, { _id: id, action: 'removed' });                     // 145
      collection.remove(id, fulfill);                                                                         // 146
      return deferred.promise;                                                                                // 147
    };                                                                                                        // 148
                                                                                                              // 149
    AngularMeteorCollection._updateCursor = function(cursor, autoClientSave) {                                // 150
      var self = this;                                                                                        // 151
                                                                                                              // 152
      // XXX - consider adding an option for a non-orderd result                                              // 153
      // for faster performance.                                                                              // 154
      if (self._hObserve) {                                                                                   // 155
        self._hObserve.stop();                                                                                // 156
        self._hDataAutorun.stop();                                                                            // 157
      }                                                                                                       // 158
                                                                                                              // 159
      var serverMode = false;                                                                                 // 160
      function setServerUpdateMode(name) {                                                                    // 161
        serverMode = true;                                                                                    // 162
        // To simplify server update logic, we don't follow                                                   // 163
        // updates from the client at the same time.                                                          // 164
        self._unsetAutoClientSave();                                                                          // 165
      }                                                                                                       // 166
                                                                                                              // 167
      var hUnsetTimeout = null;                                                                               // 168
      // Here we use $timeout to combine multiple updates that go                                             // 169
      // each one after another.                                                                              // 170
      function unsetServerUpdateMode() {                                                                      // 171
        if (hUnsetTimeout) {                                                                                  // 172
          $timeout.cancel(hUnsetTimeout);                                                                     // 173
          hUnsetTimeout = null;                                                                               // 174
        }                                                                                                     // 175
        hUnsetTimeout = $timeout(function() {                                                                 // 176
          serverMode = false;                                                                                 // 177
          // Finds updates that was potentially done from the client side                                     // 178
          // and saves them.                                                                                  // 179
          var changes = collectionUtils.diff(self, self._serverBackup,                                        // 180
            self._diffArrayFunc);                                                                             // 181
          self._saveChanges(changes);                                                                         // 182
          // After, continues following client updates.                                                       // 183
          if (autoClientSave) {                                                                               // 184
            self._setAutoClientSave();                                                                        // 185
          }                                                                                                   // 186
        }, 0);                                                                                                // 187
      }                                                                                                       // 188
                                                                                                              // 189
      this._hObserve = cursor.observe({                                                                       // 190
        addedAt: function(doc, atIndex) {                                                                     // 191
          self.splice(atIndex, 0, doc);                                                                       // 192
          self._serverBackup.splice(atIndex, 0, doc);                                                         // 193
          setServerUpdateMode();                                                                              // 194
        },                                                                                                    // 195
                                                                                                              // 196
        changedAt: function(doc, oldDoc, atIndex) {                                                           // 197
          diffArray.deepCopyChanges(self[atIndex], doc);                                                      // 198
          diffArray.deepCopyRemovals(self[atIndex], doc);                                                     // 199
          self._serverBackup[atIndex] = self[atIndex];                                                        // 200
          setServerUpdateMode();                                                                              // 201
        },                                                                                                    // 202
                                                                                                              // 203
        movedTo: function(doc, fromIndex, toIndex) {                                                          // 204
          self.splice(fromIndex, 1);                                                                          // 205
          self.splice(toIndex, 0, doc);                                                                       // 206
          self._serverBackup.splice(fromIndex, 1);                                                            // 207
          self._serverBackup.splice(toIndex, 0, doc);                                                         // 208
          setServerUpdateMode();                                                                              // 209
        },                                                                                                    // 210
                                                                                                              // 211
        removedAt: function(oldDoc) {                                                                         // 212
          var removedIndex = collectionUtils.findIndexById(self, oldDoc);                                     // 213
                                                                                                              // 214
          if (removedIndex != -1) {                                                                           // 215
            self.splice(removedIndex, 1);                                                                     // 216
            self._serverBackup.splice(removedIndex, 1);                                                       // 217
            setServerUpdateMode();                                                                            // 218
          } else {                                                                                            // 219
            // If it's been removed on client then it's already not in collection                             // 220
            // itself but still is in the _serverBackup.                                                      // 221
            removedIndex = collectionUtils.findIndexById(self._serverBackup, oldDoc);                         // 222
                                                                                                              // 223
            if (removedIndex != -1) {                                                                         // 224
              self._serverBackup.splice(removedIndex, 1);                                                     // 225
            }                                                                                                 // 226
          }                                                                                                   // 227
        }                                                                                                     // 228
      });                                                                                                     // 229
                                                                                                              // 230
      this._hDataAutorun = Tracker.autorun(function() {                                                       // 231
        cursor.fetch();                                                                                       // 232
        if (serverMode) {                                                                                     // 233
          unsetServerUpdateMode();                                                                            // 234
        }                                                                                                     // 235
      });                                                                                                     // 236
    };                                                                                                        // 237
                                                                                                              // 238
    AngularMeteorCollection.stop = function() {                                                               // 239
      this._stopCursor();                                                                                     // 240
      this._hNewCurAutorun.stop();                                                                            // 241
    };                                                                                                        // 242
                                                                                                              // 243
    AngularMeteorCollection._stopCursor = function() {                                                        // 244
      this._unsetAutoClientSave();                                                                            // 245
                                                                                                              // 246
      if (this._hObserve) {                                                                                   // 247
        this._hObserve.stop();                                                                                // 248
        this._hDataAutorun.stop();                                                                            // 249
      }                                                                                                       // 250
                                                                                                              // 251
      this.splice(0);                                                                                         // 252
      this._serverBackup.splice(0);                                                                           // 253
    };                                                                                                        // 254
                                                                                                              // 255
    AngularMeteorCollection._unsetAutoClientSave = function(name) {                                           // 256
      if (this._hRegAutoBind) {                                                                               // 257
        this._hRegAutoBind();                                                                                 // 258
        this._hRegAutoBind = null;                                                                            // 259
      }                                                                                                       // 260
    };                                                                                                        // 261
                                                                                                              // 262
    AngularMeteorCollection._setAutoClientSave = function() {                                                 // 263
      var self = this;                                                                                        // 264
                                                                                                              // 265
      // Always unsets auto save to keep only one $watch handler.                                             // 266
      self._unsetAutoClientSave();                                                                            // 267
                                                                                                              // 268
      self._hRegAutoBind = $rootScope.$watch(function() {                                                     // 269
        return self;                                                                                          // 270
      }, function(nItems, oItems) {                                                                           // 271
        if (nItems === oItems) return;                                                                        // 272
                                                                                                              // 273
        self._unsetAutoClientSave();                                                                          // 274
        var changes = collectionUtils.diff(self, oItems,                                                      // 275
          self._diffArrayFunc);                                                                               // 276
        self._saveChanges(changes);                                                                           // 277
        self._setAutoClientSave();                                                                            // 278
      }, true);                                                                                               // 279
    };                                                                                                        // 280
                                                                                                              // 281
    AngularMeteorCollection._saveChanges = function(changes) {                                                // 282
      // First applies changes to the collection itself.                                                      // 283
      var newDocs = [];                                                                                       // 284
      for (var itemInd = changes.added.length - 1; itemInd >= 0; itemInd--) {                                 // 285
        this.splice(changes.added[itemInd].index, 1);                                                         // 286
        newDocs.push(changes.added[itemInd].item);                                                            // 287
      }                                                                                                       // 288
      // Then saves all new docs in bulk.                                                                     // 289
      if (newDocs.length) {                                                                                   // 290
        this.save(newDocs);                                                                                   // 291
      }                                                                                                       // 292
                                                                                                              // 293
      // Collects docs to remove.                                                                             // 294
      var removeDocs = [];                                                                                    // 295
      for (var itemInd = 0; itemInd < changes.removed.length; itemInd++) {                                    // 296
        removeDocs.push(changes.removed[itemInd].item);                                                       // 297
      }                                                                                                       // 298
      // Removes docs in bulk.                                                                                // 299
      if (removeDocs.length) {                                                                                // 300
        this.remove(removeDocs);                                                                              // 301
      }                                                                                                       // 302
                                                                                                              // 303
      // Collects set and unset changes.                                                                      // 304
      var setDocs = [], unsetDocs = [];                                                                       // 305
      for (var itemInd = 0; itemInd < changes.changed.length; itemInd++) {                                    // 306
        var change = changes.changed[itemInd];                                                                // 307
        if (change.setDiff) {                                                                                 // 308
          setDocs.push(change.setDiff);                                                                       // 309
        }                                                                                                     // 310
        if (change.unsetDiff) {                                                                               // 311
          unsetDocs.push(change.unsetDiff);                                                                   // 312
        }                                                                                                     // 313
      }                                                                                                       // 314
      // Then saves all changes in bulk.                                                                      // 315
      if (setDocs.length) {                                                                                   // 316
        this.save(setDocs);                                                                                   // 317
      }                                                                                                       // 318
      if (unsetDocs.length) {                                                                                 // 319
        this.save(unsetDocs, true);                                                                           // 320
      }                                                                                                       // 321
    };                                                                                                        // 322
                                                                                                              // 323
    return AngularMeteorCollection;                                                                           // 324
}]);                                                                                                          // 325
                                                                                                              // 326
angularMeteorCollection.factory('$meteorCollectionFS', ['$meteorCollection', 'diffArray',                     // 327
  function($meteorCollection, diffArray) {                                                                    // 328
    function $meteorCollectionFS(reactiveFunc, autoClientSave, collection) {                                  // 329
      return new $meteorCollection(reactiveFunc, autoClientSave, collection, noNestedDiffArray);              // 330
    }                                                                                                         // 331
                                                                                                              // 332
    var noNestedDiffArray = function(lastSeqArray, seqArray, callbacks) {                                     // 333
      return diffArray(lastSeqArray, seqArray, callbacks, true);                                              // 334
    };                                                                                                        // 335
                                                                                                              // 336
    return $meteorCollectionFS;                                                                               // 337
}]);                                                                                                          // 338
                                                                                                              // 339
angularMeteorCollection.factory('$meteorCollection', [                                                        // 340
  'AngularMeteorCollection', '$rootScope', 'diffArray',                                                       // 341
  function(AngularMeteorCollection, $rootScope, diffArray) {                                                  // 342
    function $meteorCollection(reactiveFunc, autoClientSave, collection, diffArrayFunc) {                     // 343
      // Validate parameters                                                                                  // 344
      if (!reactiveFunc) {                                                                                    // 345
        throw new TypeError('The first argument of $meteorCollection is undefined.');                         // 346
      }                                                                                                       // 347
                                                                                                              // 348
      if (!(angular.isFunction(reactiveFunc) || angular.isFunction(reactiveFunc.find))) {                     // 349
        throw new TypeError(                                                                                  // 350
          'The first argument of $meteorCollection must be a function or\
            a have a find function property.');                                                               // 352
      }                                                                                                       // 353
                                                                                                              // 354
      if (!angular.isFunction(reactiveFunc)) {                                                                // 355
        collection = angular.isDefined(collection) ? collection : reactiveFunc;                               // 356
        reactiveFunc = _.bind(reactiveFunc.find, reactiveFunc);                                               // 357
      }                                                                                                       // 358
                                                                                                              // 359
      // By default auto save - true.                                                                         // 360
      autoClientSave = angular.isDefined(autoClientSave) ? autoClientSave : true;                             // 361
      var ngCollection = new AngularMeteorCollection(reactiveFunc, collection,                                // 362
        diffArrayFunc || diffArray, autoClientSave);                                                          // 363
                                                                                                              // 364
      return ngCollection;                                                                                    // 365
    }                                                                                                         // 366
                                                                                                              // 367
    return $meteorCollection;                                                                                 // 368
 }]);                                                                                                         // 369
                                                                                                              // 370
angularMeteorCollection.run([                                                                                 // 371
  '$rootScope', '$meteorCollection', '$meteorCollectionFS', '$meteorStopper',                                 // 372
  function($rootScope, $meteorCollection, $meteorCollectionFS, $meteorStopper) {                              // 373
    var scopeProto = Object.getPrototypeOf($rootScope);                                                       // 374
    scopeProto.$meteorCollection = $meteorStopper($meteorCollection);                                         // 375
    scopeProto.$meteorCollectionFS = $meteorStopper($meteorCollectionFS);                                     // 376
 }]);                                                                                                         // 377
                                                                                                              // 378
                                                                                                              // 379
// Local utilities                                                                                            // 380
var collectionUtils = {                                                                                       // 381
                                                                                                              // 382
  findIndexById: function(collection, doc) {                                                                  // 383
    var foundDoc = _.find(collection, function(colDoc) {                                                      // 384
      // EJSON.equals used to compare Mongo.ObjectIDs and Strings.                                            // 385
      return EJSON.equals(colDoc._id, doc._id);                                                               // 386
    });                                                                                                       // 387
    return _.indexOf(collection, foundDoc);                                                                   // 388
  },                                                                                                          // 389
                                                                                                              // 390
  // Finds changes between two collections and saves differences.                                             // 391
  diff: function(newCollection, oldCollection, diffMethod) {                                                  // 392
    var changes = {added: [], removed: [], changed: []};                                                      // 393
                                                                                                              // 394
    diffMethod(oldCollection, newCollection, {                                                                // 395
      addedAt: function(id, item, index) {                                                                    // 396
        changes.added.push({item: item, index: index});                                                       // 397
      },                                                                                                      // 398
                                                                                                              // 399
      removedAt: function(id, item, index) {                                                                  // 400
        changes.removed.push({item: item, index: index});                                                     // 401
      },                                                                                                      // 402
                                                                                                              // 403
      changedAt: function(id, setDiff, unsetDiff, index, oldItem) {                                           // 404
        changes.changed.push({setDiff: setDiff, unsetDiff: unsetDiff});                                       // 405
      },                                                                                                      // 406
                                                                                                              // 407
      movedTo: function(id, item, fromIndex, toIndex) {                                                       // 408
        // XXX do we need this?                                                                               // 409
      }                                                                                                       // 410
    });                                                                                                       // 411
                                                                                                              // 412
    return changes;                                                                                           // 413
  }                                                                                                           // 414
};                                                                                                            // 415
                                                                                                              // 416
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 977
                                                                                                                     // 978
}).call(this);                                                                                                       // 979
                                                                                                                     // 980
                                                                                                                     // 981
                                                                                                                     // 982
                                                                                                                     // 983
                                                                                                                     // 984
                                                                                                                     // 985
(function(){                                                                                                         // 986
                                                                                                                     // 987
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 988
//                                                                                                            //     // 989
// packages/angular/modules/angular-meteor-object.js                                                          //     // 990
//                                                                                                            //     // 991
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 992
                                                                                                              //     // 993
'use strict';                                                                                                 // 1   // 994
                                                                                                              // 2   // 995
var angularMeteorObject = angular.module('angular-meteor.object', ['angular-meteor.utils', 'angular-meteor.subscribe', 'angular-meteor.collection', 'getUpdates', 'diffArray']);
                                                                                                              // 4   // 997
angularMeteorObject.factory('AngularMeteorObject', [                                                          // 5   // 998
  '$q', '$meteorSubscribe', '$meteorCollection', '$meteorUtils', 'diffArray', 'getUpdates',                   // 6   // 999
  function($q, $meteorSubscribe, $meteorCollection, $meteorUtils, diffArray, getUpdates) {                    // 7   // 1000
    // A list of internals properties to not watch for, nor pass to the Document on update and etc.           // 8   // 1001
    AngularMeteorObject.$$internalProps = [                                                                   // 9   // 1002
      '$$collection', '$$options', '$$id', '$$hashkey', '$$internalProps', '$$scope',                         // 10  // 1003
      'save', 'reset', 'subscribe', 'stop', 'autorunComputation', 'unregisterAutoBind', 'unregisterAutoDestroy', 'getRawObject',
      '_auto', '_setAutos', '_eventEmitter', '_serverBackup'                                                  // 12  // 1005
    ];                                                                                                        // 13  // 1006
                                                                                                              // 14  // 1007
    function AngularMeteorObject (collection, id, options){                                                   // 15  // 1008
      // Make data not be an object so we can extend it to preserve                                           // 16  // 1009
      // Collection Helpers and the like                                                                      // 17  // 1010
      var data = new function SubObject() {};                                                                 // 18  // 1011
      var doc = collection.findOne(id, options);                                                              // 19  // 1012
      angular.extend(data, doc);                                                                              // 20  // 1013
      angular.extend(data, AngularMeteorObject);                                                              // 21  // 1014
                                                                                                              // 22  // 1015
      data._serverBackup = doc || {};                                                                         // 23  // 1016
      data.$$collection = collection;                                                                         // 24  // 1017
      data.$$options = options;                                                                               // 25  // 1018
      data.$$id = id || new Mongo.ObjectID();                                                                 // 26  // 1019
                                                                                                              // 27  // 1020
      return data;                                                                                            // 28  // 1021
    }                                                                                                         // 29  // 1022
                                                                                                              // 30  // 1023
    AngularMeteorObject.getRawObject = function () {                                                          // 31  // 1024
      return angular.copy(_.omit(this, this.$$internalProps));                                                // 32  // 1025
    };                                                                                                        // 33  // 1026
                                                                                                              // 34  // 1027
    AngularMeteorObject.subscribe = function () {                                                             // 35  // 1028
      $meteorSubscribe.subscribe.apply(this, arguments);                                                      // 36  // 1029
      return this;                                                                                            // 37  // 1030
    };                                                                                                        // 38  // 1031
                                                                                                              // 39  // 1032
    AngularMeteorObject.save = function(custom) {                                                             // 40  // 1033
      var deferred = $q.defer();                                                                              // 41  // 1034
      var collection = this.$$collection;                                                                     // 42  // 1035
      var createFulfill = _.partial($meteorUtils.fulfill, deferred, null);                                    // 43  // 1036
      var oldDoc = collection.findOne(this.$$id);                                                             // 44  // 1037
      var mods;                                                                                               // 45  // 1038
                                                                                                              // 46  // 1039
      // update                                                                                               // 47  // 1040
      if (oldDoc) {                                                                                           // 48  // 1041
        if (custom)                                                                                           // 49  // 1042
          mods = { $set: custom };                                                                            // 50  // 1043
        else {                                                                                                // 51  // 1044
          mods = getUpdates(oldDoc, this.getRawObject());                                                     // 52  // 1045
          // If there are no updates, there is nothing to do here, returning                                  // 53  // 1046
          if (_.isEmpty(mods)) {                                                                              // 54  // 1047
            return $q.when({ action: 'updated' });                                                            // 55  // 1048
          }                                                                                                   // 56  // 1049
        }                                                                                                     // 57  // 1050
                                                                                                              // 58  // 1051
        // NOTE: do not use #upsert() method, since it does not exist in some collections                     // 59  // 1052
        collection.update(this.$$id, mods, createFulfill({ action: 'updated' }));                             // 60  // 1053
      }                                                                                                       // 61  // 1054
      // insert                                                                                               // 62  // 1055
      else {                                                                                                  // 63  // 1056
        if (custom)                                                                                           // 64  // 1057
          mods = _.clone(custom);                                                                             // 65  // 1058
        else                                                                                                  // 66  // 1059
          mods = this.getRawObject();                                                                         // 67  // 1060
                                                                                                              // 68  // 1061
        mods._id = this.$$id;                                                                                 // 69  // 1062
        collection.insert(mods, createFulfill({ action: 'inserted' }));                                       // 70  // 1063
      }                                                                                                       // 71  // 1064
                                                                                                              // 72  // 1065
      return deferred.promise;                                                                                // 73  // 1066
    };                                                                                                        // 74  // 1067
                                                                                                              // 75  // 1068
    AngularMeteorObject.reset = function(keepClientProps) {                                                   // 76  // 1069
      var self = this;                                                                                        // 77  // 1070
      var options = this.$$options;                                                                           // 78  // 1071
      var id = this.$$id;                                                                                     // 79  // 1072
      var doc = this.$$collection.findOne(id, options);                                                       // 80  // 1073
                                                                                                              // 81  // 1074
      if (doc) {                                                                                              // 82  // 1075
        // extend SubObject                                                                                   // 83  // 1076
        var docKeys = _.keys(doc);                                                                            // 84  // 1077
        var docExtension = _.pick(doc, docKeys);                                                              // 85  // 1078
        var clientProps;                                                                                      // 86  // 1079
                                                                                                              // 87  // 1080
        angular.extend(Object.getPrototypeOf(self), Object.getPrototypeOf(doc));                              // 88  // 1081
        _.extend(self, docExtension);                                                                         // 89  // 1082
        _.extend(self._serverBackup, docExtension);                                                           // 90  // 1083
                                                                                                              // 91  // 1084
        if (keepClientProps) {                                                                                // 92  // 1085
          clientProps = _.intersection(_.keys(self), _.keys(self._serverBackup));                             // 93  // 1086
        } else {                                                                                              // 94  // 1087
          clientProps = _.keys(self);                                                                         // 95  // 1088
        }                                                                                                     // 96  // 1089
                                                                                                              // 97  // 1090
        var serverProps = _.keys(doc);                                                                        // 98  // 1091
        var removedKeys = _.difference(clientProps, serverProps, self.$$internalProps);                       // 99  // 1092
                                                                                                              // 100
        removedKeys.forEach(function (prop) {                                                                 // 101
          delete self[prop];                                                                                  // 102
          delete self._serverBackup[prop];                                                                    // 103
        });                                                                                                   // 104
      }                                                                                                       // 105
                                                                                                              // 106
      else {                                                                                                  // 107
        _.keys(this.getRawObject()).forEach(function(prop) {                                                  // 108
          delete self[prop];                                                                                  // 109
        });                                                                                                   // 110
                                                                                                              // 111
        self._serverBackup = {};                                                                              // 112
      }                                                                                                       // 113
    };                                                                                                        // 114
                                                                                                              // 115
    AngularMeteorObject.stop = function () {                                                                  // 116
      if (this.unregisterAutoDestroy)                                                                         // 117
        this.unregisterAutoDestroy();                                                                         // 118
                                                                                                              // 119
      if (this.unregisterAutoBind)                                                                            // 120
        this.unregisterAutoBind();                                                                            // 121
                                                                                                              // 122
      if (this.autorunComputation && this.autorunComputation.stop)                                            // 123
        this.autorunComputation.stop();                                                                       // 124
    };                                                                                                        // 125
                                                                                                              // 126
    return AngularMeteorObject;                                                                               // 127
}]);                                                                                                          // 128
                                                                                                              // 129
                                                                                                              // 130
angularMeteorObject.factory('$meteorObject', [                                                                // 131
  '$rootScope', '$meteorUtils', 'getUpdates', 'AngularMeteorObject',                                          // 132
  function($rootScope, $meteorUtils, getUpdates, AngularMeteorObject) {                                       // 133
    function $meteorObject(collection, id, auto, options) {                                                   // 134
      // Validate parameters                                                                                  // 135
      if (!collection) {                                                                                      // 136
        throw new TypeError("The first argument of $meteorObject is undefined.");                             // 137
      }                                                                                                       // 138
                                                                                                              // 139
      if (!angular.isFunction(collection.findOne)) {                                                          // 140
        throw new TypeError("The first argument of $meteorObject must be a function or a have a findOne function property.");
      }                                                                                                       // 142
                                                                                                              // 143
      var data = new AngularMeteorObject(collection, id, options);                                            // 144
      data._auto = auto !== false; // Making auto default true - http://stackoverflow.com/a/15464208/1426570  // 145
      angular.extend(data, $meteorObject);                                                                    // 146
      data._setAutos();                                                                                       // 147
      return data;                                                                                            // 148
    }                                                                                                         // 149
                                                                                                              // 150
    $meteorObject._setAutos = function() {                                                                    // 151
      var self = this;                                                                                        // 152
                                                                                                              // 153
      this.autorunComputation = $meteorUtils.autorun($rootScope, function() {                                 // 154
        self.reset(true);                                                                                     // 155
      });                                                                                                     // 156
                                                                                                              // 157
      // Deep watches the model and performs autobind                                                         // 158
      this.unregisterAutoBind = this._auto && $rootScope.$watch(function(){                                   // 159
        return self.getRawObject();                                                                           // 160
      }, function (item, oldItem) {                                                                           // 161
        if (item === oldItem) return;                                                                         // 162
                                                                                                              // 163
        var id = item._id;                                                                                    // 164
        delete item._id;                                                                                      // 165
        delete oldItem._id;                                                                                   // 166
                                                                                                              // 167
        var updates = getUpdates(oldItem, item);                                                              // 168
        if (_.isEmpty(updates)) return;                                                                       // 169
                                                                                                              // 170
        self.$$collection.update({_id: id}, updates);                                                         // 171
      }, true);                                                                                               // 172
                                                                                                              // 173
      this.unregisterAutoDestroy = $rootScope.$on('$destroy', function() {                                    // 174
        if (self && self.stop) {                                                                              // 175
          self.stop();                                                                                        // 176
        }                                                                                                     // 177
      });                                                                                                     // 178
    };                                                                                                        // 179
                                                                                                              // 180
    return $meteorObject;                                                                                     // 181
}]);                                                                                                          // 182
                                                                                                              // 183
angularMeteorObject.run([                                                                                     // 184
  '$rootScope', '$meteorObject', '$meteorStopper',                                                            // 185
  function ($rootScope, $meteorObject, $meteorStopper) {                                                      // 186
    var scopeProto = Object.getPrototypeOf($rootScope);                                                       // 187
    scopeProto.$meteorObject = $meteorStopper($meteorObject);                                                 // 188
}]);                                                                                                          // 189
                                                                                                              // 190
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1184
                                                                                                                     // 1185
}).call(this);                                                                                                       // 1186
                                                                                                                     // 1187
                                                                                                                     // 1188
                                                                                                                     // 1189
                                                                                                                     // 1190
                                                                                                                     // 1191
                                                                                                                     // 1192
(function(){                                                                                                         // 1193
                                                                                                                     // 1194
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1195
//                                                                                                            //     // 1196
// packages/angular/modules/angular-meteor-user.js                                                            //     // 1197
//                                                                                                            //     // 1198
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1199
                                                                                                              //     // 1200
'use strict';                                                                                                 // 1   // 1201
                                                                                                              // 2   // 1202
var angularMeteorUser = angular.module('angular-meteor.user', ['angular-meteor.utils']);                      // 3   // 1203
                                                                                                              // 4   // 1204
// requires package 'accounts-password'                                                                       // 5   // 1205
angularMeteorUser.service('$meteorUser', [                                                                    // 6   // 1206
  '$rootScope', '$meteorUtils', '$q',                                                                         // 7   // 1207
  function($rootScope, $meteorUtils, $q){                                                                     // 8   // 1208
    var pack = Package['accounts-base'];                                                                      // 9   // 1209
    if (!pack) return;                                                                                        // 10  // 1210
                                                                                                              // 11  // 1211
    var self = this;                                                                                          // 12  // 1212
    var Accounts = pack.Accounts;                                                                             // 13  // 1213
                                                                                                              // 14  // 1214
    this.waitForUser = function(){                                                                            // 15  // 1215
                                                                                                              // 16  // 1216
      var deferred = $q.defer();                                                                              // 17  // 1217
                                                                                                              // 18  // 1218
      $meteorUtils.autorun($rootScope, function(){                                                            // 19  // 1219
        if ( !Meteor.loggingIn() )                                                                            // 20  // 1220
          deferred.resolve( Meteor.user() );                                                                  // 21  // 1221
      });                                                                                                     // 22  // 1222
                                                                                                              // 23  // 1223
      return deferred.promise;                                                                                // 24  // 1224
    };                                                                                                        // 25  // 1225
                                                                                                              // 26  // 1226
    this.requireUser = function(){                                                                            // 27  // 1227
                                                                                                              // 28  // 1228
      var deferred = $q.defer();                                                                              // 29  // 1229
                                                                                                              // 30  // 1230
      $meteorUtils.autorun($rootScope, function(){                                                            // 31  // 1231
        if ( !Meteor.loggingIn() ) {                                                                          // 32  // 1232
          if ( Meteor.user() == null)                                                                         // 33  // 1233
            deferred.reject("AUTH_REQUIRED");                                                                 // 34  // 1234
          else                                                                                                // 35  // 1235
            deferred.resolve( Meteor.user() );                                                                // 36  // 1236
        }                                                                                                     // 37  // 1237
      });                                                                                                     // 38  // 1238
                                                                                                              // 39  // 1239
      return deferred.promise;                                                                                // 40  // 1240
    };                                                                                                        // 41  // 1241
                                                                                                              // 42  // 1242
    this.requireValidUser = function(validatorFn) {                                                           // 43  // 1243
      return self.requireUser().then(function(user){                                                          // 44  // 1244
        var valid = validatorFn( user );                                                                      // 45  // 1245
                                                                                                              // 46  // 1246
        if ( valid === true )                                                                                 // 47  // 1247
          return user;                                                                                        // 48  // 1248
        else if ( typeof valid === "string" )                                                                 // 49  // 1249
          return $q.reject( valid );                                                                          // 50  // 1250
        else                                                                                                  // 51  // 1251
          return $q.reject( "FORBIDDEN" );                                                                    // 52  // 1252
	    });                                                                                                      // 53  // 1253
	  };                                                                                                         // 54  // 1254
                                                                                                              // 55  // 1255
    this.loginWithPassword = $meteorUtils.promissor(Meteor, 'loginWithPassword');                             // 56  // 1256
    this.createUser = $meteorUtils.promissor(Accounts, 'createUser');                                         // 57  // 1257
    this.changePassword = $meteorUtils.promissor(Accounts, 'changePassword');                                 // 58  // 1258
    this.forgotPassword = $meteorUtils.promissor(Accounts, 'forgotPassword');                                 // 59  // 1259
    this.resetPassword = $meteorUtils.promissor(Accounts, 'resetPassword');                                   // 60  // 1260
    this.verifyEmail = $meteorUtils.promissor(Accounts, 'verifyEmail');                                       // 61  // 1261
    this.logout = $meteorUtils.promissor(Meteor, 'logout');                                                   // 62  // 1262
    this.logoutOtherClients = $meteorUtils.promissor(Meteor, 'logoutOtherClients');                           // 63  // 1263
    this.loginWithFacebook = $meteorUtils.promissor(Meteor, 'loginWithFacebook');                             // 64  // 1264
    this.loginWithTwitter = $meteorUtils.promissor(Meteor, 'loginWithTwitter');                               // 65  // 1265
    this.loginWithGoogle = $meteorUtils.promissor(Meteor, 'loginWithGoogle');                                 // 66  // 1266
    this.loginWithGithub = $meteorUtils.promissor(Meteor, 'loginWithGithub');                                 // 67  // 1267
    this.loginWithMeteorDeveloperAccount = $meteorUtils.promissor(Meteor, 'loginWithMeteorDeveloperAccount');        // 1268
    this.loginWithMeetup = $meteorUtils.promissor(Meteor, 'loginWithMeetup');                                 // 69  // 1269
    this.loginWithWeibo = $meteorUtils.promissor(Meteor, 'loginWithWeibo');                                   // 70  // 1270
  }                                                                                                           // 71  // 1271
]);                                                                                                           // 72  // 1272
                                                                                                              // 73  // 1273
angularMeteorUser.run([                                                                                       // 74  // 1274
  '$rootScope', '$meteorUtils',                                                                               // 75  // 1275
  function($rootScope, $meteorUtils){                                                                         // 76  // 1276
    $meteorUtils.autorun($rootScope, function(){                                                              // 77  // 1277
      if (!Meteor.user) return;                                                                               // 78  // 1278
      $rootScope.currentUser = Meteor.user();                                                                 // 79  // 1279
      $rootScope.loggingIn = Meteor.loggingIn();                                                              // 80  // 1280
    });                                                                                                       // 81  // 1281
  }                                                                                                           // 82  // 1282
]);                                                                                                           // 83  // 1283
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1284
                                                                                                                     // 1285
}).call(this);                                                                                                       // 1286
                                                                                                                     // 1287
                                                                                                                     // 1288
                                                                                                                     // 1289
                                                                                                                     // 1290
                                                                                                                     // 1291
                                                                                                                     // 1292
(function(){                                                                                                         // 1293
                                                                                                                     // 1294
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1295
//                                                                                                            //     // 1296
// packages/angular/modules/angular-meteor-methods.js                                                         //     // 1297
//                                                                                                            //     // 1298
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1299
                                                                                                              //     // 1300
'use strict';                                                                                                 // 1   // 1301
                                                                                                              // 2   // 1302
var angularMeteorMethods = angular.module('angular-meteor.methods', ['angular-meteor.utils']);                // 3   // 1303
                                                                                                              // 4   // 1304
angularMeteorMethods.service('$meteorMethods', [                                                              // 5   // 1305
  '$q', '$meteorUtils',                                                                                       // 6   // 1306
  function($q, $meteorUtils) {                                                                                // 7   // 1307
    this.call = function(){                                                                                   // 8   // 1308
      var deferred = $q.defer();                                                                              // 9   // 1309
      var fulfill = $meteorUtils.fulfill(deferred);                                                           // 10  // 1310
      var args = _.toArray(arguments).concat(fulfill);                                                        // 11  // 1311
      Meteor.call.apply(this, args);                                                                          // 12  // 1312
      return deferred.promise;                                                                                // 13  // 1313
    };                                                                                                        // 14  // 1314
  }                                                                                                           // 15  // 1315
]);                                                                                                           // 16  // 1316
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1317
                                                                                                                     // 1318
}).call(this);                                                                                                       // 1319
                                                                                                                     // 1320
                                                                                                                     // 1321
                                                                                                                     // 1322
                                                                                                                     // 1323
                                                                                                                     // 1324
                                                                                                                     // 1325
(function(){                                                                                                         // 1326
                                                                                                                     // 1327
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1328
//                                                                                                            //     // 1329
// packages/angular/modules/angular-meteor-session.js                                                         //     // 1330
//                                                                                                            //     // 1331
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1332
                                                                                                              //     // 1333
'use strict';                                                                                                 // 1   // 1334
var angularMeteorSession = angular.module('angular-meteor.session', ['angular-meteor.utils']);                // 2   // 1335
                                                                                                              // 3   // 1336
angularMeteorSession.factory('$meteorSession', ['$meteorUtils', '$parse',                                     // 4   // 1337
  function ($meteorUtils, $parse) {                                                                           // 5   // 1338
    return function (session) {                                                                               // 6   // 1339
                                                                                                              // 7   // 1340
      return {                                                                                                // 8   // 1341
                                                                                                              // 9   // 1342
        bind: function(scope, model) {                                                                        // 10  // 1343
          var getter = $parse(model);                                                                         // 11  // 1344
          var setter = getter.assign;                                                                         // 12  // 1345
          $meteorUtils.autorun(scope, function() {                                                            // 13  // 1346
            setter(scope, Session.get(session));                                                              // 14  // 1347
          });                                                                                                 // 15  // 1348
                                                                                                              // 16  // 1349
          scope.$watch(model, function(newItem, oldItem) {                                                    // 17  // 1350
            Session.set(session, getter(scope));                                                              // 18  // 1351
          }, true);                                                                                           // 19  // 1352
                                                                                                              // 20  // 1353
        }                                                                                                     // 21  // 1354
      };                                                                                                      // 22  // 1355
    }                                                                                                         // 23  // 1356
  }                                                                                                           // 24  // 1357
]);                                                                                                           // 25  // 1358
                                                                                                              // 26  // 1359
                                                                                                              // 27  // 1360
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1361
                                                                                                                     // 1362
}).call(this);                                                                                                       // 1363
                                                                                                                     // 1364
                                                                                                                     // 1365
                                                                                                                     // 1366
                                                                                                                     // 1367
                                                                                                                     // 1368
                                                                                                                     // 1369
(function(){                                                                                                         // 1370
                                                                                                                     // 1371
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1372
//                                                                                                            //     // 1373
// packages/angular/modules/angular-meteor-reactive-scope.js                                                  //     // 1374
//                                                                                                            //     // 1375
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1376
                                                                                                              //     // 1377
/**                                                                                                           // 1   // 1378
 * Created by netanel on 29/12/14.                                                                            // 2   // 1379
 */                                                                                                           // 3   // 1380
var angularMeteorReactiveScope = angular.module('angular-meteor.reactive-scope', []);                         // 4   // 1381
                                                                                                              // 5   // 1382
angularMeteorReactiveScope.run(['$rootScope', '$parse', function($rootScope, $parse) {                        // 6   // 1383
  Object.getPrototypeOf($rootScope).getReactively = function(property, objectEquality) {                      // 7   // 1384
    var self = this;                                                                                          // 8   // 1385
    var getValue = $parse(property);                                                                          // 9   // 1386
    objectEquality = !!objectEquality;                                                                        // 10  // 1387
                                                                                                              // 11  // 1388
    if (!self.hasOwnProperty('$$trackerDeps')) {                                                              // 12  // 1389
      self.$$trackerDeps = {};                                                                                // 13  // 1390
    }                                                                                                         // 14  // 1391
                                                                                                              // 15  // 1392
    if (!self.$$trackerDeps[property]) {                                                                      // 16  // 1393
      self.$$trackerDeps[property] = new Tracker.Dependency();                                                // 17  // 1394
                                                                                                              // 18  // 1395
      self.$watch(function() {                                                                                // 19  // 1396
        return getValue(self)                                                                                 // 20  // 1397
      }, function(newVal, oldVal) {                                                                           // 21  // 1398
        if (newVal !== oldVal) {                                                                              // 22  // 1399
          self.$$trackerDeps[property].changed();                                                             // 23  // 1400
        }                                                                                                     // 24  // 1401
      }, objectEquality);                                                                                     // 25  // 1402
    }                                                                                                         // 26  // 1403
                                                                                                              // 27  // 1404
    self.$$trackerDeps[property].depend();                                                                    // 28  // 1405
                                                                                                              // 29  // 1406
    return getValue(self);                                                                                    // 30  // 1407
  };                                                                                                          // 31  // 1408
  Object.getPrototypeOf($rootScope).getCollectionReactively = function(property) {                            // 32  // 1409
    var self = this;                                                                                          // 33  // 1410
    var getValue = $parse(property);                                                                          // 34  // 1411
                                                                                                              // 35  // 1412
                                                                                                              // 36  // 1413
    if (!self.hasOwnProperty('$$trackerDeps')) {                                                              // 37  // 1414
      self.$$trackerDeps = {};                                                                                // 38  // 1415
    }                                                                                                         // 39  // 1416
                                                                                                              // 40  // 1417
    if (!self.$$trackerDeps[property]) {                                                                      // 41  // 1418
      self.$$trackerDeps[property] = new Tracker.Dependency();                                                // 42  // 1419
                                                                                                              // 43  // 1420
      self.$watchCollection(property, function() {                                                            // 44  // 1421
        self.$$trackerDeps[property].changed();                                                               // 45  // 1422
      });                                                                                                     // 46  // 1423
    }                                                                                                         // 47  // 1424
                                                                                                              // 48  // 1425
    self.$$trackerDeps[property].depend();                                                                    // 49  // 1426
                                                                                                              // 50  // 1427
    return getValue(self);                                                                                    // 51  // 1428
  };                                                                                                          // 52  // 1429
}]);                                                                                                          // 53  // 1430
                                                                                                              // 54  // 1431
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1432
                                                                                                                     // 1433
}).call(this);                                                                                                       // 1434
                                                                                                                     // 1435
                                                                                                                     // 1436
                                                                                                                     // 1437
                                                                                                                     // 1438
                                                                                                                     // 1439
                                                                                                                     // 1440
(function(){                                                                                                         // 1441
                                                                                                                     // 1442
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1443
//                                                                                                            //     // 1444
// packages/angular/modules/angular-meteor-utils.js                                                           //     // 1445
//                                                                                                            //     // 1446
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1447
                                                                                                              //     // 1448
'use strict';                                                                                                 // 1   // 1449
var angularMeteorUtils = angular.module('angular-meteor.utils', []);                                          // 2   // 1450
                                                                                                              // 3   // 1451
angularMeteorUtils.service('$meteorUtils', [                                                                  // 4   // 1452
  '$q', '$timeout',                                                                                           // 5   // 1453
  function ($q, $timeout) {                                                                                   // 6   // 1454
    var self = this;                                                                                          // 7   // 1455
    this.getCollectionByName = function(string){                                                              // 8   // 1456
      return Mongo.Collection.get(string);                                                                    // 9   // 1457
    };                                                                                                        // 10  // 1458
    this.autorun = function(scope, fn) {                                                                      // 11  // 1459
      // wrapping around Deps.autorun                                                                         // 12  // 1460
      var comp = Tracker.autorun(function(c) {                                                                // 13  // 1461
        fn(c);                                                                                                // 14  // 1462
                                                                                                              // 15  // 1463
        // this is run immediately for the first call                                                         // 16  // 1464
        // but after that, we need to $apply to start Angular digest                                          // 17  // 1465
        if (!c.firstRun) $timeout(angular.noop, 0);                                                           // 18  // 1466
      });                                                                                                     // 19  // 1467
      // stop autorun when scope is destroyed                                                                 // 20  // 1468
      scope.$on('$destroy', function() {                                                                      // 21  // 1469
        comp.stop();                                                                                          // 22  // 1470
      });                                                                                                     // 23  // 1471
      // return autorun object so that it can be stopped manually                                             // 24  // 1472
      return comp;                                                                                            // 25  // 1473
    };                                                                                                        // 26  // 1474
    // Borrowed from angularFire - https://github.com/firebase/angularfire/blob/master/src/utils.js#L445-L454        // 1475
    this.stripDollarPrefixedKeys = function (data) {                                                          // 28  // 1476
      if( !angular.isObject(data) ||                                                                          // 29  // 1477
        data instanceof Date ||                                                                               // 30  // 1478
        data instanceof File ||                                                                               // 31  // 1479
        (typeof FS === 'object' && data instanceof FS.File)) {                                                // 32  // 1480
        return data;                                                                                          // 33  // 1481
      }                                                                                                       // 34  // 1482
      var out = angular.isArray(data)? [] : {};                                                               // 35  // 1483
      angular.forEach(data, function(v,k) {                                                                   // 36  // 1484
        if(typeof k !== 'string' || k.charAt(0) !== '$') {                                                    // 37  // 1485
          out[k] = self.stripDollarPrefixedKeys(v);                                                           // 38  // 1486
        }                                                                                                     // 39  // 1487
      });                                                                                                     // 40  // 1488
      return out;                                                                                             // 41  // 1489
    };                                                                                                        // 42  // 1490
    // Returns a callback which fulfills promise                                                              // 43  // 1491
    this.fulfill = function(deferred, boundError, boundResult) {                                              // 44  // 1492
      return function(err, result) {                                                                          // 45  // 1493
        if (err)                                                                                              // 46  // 1494
          deferred.reject(boundError == null ? err : boundError);                                             // 47  // 1495
        else if (typeof boundResult == "function")                                                            // 48  // 1496
          deferred.resolve(boundResult == null ? result : boundResult(result));                               // 49  // 1497
        else                                                                                                  // 50  // 1498
          deferred.resolve(boundResult == null ? result : boundResult);                                       // 51  // 1499
      };                                                                                                      // 52  // 1500
    };                                                                                                        // 53  // 1501
    // creates a function which invokes method with the given arguments and returns a promise                 // 54  // 1502
    this.promissor = function(obj, method) {                                                                  // 55  // 1503
      return function() {                                                                                     // 56  // 1504
        var deferred = $q.defer();                                                                            // 57  // 1505
        var fulfill = self.fulfill(deferred);                                                                 // 58  // 1506
        var args = _.toArray(arguments).concat(fulfill);                                                      // 59  // 1507
        obj[method].apply(obj, args);                                                                         // 60  // 1508
        return deferred.promise;                                                                              // 61  // 1509
      };                                                                                                      // 62  // 1510
    };                                                                                                        // 63  // 1511
  }                                                                                                           // 64  // 1512
]);                                                                                                           // 65  // 1513
                                                                                                              // 66  // 1514
angularMeteorUtils.run(['$rootScope', '$meteorUtils',                                                         // 67  // 1515
  function($rootScope, $meteorUtils) {                                                                        // 68  // 1516
    Object.getPrototypeOf($rootScope).$meteorAutorun = function(fn) {                                         // 69  // 1517
      return $meteorUtils.autorun(this, fn);                                                                  // 70  // 1518
    };                                                                                                        // 71  // 1519
}]);                                                                                                          // 72  // 1520
                                                                                                              // 73  // 1521
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1522
                                                                                                                     // 1523
}).call(this);                                                                                                       // 1524
                                                                                                                     // 1525
                                                                                                                     // 1526
                                                                                                                     // 1527
                                                                                                                     // 1528
                                                                                                                     // 1529
                                                                                                                     // 1530
(function(){                                                                                                         // 1531
                                                                                                                     // 1532
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1533
//                                                                                                            //     // 1534
// packages/angular/modules/angular-meteor-camera.js                                                          //     // 1535
//                                                                                                            //     // 1536
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1537
                                                                                                              //     // 1538
'use strict';                                                                                                 // 1   // 1539
                                                                                                              // 2   // 1540
var angularMeteorCamera = angular.module('angular-meteor.camera', ['angular-meteor.utils']);                  // 3   // 1541
                                                                                                              // 4   // 1542
// requires package 'mdg:camera'                                                                              // 5   // 1543
angularMeteorCamera.service('$meteorCamera', [                                                                // 6   // 1544
  '$q', '$meteorUtils',                                                                                       // 7   // 1545
  function ($q, $meteorUtils) {                                                                               // 8   // 1546
    var pack = Package['mdg:camera'];                                                                         // 9   // 1547
    if (!pack) return;                                                                                        // 10  // 1548
                                                                                                              // 11  // 1549
    var MeteorCamera = pack.MeteorCamera;                                                                     // 12  // 1550
                                                                                                              // 13  // 1551
    this.getPicture = function(options){                                                                      // 14  // 1552
      options = options || {};                                                                                // 15  // 1553
      var deferred = $q.defer();                                                                              // 16  // 1554
      MeteorCamera.getPicture(options, $meteorUtils.fulfill(deferred));                                       // 17  // 1555
      return deferred.promise;                                                                                // 18  // 1556
    };                                                                                                        // 19  // 1557
  }                                                                                                           // 20  // 1558
]);                                                                                                           // 21  // 1559
                                                                                                              // 22  // 1560
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1561
                                                                                                                     // 1562
}).call(this);                                                                                                       // 1563
                                                                                                                     // 1564
                                                                                                                     // 1565
                                                                                                                     // 1566
                                                                                                                     // 1567
                                                                                                                     // 1568
                                                                                                                     // 1569
(function(){                                                                                                         // 1570
                                                                                                                     // 1571
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1572
//                                                                                                            //     // 1573
// packages/angular/angular-meteor.js                                                                         //     // 1574
//                                                                                                            //     // 1575
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1576
                                                                                                              //     // 1577
// Define angular-meteor and its dependencies                                                                 // 1   // 1578
var angularMeteor = angular.module('angular-meteor', [                                                        // 2   // 1579
  'angular-meteor.subscribe',                                                                                 // 3   // 1580
  'angular-meteor.collection',                                                                                // 4   // 1581
  'angular-meteor.object',                                                                                    // 5   // 1582
  'angular-meteor.user',                                                                                      // 6   // 1583
  'angular-meteor.methods',                                                                                   // 7   // 1584
  'angular-meteor.session',                                                                                   // 8   // 1585
  'angular-meteor.reactive-scope',                                                                            // 9   // 1586
  'angular-meteor.utils',                                                                                     // 10  // 1587
  'angular-meteor.camera'                                                                                     // 11  // 1588
]);                                                                                                           // 12  // 1589
                                                                                                              // 13  // 1590
angularMeteor.run(['$compile', '$document', '$rootScope', function ($compile, $document, $rootScope) {        // 14  // 1591
    // Recompile after iron:router builds page                                                                // 15  // 1592
    if(Package['iron:router']) {                                                                              // 16  // 1593
      var appLoaded = false;                                                                                  // 17  // 1594
      Package['iron:router'].Router.onAfterAction(function(req, res, next) {                                  // 18  // 1595
        Tracker.afterFlush(function() {                                                                       // 19  // 1596
          if (!appLoaded) {                                                                                   // 20  // 1597
            $compile($document)($rootScope);                                                                  // 21  // 1598
            if (!$rootScope.$$phase) $rootScope.$apply();                                                     // 22  // 1599
            appLoaded = true;                                                                                 // 23  // 1600
          }                                                                                                   // 24  // 1601
        })                                                                                                    // 25  // 1602
      });                                                                                                     // 26  // 1603
    }                                                                                                         // 27  // 1604
  }]);                                                                                                        // 28  // 1605
                                                                                                              // 29  // 1606
// Putting all services under $meteor service for syntactic sugar                                             // 30  // 1607
angularMeteor.service('$meteor', ['$meteorCollection', '$meteorCollectionFS', '$meteorObject', '$meteorMethods', '$meteorSession', '$meteorSubscribe', '$meteorUtils', '$meteorCamera', '$meteorUser',
  function($meteorCollection, $meteorCollectionFS, $meteorObject, $meteorMethods, $meteorSession, $meteorSubscribe, $meteorUtils, $meteorCamera, $meteorUser){
    this.collection = $meteorCollection;                                                                      // 33  // 1610
    this.collectionFS = $meteorCollectionFS;                                                                  // 34  // 1611
    this.object = $meteorObject;                                                                              // 35  // 1612
    this.subscribe = $meteorSubscribe.subscribe;                                                              // 36  // 1613
    this.call = $meteorMethods.call;                                                                          // 37  // 1614
    this.loginWithPassword = $meteorUser.loginWithPassword;                                                   // 38  // 1615
    this.requireUser = $meteorUser.requireUser;                                                               // 39  // 1616
    this.requireValidUser = $meteorUser.requireValidUser;                                                     // 40  // 1617
    this.waitForUser = $meteorUser.waitForUser;                                                               // 41  // 1618
    this.createUser = $meteorUser.createUser;                                                                 // 42  // 1619
    this.changePassword = $meteorUser.changePassword;                                                         // 43  // 1620
    this.forgotPassword = $meteorUser.forgotPassword;                                                         // 44  // 1621
    this.resetPassword = $meteorUser.resetPassword;                                                           // 45  // 1622
    this.verifyEmail = $meteorUser.verifyEmail;                                                               // 46  // 1623
    this.loginWithMeteorDeveloperAccount = $meteorUser.loginWithMeteorDeveloperAccount;                       // 47  // 1624
    this.loginWithFacebook = $meteorUser.loginWithFacebook;                                                   // 48  // 1625
    this.loginWithGithub = $meteorUser.loginWithGithub;                                                       // 49  // 1626
    this.loginWithGoogle = $meteorUser.loginWithGoogle;                                                       // 50  // 1627
    this.loginWithMeetup = $meteorUser.loginWithMeetup;                                                       // 51  // 1628
    this.loginWithTwitter = $meteorUser.loginWithTwitter;                                                     // 52  // 1629
    this.loginWithWeibo = $meteorUser.loginWithWeibo;                                                         // 53  // 1630
    this.logout = $meteorUser.logout;                                                                         // 54  // 1631
    this.logoutOtherClients = $meteorUser.logoutOtherClients;                                                 // 55  // 1632
    this.session = $meteorSession;                                                                            // 56  // 1633
    this.autorun = $meteorUtils.autorun;                                                                      // 57  // 1634
    this.getCollectionByName = $meteorUtils.getCollectionByName;                                              // 58  // 1635
    this.getPicture = $meteorCamera.getPicture;                                                               // 59  // 1636
}]);                                                                                                          // 60  // 1637
                                                                                                              // 61  // 1638
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 1639
                                                                                                                     // 1640
}).call(this);                                                                                                       // 1641
                                                                                                                     // 1642
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.angular = {};

})();
