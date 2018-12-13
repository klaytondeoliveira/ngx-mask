/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * @record
 */
export function IConfig() { }
if (false) {
    /** @type {?} */
    IConfig.prototype.sufix;
    /** @type {?} */
    IConfig.prototype.prefix;
    /** @type {?} */
    IConfig.prototype.clearIfNotMatch;
    /** @type {?} */
    IConfig.prototype.showTemplate;
    /** @type {?} */
    IConfig.prototype.showMaskTyped;
    /** @type {?} */
    IConfig.prototype.dropSpecialCharacters;
    /** @type {?} */
    IConfig.prototype.specialCharacters;
    /** @type {?} */
    IConfig.prototype.patterns;
}
/** @type {?} */
export const config = new InjectionToken('config');
/** @type {?} */
export const NEW_CONFIG = new InjectionToken('NEW_CONFIG');
/** @type {?} */
export const INITIAL_CONFIG = new InjectionToken('INITIAL_CONFIG');
/** @type {?} */
export const initialConfig = {
    sufix: '',
    prefix: '',
    clearIfNotMatch: false,
    showTemplate: false,
    showMaskTyped: false,
    dropSpecialCharacters: true,
    specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '\"', '\''],
    patterns: {
        '0': {
            pattern: new RegExp('\\d'),
        },
        '9': {
            pattern: new RegExp('\\d'),
            optional: true
        },
        'A': {
            pattern: new RegExp('\[a-zA-Z0-9\]')
        },
        'S': {
            pattern: new RegExp('\[a-zA-Z\]')
        },
        'd': {
            pattern: new RegExp('\\d'),
        },
        'm': {
            pattern: new RegExp('\\d'),
        },
        'H': {
            pattern: new RegExp('\\d'),
        },
        'h': {
            pattern: new RegExp('\\d'),
        },
        's': {
            pattern: new RegExp('\\d'),
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJhcHAvbmd4LW1hc2svY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRS9DLDZCQWNDOzs7SUFiRyx3QkFBYzs7SUFDZCx5QkFBZTs7SUFDZixrQ0FBeUI7O0lBQ3pCLCtCQUFzQjs7SUFDdEIsZ0NBQXVCOztJQUN2Qix3Q0FBMEM7O0lBQzFDLG9DQUE0Qjs7SUFDNUIsMkJBS0U7OztBQUlOLE1BQU0sT0FBTyxNQUFNLEdBQTJCLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQzs7QUFDMUUsTUFBTSxPQUFPLFVBQVUsR0FBMkIsSUFBSSxjQUFjLENBQUMsWUFBWSxDQUFDOztBQUNsRixNQUFNLE9BQU8sY0FBYyxHQUE0QixJQUFJLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFM0YsTUFBTSxPQUFPLGFBQWEsR0FBWTtJQUNsQyxLQUFLLEVBQUUsRUFBRTtJQUNULE1BQU0sRUFBRSxFQUFFO0lBQ1YsZUFBZSxFQUFFLEtBQUs7SUFDdEIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsYUFBYSxFQUFFLEtBQUs7SUFDcEIscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixpQkFBaUIsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7SUFDM0YsUUFBUSxFQUFFO1FBQ04sR0FBRyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUNELEdBQUcsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDMUIsUUFBUSxFQUFFLElBQUk7U0FDakI7UUFDRCxHQUFHLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDO1NBQ3ZDO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQztTQUNwQztRQUNELEdBQUcsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDN0I7UUFDRCxHQUFHLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzdCO1FBQ0QsR0FBRyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUNELEdBQUcsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDN0I7UUFDRCxHQUFHLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzdCO0tBQ0o7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgc3VmaXg6IHN0cmluZztcbiAgICBwcmVmaXg6IHN0cmluZztcbiAgICBjbGVhcklmTm90TWF0Y2g6IGJvb2xlYW47XG4gICAgc2hvd1RlbXBsYXRlOiBib29sZWFuO1xuICAgIHNob3dNYXNrVHlwZWQ6IGJvb2xlYW47XG4gICAgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBib29sZWFuIHwgc3RyaW5nW107XG4gICAgc3BlY2lhbENoYXJhY3RlcnM6IHN0cmluZ1tdO1xuICAgIHBhdHRlcm5zOiB7XG4gICAgICAgIFtjaGFyYWN0ZXI6IHN0cmluZ106IHtcbiAgICAgICAgICAgIHBhdHRlcm46IFJlZ0V4cCxcbiAgICAgICAgICAgIG9wdGlvbmFsPzogYm9vbGVhblxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgb3B0aW9uc0NvbmZpZyA9IFBhcnRpYWw8SUNvbmZpZz47XG5leHBvcnQgY29uc3QgY29uZmlnOiBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+ID0gbmV3IEluamVjdGlvblRva2VuKCdjb25maWcnKTtcbmV4cG9ydCBjb25zdCBORVdfQ09ORklHOiBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+ID0gbmV3IEluamVjdGlvblRva2VuKCdORVdfQ09ORklHJyk7XG5leHBvcnQgY29uc3QgSU5JVElBTF9DT05GSUc6IEluamVjdGlvblRva2VuPElDb25maWc+ID0gbmV3IEluamVjdGlvblRva2VuKCdJTklUSUFMX0NPTkZJRycpO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbENvbmZpZzogSUNvbmZpZyA9IHtcbiAgICBzdWZpeDogJycsXG4gICAgcHJlZml4OiAnJyxcbiAgICBjbGVhcklmTm90TWF0Y2g6IGZhbHNlLFxuICAgIHNob3dUZW1wbGF0ZTogZmFsc2UsXG4gICAgc2hvd01hc2tUeXBlZDogZmFsc2UsXG4gICAgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiB0cnVlLFxuICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiBbJy0nLCAnLycsICcoJywgJyknLCAnLicsICc6JywgJyAnLCAnKycsICcsJywgJ0AnLCAnWycsICddJywgJ1xcXCInLCAnXFwnJ10sXG4gICAgcGF0dGVybnM6IHtcbiAgICAgICAgJzAnOiB7XG4gICAgICAgICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgICAgICB9LFxuICAgICAgICAnOSc6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgICAgICAgICBvcHRpb25hbDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICAnQSc6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcW2EtekEtWjAtOVxcXScpXG4gICAgICAgIH0sXG4gICAgICAgICdTJzoge1xuICAgICAgICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxbYS16QS1aXFxdJylcbiAgICAgICAgfSxcbiAgICAgICAgJ2QnOiB7XG4gICAgICAgICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgICAgICB9LFxuICAgICAgICAnbSc6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgICAgIH0sXG4gICAgICAgICdIJzoge1xuICAgICAgICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICAgICAgfSxcbiAgICAgICAgJ2gnOiB7XG4gICAgICAgICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgICAgICB9LFxuICAgICAgICAncyc6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgICAgIH1cbiAgICB9XG59O1xuIl19