import { Directive, Input, Optional, Host, Self } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../components/multiple-file-upload/file-upload.component";
import * as i2 from "../components/simple-file-upload/simple-file-upload.component";
export class FilesDiscardDirective {
    constructor(fileUpload, simpleFileUpload) {
        this.discardValue = null;
        this.fileUpload = null;
        this.fileUpload = fileUpload || simpleFileUpload;
    }
    set discard(discard) {
        if (typeof discard === 'string' && (discard === 'true' || discard === 'false')) {
            this.discardValue = JSON.parse(discard.toLowerCase());
        }
        else if (typeof discard === 'boolean') {
            this.discardValue = discard;
        }
        else {
            throw Error(`Provided value in directive [discard]="${discard}" is not boolean.`);
        }
    }
    ngAfterViewInit() {
        this.setAccept(this.discardValue);
    }
    ngOnChanges(changes) {
        if ('discard' in changes && changes['discard'].currentValue !== changes['discard'].previousValue) {
            this.setAccept(this.discardValue);
        }
    }
    setAccept(discard) {
        if (this.fileUpload && this.fileUpload.control) {
            this.fileUpload.control.discardInvalid(discard);
        }
    }
}
FilesDiscardDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesDiscardDirective, deps: [{ token: i1.FileUploadComponent, host: true, optional: true, self: true }, { token: i2.SimpleFileUploadComponent, host: true, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
FilesDiscardDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.2", type: FilesDiscardDirective, selector: "file-upload[discard]", inputs: { discard: "discard" }, host: { properties: { "attr.discard": "discard ? discard : null" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesDiscardDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'file-upload[discard]',
                    host: { '[attr.discard]': 'discard ? discard : null' }
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
                }] }]; }, propDecorators: { discard: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY2FyZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pcGxhYi9uZ3gtZmlsZS11cGxvYWQvc3JjL2xpYi9kaXJlY3RpdmVzL2Rpc2NhcmQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFpQixRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBNEIsTUFBTSxlQUFlLENBQUM7Ozs7QUFVaEgsTUFBTSxPQUFPLHFCQUFxQjtJQWlCOUIsWUFDZ0MsVUFBK0IsRUFDL0IsZ0JBQTJDO1FBakJuRSxpQkFBWSxHQUFtQixJQUFJLENBQUM7UUFhM0IsZUFBVSxHQUFvRCxJQUFJLENBQUM7UUFLaEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLElBQUksZ0JBQWdCLENBQUM7SUFDckQsQ0FBQztJQWpCRCxJQUNXLE9BQU8sQ0FBQyxPQUF5QjtRQUN4QyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLElBQUksT0FBTyxLQUFLLE9BQU8sQ0FBQyxFQUFFO1lBQzVFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUN6RDthQUFNLElBQUksT0FBTyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1NBQy9CO2FBQU07WUFDSCxNQUFNLEtBQUssQ0FBQywwQ0FBMEMsT0FBTyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3JGO0lBQ0wsQ0FBQztJQVVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyxJQUFJLFNBQVMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxFQUFFO1lBQzlGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQztJQUVPLFNBQVMsQ0FBQyxPQUFnQjtRQUM5QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQzs7a0hBckNRLHFCQUFxQjtzR0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBSmpDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsSUFBSSxFQUFFLEVBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLEVBQUM7aUJBQ3ZEOzswQkFtQlEsUUFBUTs7MEJBQUksSUFBSTs7MEJBQUksSUFBSTs7MEJBQ3hCLFFBQVE7OzBCQUFJLElBQUk7OzBCQUFJLElBQUk7NENBZGxCLE9BQU87c0JBRGpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBTaW1wbGVDaGFuZ2VzLCBPcHRpb25hbCwgSG9zdCwgU2VsZiwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL211bHRpcGxlLWZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNpbXBsZUZpbGVVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3NpbXBsZS1maWxlLXVwbG9hZC9zaW1wbGUtZmlsZS11cGxvYWQuY29tcG9uZW50JztcclxuXHJcblxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ2ZpbGUtdXBsb2FkW2Rpc2NhcmRdJyxcclxuICAgIGhvc3Q6IHsnW2F0dHIuZGlzY2FyZF0nOiAnZGlzY2FyZCA/IGRpc2NhcmQgOiBudWxsJ31cclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbGVzRGlzY2FyZERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgcHJpdmF0ZSBkaXNjYXJkVmFsdWU6IGJvb2xlYW4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIHNldCBkaXNjYXJkKGRpc2NhcmQ6IGJvb2xlYW4gfCBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGRpc2NhcmQgPT09ICdzdHJpbmcnICYmIChkaXNjYXJkID09PSAndHJ1ZScgfHwgZGlzY2FyZCA9PT0gJ2ZhbHNlJykpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNjYXJkVmFsdWUgPSBKU09OLnBhcnNlKGRpc2NhcmQudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGlzY2FyZCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY2FyZFZhbHVlID0gZGlzY2FyZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvdmlkZWQgdmFsdWUgaW4gZGlyZWN0aXZlIFtkaXNjYXJkXT1cIiR7ZGlzY2FyZH1cIiBpcyBub3QgYm9vbGVhbi5gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaWxlVXBsb2FkOiBGaWxlVXBsb2FkQ29tcG9uZW50IHwgU2ltcGxlRmlsZVVwbG9hZENvbXBvbmVudCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBAU2VsZigpIGZpbGVVcGxvYWQ6IEZpbGVVcGxvYWRDb21wb25lbnQsXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBAU2VsZigpIHNpbXBsZUZpbGVVcGxvYWQ6IFNpbXBsZUZpbGVVcGxvYWRDb21wb25lbnQpIHtcclxuICAgICAgICB0aGlzLmZpbGVVcGxvYWQgPSBmaWxlVXBsb2FkIHx8IHNpbXBsZUZpbGVVcGxvYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldEFjY2VwdCh0aGlzLmRpc2NhcmRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICBpZiAoJ2Rpc2NhcmQnIGluIGNoYW5nZXMgJiYgY2hhbmdlc1snZGlzY2FyZCddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snZGlzY2FyZCddLnByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRBY2NlcHQodGhpcy5kaXNjYXJkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEFjY2VwdChkaXNjYXJkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsZVVwbG9hZCAmJiB0aGlzLmZpbGVVcGxvYWQuY29udHJvbCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVVcGxvYWQuY29udHJvbC5kaXNjYXJkSW52YWxpZChkaXNjYXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19