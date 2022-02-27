import { Input, HostListener, HostBinding, Inject, ViewChild, ContentChild, Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FileUploadControl } from '../../helpers/control.class';
import { IsNullOrEmpty } from '../../helpers/helpers.class';
import { FileUploadService } from '../../services/file-upload.service';
import { DRAGOVER, TOUCHED } from './../multiple-file-upload/file-upload.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/file-upload.service";
import * as i2 from "../drop-zone/file-upload-drop-zone.component";
import * as i3 from "@angular/common";
export class FileUploadAttributeComponent {
    constructor(fileUploadService, hostElementRef, renderer, document) {
        this.fileUploadService = fileUploadService;
        this.hostElementRef = hostElementRef;
        this.renderer = renderer;
        this.document = document;
        this.control = null;
        this.templateRef = null;
        this.hooks = [];
        this.subscriptions = [];
        this.onTouch = () => {
            this.renderer.addClass(this.hostElementRef.nativeElement, TOUCHED);
        };
    }
    ngOnInit() {
        if (IsNullOrEmpty(this.control)) {
            this.control = new FileUploadControl();
        }
    }
    ngAfterViewInit() {
        if (this.fileUploadService.isFileDragDropAvailable()) {
            this.setEvents();
            this.checkAndMarkAsDisabled();
        }
    }
    ngOnDestroy() {
        this.hooks.forEach((hook) => hook());
        this.hooks.length = 0;
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        this.subscriptions.length = 0;
    }
    get hasFiles() {
        return this.control.isListVisible && this.control.size > 0;
    }
    get isInvalid() {
        return !this.control.disabled && this.control.invalid;
    }
    setEvents() {
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((eventName) => {
            this.hooks.push(this.renderer.listen(this.document, eventName, (event) => this.preventDragEvents(event)));
        });
        ['dragover', 'dragenter'].forEach((eventName) => {
            this.hooks.push(this.renderer.listen(this.hostElementRef.nativeElement, eventName, (event) => this.onDragOver(event)));
        });
        ['dragleave', 'dragend', 'drop'].forEach((eventName) => {
            this.hooks.push(this.renderer.listen(this.hostElementRef.nativeElement, eventName, (event) => {
                if (this.control.disabled && eventName === 'dragleave' || eventName !== 'dragleave') {
                    this.onDragLeave(event);
                }
            }));
        });
        ['dragleave'].forEach((eventName) => {
            this.hooks.push(this.renderer.listen(this.overlay.nativeElement, eventName, (event) => this.onDragLeave(event)));
        });
        this.subscriptions.push(this.control.statusChanges.subscribe((status) => this.checkAndMarkAsDisabled()));
    }
    checkAndMarkAsDisabled() {
        if (this.control.disabled) {
            this.renderer.addClass(this.hostElementRef.nativeElement, 'disabled');
        }
        else {
            this.renderer.removeClass(this.hostElementRef.nativeElement, 'disabled');
        }
    }
    preventDragEvents(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * on file over add class name
     */
    onDragOver(event) {
        this.renderer.addClass(this.hostElementRef.nativeElement, DRAGOVER);
    }
    /**
     * on mouse out remove class name
     */
    onDragLeave(event) {
        this.renderer.removeClass(this.hostElementRef.nativeElement, DRAGOVER);
    }
    onDrop(event) {
        if (this.control.disabled) {
            return;
        }
        const files = event.dataTransfer.files;
        this.control.addFiles(files);
        this.onTouch();
    }
}
FileUploadAttributeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadAttributeComponent, deps: [{ token: i1.FileUploadService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
FileUploadAttributeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.2", type: FileUploadAttributeComponent, selector: "[file-drop-zone]", inputs: { control: "control" }, host: { listeners: { "drop": "onDrop($event)" }, properties: { "class.has-files": "this.hasFiles", "class.ng-invalid": "this.isInvalid" } }, providers: [
        FileUploadService
    ], queries: [{ propertyName: "templateRef", first: true, predicate: ["placeholder"], descendants: true }], viewQueries: [{ propertyName: "overlay", first: true, predicate: ["overlay"], descendants: true }], ngImport: i0, template: `
        <ng-content></ng-content>
        <div #overlay class="overlay" *ngIf="fileUploadService.isFileDragDropAvailable()">

            <div class="upload-input">
                <ng-container *ngTemplateOutlet="templateRef ? templateRef : defaultTemplate"></ng-container>

                <ng-template #defaultTemplate>
                    <file-upload-drop-zone>
                        <b>Drop</b> it here
                    </file-upload-drop-zone>
                </ng-template>
            </div>
        </div>
    `, isInline: true, styles: [":host{position:relative;display:block}:host .overlay{display:none;background:rgba(255,255,255,.8);outline:2px dashed #92b0b3;outline-offset:-10px;position:absolute;top:0;left:0;right:0;bottom:0}:host(.dragover:not(.disabled)) .overlay{display:block}:host ::ng-deep .icon{margin:0 auto 10px}:host ::ng-deep .icon svg{fill:#80a9d2}.upload-input{pointer-events:none;cursor:pointer;display:inline-block;color:#80a9d2;position:absolute;top:50%;left:50%;-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);transition:all .15s ease-in-out}\n"], components: [{ type: i2.FileUploadDropZoneComponent, selector: "file-upload-drop-zone" }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadAttributeComponent, decorators: [{
            type: Component,
            args: [{ selector: `[file-drop-zone]`, template: `
        <ng-content></ng-content>
        <div #overlay class="overlay" *ngIf="fileUploadService.isFileDragDropAvailable()">

            <div class="upload-input">
                <ng-container *ngTemplateOutlet="templateRef ? templateRef : defaultTemplate"></ng-container>

                <ng-template #defaultTemplate>
                    <file-upload-drop-zone>
                        <b>Drop</b> it here
                    </file-upload-drop-zone>
                </ng-template>
            </div>
        </div>
    `, providers: [
                        FileUploadService
                    ], styles: [":host{position:relative;display:block}:host .overlay{display:none;background:rgba(255,255,255,.8);outline:2px dashed #92b0b3;outline-offset:-10px;position:absolute;top:0;left:0;right:0;bottom:0}:host(.dragover:not(.disabled)) .overlay{display:block}:host ::ng-deep .icon{margin:0 auto 10px}:host ::ng-deep .icon svg{fill:#80a9d2}.upload-input{pointer-events:none;cursor:pointer;display:inline-block;color:#80a9d2;position:absolute;top:50%;left:50%;-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);transition:all .15s ease-in-out}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FileUploadService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { control: [{
                type: Input
            }], overlay: [{
                type: ViewChild,
                args: ['overlay']
            }], templateRef: [{
                type: ContentChild,
                args: ['placeholder']
            }], hasFiles: [{
                type: HostBinding,
                args: ['class.has-files']
            }], isInvalid: [{
                type: HostBinding,
                args: ['class.ng-invalid']
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQtYXR0ci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pcGxhYi9uZ3gtZmlsZS11cGxvYWQvc3JjL2xpYi9jb21wb25lbnRzL2F0dHJpYnV0ZS9maWxlLXVwbG9hZC1hdHRyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUdMLFlBQVksRUFHWixXQUFXLEVBQ1gsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBRVosU0FBUyxFQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7Ozs7QUEwQnBGLE1BQU0sT0FBTyw0QkFBNEI7SUFlckMsWUFDVyxpQkFBb0MsRUFDbkMsY0FBMEIsRUFDMUIsUUFBbUIsRUFDRCxRQUFRO1FBSDNCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDbkMsbUJBQWMsR0FBZCxjQUFjLENBQVk7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNELGFBQVEsR0FBUixRQUFRLENBQUE7UUFoQi9CLFlBQU8sR0FBc0IsSUFBSSxDQUFDO1FBTWxDLGdCQUFXLEdBQXFCLElBQUksQ0FBQztRQUVwQyxVQUFLLEdBQW9CLEVBQUUsQ0FBQztRQUU1QixrQkFBYSxHQUF3QixFQUFFLENBQUM7UUE4R3hDLFlBQU8sR0FBZSxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFR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QUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUdNLE1BQU0sQ0FBQyxLQUFZO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBQ0QsTUFBTSxLQUFLLEdBQUksS0FBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7O3lIQXpIUSw0QkFBNEIsc0dBbUJ6QixRQUFROzZHQW5CWCw0QkFBNEIsd05BSjFCO1FBQ1AsaUJBQWlCO0tBQ3BCLHNPQWxCUzs7Ozs7Ozs7Ozs7Ozs7S0FjVDsyRkFNUSw0QkFBNEI7a0JBdEJ4QyxTQUFTOytCQUNJLGtCQUFrQixZQUNsQjs7Ozs7Ozs7Ozs7Ozs7S0FjVCxhQUVVO3dCQUNQLGlCQUFpQjtxQkFDcEI7OzBCQXFCSSxNQUFNOzJCQUFDLFFBQVE7NENBaEJiLE9BQU87c0JBRGIsS0FBSztnQkFJQyxPQUFPO3NCQURiLFNBQVM7dUJBQUMsU0FBUztnQkFJYixXQUFXO3NCQURqQixZQUFZO3VCQUFDLGFBQWE7Z0JBbUNoQixRQUFRO3NCQURsQixXQUFXO3VCQUFDLGlCQUFpQjtnQkFNbkIsU0FBUztzQkFEbkIsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBbUV4QixNQUFNO3NCQURaLFlBQVk7dUJBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIElucHV0LFxyXG4gICAgT25Jbml0LFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEhvc3RMaXN0ZW5lcixcclxuICAgIFJlbmRlcmVyMixcclxuICAgIE9uRGVzdHJveSxcclxuICAgIEhvc3RCaW5kaW5nLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgQ29udGVudENoaWxkLFxyXG4gICAgVGVtcGxhdGVSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBBZnRlclZpZXdJbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZpbGVVcGxvYWRDb250cm9sIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jb250cm9sLmNsYXNzJztcclxuaW1wb3J0IHsgSXNOdWxsT3JFbXB0eSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvaGVscGVycy5jbGFzcyc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlsZS11cGxvYWQuc2VydmljZSc7XHJcbmltcG9ydCB7IERSQUdPVkVSLCBUT1VDSEVEIH0gZnJvbSAnLi8uLi9tdWx0aXBsZS1maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBgW2ZpbGUtZHJvcC16b25lXWAsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICA8ZGl2ICNvdmVybGF5IGNsYXNzPVwib3ZlcmxheVwiICpuZ0lmPVwiZmlsZVVwbG9hZFNlcnZpY2UuaXNGaWxlRHJhZ0Ryb3BBdmFpbGFibGUoKVwiPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVwbG9hZC1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlUmVmID8gdGVtcGxhdGVSZWYgOiBkZWZhdWx0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8ZmlsZS11cGxvYWQtZHJvcC16b25lPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Yj5Ecm9wPC9iPiBpdCBoZXJlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9maWxlLXVwbG9hZC1kcm9wLXpvbmU+XHJcbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZVVybHM6IFtgLi9maWxlLXVwbG9hZC1hdHRyLmNvbXBvbmVudC5zY3NzYF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBGaWxlVXBsb2FkU2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZEF0dHJpYnV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGNvbnRyb2w6IEZpbGVVcGxvYWRDb250cm9sID0gbnVsbDtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdvdmVybGF5JylcclxuICAgIHB1YmxpYyBvdmVybGF5OiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKCdwbGFjZWhvbGRlcicpXHJcbiAgICBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaG9va3M6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogQXJyYXk8U3Vic2NyaXB0aW9uPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBmaWxlVXBsb2FkU2VydmljZTogRmlsZVVwbG9hZFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBob3N0RWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudFxyXG4gICAgKSB7fVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAoSXNOdWxsT3JFbXB0eSh0aGlzLmNvbnRyb2wpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbCA9IG5ldyBGaWxlVXBsb2FkQ29udHJvbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbGVVcGxvYWRTZXJ2aWNlLmlzRmlsZURyYWdEcm9wQXZhaWxhYmxlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0FuZE1hcmtBc0Rpc2FibGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhvb2tzLmZvckVhY2goKGhvb2spID0+IGhvb2soKSk7XHJcbiAgICAgICAgdGhpcy5ob29rcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb24pID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhhcy1maWxlcycpXHJcbiAgICBwdWJsaWMgZ2V0IGhhc0ZpbGVzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2wuaXNMaXN0VmlzaWJsZSAmJiB0aGlzLmNvbnRyb2wuc2l6ZSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uZy1pbnZhbGlkJylcclxuICAgIHB1YmxpYyBnZXQgaXNJbnZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5jb250cm9sLmRpc2FibGVkICYmIHRoaXMuY29udHJvbC5pbnZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIFsnZHJhZycsICdkcmFnc3RhcnQnLCAnZHJhZ2VuZCcsICdkcmFnb3ZlcicsICdkcmFnZW50ZXInLCAnZHJhZ2xlYXZlJywgJ2Ryb3AnXS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ob29rcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudCwgZXZlbnROYW1lLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5wcmV2ZW50RHJhZ0V2ZW50cyhldmVudCkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFsnZHJhZ292ZXInLCAnZHJhZ2VudGVyJ10uZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9va3MucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuaG9zdEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZXZlbnROYW1lLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5vbkRyYWdPdmVyKGV2ZW50KSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgWydkcmFnbGVhdmUnLCAnZHJhZ2VuZCcsICdkcm9wJ10uZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9va3MucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuaG9zdEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZXZlbnROYW1lLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbC5kaXNhYmxlZCAmJiBldmVudE5hbWUgPT09ICdkcmFnbGVhdmUnIHx8IGV2ZW50TmFtZSAhPT0gJ2RyYWdsZWF2ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRyYWdMZWF2ZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgWydkcmFnbGVhdmUnXS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ob29rcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5vdmVybGF5Lm5hdGl2ZUVsZW1lbnQsIGV2ZW50TmFtZSwgKGV2ZW50OiBhbnkpID0+IHRoaXMub25EcmFnTGVhdmUoZXZlbnQpKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKChzdGF0dXMpID0+IHRoaXMuY2hlY2tBbmRNYXJrQXNEaXNhYmxlZCgpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0FuZE1hcmtBc0Rpc2FibGVkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3RFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmV2ZW50RHJhZ0V2ZW50cyhldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogb24gZmlsZSBvdmVyIGFkZCBjbGFzcyBuYW1lXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EcmFnT3ZlcihldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgRFJBR09WRVIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogb24gbW91c2Ugb3V0IHJlbW92ZSBjbGFzcyBuYW1lXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25EcmFnTGVhdmUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmhvc3RFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIERSQUdPVkVSKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcclxuICAgIHB1YmxpYyBvbkRyb3AoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGZpbGVzID0gKGV2ZW50IGFzIGFueSkuZGF0YVRyYW5zZmVyLmZpbGVzO1xyXG4gICAgICAgIHRoaXMuY29udHJvbC5hZGRGaWxlcyhmaWxlcyk7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvdWNoOiAoKSA9PiB2b2lkID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBUT1VDSEVEKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19