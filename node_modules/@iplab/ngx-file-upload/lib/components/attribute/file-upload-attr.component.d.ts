import { OnInit, ElementRef, Renderer2, OnDestroy, TemplateRef, AfterViewInit } from '@angular/core';
import { FileUploadControl } from '../../helpers/control.class';
import { FileUploadService } from '../../services/file-upload.service';
import * as i0 from "@angular/core";
export declare class FileUploadAttributeComponent implements OnInit, AfterViewInit, OnDestroy {
    fileUploadService: FileUploadService;
    private hostElementRef;
    private renderer;
    private document;
    control: FileUploadControl;
    overlay: ElementRef<HTMLDivElement>;
    templateRef: TemplateRef<any>;
    private hooks;
    private subscriptions;
    constructor(fileUploadService: FileUploadService, hostElementRef: ElementRef, renderer: Renderer2, document: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    get hasFiles(): boolean;
    get isInvalid(): boolean;
    private setEvents;
    private checkAndMarkAsDisabled;
    private preventDragEvents;
    /**
     * on file over add class name
     */
    private onDragOver;
    /**
     * on mouse out remove class name
     */
    private onDragLeave;
    onDrop(event: Event): void;
    private onTouch;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileUploadAttributeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FileUploadAttributeComponent, "[file-drop-zone]", never, { "control": "control"; }, {}, ["templateRef"], ["*"]>;
}
//# sourceMappingURL=file-upload-attr.component.d.ts.map