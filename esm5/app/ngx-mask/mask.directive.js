/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, forwardRef, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaskService } from './mask.service';
var MaskDirective = /** @class */ (function () {
    function MaskDirective(document, _maskService) {
        this.document = document;
        this._maskService = _maskService;
        this._position = null;
        // tslint:disable-next-line
        this.onChange = function (_) { };
        this.onTouch = function () { };
    }
    Object.defineProperty(MaskDirective.prototype, "maskExpression", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskValue = value || '';
            if (!this._maskValue) {
                return;
            }
            this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue);
            this._maskService.formElementProperty = [
                'value',
                this._maskService.applyMask(this._inputValue, this._maskService.maskExpression)
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "specialCharacters", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value ||
                !Array.isArray(value) ||
                (Array.isArray(value) && !value.length)) {
                return;
            }
            this._maskService.maskSpecialCharacters = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "patterns", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.maskAvailablePatterns = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "prefix", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.prefix = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "sufix", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.sufix = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "dropSpecialCharacters", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskService.dropSpecialCharacters = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "showMaskTyped", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.showMaskTyped = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "showTemplate", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskService.showTemplate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "clearIfNotMatch", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskService.clearIfNotMatch = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onInput = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        var position = ((/** @type {?} */ (el.selectionStart))) === 1
            ? ((/** @type {?} */ (el.selectionStart))) + this._maskService.prefix.length
            : (/** @type {?} */ (el.selectionStart));
        /** @type {?} */
        var caretShift = 0;
        this._maskService.applyValueChanges(position, function (shift) { return (caretShift = shift); });
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        el.selectionStart = el.selectionEnd =
            this._position !== null
                ? this._position
                : position +
                    // tslint:disable-next-line
                    (((/** @type {?} */ (e))).inputType === 'deleteContentBackward' ? 0 : caretShift);
        this._position = null;
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        if (el !== null && el.selectionStart !== null &&
            el.selectionStart === el.selectionEnd &&
            el.selectionStart > this._maskService.prefix.length &&
            // tslint:disable-next-line
            ((/** @type {?} */ (e))).keyCode !== 38) {
            return;
        }
        if (this._maskService.showMaskTyped) {
            this._maskService.maskIsShown = this._maskService.maskExpression.replace(/[0-9]/g, '_');
        }
        el.value = !el.value || el.value === this._maskService.prefix
            ? this._maskService.prefix + this._maskService.maskIsShown
            : el.value;
        /** fix of cursor position with prefix when mouse click occur */
        if ((((/** @type {?} */ (el.selectionStart))) || ((/** @type {?} */ (el.selectionEnd)))) <= this._maskService.prefix.length) {
            el.selectionStart = this._maskService.prefix.length;
            return;
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.a = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = (/** @type {?} */ (e.target));
        if (e.keyCode === 38) {
            e.preventDefault();
        }
        if (e.keyCode === 37 || e.keyCode === 8) {
            if (((/** @type {?} */ (el.selectionStart))) <= this._maskService.prefix.length
                && ((/** @type {?} */ (el.selectionEnd))) <= this._maskService.prefix.length) {
                e.preventDefault();
            }
            this.onFocus(e);
            if (e.keyCode === 8
                && el.selectionStart === 0
                && el.selectionEnd === el.value.length) {
                el.value = this._maskService.prefix;
                this._position = this._maskService.prefix ? this._maskService.prefix.length : 1;
                this.onInput(e);
            }
        }
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onPaste = /**
     * @return {?}
     */
    function () {
        this._position = Number.MAX_SAFE_INTEGER;
    };
    /** It writes the value in the input */
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    MaskDirective.prototype.writeValue = /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                if (typeof inputValue === 'number') {
                    inputValue = String(inputValue);
                    this._maskService.isNumberValue = true;
                }
                inputValue && this._maskService.maskExpression ||
                    this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped)
                    ? (this._maskService.formElementProperty = [
                        'value',
                        this._maskService.applyMask(inputValue, this._maskService.maskExpression)
                    ])
                    : (this._maskService.formElementProperty = ['value', inputValue]);
                this._inputValue = inputValue;
                return [2 /*return*/];
            });
        });
    };
    // tslint:disable-next-line
    // tslint:disable-next-line
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnChange = 
    // tslint:disable-next-line
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    };
    // tslint:disable-next-line
    // tslint:disable-next-line
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnTouched = 
    // tslint:disable-next-line
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouch = fn;
    };
    /** It disables the input element */
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    MaskDirective.prototype.setDisabledState = /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    };
    /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    MaskDirective.prototype._repeatPatternSymbols = /**
     * @private
     * @param {?} maskExp
     * @return {?}
     */
    function (maskExp) {
        var _this = this;
        return maskExp.match(/{[0-9]+}/)
            && maskExp.split('')
                .reduce(function (accum, currval, index) {
                _this._start = (currval === '{') ? index : _this._start;
                if (currval !== '}') {
                    return _this._maskService._findSpecialChar(currval) ? accum + currval : accum;
                }
                _this._end = index;
                /** @type {?} */
                var repeatNumber = Number(maskExp
                    .slice(_this._start + 1, _this._end));
                /** @type {?} */
                var repaceWith = new Array(repeatNumber + 1)
                    .join(maskExp[_this._start - 1]);
                return accum + repaceWith;
            }, '') || maskExp;
    };
    MaskDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mask]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return MaskDirective; }),
                            multi: true
                        },
                        MaskService
                    ]
                },] }
    ];
    /** @nocollapse */
    MaskDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: MaskService }
    ]; };
    MaskDirective.propDecorators = {
        maskExpression: [{ type: Input, args: ['mask',] }],
        specialCharacters: [{ type: Input }],
        patterns: [{ type: Input }],
        prefix: [{ type: Input }],
        sufix: [{ type: Input }],
        dropSpecialCharacters: [{ type: Input }],
        showMaskTyped: [{ type: Input }],
        showTemplate: [{ type: Input }],
        clearIfNotMatch: [{ type: Input }],
        onInput: [{ type: HostListener, args: ['input', ['$event'],] }],
        onBlur: [{ type: HostListener, args: ['blur',] }],
        onFocus: [{ type: HostListener, args: ['click', ['$event'],] }],
        a: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        onPaste: [{ type: HostListener, args: ['paste',] }]
    };
    return MaskDirective;
}());
export { MaskDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._inputValue;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._position;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._start;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._end;
    /** @type {?} */
    MaskDirective.prototype.onChange;
    /** @type {?} */
    MaskDirective.prototype.onTouch;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype.document;
    /**
     * @type {?}
     * @private
     */
    MaskDirective.prototype._maskService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImFwcC9uZ3gtbWFzay9tYXNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzdDO0lBcUJFLHVCQUU0QixRQUFhLEVBQy9CLFlBQXlCO1FBRFAsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQVYzQixjQUFTLEdBQWtCLElBQUksQ0FBQzs7UUFLakMsYUFBUSxHQUFHLFVBQUMsQ0FBTSxJQUFPLENBQUMsQ0FBQztRQUMzQixZQUFPLEdBQUcsY0FBUSxDQUFDLENBQUM7SUFLdkIsQ0FBQztJQUdMLHNCQUNXLHlDQUFjOzs7OztRQUR6QixVQUMwQixLQUFhO1lBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixHQUFHO2dCQUN0QyxPQUFPO2dCQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUN6QixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FDakM7YUFDRixDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUFFRCxzQkFDVyw0Q0FBaUI7Ozs7O1FBRDVCLFVBQzZCLEtBQW1DO1lBQzlELElBQ0UsQ0FBQyxLQUFLO2dCQUNOLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3JCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDdkM7Z0JBQ0EsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFDVyxtQ0FBUTs7Ozs7UUFEbkIsVUFDb0IsS0FBMEI7WUFDNUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQUVELHNCQUNXLGlDQUFNOzs7OztRQURqQixVQUNrQixLQUF3QjtZQUN4QyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUVELHNCQUNXLGdDQUFLOzs7OztRQURoQixVQUNpQixLQUF1QjtZQUN0QyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUVELHNCQUNXLGdEQUFxQjs7Ozs7UUFEaEMsVUFDaUMsS0FBdUM7WUFDdEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFDVyx3Q0FBYTs7Ozs7UUFEeEIsVUFDeUIsS0FBK0I7WUFDdEQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFDVyx1Q0FBWTs7Ozs7UUFEdkIsVUFDd0IsS0FBOEI7WUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBRUQsc0JBQ1csMENBQWU7Ozs7O1FBRDFCLFVBQzJCLEtBQWlDO1lBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTs7Ozs7SUFHTSwrQkFBTzs7OztJQURkLFVBQ2UsQ0FBZ0I7O1lBQ3ZCLEVBQUUsR0FBcUIsbUJBQUEsQ0FBQyxDQUFDLE1BQU0sRUFBb0I7UUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLE9BQU87U0FDUjs7WUFDSyxRQUFRLEdBQVcsQ0FBQyxtQkFBQSxFQUFFLENBQUMsY0FBYyxFQUFVLENBQUMsS0FBSyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDakUsQ0FBQyxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVU7O1lBQzNCLFVBQVUsR0FBVyxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQ2pDLFFBQVEsRUFDUixVQUFDLEtBQWEsSUFBSyxPQUFBLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxFQUFwQixDQUFvQixDQUN4QyxDQUFDO1FBQ0Ysa0RBQWtEO1FBQ2xELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssRUFBRSxFQUFFO1lBQ3RDLE9BQU87U0FDUjtRQUNELEVBQUUsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLFlBQVk7WUFDakMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJO2dCQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVM7Z0JBQ2hCLENBQUMsQ0FBQyxRQUFRO29CQUNWLDJCQUEyQjtvQkFDM0IsQ0FBQyxDQUFDLG1CQUFBLENBQUMsRUFBTyxDQUFDLENBQUMsU0FBUyxLQUFLLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFHTSw4QkFBTTs7O0lBRGI7UUFFRSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBR00sK0JBQU87Ozs7SUFEZCxVQUNlLENBQTZCOztZQUNwQyxFQUFFLEdBQXFCLG1CQUFBLENBQUMsQ0FBQyxNQUFNLEVBQW9CO1FBQ3pELElBQ0UsRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUMsY0FBYyxLQUFLLElBQUk7WUFDekMsRUFBRSxDQUFDLGNBQWMsS0FBSyxFQUFFLENBQUMsWUFBWTtZQUNyQyxFQUFFLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDbkQsMkJBQTJCO1lBQzNCLENBQUMsbUJBQUEsQ0FBQyxFQUFPLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUN6QjtZQUNBLE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN6RjtRQUNELEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVc7WUFDMUQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDYixnRUFBZ0U7UUFDaEUsSUFBSSxDQUFDLENBQUMsbUJBQUEsRUFBRSxDQUFDLGNBQWMsRUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBQSxFQUFFLENBQUMsWUFBWSxFQUFVLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNyRyxFQUFFLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNwRCxPQUFPO1NBQ1I7SUFDSCxDQUFDOzs7OztJQUdNLHlCQUFDOzs7O0lBRFIsVUFDUyxDQUFnQjs7WUFDakIsRUFBRSxHQUFxQixtQkFBQSxDQUFDLENBQUMsTUFBTSxFQUFvQjtRQUN6RCxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1lBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLG1CQUFBLEVBQUUsQ0FBQyxjQUFjLEVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU07bUJBQy9ELENBQUMsbUJBQUEsRUFBRSxDQUFDLFlBQVksRUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNuRSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDcEI7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDO21CQUNkLEVBQUUsQ0FBQyxjQUFjLEtBQUssQ0FBQzttQkFDdkIsRUFBRSxDQUFDLFlBQVksS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDeEMsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakI7U0FDRjtJQUNILENBQUM7Ozs7SUFHTSwrQkFBTzs7O0lBRGQ7UUFFRSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUMzQyxDQUFDO0lBRUQsdUNBQXVDOzs7Ozs7SUFDMUIsa0NBQVU7Ozs7O0lBQXZCLFVBQXdCLFVBQWtCOzs7Z0JBQ3hDLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtvQkFDNUIsVUFBVSxHQUFHLEVBQUUsQ0FBQztpQkFDakI7Z0JBQ0QsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7b0JBQ2xDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztpQkFDeEM7Z0JBQ0QsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYztvQkFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztvQkFDakcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsR0FBRzt3QkFDekMsT0FBTzt3QkFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FDekIsVUFBVSxFQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUNqQztxQkFDRixDQUFDO29CQUNGLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Ozs7S0FDL0I7SUFFRCwyQkFBMkI7Ozs7OztJQUNwQix3Q0FBZ0I7Ozs7OztJQUF2QixVQUF3QixFQUFPO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDN0MsQ0FBQztJQUVELDJCQUEyQjs7Ozs7O0lBQ3BCLHlDQUFpQjs7Ozs7O0lBQXhCLFVBQXlCLEVBQU87UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELG9DQUFvQzs7Ozs7O0lBQzdCLHdDQUFnQjs7Ozs7SUFBdkIsVUFBd0IsVUFBbUI7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7Ozs7SUFDTyw2Q0FBcUI7Ozs7O0lBQTdCLFVBQThCLE9BQWU7UUFBN0MsaUJBZ0JDO1FBZkMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztlQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztpQkFDakIsTUFBTSxDQUFDLFVBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxLQUFhO2dCQUNwRCxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUM7Z0JBRXRELElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRTtvQkFDbkIsT0FBTyxLQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7aUJBQzlFO2dCQUNELEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDOztvQkFDWixZQUFZLEdBQVcsTUFBTSxDQUFDLE9BQU87cUJBQ3hDLEtBQUssQ0FBQyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O29CQUMvQixVQUFVLEdBQVcsSUFBSSxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztxQkFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLEtBQUssR0FBRyxVQUFVLENBQUM7WUFDNUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQztJQUN4QixDQUFDOztnQkFuUEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxRQUFRO29CQUNsQixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQzs0QkFDNUMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0QsV0FBVztxQkFDWjtpQkFDRjs7OztnREFhSSxNQUFNLFNBQUMsUUFBUTtnQkExQlgsV0FBVzs7O2lDQStCakIsS0FBSyxTQUFDLE1BQU07b0NBZ0JaLEtBQUs7MkJBWUwsS0FBSzt5QkFRTCxLQUFLO3dCQVFMLEtBQUs7d0NBUUwsS0FBSztnQ0FLTCxLQUFLOytCQVFMLEtBQUs7a0NBS0wsS0FBSzswQkFLTCxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3lCQTZCaEMsWUFBWSxTQUFDLE1BQU07MEJBTW5CLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBeUJoQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQXNCbEMsWUFBWSxTQUFDLE9BQU87O0lBNER2QixvQkFBQztDQUFBLEFBclBELElBcVBDO1NBMU9ZLGFBQWE7Ozs7OztJQUN4QixtQ0FBMkI7Ozs7O0lBQzNCLG9DQUE0Qjs7Ozs7SUFDNUIsa0NBQXdDOzs7OztJQUV4QywrQkFBdUI7Ozs7O0lBQ3ZCLDZCQUFxQjs7SUFFckIsaUNBQWtDOztJQUNsQyxnQ0FBMkI7Ozs7O0lBR3pCLGlDQUF1Qzs7Ozs7SUFDdkMscUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXNrU2VydmljZSB9IGZyb20gJy4vbWFzay5zZXJ2aWNlJztcbmltcG9ydCB7IElDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXNrXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWFza0RpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAgTWFza1NlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXNrRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwcml2YXRlIF9tYXNrVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfaW5wdXRWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIF9wb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBwcml2YXRlIF9zdGFydDogbnVtYmVyO1xuICBwcml2YXRlIF9lbmQ6IG51bWJlcjtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHB1YmxpYyBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcbiAgcHVibGljIG9uVG91Y2ggPSAoKSA9PiB7IH07XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgcHJpdmF0ZSBfbWFza1NlcnZpY2U6IE1hc2tTZXJ2aWNlXG4gICkgeyB9XG5cblxuICBASW5wdXQoJ21hc2snKVxuICBwdWJsaWMgc2V0IG1hc2tFeHByZXNzaW9uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tYXNrVmFsdWUgPSB2YWx1ZSB8fCAnJztcbiAgICBpZiAoIXRoaXMuX21hc2tWYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiA9IHRoaXMuX3JlcGVhdFBhdHRlcm5TeW1ib2xzKHRoaXMuX21hc2tWYWx1ZSk7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFtcbiAgICAgICd2YWx1ZScsXG4gICAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2soXG4gICAgICAgIHRoaXMuX2lucHV0VmFsdWUsXG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uXG4gICAgICApXG4gICAgXTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc3BlY2lhbENoYXJhY3RlcnModmFsdWU6IElDb25maWdbJ3NwZWNpYWxDaGFyYWN0ZXJzJ10pIHtcbiAgICBpZiAoXG4gICAgICAhdmFsdWUgfHxcbiAgICAgICFBcnJheS5pc0FycmF5KHZhbHVlKSB8fFxuICAgICAgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmICF2YWx1ZS5sZW5ndGgpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBwYXR0ZXJucyh2YWx1ZTogSUNvbmZpZ1sncGF0dGVybnMnXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHByZWZpeCh2YWx1ZTogSUNvbmZpZ1sncHJlZml4J10pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzdWZpeCh2YWx1ZTogSUNvbmZpZ1snc3VmaXgnXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWFza1NlcnZpY2Uuc3VmaXggPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzKHZhbHVlOiBJQ29uZmlnWydkcm9wU3BlY2lhbENoYXJhY3RlcnMnXSkge1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmRyb3BTcGVjaWFsQ2hhcmFjdGVycyA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzaG93TWFza1R5cGVkKHZhbHVlOiBJQ29uZmlnWydzaG93TWFza1R5cGVkJ10pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc2hvd1RlbXBsYXRlKHZhbHVlOiBJQ29uZmlnWydzaG93VGVtcGxhdGUnXSkge1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLnNob3dUZW1wbGF0ZSA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBjbGVhcklmTm90TWF0Y2godmFsdWU6IElDb25maWdbJ2NsZWFySWZOb3RNYXRjaCddKSB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuY2xlYXJJZk5vdE1hdGNoID0gdmFsdWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbklucHV0KGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGVsLnZhbHVlO1xuICAgIGlmICghdGhpcy5fbWFza1ZhbHVlKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGVsLnZhbHVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpID09PSAxXG4gICAgICA/IChlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXIpICsgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aFxuICAgICAgOiBlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXI7XG4gICAgbGV0IGNhcmV0U2hpZnQ6IG51bWJlciA9IDA7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlWYWx1ZUNoYW5nZXMoXG4gICAgICBwb3NpdGlvbixcbiAgICAgIChzaGlmdDogbnVtYmVyKSA9PiAoY2FyZXRTaGlmdCA9IHNoaWZ0KVxuICAgICk7XG4gICAgLy8gb25seSBzZXQgdGhlIHNlbGVjdGlvbiBpZiB0aGUgZWxlbWVudCBpcyBhY3RpdmVcbiAgICBpZiAodGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbC5zZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvbkVuZCA9XG4gICAgICB0aGlzLl9wb3NpdGlvbiAhPT0gbnVsbFxuICAgICAgICA/IHRoaXMuX3Bvc2l0aW9uXG4gICAgICAgIDogcG9zaXRpb24gK1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgKChlIGFzIGFueSkuaW5wdXRUeXBlID09PSAnZGVsZXRlQ29udGVudEJhY2t3YXJkJyA/IDAgOiBjYXJldFNoaWZ0KTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgcHVibGljIG9uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5jbGVhcklmTm90TWF0Y2hGbigpO1xuICAgIHRoaXMub25Ub3VjaCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Gb2N1cyhlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBpZiAoXG4gICAgICBlbCAhPT0gbnVsbCAmJiBlbC5zZWxlY3Rpb25TdGFydCAhPT0gbnVsbCAmJlxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPT09IGVsLnNlbGVjdGlvbkVuZCAmJlxuICAgICAgZWwuc2VsZWN0aW9uU3RhcnQgPiB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoICYmXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIChlIGFzIGFueSkua2V5Q29kZSAhPT0gMzhcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX21hc2tTZXJ2aWNlLnNob3dNYXNrVHlwZWQpIHtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tJc1Nob3duID0gdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24ucmVwbGFjZSgvWzAtOV0vZywgJ18nKTtcbiAgICB9XG4gICAgZWwudmFsdWUgPSAhZWwudmFsdWUgfHwgZWwudmFsdWUgPT09IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeFxuICAgICAgPyB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggKyB0aGlzLl9tYXNrU2VydmljZS5tYXNrSXNTaG93blxuICAgICAgOiBlbC52YWx1ZTtcbiAgICAvKiogZml4IG9mIGN1cnNvciBwb3NpdGlvbiB3aXRoIHByZWZpeCB3aGVuIG1vdXNlIGNsaWNrIG9jY3VyICovXG4gICAgaWYgKCgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSB8fCAoZWwuc2VsZWN0aW9uRW5kIGFzIG51bWJlcikpIDw9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGgpIHtcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgcHVibGljIGEoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAzOCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDgpIHtcbiAgICAgIGlmICgoZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoXG4gICAgICAgICYmIChlbC5zZWxlY3Rpb25FbmQgYXMgbnVtYmVyKSA8PSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXgubGVuZ3RoKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25Gb2N1cyhlKTtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDhcbiAgICAgICAgJiYgZWwuc2VsZWN0aW9uU3RhcnQgPT09IDBcbiAgICAgICAgJiYgZWwuc2VsZWN0aW9uRW5kID09PSBlbC52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgZWwudmFsdWUgPSB0aGlzLl9tYXNrU2VydmljZS5wcmVmaXg7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ID8gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCA6IDE7XG4gICAgICAgIHRoaXMub25JbnB1dChlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdwYXN0ZScpXG4gIHB1YmxpYyBvblBhc3RlKCk6IHZvaWQge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gIH1cblxuICAvKiogSXQgd3JpdGVzIHRoZSB2YWx1ZSBpbiB0aGUgaW5wdXQgKi9cbiAgcHVibGljIGFzeW5jIHdyaXRlVmFsdWUoaW5wdXRWYWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGlucHV0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5wdXRWYWx1ZSA9ICcnO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGlucHV0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBpbnB1dFZhbHVlID0gU3RyaW5nKGlucHV0VmFsdWUpO1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UuaXNOdW1iZXJWYWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIGlucHV0VmFsdWUgJiYgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24gfHxcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uICYmICh0aGlzLl9tYXNrU2VydmljZS5wcmVmaXggfHwgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZClcbiAgICAgID8gKHRoaXMuX21hc2tTZXJ2aWNlLmZvcm1FbGVtZW50UHJvcGVydHkgPSBbXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayhcbiAgICAgICAgICBpbnB1dFZhbHVlLFxuICAgICAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgICA6ICh0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gWyd2YWx1ZScsIGlucHV0VmFsdWVdKTtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICB9XG5cbiAgLyoqIEl0IGRpc2FibGVzIHRoZSBpbnB1dCBlbGVtZW50ICovXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gWydkaXNhYmxlZCcsIGlzRGlzYWJsZWRdO1xuICB9XG4gIHByaXZhdGUgX3JlcGVhdFBhdHRlcm5TeW1ib2xzKG1hc2tFeHA6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG1hc2tFeHAubWF0Y2goL3tbMC05XSt9LylcbiAgICAgICYmIG1hc2tFeHAuc3BsaXQoJycpXG4gICAgICAgIC5yZWR1Y2UoKGFjY3VtOiBzdHJpbmcsIGN1cnJ2YWw6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgICAgdGhpcy5fc3RhcnQgPSAoY3VycnZhbCA9PT0gJ3snKSA/IGluZGV4IDogdGhpcy5fc3RhcnQ7XG5cbiAgICAgICAgICBpZiAoY3VycnZhbCAhPT0gJ30nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFza1NlcnZpY2UuX2ZpbmRTcGVjaWFsQ2hhcihjdXJydmFsKSA/IGFjY3VtICsgY3VycnZhbCA6IGFjY3VtO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9lbmQgPSBpbmRleDtcbiAgICAgICAgICBjb25zdCByZXBlYXROdW1iZXI6IG51bWJlciA9IE51bWJlcihtYXNrRXhwXG4gICAgICAgICAgICAuc2xpY2UodGhpcy5fc3RhcnQgKyAxLCB0aGlzLl9lbmQpKTtcbiAgICAgICAgICBjb25zdCByZXBhY2VXaXRoOiBzdHJpbmcgPSBuZXcgQXJyYXkocmVwZWF0TnVtYmVyICsgMSlcbiAgICAgICAgICAgIC5qb2luKG1hc2tFeHBbdGhpcy5fc3RhcnQgLSAxXSk7XG4gICAgICAgICAgcmV0dXJuIGFjY3VtICsgcmVwYWNlV2l0aDtcbiAgICAgICAgfSwgJycpIHx8IG1hc2tFeHA7XG4gIH1cblxufSJdfQ==