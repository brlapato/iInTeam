import { Component, Input, HostListener, HostBinding, Inject, ViewChild, ChangeDetectionStrategy, ContentChild, forwardRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploadService } from './../../services/file-upload.service';
import { InsertAnimation } from './../../animations/insert.animation';
import { ZoomAnimation } from './../../animations/zoom.animation';
import { FileUploadAbstract } from './../file-upload-abstract.component';
import * as i0 from "@angular/core";
import * as i1 from "./../../services/file-upload.service";
import * as i2 from "../drop-zone/file-upload-drop-zone.component";
import * as i3 from "../file-list/file-upload-list-item.component";
import * as i4 from "@angular/common";
export const DRAGOVER = 'dragover';
export const TOUCHED = 'ng-touched';
export class FileUploadComponent extends FileUploadAbstract {
    constructor(fileUploadService, hostElementRef, renderer, document, cdr) {
        super(hostElementRef, renderer, cdr);
        this.fileUploadService = fileUploadService;
        this.document = document;
        this.control = null;
        this.animation = true;
        this.templateRef = null;
        this.listItem = null;
        this.templateContext = {
            $implicit: this.fileUploadService.isFileDragDropAvailable(),
            isFileDragDropAvailable: this.fileUploadService.isFileDragDropAvailable()
        };
        /** animation fields */
        this.zoomText = 'static';
        this.listVisible = false;
        this.onTouch = () => {
            this.renderer.addClass(this.hostElementRef.nativeElement, TOUCHED);
        };
    }
    set multiple(isMultiple) {
        this.isMultiple = isMultiple;
        this.checkAndSetMultiple();
    }
    get hasFiles() {
        return this.control.isListVisible && this.control.size > 0;
    }
    get isInvalid() {
        return !this.control.disabled && this.control.invalid;
    }
    get isAnimationDisabled() {
        return this.animation === false || this.animation === 'false';
    }
    trackByFn(index, item) {
        return item.name;
    }
    setEvents() {
        super.setEvents();
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((eventName) => {
            this.hooks.push(this.renderer.listen(this.document, eventName, (event) => this.preventDragEvents(event)));
        });
        ['dragover', 'dragenter'].forEach((eventName) => {
            this.hooks.push(this.renderer.listen(this.hostElementRef.nativeElement, eventName, (event) => this.onDragOver(event)));
        });
        ['dragleave', 'dragend', 'drop'].forEach((eventName) => {
            this.hooks.push(this.renderer.listen(this.hostElementRef.nativeElement, eventName, (event) => this.onDragLeave(event)));
        });
        this.subscriptions.push(this.control.valueChanges.subscribe((files) => this.renderView()));
        this.subscriptions.push(this.control.listVisibilityChanges.subscribe((status) => this.toggleListVisibility()));
    }
    onKeyDown(event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.control.click();
        }
    }
    preventDragEvents(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    renderView() {
        if (!this.listVisible) {
            this.zoomText = this.control.isListVisible && this.control.size > 0 ? 'zoomOut' : 'static';
        }
        this.cdr.markForCheck();
    }
    showList() {
        if (this.zoomText !== 'static') {
            this.listVisible = true;
        }
    }
    hideList() {
        this.listVisible = false;
    }
    toggleListVisibility() {
        this.listVisible = this.control.isListVisible && this.control.size > 0;
        if (this.listVisible) {
            this.renderer.addClass(this.hostElementRef.nativeElement, 'list-visible');
            this.zoomText = 'static';
        }
        this.cdr.markForCheck();
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
        // There is some issue with DragEvent in typescript lib.dom.d.ts
        const files = event.dataTransfer.files;
        this.control.addFiles(files);
        this.onTouch();
    }
    onInputChange(event) {
        const input = (event.target);
        if (!this.control.disabled && input.files.length > 0) {
            this.control.addFiles(input.files);
            this.clearInputEl();
        }
        this.onTouch();
    }
    /**
     * model -> view changes
     */
    writeValue(files) {
        if (files != null) {
            this.control.setValue(files);
        }
    }
    /**
     * register function which will be called on UI change
     * to update view -> model
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.control.disable(isDisabled);
    }
    zoomAnimationDone(event) {
        if (this.control.isListVisible && this.control.size > 0) {
            this.showList();
        }
        else {
            this.hideList();
        }
        if (event.fromState === 'static' && event.toState === 'zoomOut') {
            this.renderer.addClass(this.hostElementRef.nativeElement, 'hide-text');
        }
        else {
            this.renderer.removeClass(this.hostElementRef.nativeElement, 'hide-text');
        }
        if (event.toState === 'zoomIn') {
            this.zoomText = 'static';
        }
    }
    animationListFinished(event) {
        if (event.toState === 'void') {
            this.zoomText = 'zoomIn';
            this.renderer.removeClass(this.hostElementRef.nativeElement, 'list-visible');
        }
        if (event.fromState === 'void') {
            this.zoomText = 'static';
            this.renderer.addClass(this.hostElementRef.nativeElement, 'list-visible');
        }
    }
}
FileUploadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadComponent, deps: [{ token: i1.FileUploadService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: DOCUMENT }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
FileUploadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.2", type: FileUploadComponent, selector: "file-upload:not([simple])", inputs: { control: "control", animation: "animation", multiple: "multiple" }, host: { listeners: { "drop": "onDrop($event)" }, properties: { "class.has-files": "this.hasFiles", "class.ng-invalid": "this.isInvalid", "@.disabled": "this.isAnimationDisabled" } }, providers: [
        FileUploadService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi: true
        }
    ], queries: [{ propertyName: "templateRef", first: true, predicate: ["placeholder"], descendants: true }, { propertyName: "listItem", first: true, predicate: ["item"], descendants: true }], viewQueries: [{ propertyName: "input", first: true, predicate: ["inputRef"], descendants: true, static: true }, { propertyName: "label", first: true, predicate: ["labelRef"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<label #labelRef class=\"upload-input\" tabindex=\"0\" (keydown)=\"onKeyDown($event)\" [@zoomAnimation]=\"zoomText\" (@zoomAnimation.done)=\"zoomAnimationDone($event)\">\r\n\r\n    <ng-container *ngTemplateOutlet=\"templateRef ? templateRef : defaultTemplate; context: templateContext\"></ng-container>\r\n\r\n    <ng-template #defaultTemplate let-isFileDragDropAvailable=\"isFileDragDropAvailable\">\r\n        <file-upload-drop-zone>\r\n            <ng-container *ngIf=\"isFileDragDropAvailable; else isNotDragDropAvailable\">\r\n                <b>Drag and drop</b> files<br> or click here\r\n            </ng-container>\r\n            <ng-template #isNotDragDropAvailable>\r\n                <b>Click here</b> to<br> choose a files\r\n            </ng-template>\r\n        </file-upload-drop-zone>\r\n    </ng-template>\r\n\r\n    <input #inputRef type=\"file\" class=\"files-input\" tabindex=\"-1\" multiple (change)=\"onInputChange($event)\">\r\n</label>\r\n\r\n<div class=\"upload-list\" *ngIf=\"(control.listVisibilityChanges | async) && control.size > 0 && listVisible\" [@insertAnimation]=\"control.size\" (@insertAnimation.done)=\"animationListFinished($event)\">\r\n    <ng-template ngFor let-file let-i=\"index\" [ngForOf]=\"control.valueChanges | async\" [ngForTrackBy]=\"trackByFn\">\r\n        <ng-container *ngTemplateOutlet=\"listItem ? listItem : defaultItemTemplate; context: { $implicit: file, file: file, index: i, control: control }\"></ng-container>\r\n    </ng-template>\r\n    \r\n    <ng-template #defaultItemTemplate let-i=\"index\" let-file=\"file\" let-control=\"control\">\r\n        <file-upload-list-item  [index]=\"i\" [file]=\"file\" [control]=\"control\">Remove</file-upload-list-item>\r\n    </ng-template>\r\n</div>", styles: ["@charset \"UTF-8\";:host,:host>*{box-sizing:border-box}:host{overflow:hidden;display:block;background:#fafafa;padding:20px 66px 20px 20px;min-height:140px;outline:1px dashed #92b0b3;outline-offset:-10px;position:relative}:host ::ng-deep .icon{float:left}:host(.dragover){outline-width:2px}:host(.disabled){opacity:.5;cursor:no-drop}.files-input{width:.1px;height:.1px;opacity:0;position:absolute;left:-100%;top:-100%;overflow:hidden}.upload-input:after{clear:both;content:\"\\a0\";display:block;height:0;line-height:0;visibility:hidden;zoom:1}.upload-input{cursor:pointer;display:inline-block;color:#646464;position:absolute;top:50%;left:50%;margin:0;-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);outline:none}:host(.disabled) .upload-input{cursor:not-allowed}:host(.list-visible) .upload-input{top:20px;left:100%;margin-left:-20px;-ms-transform:translate(-100%,0);transform:translate(-100%);text-align:center}:host(.hide-text) .upload-input{opacity:0}:host(.dragover:not(.disabled)) .upload-input,:host(:not(.disabled)) .upload-input:hover,:host(:not(.disabled)) .upload-input:focus{color:#80a9d2}:host(.dragover:not(.disabled)) .icon svg,:host(:not(.disabled)) .upload-input:hover svg,:host(:not(.disabled)) .upload-input:focus svg{fill:#80a9d2}file-upload-list-item{padding:10px 0 0}file-upload-list-item:first-child{padding:0}\n"], components: [{ type: i2.FileUploadDropZoneComponent, selector: "file-upload-drop-zone" }, { type: i3.FileUploadListItemComponent, selector: "file-upload-list-item", inputs: ["index", "file", "control"] }], directives: [{ type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i4.AsyncPipe }, animations: [
        ZoomAnimation,
        InsertAnimation
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadComponent, decorators: [{
            type: Component,
            args: [{ selector: `file-upload:not([simple])`, providers: [
                        FileUploadService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => FileUploadComponent),
                            multi: true
                        }
                    ], changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        ZoomAnimation,
                        InsertAnimation
                    ], template: "<label #labelRef class=\"upload-input\" tabindex=\"0\" (keydown)=\"onKeyDown($event)\" [@zoomAnimation]=\"zoomText\" (@zoomAnimation.done)=\"zoomAnimationDone($event)\">\r\n\r\n    <ng-container *ngTemplateOutlet=\"templateRef ? templateRef : defaultTemplate; context: templateContext\"></ng-container>\r\n\r\n    <ng-template #defaultTemplate let-isFileDragDropAvailable=\"isFileDragDropAvailable\">\r\n        <file-upload-drop-zone>\r\n            <ng-container *ngIf=\"isFileDragDropAvailable; else isNotDragDropAvailable\">\r\n                <b>Drag and drop</b> files<br> or click here\r\n            </ng-container>\r\n            <ng-template #isNotDragDropAvailable>\r\n                <b>Click here</b> to<br> choose a files\r\n            </ng-template>\r\n        </file-upload-drop-zone>\r\n    </ng-template>\r\n\r\n    <input #inputRef type=\"file\" class=\"files-input\" tabindex=\"-1\" multiple (change)=\"onInputChange($event)\">\r\n</label>\r\n\r\n<div class=\"upload-list\" *ngIf=\"(control.listVisibilityChanges | async) && control.size > 0 && listVisible\" [@insertAnimation]=\"control.size\" (@insertAnimation.done)=\"animationListFinished($event)\">\r\n    <ng-template ngFor let-file let-i=\"index\" [ngForOf]=\"control.valueChanges | async\" [ngForTrackBy]=\"trackByFn\">\r\n        <ng-container *ngTemplateOutlet=\"listItem ? listItem : defaultItemTemplate; context: { $implicit: file, file: file, index: i, control: control }\"></ng-container>\r\n    </ng-template>\r\n    \r\n    <ng-template #defaultItemTemplate let-i=\"index\" let-file=\"file\" let-control=\"control\">\r\n        <file-upload-list-item  [index]=\"i\" [file]=\"file\" [control]=\"control\">Remove</file-upload-list-item>\r\n    </ng-template>\r\n</div>", styles: ["@charset \"UTF-8\";:host,:host>*{box-sizing:border-box}:host{overflow:hidden;display:block;background:#fafafa;padding:20px 66px 20px 20px;min-height:140px;outline:1px dashed #92b0b3;outline-offset:-10px;position:relative}:host ::ng-deep .icon{float:left}:host(.dragover){outline-width:2px}:host(.disabled){opacity:.5;cursor:no-drop}.files-input{width:.1px;height:.1px;opacity:0;position:absolute;left:-100%;top:-100%;overflow:hidden}.upload-input:after{clear:both;content:\"\\a0\";display:block;height:0;line-height:0;visibility:hidden;zoom:1}.upload-input{cursor:pointer;display:inline-block;color:#646464;position:absolute;top:50%;left:50%;margin:0;-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);outline:none}:host(.disabled) .upload-input{cursor:not-allowed}:host(.list-visible) .upload-input{top:20px;left:100%;margin-left:-20px;-ms-transform:translate(-100%,0);transform:translate(-100%);text-align:center}:host(.hide-text) .upload-input{opacity:0}:host(.dragover:not(.disabled)) .upload-input,:host(:not(.disabled)) .upload-input:hover,:host(:not(.disabled)) .upload-input:focus{color:#80a9d2}:host(.dragover:not(.disabled)) .icon svg,:host(:not(.disabled)) .upload-input:hover svg,:host(:not(.disabled)) .upload-input:focus svg{fill:#80a9d2}file-upload-list-item{padding:10px 0 0}file-upload-list-item:first-child{padding:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FileUploadService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { control: [{
                type: Input
            }], animation: [{
                type: Input
            }], multiple: [{
                type: Input,
                args: ['multiple']
            }], templateRef: [{
                type: ContentChild,
                args: ['placeholder']
            }], listItem: [{
                type: ContentChild,
                args: ['item']
            }], input: [{
                type: ViewChild,
                args: ['inputRef', { static: true }]
            }], label: [{
                type: ViewChild,
                args: ['labelRef', { static: true }]
            }], hasFiles: [{
                type: HostBinding,
                args: ['class.has-files']
            }], isInvalid: [{
                type: HostBinding,
                args: ['class.ng-invalid']
            }], isAnimationDisabled: [{
                type: HostBinding,
                args: ['@.disabled']
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaXBsYWIvbmd4LWZpbGUtdXBsb2FkL3NyYy9saWIvY29tcG9uZW50cy9tdWx0aXBsZS1maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pcGxhYi9uZ3gtZmlsZS11cGxvYWQvc3JjL2xpYi9jb21wb25lbnRzL211bHRpcGxlLWZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUVMLFlBQVksRUFFWixXQUFXLEVBQ1gsTUFBTSxFQUVOLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLFVBQVUsRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBSXpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7OztBQUV6RSxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUM7QUFvQnBDLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxrQkFBa0I7SUFtQ3ZELFlBQ1csaUJBQW9DLEVBQzNDLGNBQTBCLEVBQzFCLFFBQW1CLEVBQ08sUUFBUSxFQUNs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dERBMEJNLHE1RERlVTtRQUNSLGFBQWE7UUFDYixlQUFlO0tBQ2xCOzJGQUVRLG1CQUFtQjtrQkFsQi9CLFNBQVM7K0JBQ0ksMkJBQTJCLGFBRzFCO3dCQUNQLGlCQUFpQjt3QkFDakI7NEJBQ0ksT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUM7NEJBQ2xELEtBQUssRUFBRSxJQUFJO3lCQUNkO3FCQUNKLG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGNBQ25DO3dCQUNSLGFBQWE7d0JBQ2IsZUFBZTtxQkFDbEI7OzBCQXlDSSxNQUFNOzJCQUFDLFFBQVE7NEVBcENiLE9BQU87c0JBRGIsS0FBSztnQkFJQyxTQUFTO3NCQURmLEtBQUs7Z0JBSUssUUFBUTtzQkFEbEIsS0FBSzt1QkFBQyxVQUFVO2dCQU9WLFdBQVc7c0JBRGpCLFlBQVk7dUJBQUMsYUFBYTtnQkFJcEIsUUFBUTtzQkFEZCxZQUFZO3VCQUFDLE1BQU07Z0JBSWIsS0FBSztzQkFEWCxTQUFTO3VCQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBSWhDLEtBQUs7c0JBRFgsU0FBUzt1QkFBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQXVCNUIsUUFBUTtzQkFEbEIsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBTW5CLFNBQVM7c0JBRG5CLFdBQVc7dUJBQUMsa0JBQWtCO2dCQU1wQixtQkFBbUI7c0JBRDdCLFdBQVc7dUJBQUMsWUFBWTtnQkEyRmxCLE1BQU07c0JBRFosWUFBWTt1QkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgSG9zdEJpbmRpbmcsXHJcbiAgICBJbmplY3QsXHJcbiAgICBUZW1wbGF0ZVJlZixcclxuICAgIFZpZXdDaGlsZCxcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ29udGVudENoaWxkLFxyXG4gICAgZm9yd2FyZFJlZixcclxuICAgIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgRmlsZVVwbG9hZENvbnRyb2wgfSBmcm9tICcuLy4uLy4uL2hlbHBlcnMvY29udHJvbC5jbGFzcyc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9maWxlLXVwbG9hZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5zZXJ0QW5pbWF0aW9uIH0gZnJvbSAnLi8uLi8uLi9hbmltYXRpb25zL2luc2VydC5hbmltYXRpb24nO1xyXG5pbXBvcnQgeyBab29tQW5pbWF0aW9uIH0gZnJvbSAnLi8uLi8uLi9hbmltYXRpb25zL3pvb20uYW5pbWF0aW9uJztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZEFic3RyYWN0IH0gZnJvbSAnLi8uLi9maWxlLXVwbG9hZC1hYnN0cmFjdC5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERSQUdPVkVSID0gJ2RyYWdvdmVyJztcclxuZXhwb3J0IGNvbnN0IFRPVUNIRUQgPSAnbmctdG91Y2hlZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBgZmlsZS11cGxvYWQ6bm90KFtzaW1wbGVdKWAsXHJcbiAgICB0ZW1wbGF0ZVVybDogYC4vZmlsZS11cGxvYWQuY29tcG9uZW50Lmh0bWxgLFxyXG4gICAgc3R5bGVVcmxzOiBbYC4vZmlsZS11cGxvYWQuY29tcG9uZW50LnNjc3NgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEZpbGVVcGxvYWRTZXJ2aWNlLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpbGVVcGxvYWRDb21wb25lbnQpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICBab29tQW5pbWF0aW9uLFxyXG4gICAgICAgIEluc2VydEFuaW1hdGlvblxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZENvbXBvbmVudCBleHRlbmRzIEZpbGVVcGxvYWRBYnN0cmFjdCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGNvbnRyb2w6IEZpbGVVcGxvYWRDb250cm9sID0gbnVsbDtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGFuaW1hdGlvbjogYm9vbGVhbiB8IHN0cmluZyA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCdtdWx0aXBsZScpXHJcbiAgICBwdWJsaWMgc2V0IG11bHRpcGxlKGlzTXVsdGlwbGU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmlzTXVsdGlwbGUgPSBpc011bHRpcGxlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tBbmRTZXRNdWx0aXBsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoJ3BsYWNlaG9sZGVyJylcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiA9IG51bGw7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZCgnaXRlbScpXHJcbiAgICBwdWJsaWMgbGlzdEl0ZW06IFRlbXBsYXRlUmVmPGFueT4gPSBudWxsO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0UmVmJywgeyBzdGF0aWM6IHRydWUgfSlcclxuICAgIHB1YmxpYyBpbnB1dDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdsYWJlbFJlZicsIHsgc3RhdGljOiB0cnVlIH0pXHJcbiAgICBwdWJsaWMgbGFiZWw6IEVsZW1lbnRSZWY8SFRNTExhYmVsRWxlbWVudD47XHJcblxyXG4gICAgcHVibGljIHRlbXBsYXRlQ29udGV4dCA9IHtcclxuICAgICAgICAkaW1wbGljaXQ6IHRoaXMuZmlsZVVwbG9hZFNlcnZpY2UuaXNGaWxlRHJhZ0Ryb3BBdmFpbGFibGUoKSxcclxuICAgICAgICBpc0ZpbGVEcmFnRHJvcEF2YWlsYWJsZTogdGhpcy5maWxlVXBsb2FkU2VydmljZS5pc0ZpbGVEcmFnRHJvcEF2YWlsYWJsZSgpXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBhbmltYXRpb24gZmllbGRzICovXHJcbiAgICBwdWJsaWMgem9vbVRleHQ6ICd6b29tT3V0JyB8ICd6b29tSW4nIHwgJ3N0YXRpYycgPSAnc3RhdGljJztcclxuICAgIHB1YmxpYyBsaXN0VmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBmaWxlVXBsb2FkU2VydmljZTogRmlsZVVwbG9hZFNlcnZpY2UsXHJcbiAgICAgICAgaG9zdEVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50LFxyXG4gICAgICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKGhvc3RFbGVtZW50UmVmLCByZW5kZXJlciwgY2RyKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhhcy1maWxlcycpXHJcbiAgICBwdWJsaWMgZ2V0IGhhc0ZpbGVzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2wuaXNMaXN0VmlzaWJsZSAmJiB0aGlzLmNvbnRyb2wuc2l6ZSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uZy1pbnZhbGlkJylcclxuICAgIHB1YmxpYyBnZXQgaXNJbnZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5jb250cm9sLmRpc2FibGVkICYmIHRoaXMuY29udHJvbC5pbnZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0QmluZGluZygnQC5kaXNhYmxlZCcpXHJcbiAgICBwdWJsaWMgZ2V0IGlzQW5pbWF0aW9uRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uID09PSBmYWxzZSB8fCAodGhpcy5hbmltYXRpb24gYXMgc3RyaW5nKSA9PT0gJ2ZhbHNlJztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJhY2tCeUZuKGluZGV4OiBudW1iZXIsIGl0ZW06IEZpbGUpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBpdGVtLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5zZXRFdmVudHMoKTtcclxuICAgICAgICBbJ2RyYWcnLCAnZHJhZ3N0YXJ0JywgJ2RyYWdlbmQnLCAnZHJhZ292ZXInLCAnZHJhZ2VudGVyJywgJ2RyYWdsZWF2ZScsICdkcm9wJ10uZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9va3MucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsIGV2ZW50TmFtZSwgKGV2ZW50OiBhbnkpID0+IHRoaXMucHJldmVudERyYWdFdmVudHMoZXZlbnQpKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBbJ2RyYWdvdmVyJywgJ2RyYWdlbnRlciddLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhvb2tzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmhvc3RFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGV2ZW50TmFtZSwgKGV2ZW50OiBhbnkpID0+IHRoaXMub25EcmFnT3ZlcihldmVudCkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFsnZHJhZ2xlYXZlJywgJ2RyYWdlbmQnLCAnZHJvcCddLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhvb2tzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmhvc3RFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGV2ZW50TmFtZSwgKGV2ZW50OiBhbnkpID0+IHRoaXMub25EcmFnTGVhdmUoZXZlbnQpKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGZpbGVzKSA9PiB0aGlzLnJlbmRlclZpZXcoKSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLmxpc3RWaXNpYmlsaXR5Q2hhbmdlcy5zdWJzY3JpYmUoKHN0YXR1cykgPT4gdGhpcy50b2dnbGVMaXN0VmlzaWJpbGl0eSgpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC5rZXlDb2RlID09PSAzMikge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wuY2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmV2ZW50RHJhZ0V2ZW50cyhldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyVmlldygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubGlzdFZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy56b29tVGV4dCA9IHRoaXMuY29udHJvbC5pc0xpc3RWaXNpYmxlICYmIHRoaXMuY29udHJvbC5zaXplID4gMCA/ICd6b29tT3V0JyA6ICdzdGF0aWMnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dMaXN0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnpvb21UZXh0ICE9PSAnc3RhdGljJykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlTGlzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b2dnbGVMaXN0VmlzaWJpbGl0eSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RWaXNpYmxlID0gdGhpcy5jb250cm9sLmlzTGlzdFZpc2libGUgJiYgdGhpcy5jb250cm9sLnNpemUgPiAwO1xyXG4gICAgICAgIGlmICh0aGlzLmxpc3RWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbGlzdC12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbVRleHQgPSAnc3RhdGljJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvbiBmaWxlIG92ZXIgYWRkIGNsYXNzIG5hbWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRyYWdPdmVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBEUkFHT1ZFUik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvbiBtb3VzZSBvdXQgcmVtb3ZlIGNsYXNzIG5hbWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkRyYWdMZWF2ZShldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaG9zdEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgRFJBR09WRVIpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxyXG4gICAgcHVibGljIG9uRHJvcChldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVGhlcmUgaXMgc29tZSBpc3N1ZSB3aXRoIERyYWdFdmVudCBpbiB0eXBlc2NyaXB0IGxpYi5kb20uZC50c1xyXG4gICAgICAgIGNvbnN0IGZpbGVzID0gKGV2ZW50IGFzIGFueSkuZGF0YVRyYW5zZmVyLmZpbGVzO1xyXG4gICAgICAgIHRoaXMuY29udHJvbC5hZGRGaWxlcyhmaWxlcyk7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSAoZXZlbnQudGFyZ2V0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY29udHJvbC5kaXNhYmxlZCAmJiBpbnB1dC5maWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5hZGRGaWxlcyhpbnB1dC5maWxlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJJbnB1dEVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uVG91Y2goKTtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgICogbW9kZWwgLT4gdmlldyBjaGFuZ2VzXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZShmaWxlczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGZpbGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLnNldFZhbHVlKGZpbGVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWdpc3RlciBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBvbiBVSSBjaGFuZ2VcclxuICAgICAqIHRvIHVwZGF0ZSB2aWV3IC0+IG1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodjogQXJyYXk8RmlsZT4pID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvdWNoOiAoKSA9PiB2b2lkID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBUT1VDSEVEKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2ggPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250cm9sLmRpc2FibGUoaXNEaXNhYmxlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHpvb21BbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2wuaXNMaXN0VmlzaWJsZSAmJiB0aGlzLmNvbnRyb2wuc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TGlzdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC5mcm9tU3RhdGUgPT09ICdzdGF0aWMnICYmIGV2ZW50LnRvU3RhdGUgPT09ICd6b29tT3V0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2hpZGUtdGV4dCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaGlkZS10ZXh0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ3pvb21JbicpIHtcclxuICAgICAgICAgICAgdGhpcy56b29tVGV4dCA9ICdzdGF0aWMnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYW5pbWF0aW9uTGlzdEZpbmlzaGVkKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAndm9pZCcpIHtcclxuICAgICAgICAgICAgdGhpcy56b29tVGV4dCA9ICd6b29tSW4nO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaG9zdEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2xpc3QtdmlzaWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQuZnJvbVN0YXRlID09PSAndm9pZCcpIHtcclxuICAgICAgICAgICAgdGhpcy56b29tVGV4dCA9ICdzdGF0aWMnO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2xpc3QtdmlzaWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCI8bGFiZWwgI2xhYmVsUmVmIGNsYXNzPVwidXBsb2FkLWlucHV0XCIgdGFiaW5kZXg9XCIwXCIgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIiBbQHpvb21BbmltYXRpb25dPVwiem9vbVRleHRcIiAoQHpvb21BbmltYXRpb24uZG9uZSk9XCJ6b29tQW5pbWF0aW9uRG9uZSgkZXZlbnQpXCI+XHJcblxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlUmVmID8gdGVtcGxhdGVSZWYgOiBkZWZhdWx0VGVtcGxhdGU7IGNvbnRleHQ6IHRlbXBsYXRlQ29udGV4dFwiPjwvbmctY29udGFpbmVyPlxyXG5cclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlIGxldC1pc0ZpbGVEcmFnRHJvcEF2YWlsYWJsZT1cImlzRmlsZURyYWdEcm9wQXZhaWxhYmxlXCI+XHJcbiAgICAgICAgPGZpbGUtdXBsb2FkLWRyb3Atem9uZT5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzRmlsZURyYWdEcm9wQXZhaWxhYmxlOyBlbHNlIGlzTm90RHJhZ0Ryb3BBdmFpbGFibGVcIj5cclxuICAgICAgICAgICAgICAgIDxiPkRyYWcgYW5kIGRyb3A8L2I+IGZpbGVzPGJyPiBvciBjbGljayBoZXJlXHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2lzTm90RHJhZ0Ryb3BBdmFpbGFibGU+XHJcbiAgICAgICAgICAgICAgICA8Yj5DbGljayBoZXJlPC9iPiB0bzxicj4gY2hvb3NlIGEgZmlsZXNcclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L2ZpbGUtdXBsb2FkLWRyb3Atem9uZT5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgPGlucHV0ICNpbnB1dFJlZiB0eXBlPVwiZmlsZVwiIGNsYXNzPVwiZmlsZXMtaW5wdXRcIiB0YWJpbmRleD1cIi0xXCIgbXVsdGlwbGUgKGNoYW5nZSk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIj5cclxuPC9sYWJlbD5cclxuXHJcbjxkaXYgY2xhc3M9XCJ1cGxvYWQtbGlzdFwiICpuZ0lmPVwiKGNvbnRyb2wubGlzdFZpc2liaWxpdHlDaGFuZ2VzIHwgYXN5bmMpICYmIGNvbnRyb2wuc2l6ZSA+IDAgJiYgbGlzdFZpc2libGVcIiBbQGluc2VydEFuaW1hdGlvbl09XCJjb250cm9sLnNpemVcIiAoQGluc2VydEFuaW1hdGlvbi5kb25lKT1cImFuaW1hdGlvbkxpc3RGaW5pc2hlZCgkZXZlbnQpXCI+XHJcbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWZpbGUgbGV0LWk9XCJpbmRleFwiIFtuZ0Zvck9mXT1cImNvbnRyb2wudmFsdWVDaGFuZ2VzIHwgYXN5bmNcIiBbbmdGb3JUcmFja0J5XT1cInRyYWNrQnlGblwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsaXN0SXRlbSA/IGxpc3RJdGVtIDogZGVmYXVsdEl0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGZpbGUsIGZpbGU6IGZpbGUsIGluZGV4OiBpLCBjb250cm9sOiBjb250cm9sIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICBcclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEl0ZW1UZW1wbGF0ZSBsZXQtaT1cImluZGV4XCIgbGV0LWZpbGU9XCJmaWxlXCIgbGV0LWNvbnRyb2w9XCJjb250cm9sXCI+XHJcbiAgICAgICAgPGZpbGUtdXBsb2FkLWxpc3QtaXRlbSAgW2luZGV4XT1cImlcIiBbZmlsZV09XCJmaWxlXCIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlJlbW92ZTwvZmlsZS11cGxvYWQtbGlzdC1pdGVtPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuPC9kaXY+Il19