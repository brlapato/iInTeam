import * as i0 from "@angular/core";
import * as i1 from "./components/multiple-file-upload/file-upload.component";
import * as i2 from "./components/file-list/file-upload-list-item.component";
import * as i3 from "./components/file-list/file-upload-icon.component";
import * as i4 from "./components/drop-zone/file-upload-drop-zone.component";
import * as i5 from "./components/attribute/file-upload-attr.component";
import * as i6 from "./directives/validators.directive";
import * as i7 from "./directives/attribute.directive";
import * as i8 from "./directives/discard.directive";
import * as i9 from "./directives/native.directive";
import * as i10 from "./components/simple-file-upload/simple-file-upload.component";
import * as i11 from "@angular/common";
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
export { FileUploadValidators, ValidationErrors, ValidatorFn } from './helpers/validators.class';
export { FileUploadTypes } from './helpers/file-types.class';
export { FileUploadService } from './services/file-upload.service';
export declare class FileUploadModule {
    ngDoBootstrap(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileUploadModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FileUploadModule, [typeof i1.FileUploadComponent, typeof i2.FileUploadListItemComponent, typeof i3.FileUploadIconComponent, typeof i4.FileUploadDropZoneComponent, typeof i5.FileUploadAttributeComponent, typeof i6.FileSizeValidator, typeof i6.FilesLimitValidator, typeof i6.FilesAcceptValidator, typeof i7.FilesAcceptDirective, typeof i8.FilesDiscardDirective, typeof i9.FilesNativeDirective, typeof i10.SimpleFileUploadComponent], [typeof i11.CommonModule], [typeof i1.FileUploadComponent, typeof i4.FileUploadDropZoneComponent, typeof i2.FileUploadListItemComponent, typeof i5.FileUploadAttributeComponent, typeof i6.FileSizeValidator, typeof i6.FilesLimitValidator, typeof i6.FilesAcceptValidator, typeof i7.FilesAcceptDirective, typeof i8.FilesDiscardDirective, typeof i10.SimpleFileUploadComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FileUploadModule>;
}
//# sourceMappingURL=file-upload.module.d.ts.map