/*
 * FileUpload
 *
 * By Ivan Pintar, http://www.pintar-ivan.com
 * Licensed under the MIT License
 * See https://github.com/pIvan/file-upload/blob/master/README.md
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/multiple-file-upload/file-upload.component';
import { FileUploadDropZoneComponent } from './components/drop-zone/file-upload-drop-zone.component';
import { FileUploadListItemComponent } from './components/file-list/file-upload-list-item.component';
import { FileUploadIconComponent } from './components/file-list/file-upload-icon.component';
import { FileUploadAttributeComponent } from './components/attribute/file-upload-attr.component';
import { SimpleFileUploadComponent } from './components/simple-file-upload/simple-file-upload.component';
import { FileSizeValidator, FilesLimitValidator, FilesAcceptValidator } from './directives/validators.directive';
import { FilesAcceptDirective } from './directives/attribute.directive';
import { FilesDiscardDirective } from './directives/discard.directive';
import { FilesNativeDirective } from './directives/native.directive';
import * as i0 from "@angular/core";
export { FileUploadComponent } from './components/multiple-file-upload/file-upload.component';
export { FileUploadDropZoneComponent } from './components/drop-zone/file-upload-drop-zone.component';
export { FileUploadListItemComponent } from './components/file-list/file-upload-list-item.component';
export { FileUploadAttributeComponent } from './components/attribute/file-upload-attr.component';
export { SimpleFileUploadComponent } from './components/simple-file-upload/simple-file-upload.component';
export { FileSizeValidator, FilesLimitValidator, FilesAcceptValidator } from './directives/validators.directive';
export { FilesAcceptDirective } from './directives/attribute.directive';
export { FilesDiscardDirective } from './directives/discard.directive';
export { FilesNativeDirective } from './directives/native.directive';
export { FileUploadControl } from './helpers/control.class';
export { FileUploadValidators } from './helpers/validators.class';
export { FileUploadTypes } from './helpers/file-types.class';
export { FileUploadService } from './services/file-upload.service';
export class FileUploadModule {
    ngDoBootstrap() { }
}
FileUploadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FileUploadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadModule, declarations: [FileUploadComponent,
        FileUploadListItemComponent,
        FileUploadIconComponent,
        FileUploadDropZoneComponent,
        FileUploadAttributeComponent,
        FileSizeValidator,
        FilesLimitValidator,
        FilesAcceptValidator,
        FilesAcceptDirective,
        FilesDiscardDirective,
        FilesNativeDirective,
        SimpleFileUploadComponent], imports: [CommonModule], exports: [FileUploadComponent,
        FileUploadDropZoneComponent,
        FileUploadListItemComponent,
        FileUploadAttributeComponent,
        FileSizeValidator,
        FilesLimitValidator,
        FilesAcceptValidator,
        FilesAcceptDirective,
        FilesDiscardDirective,
        SimpleFileUploadComponent] });
FileUploadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        FileUploadComponent,
                        FileUploadListItemComponent,
                        FileUploadIconComponent,
                        FileUploadDropZoneComponent,
                        FileUploadAttributeComponent,
                        FileSizeValidator,
                        FilesLimitValidator,
                        FilesAcceptValidator,
                        FilesAcceptDirective,
                        FilesDiscardDirective,
                        FilesNativeDirective,
                        SimpleFileUploadComponent
                    ],
                    exports: [
                        FileUploadComponent,
                        FileUploadDropZoneComponent,
                        FileUploadListItemComponent,
                        FileUploadAttributeComponent,
                        FileSizeValidator,
                        FilesLimitValidator,
                        FilesAcceptValidator,
                        FilesAcceptDirective,
                        FilesDiscardDirective,
                        SimpleFileUploadComponent
                    ],
                    entryComponents: [
                        FileUploadComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvaXBsYWIvbmd4LWZpbGUtdXBsb2FkL3NyYy9saWIvZmlsZS11cGxvYWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQzlGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBRXpHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUVyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNyRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNyRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqSCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQWlDLE1BQU0sNEJBQTRCLENBQUM7QUFDakcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBeUNuRSxNQUFNLE9BQU8sZ0JBQWdCO0lBQ3pCLGFBQWEsS0FBSSxDQUFDOzs2R0FEVCxnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFsQ3JCLG1CQUFtQjtRQUNuQiwyQkFBMkI7UUFDM0IsdUJBQXVCO1FBQ3ZCLDJCQUEyQjtRQUUzQiw0QkFBNEI7UUFFNUIsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFFcEIseUJBQXlCLGFBakJ6QixZQUFZLGFBb0JaLG1CQUFtQjtRQUNuQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDRCQUE0QjtRQUU1QixpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIscUJBQXFCO1FBRXJCLHlCQUF5Qjs4R0FNcEIsZ0JBQWdCLFlBdENoQjtZQUNMLFlBQVk7U0FDZjsyRkFvQ1EsZ0JBQWdCO2tCQXZDNUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTtxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsbUJBQW1CO3dCQUNuQiwyQkFBMkI7d0JBQzNCLHVCQUF1Qjt3QkFDdkIsMkJBQTJCO3dCQUUzQiw0QkFBNEI7d0JBRTVCLGlCQUFpQjt3QkFDakIsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3dCQUNyQixvQkFBb0I7d0JBRXBCLHlCQUF5QjtxQkFDNUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLG1CQUFtQjt3QkFDbkIsMkJBQTJCO3dCQUMzQiwyQkFBMkI7d0JBQzNCLDRCQUE0Qjt3QkFFNUIsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBRXJCLHlCQUF5QjtxQkFDNUI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNiLG1CQUFtQjtxQkFDdEI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBGaWxlVXBsb2FkXHJcbiAqXHJcbiAqIEJ5IEl2YW4gUGludGFyLCBodHRwOi8vd3d3LnBpbnRhci1pdmFuLmNvbVxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wSXZhbi9maWxlLXVwbG9hZC9ibG9iL21hc3Rlci9SRUFETUUubWRcclxuICovXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGaWxlVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL211bHRpcGxlLWZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWREcm9wWm9uZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wLXpvbmUvZmlsZS11cGxvYWQtZHJvcC16b25lLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWxlLWxpc3QvZmlsZS11cGxvYWQtbGlzdC1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbGUtbGlzdC9maWxlLXVwbG9hZC1pY29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRBdHRyaWJ1dGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXR0cmlidXRlL2ZpbGUtdXBsb2FkLWF0dHIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2ltcGxlRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zaW1wbGUtZmlsZS11cGxvYWQvc2ltcGxlLWZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBGaWxlU2l6ZVZhbGlkYXRvciwgRmlsZXNMaW1pdFZhbGlkYXRvciwgRmlsZXNBY2NlcHRWYWxpZGF0b3IgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBGaWxlc0FjY2VwdERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hdHRyaWJ1dGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRmlsZXNEaXNjYXJkRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Rpc2NhcmQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRmlsZXNOYXRpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmF0aXZlLmRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgeyBGaWxlVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL211bHRpcGxlLWZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcbmV4cG9ydCB7IEZpbGVVcGxvYWREcm9wWm9uZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kcm9wLXpvbmUvZmlsZS11cGxvYWQtZHJvcC16b25lLmNvbXBvbmVudCc7XHJcbmV4cG9ydCB7IEZpbGVVcGxvYWRMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWxlLWxpc3QvZmlsZS11cGxvYWQtbGlzdC1pdGVtLmNvbXBvbmVudCc7XHJcbmV4cG9ydCB7IEZpbGVVcGxvYWRBdHRyaWJ1dGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXR0cmlidXRlL2ZpbGUtdXBsb2FkLWF0dHIuY29tcG9uZW50JztcclxuZXhwb3J0IHsgU2ltcGxlRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zaW1wbGUtZmlsZS11cGxvYWQvc2ltcGxlLWZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcbmV4cG9ydCB7IEZpbGVTaXplVmFsaWRhdG9yLCBGaWxlc0xpbWl0VmFsaWRhdG9yLCBGaWxlc0FjY2VwdFZhbGlkYXRvciB9IGZyb20gJy4vZGlyZWN0aXZlcy92YWxpZGF0b3JzLmRpcmVjdGl2ZSc7XHJcbmV4cG9ydCB7IEZpbGVzQWNjZXB0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2F0dHJpYnV0ZS5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBGaWxlc0Rpc2NhcmREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGlzY2FyZC5kaXJlY3RpdmUnO1xyXG5leHBvcnQgeyBGaWxlc05hdGl2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uYXRpdmUuZGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCB7IEZpbGVVcGxvYWRDb250cm9sIH0gZnJvbSAnLi9oZWxwZXJzL2NvbnRyb2wuY2xhc3MnO1xyXG5leHBvcnQgeyBGaWxlVXBsb2FkVmFsaWRhdG9ycywgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICcuL2hlbHBlcnMvdmFsaWRhdG9ycy5jbGFzcyc7XHJcbmV4cG9ydCB7IEZpbGVVcGxvYWRUeXBlcyB9IGZyb20gJy4vaGVscGVycy9maWxlLXR5cGVzLmNsYXNzJztcclxuXHJcbmV4cG9ydCB7IEZpbGVVcGxvYWRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWxlLXVwbG9hZC5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRmlsZVVwbG9hZENvbXBvbmVudCxcclxuICAgICAgICBGaWxlVXBsb2FkTGlzdEl0ZW1Db21wb25lbnQsXHJcbiAgICAgICAgRmlsZVVwbG9hZEljb25Db21wb25lbnQsXHJcbiAgICAgICAgRmlsZVVwbG9hZERyb3Bab25lQ29tcG9uZW50LFxyXG5cclxuICAgICAgICBGaWxlVXBsb2FkQXR0cmlidXRlQ29tcG9uZW50LFxyXG5cclxuICAgICAgICBGaWxlU2l6ZVZhbGlkYXRvcixcclxuICAgICAgICBGaWxlc0xpbWl0VmFsaWRhdG9yLFxyXG4gICAgICAgIEZpbGVzQWNjZXB0VmFsaWRhdG9yLFxyXG4gICAgICAgIEZpbGVzQWNjZXB0RGlyZWN0aXZlLFxyXG4gICAgICAgIEZpbGVzRGlzY2FyZERpcmVjdGl2ZSxcclxuICAgICAgICBGaWxlc05hdGl2ZURpcmVjdGl2ZSxcclxuXHJcbiAgICAgICAgU2ltcGxlRmlsZVVwbG9hZENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBGaWxlVXBsb2FkQ29tcG9uZW50LFxyXG4gICAgICAgIEZpbGVVcGxvYWREcm9wWm9uZUNvbXBvbmVudCxcclxuICAgICAgICBGaWxlVXBsb2FkTGlzdEl0ZW1Db21wb25lbnQsXHJcbiAgICAgICAgRmlsZVVwbG9hZEF0dHJpYnV0ZUNvbXBvbmVudCxcclxuXHJcbiAgICAgICAgRmlsZVNpemVWYWxpZGF0b3IsXHJcbiAgICAgICAgRmlsZXNMaW1pdFZhbGlkYXRvcixcclxuICAgICAgICBGaWxlc0FjY2VwdFZhbGlkYXRvcixcclxuICAgICAgICBGaWxlc0FjY2VwdERpcmVjdGl2ZSxcclxuICAgICAgICBGaWxlc0Rpc2NhcmREaXJlY3RpdmUsXHJcblxyXG4gICAgICAgIFNpbXBsZUZpbGVVcGxvYWRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBGaWxlVXBsb2FkQ29tcG9uZW50XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkTW9kdWxlIHtcclxuICAgIG5nRG9Cb290c3RyYXAoKSB7fVxyXG59XHJcbiJdfQ==