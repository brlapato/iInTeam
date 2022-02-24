import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { FileUploadValidators } from './../helpers/validators.class';
import { IsNullOrEmpty } from './../helpers/helpers.class';
import * as i0 from "@angular/core";
import * as i1 from "./../services/file-upload.service";
/**
 * A Directive that adds the `filesize` validator to controls marked with the
 * `filesize` attribute. The size of the file is in bytes or any other unit
 *
 * ### Example
 *
 * ```
 * <file-upload name="files" ngModel filesize="830000"></file-upload>
 * <file-upload name="files" ngModel [filesize]="830000"></file-upload>
 * <file-upload name="files" ngModel minSize="0" max="6200"></file-upload>
 * <file-upload name="files" ngModel filesize="123MB"></file-upload>
 * <file-upload name="files" ngModel [filesize]="12 mb"></file-upload>
 * <file-upload name="files" ngModel minSize="0" max="324KB"></file-upload>
 * ```
 *
 */
export class FileSizeValidator {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    ngOnChanges(changes) {
        if ('filesize' in changes
            || 'maxsize' in changes
            || 'minsize' in changes) {
            this._createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    validate(c) {
        return this.validator(c);
    }
    registerOnValidatorChange(fn) {
        this.onChange = fn;
    }
    _createValidator() {
        let maxSize = null;
        if (!IsNullOrEmpty(this.maxsize)) {
            maxSize = this.fileUploadService.parseSize(this.maxsize);
        }
        else if (!IsNullOrEmpty(this.filesize)) {
            maxSize = this.fileUploadService.parseSize(this.filesize);
        }
        const minSize = this.fileUploadService.parseSize(this.minsize);
        this.validator = FileUploadValidators.sizeRange({ maxSize, minSize });
    }
}
FileSizeValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileSizeValidator, deps: [{ token: i1.FileUploadService }], target: i0.ɵɵFactoryTarget.Directive });
FileSizeValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.2", type: FileSizeValidator, selector: "file-upload[filesize][formControlName],\n    file-upload[filesize][formControl],\n    file-upload[filesize][ngModel],\n    file-upload[minsize][formControlName],\n    file-upload[minsize][formControl],\n    file-upload[minsize][ngModel],\n    file-upload[maxsize][formControlName],\n    file-upload[maxsize][formControl],\n    file-upload[maxsize][ngModel]", inputs: { filesize: "filesize", minsize: "minsize", maxsize: "maxsize" }, host: { properties: { "attr.filesize": "filesize ? filesize : null", "attr.minsize": "minsize ? minsize : null", "attr.maxsize": "maxsize ? maxsize : null" } }, providers: [{
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FileSizeValidator),
            multi: true
        }], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileSizeValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: `file-upload[filesize][formControlName],
    file-upload[filesize][formControl],
    file-upload[filesize][ngModel],
    file-upload[minsize][formControlName],
    file-upload[minsize][formControl],
    file-upload[minsize][ngModel],
    file-upload[maxsize][formControlName],
    file-upload[maxsize][formControl],
    file-upload[maxsize][ngModel]`,
                    providers: [{
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => FileSizeValidator),
                            multi: true
                        }],
                    host: {
                        '[attr.filesize]': 'filesize ? filesize : null',
                        '[attr.minsize]': 'minsize ? minsize : null',
                        '[attr.maxsize]': 'maxsize ? maxsize : null'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.FileUploadService }]; }, propDecorators: { filesize: [{
                type: Input
            }], minsize: [{
                type: Input
            }], maxsize: [{
                type: Input
            }] } });
/**
 * A Directive that adds the `fileslimit` validator to controls marked with the
 * `fileslimit` attribute.
 *
 * ### Example
 *
 * ```
 * <file-upload name="files" ngModel fileslimit="2"></file-upload>
 * <file-upload name="files" ngModel [fileslimit]="2"></file-upload>
 * ```
 *
 */
export class FilesLimitValidator {
    ngOnChanges(changes) {
        if ('fileslimit' in changes) {
            this._createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    validate(c) {
        return this.fileslimit != null ? this.validator(c) : null;
    }
    registerOnValidatorChange(fn) {
        this.onChange = fn;
    }
    _createValidator() {
        this.validator = FileUploadValidators.filesLimit(typeof this.fileslimit === 'string' ? parseInt(this.fileslimit, 10) : this.fileslimit);
    }
}
FilesLimitValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesLimitValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
FilesLimitValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.2", type: FilesLimitValidator, selector: "file-upload[fileslimit][formControlName], file-upload[fileslimit][formControl], file-upload[fileslimit][ngModel]", inputs: { fileslimit: "fileslimit" }, host: { properties: { "attr.fileslimit": "fileslimit ? fileslimit : null" } }, providers: [{
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FilesLimitValidator),
            multi: true
        }], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesLimitValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: 'file-upload[fileslimit][formControlName], file-upload[fileslimit][formControl], file-upload[fileslimit][ngModel]',
                    providers: [{
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => FilesLimitValidator),
                            multi: true
                        }],
                    host: { '[attr.fileslimit]': 'fileslimit ? fileslimit : null' }
                }]
        }], propDecorators: { fileslimit: [{
                type: Input
            }] } });
/**
 * A Directive that adds the `accept` validator to controls marked with the
 * `accept` attribute.
 *
 * ### Example
 *
 * ```
 * <file-upload name="files" ngModel accept="file_extension|audio/*|video/*|image/*|media_type"></file-upload>
 * <file-upload name="files" ngModel [accept]="file_extension|audio/*|video/*|image/*|media_type"></file-upload>
 * ```
 *
 * To specify more than one value, separate the values with a comma (e.g. <file-upload accept="audio/*,video/*,image/*"></file-upload>.
 *
 */
export class FilesAcceptValidator {
    ngOnChanges(changes) {
        if ('accept' in changes) {
            this._createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    validate(c) {
        return !!this.validator ? this.validator(c) : null;
    }
    registerOnValidatorChange(fn) {
        this.onChange = fn;
    }
    _createValidator() {
        if (IsNullOrEmpty(this.accept)) {
            return;
        }
        this.validator = FileUploadValidators.accept(this.accept.split(','));
    }
}
FilesAcceptValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesAcceptValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
FilesAcceptValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.2", type: FilesAcceptValidator, selector: "file-upload[accept][formControlName], file-upload[accept][formControl], file-upload[accept][ngModel]", inputs: { accept: "accept" }, host: { properties: { "attr.accept": "accept ? accept : null" } }, providers: [{
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FilesAcceptValidator),
            multi: true
        }], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FilesAcceptValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: 'file-upload[accept][formControlName], file-upload[accept][formControl], file-upload[accept][ngModel]',
                    providers: [{
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(() => FilesAcceptValidator),
                            multi: true
                        }],
                    host: { '[attr.accept]': 'accept ? accept : null' }
                }]
        }], propDecorators: { accept: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pcGxhYi9uZ3gtZmlsZS11cGxvYWQvc3JjL2xpYi9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBK0QsTUFBTSxlQUFlLENBQUM7QUFDMUgsT0FBTyxFQUFFLGFBQWEsRUFBOEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRSxPQUFPLEVBQWlDLG9CQUFvQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUFJM0Q7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBc0JILE1BQU0sT0FBTyxpQkFBaUI7SUFhMUIsWUFBNkIsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBRSxDQUFDO0lBSTdELFdBQVcsQ0FBQyxPQUFzQjtRQUNyQyxJQUFJLFVBQVUsSUFBSSxPQUFPO2VBQ2xCLFNBQVMsSUFBSSxPQUFPO2VBQ3BCLFNBQVMsSUFBSSxPQUFPLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtTQUNGO0lBQ0wsQ0FBQztJQUVNLFFBQVEsQ0FBQyxDQUFrQjtRQUM5QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLHlCQUF5QixDQUFDLEVBQWM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLGdCQUFnQjtRQUNwQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIs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QkFBb0I7a0JBVGhDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNHQUFzRztvQkFDaEgsU0FBUyxFQUFFLENBQUM7NEJBQ1IsT0FBTyxFQUFFLGFBQWE7NEJBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDOzRCQUNuRCxLQUFLLEVBQUUsSUFBSTt5QkFDZCxDQUFDO29CQUNGLElBQUksRUFBRSxFQUFDLGVBQWUsRUFBRSx3QkFBd0IsRUFBQztpQkFDcEQ7OEJBSVUsTUFBTTtzQkFEWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBIb3N0LCBTZWxmLCBPcHRpb25hbCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUywgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvckZuLCBGaWxlVXBsb2FkVmFsaWRhdG9ycyB9IGZyb20gJy4vLi4vaGVscGVycy92YWxpZGF0b3JzLmNsYXNzJztcclxuaW1wb3J0IHsgSXNOdWxsT3JFbXB0eSB9IGZyb20gJy4vLi4vaGVscGVycy9oZWxwZXJzLmNsYXNzJztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2ZpbGUtdXBsb2FkLnNlcnZpY2UnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBIERpcmVjdGl2ZSB0aGF0IGFkZHMgdGhlIGBmaWxlc2l6ZWAgdmFsaWRhdG9yIHRvIGNvbnRyb2xzIG1hcmtlZCB3aXRoIHRoZVxyXG4gKiBgZmlsZXNpemVgIGF0dHJpYnV0ZS4gVGhlIHNpemUgb2YgdGhlIGZpbGUgaXMgaW4gYnl0ZXMgb3IgYW55IG90aGVyIHVuaXRcclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICpcclxuICogYGBgXHJcbiAqIDxmaWxlLXVwbG9hZCBuYW1lPVwiZmlsZXNcIiBuZ01vZGVsIGZpbGVzaXplPVwiODMwMDAwXCI+PC9maWxlLXVwbG9hZD5cclxuICogPGZpbGUtdXBsb2FkIG5hbWU9XCJmaWxlc1wiIG5nTW9kZWwgW2ZpbGVzaXplXT1cIjgzMDAwMFwiPjwvZmlsZS11cGxvYWQ+XHJcbiAqIDxmaWxlLXVwbG9hZCBuYW1lPVwiZmlsZXNcIiBuZ01vZGVsIG1pblNpemU9XCIwXCIgbWF4PVwiNjIwMFwiPjwvZmlsZS11cGxvYWQ+XHJcbiAqIDxmaWxlLXVwbG9hZCBuYW1lPVwiZmlsZXNcIiBuZ01vZGVsIGZpbGVzaXplPVwiMTIzTUJcIj48L2ZpbGUtdXBsb2FkPlxyXG4gKiA8ZmlsZS11cGxvYWQgbmFtZT1cImZpbGVzXCIgbmdNb2RlbCBbZmlsZXNpemVdPVwiMTIgbWJcIj48L2ZpbGUtdXBsb2FkPlxyXG4gKiA8ZmlsZS11cGxvYWQgbmFtZT1cImZpbGVzXCIgbmdNb2RlbCBtaW5TaXplPVwiMFwiIG1heD1cIjMyNEtCXCI+PC9maWxlLXVwbG9hZD5cclxuICogYGBgXHJcbiAqXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiBgZmlsZS11cGxvYWRbZmlsZXNpemVdW2Zvcm1Db250cm9sTmFtZV0sXHJcbiAgICBmaWxlLXVwbG9hZFtmaWxlc2l6ZV1bZm9ybUNvbnRyb2xdLFxyXG4gICAgZmlsZS11cGxvYWRbZmlsZXNpemVdW25nTW9kZWxdLFxyXG4gICAgZmlsZS11cGxvYWRbbWluc2l6ZV1bZm9ybUNvbnRyb2xOYW1lXSxcclxuICAgIGZpbGUtdXBsb2FkW21pbnNpemVdW2Zvcm1Db250cm9sXSxcclxuICAgIGZpbGUtdXBsb2FkW21pbnNpemVdW25nTW9kZWxdLFxyXG4gICAgZmlsZS11cGxvYWRbbWF4c2l6ZV1bZm9ybUNvbnRyb2xOYW1lXSxcclxuICAgIGZpbGUtdXBsb2FkW21heHNpemVdW2Zvcm1Db250cm9sXSxcclxuICAgIGZpbGUtdXBsb2FkW21heHNpemVdW25nTW9kZWxdYCxcclxuICAgIHByb3ZpZGVyczogW3tcclxuICAgICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZpbGVTaXplVmFsaWRhdG9yKSxcclxuICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfV0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1thdHRyLmZpbGVzaXplXSc6ICdmaWxlc2l6ZSA/IGZpbGVzaXplIDogbnVsbCcsXHJcbiAgICAgICAgJ1thdHRyLm1pbnNpemVdJzogJ21pbnNpemUgPyBtaW5zaXplIDogbnVsbCcsXHJcbiAgICAgICAgJ1thdHRyLm1heHNpemVdJzogJ21heHNpemUgPyBtYXhzaXplIDogbnVsbCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbGVTaXplVmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yLCBPbkNoYW5nZXMge1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZmlsZXNpemU6IHN0cmluZ3xudW1iZXI7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBtaW5zaXplOiBzdHJpbmd8bnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgbWF4c2l6ZTogc3RyaW5nfG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBmaWxlVXBsb2FkU2VydmljZTogRmlsZVVwbG9hZFNlcnZpY2Upe31cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAoKSA9PiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCdmaWxlc2l6ZScgaW4gY2hhbmdlcyBcclxuICAgICAgICAgICAgfHwgJ21heHNpemUnIGluIGNoYW5nZXMgXHJcbiAgICAgICAgICAgIHx8ICdtaW5zaXplJyBpbiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICB0aGlzLl9jcmVhdGVWYWxpZGF0b3IoKTtcclxuICAgICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9yc3xudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IoYyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47IFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NyZWF0ZVZhbGlkYXRvcigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbWF4U2l6ZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKCFJc051bGxPckVtcHR5KHRoaXMubWF4c2l6ZSkpIHtcclxuICAgICAgICAgICAgbWF4U2l6ZSA9IHRoaXMuZmlsZVVwbG9hZFNlcnZpY2UucGFyc2VTaXplKHRoaXMubWF4c2l6ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghSXNOdWxsT3JFbXB0eSh0aGlzLmZpbGVzaXplKSkge1xyXG4gICAgICAgICAgICBtYXhTaXplID0gdGhpcy5maWxlVXBsb2FkU2VydmljZS5wYXJzZVNpemUodGhpcy5maWxlc2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtaW5TaXplID0gdGhpcy5maWxlVXBsb2FkU2VydmljZS5wYXJzZVNpemUodGhpcy5taW5zaXplKTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IEZpbGVVcGxvYWRWYWxpZGF0b3JzLnNpemVSYW5nZSh7IG1heFNpemUsIG1pblNpemUgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQSBEaXJlY3RpdmUgdGhhdCBhZGRzIHRoZSBgZmlsZXNsaW1pdGAgdmFsaWRhdG9yIHRvIGNvbnRyb2xzIG1hcmtlZCB3aXRoIHRoZVxyXG4gKiBgZmlsZXNsaW1pdGAgYXR0cmlidXRlLlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKlxyXG4gKiBgYGBcclxuICogPGZpbGUtdXBsb2FkIG5hbWU9XCJmaWxlc1wiIG5nTW9kZWwgZmlsZXNsaW1pdD1cIjJcIj48L2ZpbGUtdXBsb2FkPlxyXG4gKiA8ZmlsZS11cGxvYWQgbmFtZT1cImZpbGVzXCIgbmdNb2RlbCBbZmlsZXNsaW1pdF09XCIyXCI+PC9maWxlLXVwbG9hZD5cclxuICogYGBgXHJcbiAqXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnZmlsZS11cGxvYWRbZmlsZXNsaW1pdF1bZm9ybUNvbnRyb2xOYW1lXSwgZmlsZS11cGxvYWRbZmlsZXNsaW1pdF1bZm9ybUNvbnRyb2xdLCBmaWxlLXVwbG9hZFtmaWxlc2xpbWl0XVtuZ01vZGVsXScsXHJcbiAgICBwcm92aWRlcnM6IFt7XHJcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGaWxlc0xpbWl0VmFsaWRhdG9yKSxcclxuICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfV0sXHJcbiAgICBob3N0OiB7J1thdHRyLmZpbGVzbGltaXRdJzogJ2ZpbGVzbGltaXQgPyBmaWxlc2xpbWl0IDogbnVsbCd9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWxlc0xpbWl0VmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yLCBPbkNoYW5nZXMge1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgZmlsZXNsaW1pdDogc3RyaW5nfG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm47XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIGlmICgnZmlsZXNsaW1pdCcgaW4gY2hhbmdlcykge1xyXG4gICAgICAgICAgdGhpcy5fY3JlYXRlVmFsaWRhdG9yKCk7XHJcbiAgICAgICAgICBpZiAodGhpcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzfG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzbGltaXQgIT0gbnVsbCA/IHRoaXMudmFsaWRhdG9yKGMpIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjsgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlVmFsaWRhdG9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gRmlsZVVwbG9hZFZhbGlkYXRvcnMuZmlsZXNMaW1pdCh0eXBlb2YgdGhpcy5maWxlc2xpbWl0ID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KHRoaXMuZmlsZXNsaW1pdCwgMTApIDogdGhpcy5maWxlc2xpbWl0KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgRGlyZWN0aXZlIHRoYXQgYWRkcyB0aGUgYGFjY2VwdGAgdmFsaWRhdG9yIHRvIGNvbnRyb2xzIG1hcmtlZCB3aXRoIHRoZVxyXG4gKiBgYWNjZXB0YCBhdHRyaWJ1dGUuXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqXHJcbiAqIGBgYFxyXG4gKiA8ZmlsZS11cGxvYWQgbmFtZT1cImZpbGVzXCIgbmdNb2RlbCBhY2NlcHQ9XCJmaWxlX2V4dGVuc2lvbnxhdWRpby8qfHZpZGVvLyp8aW1hZ2UvKnxtZWRpYV90eXBlXCI+PC9maWxlLXVwbG9hZD5cclxuICogPGZpbGUtdXBsb2FkIG5hbWU9XCJmaWxlc1wiIG5nTW9kZWwgW2FjY2VwdF09XCJmaWxlX2V4dGVuc2lvbnxhdWRpby8qfHZpZGVvLyp8aW1hZ2UvKnxtZWRpYV90eXBlXCI+PC9maWxlLXVwbG9hZD5cclxuICogYGBgXHJcbiAqIFxyXG4gKiBUbyBzcGVjaWZ5IG1vcmUgdGhhbiBvbmUgdmFsdWUsIHNlcGFyYXRlIHRoZSB2YWx1ZXMgd2l0aCBhIGNvbW1hIChlLmcuIDxmaWxlLXVwbG9hZCBhY2NlcHQ9XCJhdWRpby8qLHZpZGVvLyosaW1hZ2UvKlwiPjwvZmlsZS11cGxvYWQ+LlxyXG4gKlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ2ZpbGUtdXBsb2FkW2FjY2VwdF1bZm9ybUNvbnRyb2xOYW1lXSwgZmlsZS11cGxvYWRbYWNjZXB0XVtmb3JtQ29udHJvbF0sIGZpbGUtdXBsb2FkW2FjY2VwdF1bbmdNb2RlbF0nLFxyXG4gICAgcHJvdmlkZXJzOiBbe1xyXG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRmlsZXNBY2NlcHRWYWxpZGF0b3IpLFxyXG4gICAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XSxcclxuICAgIGhvc3Q6IHsnW2F0dHIuYWNjZXB0XSc6ICdhY2NlcHQgPyBhY2NlcHQgOiBudWxsJ31cclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbGVzQWNjZXB0VmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yLCBPbkNoYW5nZXMge1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgYWNjZXB0OiBzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3I6IFZhbGlkYXRvckZuO1xyXG5cclxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICBpZiAoJ2FjY2VwdCcgaW4gY2hhbmdlcykge1xyXG4gICAgICAgICAgdGhpcy5fY3JlYXRlVmFsaWRhdG9yKCk7XHJcbiAgICAgICAgICBpZiAodGhpcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnN8bnVsbCB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy52YWxpZGF0b3IgPyB0aGlzLnZhbGlkYXRvcihjKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlVmFsaWRhdG9yKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChJc051bGxPckVtcHR5KHRoaXMuYWNjZXB0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gRmlsZVVwbG9hZFZhbGlkYXRvcnMuYWNjZXB0KHRoaXMuYWNjZXB0LnNwbGl0KCcsJykpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==