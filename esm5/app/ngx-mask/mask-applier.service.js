/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { config } from './config';
var MaskApplierService = /** @class */ (function () {
    function MaskApplierService(_config) {
        this._config = _config;
        this.maskExpression = '';
        this.separator = function (str) {
            str += '';
            /** @type {?} */
            var x = str.split(' ');
            /** @type {?} */
            var res = x[0];
            /** @type {?} */
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(res)) {
                res = res.replace(rgx, '$1' + ' ' + '$2');
            }
            return res;
        };
        this._shift = new Set();
        this.maskSpecialCharacters = (/** @type {?} */ (this._config)).specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.clearIfNotMatch = this._config.clearIfNotMatch;
        this.dropSpecialCharacters = this._config.dropSpecialCharacters;
        this.maskSpecialCharacters = (/** @type {?} */ (this._config)).specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.prefix = this._config.prefix;
        this.sufix = this._config.sufix;
    }
    // tslint:disable-next-line:no-any
    // tslint:disable-next-line:no-any
    /**
     * @param {?} inputValue
     * @param {?} maskAndPattern
     * @return {?}
     */
    MaskApplierService.prototype.applyMaskWithPattern = 
    // tslint:disable-next-line:no-any
    /**
     * @param {?} inputValue
     * @param {?} maskAndPattern
     * @return {?}
     */
    function (inputValue, maskAndPattern) {
        var _a = tslib_1.__read(maskAndPattern, 2), mask = _a[0], customPattern = _a[1];
        this.customPattern = customPattern;
        return this.applyMask(inputValue, mask);
    };
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskApplierService.prototype.applyMask = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        /** @type {?} */
        var cursor = 0;
        /** @type {?} */
        var result = "";
        /** @type {?} */
        var multi = false;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        /** @type {?} */
        var inputArray = inputValue.toString()
            .split('');
        if (maskExpression === 'separator') {
            if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                inputValue = inputValue.substring(0, inputValue.length - 1);
            }
            /** @type {?} */
            var strForSep = inputValue.replace(/\s/g, '');
            result = this.separator(strForSep);
            position = result.length + 1;
            cursor = position;
            /** @type {?} */
            var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                ? inputArray.length
                : cursor;
            this._shift.add(shiftStep + this.prefix.length || 0);
        }
        else {
            // tslint:disable-next-line
            for (var i = 0, inputSymbol = inputArray[0]; i
                < inputArray.length; i++, inputSymbol = inputArray[i]) {
                if (cursor === maskExpression.length) {
                    break;
                }
                if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
                    result += inputSymbol;
                    cursor += 2;
                }
                else if (maskExpression[cursor + 1] === '*' && multi
                    && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                    multi = false;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])
                    && maskExpression[cursor + 1]
                        === '*') {
                    result += inputSymbol;
                    multi = true;
                }
                else if (maskExpression[cursor + 1] === '?' && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
                    if (maskExpression[cursor] === 'H') {
                        if (Number(inputSymbol) > 2) {
                            result += 0;
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'h') {
                        if (result === '2' && Number(inputSymbol) > 3) {
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'm') {
                        if (Number(inputSymbol) > 5) {
                            result += 0;
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 's') {
                        if (Number(inputSymbol) > 5) {
                            result += 0;
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    result += inputSymbol;
                    cursor++;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
                    if (maskExpression[cursor] === 'd') {
                        if (Number(inputSymbol) > 3) {
                            result += 0;
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor - 1] === 'd') {
                        if (Number(inputValue.slice(cursor - 1, cursor + 1)) > 31) {
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'm') {
                        if (Number(inputSymbol) > 1) {
                            result += 0;
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                                ? inputArray.length
                                : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor - 1] === 'm') {
                        if (Number(inputValue.slice(cursor - 1, cursor + 1)) > 12) {
                            continue;
                        }
                    }
                    result += inputSymbol;
                    cursor++;
                }
                else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                    result += maskExpression[cursor];
                    cursor++;
                    /** @type {?} */
                    var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                        ? inputArray.length
                        : cursor;
                    this._shift.add(shiftStep + this.prefix.length || 0);
                    i--;
                }
                else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1
                    && this.maskAvailablePatterns[maskExpression[cursor]]
                    && this.maskAvailablePatterns[maskExpression[cursor]].optional) {
                    cursor++;
                    i--;
                }
                else if ((this.maskExpression[cursor + 1] === '*')
                    && (this._findSpecialChar(this.maskExpression[cursor + 2]))
                    && (this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2]) && multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
            }
        }
        if (result.length + 1 === maskExpression.length
            && this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        /** @type {?} */
        var shift = 1;
        /** @type {?} */
        var newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        cb(this._shift.has(position) ? shift : 0);
        /** @type {?} */
        var res = "" + this.prefix + result;
        res = this.sufix ? "" + this.prefix + result + this.sufix : "" + this.prefix + result;
        if (result.length === 0) {
            res = "" + this.prefix + result;
        }
        return res;
    };
    /**
     * @param {?} inputSymbol
     * @return {?}
     */
    MaskApplierService.prototype._findSpecialChar = /**
     * @param {?} inputSymbol
     * @return {?}
     */
    function (inputSymbol) {
        /** @type {?} */
        var symbol = this.maskSpecialCharacters
            .find(function (val) { return val === inputSymbol; });
        return symbol;
    };
    /**
     * @private
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    MaskApplierService.prototype._checkSymbolMask = /**
     * @private
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    function (inputSymbol, maskSymbol) {
        this.maskAvailablePatterns = this.customPattern
            ? this.customPattern
            : this.maskAvailablePatterns;
        return this.maskAvailablePatterns[maskSymbol]
            && this.maskAvailablePatterns[maskSymbol].pattern
            && this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol);
    };
    MaskApplierService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MaskApplierService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
    ]; };
    return MaskApplierService;
}());
export { MaskApplierService };
if (false) {
    /** @type {?} */
    MaskApplierService.prototype.dropSpecialCharacters;
    /** @type {?} */
    MaskApplierService.prototype.showTemplate;
    /** @type {?} */
    MaskApplierService.prototype.clearIfNotMatch;
    /** @type {?} */
    MaskApplierService.prototype.maskExpression;
    /** @type {?} */
    MaskApplierService.prototype.maskSpecialCharacters;
    /** @type {?} */
    MaskApplierService.prototype.maskAvailablePatterns;
    /** @type {?} */
    MaskApplierService.prototype.prefix;
    /** @type {?} */
    MaskApplierService.prototype.sufix;
    /** @type {?} */
    MaskApplierService.prototype.customPattern;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype._shift;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.separator;
    /**
     * @type {?}
     * @protected
     */
    MaskApplierService.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1hcHBsaWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImFwcC9uZ3gtbWFzay9tYXNrLWFwcGxpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQVcsTUFBTSxVQUFVLENBQUM7QUFFM0M7SUFlSSw0QkFDOEIsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQVZ2QyxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQW9PM0IsY0FBUyxHQUFHLFVBQUMsR0FBVztZQUM1QixHQUFHLElBQUksRUFBRSxDQUFDOztnQkFDSixDQUFDLEdBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O2dCQUM5QixHQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2hCLEdBQUcsR0FBVyxjQUFjO1lBQ2xDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDN0M7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQTtRQWpPRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxpQkFBaUIsQ0FBQztRQUM3RCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDbkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUNwRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztRQUNoRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLGlCQUFpQixDQUFDO1FBQzdELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFHcEMsQ0FBQztJQUNELGtDQUFrQzs7Ozs7OztJQUMzQixpREFBb0I7Ozs7Ozs7SUFBM0IsVUFBNEIsVUFBa0IsRUFBRSxjQUE2QztRQUNuRixJQUFBLHNDQUFzQyxFQUFyQyxZQUFJLEVBQUUscUJBQStCO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7Ozs7SUFDTSxzQ0FBUzs7Ozs7OztJQUFoQixVQUNJLFVBQWtCLEVBQ2xCLGNBQXNCLEVBQ3RCLFFBQW9CLEVBQ3BCLEVBQXdCO1FBRHhCLHlCQUFBLEVBQUEsWUFBb0I7UUFDcEIsbUJBQUEsRUFBQSxtQkFBdUIsQ0FBQztRQUV4QixJQUFJLFVBQVUsS0FBSyxTQUFTLElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQ2pGLE9BQU8sRUFBRSxDQUFDO1NBQ2I7O1lBQ0csTUFBTSxHQUFXLENBQUM7O1lBQ2xCLE1BQU0sR0FBVyxFQUFFOztZQUNuQixLQUFLLEdBQVksS0FBSztRQUUxQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6RCxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEU7O1lBRUssVUFBVSxHQUFhLFVBQVUsQ0FBQyxRQUFRLEVBQUU7YUFDN0MsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUVkLElBQUksY0FBYyxLQUFLLFdBQVcsRUFBRTtZQUNoQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFO2dCQUMzRixVQUFVLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMvRDs7Z0JBQ0ssU0FBUyxHQUFXLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN2RCxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDN0IsTUFBTSxHQUFHLFFBQVEsQ0FBQzs7Z0JBQ1osU0FBUyxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTTtnQkFDbkIsQ0FBQyxDQUFDLE1BQU07WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNILDJCQUEyQjtZQUMzQixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxXQUFXLEdBQVcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7a0JBQ3hELFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUcsV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDeEQsSUFBSSxNQUFNLEtBQUssY0FBYyxDQUFDLE1BQU0sRUFBRTtvQkFDbEMsTUFBTTtpQkFDVDtnQkFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ2xHLE1BQU0sSUFBSSxXQUFXLENBQUM7b0JBQ3RCLE1BQU0sSUFBSSxDQUFDLENBQUM7aUJBQ2Y7cUJBQU0sSUFDSCxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLO3VCQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDbkU7b0JBQ0UsTUFBTSxJQUFJLFdBQVcsQ0FBQztvQkFDdEIsTUFBTSxJQUFJLENBQUMsQ0FBQztvQkFDWixLQUFLLEdBQUcsS0FBSyxDQUFDO2lCQUNqQjtxQkFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3VCQUM5RCxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs0QkFDekIsR0FBRyxFQUFFO29CQUNULE1BQU0sSUFBSSxXQUFXLENBQUM7b0JBQ3RCLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ2hCO3FCQUFNLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUNsRSxXQUFXLEVBQ1gsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FDN0IsRUFBRTtvQkFDQyxNQUFNLElBQUksV0FBVyxDQUFDO29CQUN0QixNQUFNLElBQUksQ0FBQyxDQUFDO2lCQUNmO3FCQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtvQkFDbkUsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUNoQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ3pCLE1BQU0sSUFBSSxDQUFDLENBQUM7NEJBQ1osTUFBTSxJQUFJLENBQUMsQ0FBQzs7Z0NBQ04sU0FBUyxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQ3BFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTTtnQ0FDbkIsQ0FBQyxDQUFDLE1BQU07NEJBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNyRCxDQUFDLEVBQUUsQ0FBQzs0QkFDSixTQUFTO3lCQUNaO3FCQUNKO29CQUFDLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDbEMsSUFBSSxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQzFDLFNBQVM7eUJBQ2I7cUJBQ0o7b0JBQ0QsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUNoQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ3pCLE1BQU0sSUFBSSxDQUFDLENBQUM7NEJBQ1osTUFBTSxJQUFJLENBQUMsQ0FBQzs7Z0NBQ04sU0FBUyxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQ3BFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTTtnQ0FDbkIsQ0FBQyxDQUFDLE1BQU07NEJBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNyRCxDQUFDLEVBQUUsQ0FBQzs0QkFDSixTQUFTO3lCQUNaO3FCQUNKO29CQUNELElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDaEMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUN6QixNQUFNLElBQUksQ0FBQyxDQUFDOzRCQUNaLE1BQU0sSUFBSSxDQUFDLENBQUM7O2dDQUNOLFNBQVMsR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dDQUNwRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU07Z0NBQ25CLENBQUMsQ0FBQyxNQUFNOzRCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDckQsQ0FBQyxFQUFFLENBQUM7NEJBQ0osU0FBUzt5QkFDWjtxQkFDSjtvQkFDRCxNQUFNLElBQUksV0FBVyxDQUFDO29CQUN0QixNQUFNLEVBQUUsQ0FBQztpQkFDWjtxQkFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7b0JBQ25FLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDaEMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUN6QixNQUFNLElBQUksQ0FBQyxDQUFDOzRCQUNaLE1BQU0sSUFBSSxDQUFDLENBQUM7O2dDQUNOLFNBQVMsR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dDQUNwRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU07Z0NBQ25CLENBQUMsQ0FBQyxNQUFNOzRCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDckQsQ0FBQyxFQUFFLENBQUM7NEJBQ0osU0FBUzt5QkFDWjtxQkFDSjtvQkFDRCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUNwQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUN2RCxTQUFTO3lCQUNaO3FCQUNKO29CQUNELElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDaEMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUN6QixNQUFNLElBQUksQ0FBQyxDQUFDOzRCQUNaLE1BQU0sSUFBSSxDQUFDLENBQUM7O2dDQUNOLFNBQVMsR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dDQUNwRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU07Z0NBQ25CLENBQUMsQ0FBQyxNQUFNOzRCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDckQsQ0FBQyxFQUFFLENBQUM7NEJBQ0osU0FBUzt5QkFDWjtxQkFDSjtvQkFDRCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUNwQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUN2RCxTQUFTO3lCQUNaO3FCQUNKO29CQUNELE1BQU0sSUFBSSxXQUFXLENBQUM7b0JBQ3RCLE1BQU0sRUFBRSxDQUFDO2lCQUNaO3FCQUFNLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDMUUsTUFBTSxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDakMsTUFBTSxFQUFFLENBQUM7O3dCQUNILFNBQVMsR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNwRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU07d0JBQ25CLENBQUMsQ0FBQyxNQUFNO29CQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxFQUFFLENBQUM7aUJBQ1A7cUJBQU0sSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt1QkFDeEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt1QkFDbEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtvQkFDaEUsTUFBTSxFQUFFLENBQUM7b0JBQ1QsQ0FBQyxFQUFFLENBQUM7aUJBQ1A7cUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQzt1QkFDN0MsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt1QkFDeEQsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUU7b0JBQ3RGLE1BQU0sSUFBSSxDQUFDLENBQUM7b0JBQ1osTUFBTSxJQUFJLFdBQVcsQ0FBQztpQkFDekI7YUFDSjtTQUNKO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxjQUFjLENBQUMsTUFBTTtlQUN4QyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekYsTUFBTSxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEOztZQUdHLEtBQUssR0FBVyxDQUFDOztZQUNqQixXQUFXLEdBQVcsUUFBUSxHQUFHLENBQUM7UUFFdEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNqQyxLQUFLLEVBQUUsQ0FBQztZQUNSLFdBQVcsRUFBRSxDQUFDO1NBQ2pCO1FBRUQsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUN0QyxHQUFHLEdBQVcsS0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQVE7UUFDM0MsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQU8sQ0FBQyxDQUFDLENBQUMsS0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQVEsQ0FBQztRQUN0RixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLEdBQUcsR0FBRyxLQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBUSxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDOzs7OztJQUNNLDZDQUFnQjs7OztJQUF2QixVQUF3QixXQUFtQjs7WUFDakMsTUFBTSxHQUF1QixJQUFJLENBQUMscUJBQXFCO2FBQ3hELElBQUksQ0FBQyxVQUFDLEdBQVcsSUFBSyxPQUFBLEdBQUcsS0FBSyxXQUFXLEVBQW5CLENBQW1CLENBQUM7UUFDL0MsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7OztJQUVPLDZDQUFnQjs7Ozs7O0lBQXhCLFVBQXlCLFdBQW1CLEVBQUUsVUFBa0I7UUFDNUQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxhQUFhO1lBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQztlQUN0QyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTztlQUM5QyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1RSxDQUFDOztnQkF4T0osVUFBVTs7OztnREFnQkYsTUFBTSxTQUFDLE1BQU07O0lBb090Qix5QkFBQztDQUFBLEFBcFBELElBb1BDO1NBblBZLGtCQUFrQjs7O0lBRTNCLG1EQUErRDs7SUFDL0QsMENBQTZDOztJQUM3Qyw2Q0FBbUQ7O0lBQ25ELDRDQUFtQzs7SUFDbkMsbURBQTJEOztJQUMzRCxtREFBa0Q7O0lBQ2xELG9DQUFpQzs7SUFDakMsbUNBQStCOztJQUMvQiwyQ0FBMEM7Ozs7O0lBRTFDLG9DQUE0Qjs7Ozs7SUE2TjVCLHVDQVNDOzs7OztJQW5PRyxxQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hc2tBcHBsaWVyU2VydmljZSB7XG5cbiAgICBwdWJsaWMgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBJQ29uZmlnWydkcm9wU3BlY2lhbENoYXJhY3RlcnMnXTtcbiAgICBwdWJsaWMgc2hvd1RlbXBsYXRlOiBJQ29uZmlnWydzaG93VGVtcGxhdGUnXTtcbiAgICBwdWJsaWMgY2xlYXJJZk5vdE1hdGNoOiBJQ29uZmlnWydjbGVhcklmTm90TWF0Y2gnXTtcbiAgICBwdWJsaWMgbWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBtYXNrU3BlY2lhbENoYXJhY3RlcnM6IElDb25maWdbJ3NwZWNpYWxDaGFyYWN0ZXJzJ107XG4gICAgcHVibGljIG1hc2tBdmFpbGFibGVQYXR0ZXJuczogSUNvbmZpZ1sncGF0dGVybnMnXTtcbiAgICBwdWJsaWMgcHJlZml4OiBJQ29uZmlnWydwcmVmaXgnXTtcbiAgICBwdWJsaWMgc3VmaXg6IElDb25maWdbJ3N1Zml4J107XG4gICAgcHVibGljIGN1c3RvbVBhdHRlcm46IElDb25maWdbJ3BhdHRlcm5zJ107XG5cbiAgICBwcml2YXRlIF9zaGlmdDogU2V0PG51bWJlcj47XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoY29uZmlnKSBwcm90ZWN0ZWQgX2NvbmZpZzogSUNvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLl9zaGlmdCA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLl9jb25maWchLnNwZWNpYWxDaGFyYWN0ZXJzO1xuICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucyA9IHRoaXMuX2NvbmZpZy5wYXR0ZXJucztcbiAgICAgICAgdGhpcy5jbGVhcklmTm90TWF0Y2ggPSB0aGlzLl9jb25maWcuY2xlYXJJZk5vdE1hdGNoO1xuICAgICAgICB0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX2NvbmZpZy5kcm9wU3BlY2lhbENoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5fY29uZmlnIS5zcGVjaWFsQ2hhcmFjdGVycztcbiAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnMgPSB0aGlzLl9jb25maWcucGF0dGVybnM7XG4gICAgICAgIHRoaXMucHJlZml4ID0gdGhpcy5fY29uZmlnLnByZWZpeDtcbiAgICAgICAgdGhpcy5zdWZpeCA9IHRoaXMuX2NvbmZpZy5zdWZpeDtcblxuXG4gICAgfVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICBwdWJsaWMgYXBwbHlNYXNrV2l0aFBhdHRlcm4oaW5wdXRWYWx1ZTogc3RyaW5nLCBtYXNrQW5kUGF0dGVybjogW3N0cmluZywgSUNvbmZpZ1sncGF0dGVybnMnXV0pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBbbWFzaywgY3VzdG9tUGF0dGVybl0gPSBtYXNrQW5kUGF0dGVybjtcbiAgICAgICAgdGhpcy5jdXN0b21QYXR0ZXJuID0gY3VzdG9tUGF0dGVybjtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlNYXNrKGlucHV0VmFsdWUsIG1hc2spO1xuICAgIH1cbiAgICBwdWJsaWMgYXBwbHlNYXNrKFxuICAgICAgICBpbnB1dFZhbHVlOiBzdHJpbmcsXG4gICAgICAgIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcsXG4gICAgICAgIHBvc2l0aW9uOiBudW1iZXIgPSAwLFxuICAgICAgICBjYjogRnVuY3Rpb24gPSAoKSA9PiB7IH1cbiAgICApOiBzdHJpbmcge1xuICAgICAgICBpZiAoaW5wdXRWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGlucHV0VmFsdWUgPT09IG51bGwgfHwgbWFza0V4cHJlc3Npb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJzb3I6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9IGBgO1xuICAgICAgICBsZXQgbXVsdGk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICBpZiAoaW5wdXRWYWx1ZS5zbGljZSgwLCB0aGlzLnByZWZpeC5sZW5ndGgpID09PSB0aGlzLnByZWZpeCkge1xuICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc2xpY2UodGhpcy5wcmVmaXgubGVuZ3RoLCBpbnB1dFZhbHVlLmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnB1dEFycmF5OiBzdHJpbmdbXSA9IGlucHV0VmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnNwbGl0KCcnKTtcblxuICAgICAgICBpZiAobWFza0V4cHJlc3Npb24gPT09ICdzZXBhcmF0b3InKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXRWYWx1ZS5tYXRjaCgnW2Etel18W0EtWl0nKSB8fCBpbnB1dFZhbHVlLm1hdGNoKC9bLSEkJV4mKigpXyt8fj1ge31cXFtcXF06XCI7Jzw+PywuXFwvXS8pKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdHJGb3JTZXA6IHN0cmluZyA9IGlucHV0VmFsdWUucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuc2VwYXJhdG9yKHN0ckZvclNlcCk7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHJlc3VsdC5sZW5ndGggKyAxO1xuICAgICAgICAgICAgY3Vyc29yID0gcG9zaXRpb247XG4gICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9cXCp8XFw/L2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKVxuICAgICAgICAgICAgICAgID8gaW5wdXRBcnJheS5sZW5ndGhcbiAgICAgICAgICAgICAgICA6IGN1cnNvcjtcbiAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDAsIGlucHV0U3ltYm9sOiBzdHJpbmcgPSBpbnB1dEFycmF5WzBdOyBpXG4gICAgICAgICAgICAgICAgPCBpbnB1dEFycmF5Lmxlbmd0aDsgaSsrICwgaW5wdXRTeW1ib2wgPSBpbnB1dEFycmF5W2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnNvciA9PT0gbWFza0V4cHJlc3Npb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3JdKSAmJiBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJz8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yICs9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJyAmJiBtdWx0aVxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvciArPSAzO1xuICAgICAgICAgICAgICAgICAgICBtdWx0aSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3JdKVxuICAgICAgICAgICAgICAgICAgICAmJiBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXVxuICAgICAgICAgICAgICAgICAgICA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICc/JyAmJiB0aGlzLl9jaGVja1N5bWJvbE1hc2soXG4gICAgICAgICAgICAgICAgICAgIGlucHV0U3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXVxuICAgICAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICAgICAgICAgICAgICBjdXJzb3IgKz0gMztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdIJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFN5bWJvbCkgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvXFwqfFxcPy9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBpbnB1dEFycmF5Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSAnMicgJiYgTnVtYmVyKGlucHV0U3ltYm9sKSA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdtJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFN5bWJvbCkgPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvXFwqfFxcPy9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBpbnB1dEFycmF5Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9cXCp8XFw/L2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGlucHV0QXJyYXkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAnZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1xcKnxcXD8vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gaW5wdXRBcnJheS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjdXJzb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvciAtIDFdID09PSAnZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAxLCBjdXJzb3IgKyAxKSkgPiAzMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAnbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1xcKnxcXD8vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gaW5wdXRBcnJheS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjdXJzb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvciAtIDFdID09PSAnbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAxLCBjdXJzb3IgKyAxKSkgPiAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmRleE9mKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gbWFza0V4cHJlc3Npb25bY3Vyc29yXTtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yKys7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1xcKnxcXD8vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGlucHV0QXJyYXkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihpbnB1dFN5bWJvbCkgPiAtMVxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltjdXJzb3JdXVxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltjdXJzb3JdXS5vcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJzb3IrKztcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJylcbiAgICAgICAgICAgICAgICAgICAgJiYgKHRoaXMuX2ZpbmRTcGVjaWFsQ2hhcih0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdKSlcbiAgICAgICAgICAgICAgICAgICAgJiYgKHRoaXMuX2ZpbmRTcGVjaWFsQ2hhcihpbnB1dFN5bWJvbCkgPT09IHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pICYmIG11bHRpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvciArPSAzO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoICsgMSA9PT0gbWFza0V4cHJlc3Npb24ubGVuZ3RoXG4gICAgICAgICAgICAmJiB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmRleE9mKG1hc2tFeHByZXNzaW9uW21hc2tFeHByZXNzaW9uLmxlbmd0aCAtIDFdKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBtYXNrRXhwcmVzc2lvblttYXNrRXhwcmVzc2lvbi5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IHNoaWZ0OiBudW1iZXIgPSAxO1xuICAgICAgICBsZXQgbmV3UG9zaXRpb246IG51bWJlciA9IHBvc2l0aW9uICsgMTtcblxuICAgICAgICB3aGlsZSAodGhpcy5fc2hpZnQuaGFzKG5ld1Bvc2l0aW9uKSkge1xuICAgICAgICAgICAgc2hpZnQrKztcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uKys7XG4gICAgICAgIH1cblxuICAgICAgICBjYih0aGlzLl9zaGlmdC5oYXMocG9zaXRpb24pID8gc2hpZnQgOiAwKTtcbiAgICAgICAgbGV0IHJlczogc3RyaW5nID0gYCR7dGhpcy5wcmVmaXh9JHtyZXN1bHR9YDtcbiAgICAgICAgcmVzID0gdGhpcy5zdWZpeCA/IGAke3RoaXMucHJlZml4fSR7cmVzdWx0fSR7dGhpcy5zdWZpeH1gIDogYCR7dGhpcy5wcmVmaXh9JHtyZXN1bHR9YDtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJlcyA9IGAke3RoaXMucHJlZml4fSR7cmVzdWx0fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgcHVibGljIF9maW5kU3BlY2lhbENoYXIoaW5wdXRTeW1ib2w6IHN0cmluZyk6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHN5bWJvbDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnNcbiAgICAgICAgICAgIC5maW5kKCh2YWw6IHN0cmluZykgPT4gdmFsID09PSBpbnB1dFN5bWJvbCk7XG4gICAgICAgIHJldHVybiBzeW1ib2w7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sOiBzdHJpbmcsIG1hc2tTeW1ib2w6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucyA9IHRoaXMuY3VzdG9tUGF0dGVyblxuICAgICAgICAgICAgPyB0aGlzLmN1c3RvbVBhdHRlcm5cbiAgICAgICAgICAgIDogdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnM7XG4gICAgICAgIHJldHVybiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrU3ltYm9sXVxuICAgICAgICAgICAgJiYgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza1N5bWJvbF0ucGF0dGVyblxuICAgICAgICAgICAgJiYgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza1N5bWJvbF0ucGF0dGVybi50ZXN0KGlucHV0U3ltYm9sKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvciA9IChzdHI6IHN0cmluZykgPT4ge1xuICAgICAgICBzdHIgKz0gJyc7XG4gICAgICAgIGNvbnN0IHg6IHN0cmluZ1tdID0gc3RyLnNwbGl0KCcgJyk7XG4gICAgICAgIGxldCByZXM6IHN0cmluZyA9IHhbMF07XG4gICAgICAgIGNvbnN0IHJneDogUmVnRXhwID0gLyhcXGQrKShcXGR7M30pLztcbiAgICAgICAgd2hpbGUgKHJneC50ZXN0KHJlcykpIHtcbiAgICAgICAgICAgIHJlcyA9IHJlcy5yZXBsYWNlKHJneCwgJyQxJyArICcgJyArICckMicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxufVxuIl19