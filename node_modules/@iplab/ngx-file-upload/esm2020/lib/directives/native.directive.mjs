import { Directive, Input, Optional, Host, Self } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../components/multiple-file-upload/file-upload.component";
import * as i2 from "../components/simple-file-upload/simple-file-upload.component";
export class FilesNativeDirective {
    constructor(fileUpload, simpleFileUpload) {
        this.nativeValue = null;
        this.fileUpload = null;
        this.fileUpload = fileUpload || simpleFileUpload;
    }
    set native(isNative) {
        if (typeof isNative === 'string' && (isNative === 'true' || isNative === 'false')) {
            this.nativeValue = JSON.parse(isNative.toLowerCase());
        }
        else if (typeof isNative === 'boolean') {
            this.nativeValue = isNative;
        }
        else {
            throw Error(`Provided value in directive [native]="${isNative}" is not boolean.`);
        }
    }
    ngAfterViewInit() {
        this.enableNative(this.nativeValue);
    }
    ngOnChanges(changes) {
        if ('native' in changes && changes['native'].currentValue !== changes['native'].previousValue) {
            this.enableNative(this.nativeValue);
        }
    }
    enableNative(isNative) {
        if (this.fileUpload && this.fileUpload.control) {
            this.fileUpload.control.native(isNative);
        }
    }
}
FilesNativeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesNativeDirective, deps: [{ token: i1.FileUploadComponent, host: true, optional: true, self: true }, { token: i2.SimpleFileUploadComponent, host: true, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
FilesNativeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.2", type: FilesNativeDirective, selector: "file-upload[native]", inputs: { native: "native" }, host: { properties: { "attr.native": "native ? native : null" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesNativeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'file-upload[native]',
                    host: { '[attr.native]': 'native ? native : null' }
                }]
        }], ctorParameters: function () { return [{ type: i1.FileUploadComponent, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }, {
                    type: Self
                }] }, { type: i2.SimpleFileUploadComponent, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }, {
                    type: Self
                }] }]; }, propDecorators: { native: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lwbGFiL25neC1maWxlLXVwbG9hZC9zcmMvbGliL2RpcmVjdGl2ZXMvbmF0aXZlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBaUIsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQTRCLE1BQU0sZUFBZSxDQUFDOzs7O0FBVWhILE1BQU0sT0FBTyxvQkFBb0I7SUFpQjdCLFlBQ2dDLFVBQStCLEVBQy9CLGdCQUEyQztRQWpCbkUsZ0JBQVcsR0FBbUIsSUFBSSxDQUFDO1FBYTFCLGVBQVUsR0FBb0QsSUFBSSxDQUFDO1FBS2hGLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLGdCQUFnQixDQUFDO0lBQ3JELENBQUM7SUFqQkQsSUFDVyxNQUFNLENBQUMsUUFBMEI7UUFDeEMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxJQUFJLFFBQVEsS0FBSyxPQUFPLENBQUMsRUFBRTtZQUMvRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDekQ7YUFBTSxJQUFJLE9BQU8sUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztTQUMvQjthQUFNO1lBQ0gsTUFBTSxLQUFLLENBQUMseUNBQXlDLFFBQVEsbUJBQW1CLENBQUMsQ0FBQztTQUNyRjtJQUNMLENBQUM7SUFVTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDckMsSUFBSSxRQUFRLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRTtZQUMzRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFTyxZQUFZLENBQUMsUUFBaUI7UUFDbEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7O2lIQXJDUSxvQkFBb0I7cUdBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQUpoQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLElBQUksRUFBRSxFQUFDLGVBQWUsRUFBRSx3QkFBd0IsRUFBQztpQkFDcEQ7OzBCQW1CUSxRQUFROzswQkFBSSxJQUFJOzswQkFBSSxJQUFJOzswQkFDeEIsUUFBUTs7MEJBQUksSUFBSTs7MEJBQUksSUFBSTs0Q0FkbEIsTUFBTTtzQkFEaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIE9wdGlvbmFsLCBIb3N0LCBTZWxmLCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvbXVsdGlwbGUtZmlsZS11cGxvYWQvZmlsZS11cGxvYWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2ltcGxlRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvc2ltcGxlLWZpbGUtdXBsb2FkL3NpbXBsZS1maWxlLXVwbG9hZC5jb21wb25lbnQnO1xyXG5cclxuXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnZmlsZS11cGxvYWRbbmF0aXZlXScsXHJcbiAgICBob3N0OiB7J1thdHRyLm5hdGl2ZV0nOiAnbmF0aXZlID8gbmF0aXZlIDogbnVsbCd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWxlc05hdGl2ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgcHJpdmF0ZSBuYXRpdmVWYWx1ZTogYm9vbGVhbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgc2V0IG5hdGl2ZShpc05hdGl2ZTogYm9vbGVhbiB8IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaXNOYXRpdmUgPT09ICdzdHJpbmcnICYmIChpc05hdGl2ZSA9PT0gJ3RydWUnIHx8IGlzTmF0aXZlID09PSAnZmFsc2UnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZVZhbHVlID0gSlNPTi5wYXJzZShpc05hdGl2ZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpc05hdGl2ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlVmFsdWUgPSBpc05hdGl2ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvdmlkZWQgdmFsdWUgaW4gZGlyZWN0aXZlIFtuYXRpdmVdPVwiJHtpc05hdGl2ZX1cIiBpcyBub3QgYm9vbGVhbi5gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaWxlVXBsb2FkOiBGaWxlVXBsb2FkQ29tcG9uZW50IHwgU2ltcGxlRmlsZVVwbG9hZENvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBAU2VsZigpIGZpbGVVcGxvYWQ6IEZpbGVVcGxvYWRDb21wb25lbnQsXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBAU2VsZigpIHNpbXBsZUZpbGVVcGxvYWQ6IFNpbXBsZUZpbGVVcGxvYWRDb21wb25lbnQpIHtcclxuICAgICAgICB0aGlzLmZpbGVVcGxvYWQgPSBmaWxlVXBsb2FkIHx8IHNpbXBsZUZpbGVVcGxvYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVuYWJsZU5hdGl2ZSh0aGlzLm5hdGl2ZVZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIGlmICgnbmF0aXZlJyBpbiBjaGFuZ2VzICYmIGNoYW5nZXNbJ25hdGl2ZSddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snbmF0aXZlJ10ucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZU5hdGl2ZSh0aGlzLm5hdGl2ZVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbmFibGVOYXRpdmUoaXNOYXRpdmU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5maWxlVXBsb2FkICYmIHRoaXMuZmlsZVVwbG9hZC5jb250cm9sKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZC5jb250cm9sLm5hdGl2ZShpc05hdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==