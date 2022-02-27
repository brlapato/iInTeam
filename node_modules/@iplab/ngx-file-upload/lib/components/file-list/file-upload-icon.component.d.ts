import { OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import * as i0 from "@angular/core";
export declare class FileUploadIconComponent implements OnInit {
    private fileUploadService;
    file: File;
    fileType: string;
    constructor(fileUploadService: FileUploadService);
    ngOnInit(): void;
    isIcon(type: 'text' | 'audio' | 'video' | 'image'): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileUploadIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FileUploadIconComponent, "file-upload-icon", never, { "file": "file"; }, {}, never, never>;
}
//# sourceMappingURL=file-upload-icon.component.d.ts.map