import { Directive, Input, Optional, Host, Self } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../components/multiple-file-upload/file-upload.component";
import * as i2 from "../components/simple-file-upload/simple-file-upload.component";
export class FilesAcceptDirective {
    constructor(fileUpload, simpleFileUpload) {
        this.fileUpload = null;
        this.fileUpload = fileUpload || simpleFileUpload;
    }
    ngAfterViewInit() {
        this.setAccept(this.accept);
    }
    ngOnChanges(changes) {
        if ('accept' in changes && changes['accept'].currentValue !== changes['accept'].previousValue) {
            this.setAccept(this.accept);
        }
    }
    setAccept(accept) {
        if (this.fileUpload && this.fileUpload.control) {
            this.fileUpload.control.acceptFiles(accept);
        }
    }
}
FilesAcceptDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesAcceptDirective, deps: [{ token: i1.FileUploadComponent, host: true, optional: true, self: true }, { token: i2.SimpleFileUploadComponent, host: true, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
FilesAcceptDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.2", type: FilesAcceptDirective, selector: "file-upload[accept]", inputs: { accept: "accept" }, host: { properties: { "attr.accept": "accept ? accept : null" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesAcceptDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'file-upload[accept]',
                    host: { '[attr.accept]': 'accept ? accept : null' }
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
                }] }]; }, propDecorators: { accept: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lwbGFiL25neC1maWxlLXVwbG9hZC9zcmMvbGliL2RpcmVjdGl2ZXMvYXR0cmlidXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBaUIsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQTRCLE1BQU0sZUFBZSxDQUFDOzs7O0FBVWhILE1BQU0sT0FBTyxvQkFBb0I7SUFPN0IsWUFDZ0MsVUFBK0IsRUFDL0IsZ0JBQTJDO1FBSjFELGVBQVUsR0FBb0QsSUFBSSxDQUFDO1FBS2hGLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLGdCQUFnQixDQUFDO0lBQ3JELENBQUM7SUFFTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBc0I7UUFDckMsSUFBSSxRQUFRLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRTtZQUMzRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFTyxTQUFTLENBQUMsTUFBYztRQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQzs7aUhBM0JRLG9CQUFvQjtxR0FBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBSmhDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsSUFBSSxFQUFFLEVBQUMsZUFBZSxFQUFFLHdCQUF3QixFQUFDO2lCQUNwRDs7MEJBU1EsUUFBUTs7MEJBQUksSUFBSTs7MEJBQUksSUFBSTs7MEJBQ3hCLFFBQVE7OzBCQUFJLElBQUk7OzBCQUFJLElBQUk7NENBTnRCLE1BQU07c0JBRFosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIE9wdGlvbmFsLCBIb3N0LCBTZWxmLCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvbXVsdGlwbGUtZmlsZS11cGxvYWQvZmlsZS11cGxvYWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2ltcGxlRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvc2ltcGxlLWZpbGUtdXBsb2FkL3NpbXBsZS1maWxlLXVwbG9hZC5jb21wb25lbnQnO1xyXG5cclxuXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnZmlsZS11cGxvYWRbYWNjZXB0XScsXHJcbiAgICBob3N0OiB7J1thdHRyLmFjY2VwdF0nOiAnYWNjZXB0ID8gYWNjZXB0IDogbnVsbCd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWxlc0FjY2VwdERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBhY2NlcHQ6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpbGVVcGxvYWQ6IEZpbGVVcGxvYWRDb21wb25lbnQgfCBTaW1wbGVGaWxlVXBsb2FkQ29tcG9uZW50ID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBAT3B0aW9uYWwoKSBASG9zdCgpIEBTZWxmKCkgZmlsZVVwbG9hZDogRmlsZVVwbG9hZENvbXBvbmVudCxcclxuICAgICAgICBAT3B0aW9uYWwoKSBASG9zdCgpIEBTZWxmKCkgc2ltcGxlRmlsZVVwbG9hZDogU2ltcGxlRmlsZVVwbG9hZENvbXBvbmVudCkge1xyXG4gICAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IGZpbGVVcGxvYWQgfHwgc2ltcGxlRmlsZVVwbG9hZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0QWNjZXB0KHRoaXMuYWNjZXB0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIGlmICgnYWNjZXB0JyBpbiBjaGFuZ2VzICYmIGNoYW5nZXNbJ2FjY2VwdCddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snYWNjZXB0J10ucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEFjY2VwdCh0aGlzLmFjY2VwdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0QWNjZXB0KGFjY2VwdDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsZVVwbG9hZCAmJiB0aGlzLmZpbGVVcGxvYWQuY29udHJvbCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVVcGxvYWQuY29udHJvbC5hY2NlcHRGaWxlcyhhY2NlcHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=