"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const parcels = require('../resources/PARCELS.json');

const getUserParcels = function getUserParcels() {
  let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const _params$username = params.username,
        username = _params$username === void 0 ? null : _params$username;
  const userParcels = {};
  Object.entries(parcels).forEach(function (_ref) {
    let _ref2 = _slicedToArray(_ref, 2),
        parcelId = _ref2[0],
        parcel = _ref2[1];

    if (parcel.sender === username) {
      userParcels[parcelId] = parcel;
    }
  });
  return userParcels;
};

module.exports = getUserParcels;