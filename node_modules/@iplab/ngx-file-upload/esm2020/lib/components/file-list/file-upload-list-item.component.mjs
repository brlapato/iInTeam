import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/file-upload.service";
import * as i2 from "./file-upload-icon.component";
export class FileUploadListItemComponent {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    removeFile(file) {
        this.control.removeFile(file);
    }
    calculateSize(size) {
        return this.fileUploadService.formatSize(size);
    }
}
FileUploadListItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadListItemComponent, deps: [{ token: i1.FileUploadService }], target: i0.ɵɵFactoryTarget.Component });
FileUploadListItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.2", type: FileUploadListItemComponent, selector: "file-upload-list-item", inputs: { index: "index", file: "file", control: "control" }, ngImport: i0, template: `
    <file-upload-icon [file]="file"></file-upload-icon>
    <div class="file-info">
        <span class="file-name">{{ file.name }}</span> ({{ calculateSize( file.size ) }})
    </div>
    <div class="file-buttons">
        <span class="remove-btn" (click)="removeFile(file)">
        <svg viewBox="0 0 96 96">
            <g>
                <path d="M40.5,66.8V39.3c0-0.4-0.1-0.7-0.4-0.9S39.6,38,39.3,38h-2.5c-0.4,0-0.7,0.1-0.9,0.4
                    s-0.4,0.5-0.4,0.9v27.5c0,0.4,0.1,0.7,0.4,0.9s0.5,0.4,0.9,0.4h2.5c0.4,0,0.7-0.1,0.9-0.4S40.5,67.1,40.5,66.8z M50.5,66.8V39.3
                    c0-0.4-0.1-0.7-0.4-0.9S49.6,38,49.3,38h-2.5c-0.4,0-0.7,0.1-0.9,0.4s-0.4,0.5-0.4,0.9v27.5c0,0.4,0.1,0.7,0.4,0.9s0.5,0.4,0.9,0.4
                    h2.5c0.4,0,0.7-0.1,0.9-0.4S50.5,67.1,50.5,66.8z M60.5,66.8V39.3c0-0.4-0.1-0.7-0.4-0.9S59.6,38,59.3,38h-2.5
                    c-0.4,0-0.7,0.1-0.9,0.4s-0.4,0.5-0.4,0.9v27.5c0,0.4,0.1,0.7,0.4,0.9s0.5,0.4,0.9,0.4h2.5c0.4,0,0.7-0.1,0.9-0.4
                    S60.5,67.1,60.5,66.8z M39.3,28h17.5l-1.9-4.6c-0.2-0.2-0.4-0.4-0.7-0.4H41.8c-0.3,0.1-0.5,0.2-0.7,0.4L39.3,28z M75.5,29.3v2.5
                    c0,0.4-0.1,0.7-0.4,0.9S74.6,33,74.3,33h-3.8v37c0,2.2-0.6,4-1.8,5.6S66,78,64.3,78H31.8c-1.7,0-3.2-0.8-4.4-2.3s-1.8-3.4-1.8-5.5
                    V33h-3.8c-0.4,0-0.7-0.1-0.9-0.4s-0.4-0.5-0.4-0.9v-2.5c0-0.4,0.1-0.7,0.4-0.9s0.5-0.4,0.9-0.4h12.1l2.7-6.5c0.4-1,1.1-1.8,2.1-2.5
                    s2-1,3.1-1h12.5c1,0,2.1,0.3,3.1,1s1.7,1.5,2.1,2.5l2.7,6.5h12.1c0.4,0,0.7,0.1,0.9,0.4S75.5,28.9,75.5,29.3z"/>
            </g>
        </svg> <ng-content></ng-content></span>
    </div>
    `, isInline: true, styles: ["@charset \"UTF-8\";:host{display:block;font-size:14px;color:#646464}:host:after{clear:both;content:\"\\a0\";display:block;height:0;line-height:0;visibility:hidden;zoom:1}file-upload-icon{float:left;width:30px;height:36px;margin:0 10px 0 0}.file-info{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.remove-btn{font-size:12px;cursor:pointer}.remove-btn svg{display:inline-block;vertical-align:-20%;height:18px;width:18px}\n"], components: [{ type: i2.FileUploadIconComponent, selector: "file-upload-icon", inputs: ["file"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: FileUploadListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: `file-upload-list-item`, template: `
    <file-upload-icon [file]="file"></file-upload-icon>
    <div class="file-info">
        <span class="file-name">{{ file.name }}</span> ({{ calculateSize( file.size ) }})
    </div>
    <div class="file-buttons">
        <span class="remove-btn" (click)="removeFile(file)">
        <svg viewBox="0 0 96 96">
            <g>
                <path d="M40.5,66.8V39.3c0-0.4-0.1-0.7-0.4-0.9S39.6,38,39.3,38h-2.5c-0.4,0-0.7,0.1-0.9,0.4
                    s-0.4,0.5-0.4,0.9v27.5c0,0.4,0.1,0.7,0.4,0.9s0.5,0.4,0.9,0.4h2.5c0.4,0,0.7-0.1,0.9-0.4S40.5,67.1,40.5,66.8z M50.5,66.8V39.3
                    c0-0.4-0.1-0.7-0.4-0.9S49.6,38,49.3,38h-2.5c-0.4,0-0.7,0.1-0.9,0.4s-0.4,0.5-0.4,0.9v27.5c0,0.4,0.1,0.7,0.4,0.9s0.5,0.4,0.9,0.4
                    h2.5c0.4,0,0.7-0.1,0.9-0.4S50.5,67.1,50.5,66.8z M60.5,66.8V39.3c0-0.4-0.1-0.7-0.4-0.9S59.6,38,59.3,38h-2.5
                    c-0.4,0-0.7,0.1-0.9,0.4s-0.4,0.5-0.4,0.9v27.5c0,0.4,0.1,0.7,0.4,0.9s0.5,0.4,0.9,0.4h2.5c0.4,0,0.7-0.1,0.9-0.4
                    S60.5,67.1,60.5,66.8z M39.3,28h17.5l-1.9-4.6c-0.2-0.2-0.4-0.4-0.7-0.4H41.8c-0.3,0.1-0.5,0.2-0.7,0.4L39.3,28z M75.5,29.3v2.5
                    c0,0.4-0.1,0.7-0.4,0.9S74.6,33,74.3,33h-3.8v37c0,2.2-0.6,4-1.8,5.6S66,78,64.3,78H31.8c-1.7,0-3.2-0.8-4.4-2.3s-1.8-3.4-1.8-5.5
                    V33h-3.8c-0.4,0-0.7-0.1-0.9-0.4s-0.4-0.5-0.4-0.9v-2.5c0-0.4,0.1-0.7,0.4-0.9s0.5-0.4,0.9-0.4h12.1l2.7-6.5c0.4-1,1.1-1.8,2.1-2.5
                    s2-1,3.1-1h12.5c1,0,2.1,0.3,3.1,1s1.7,1.5,2.1,2.5l2.7,6.5h12.1c0.4,0,0.7,0.1,0.9,0.4S75.5,28.9,75.5,29.3z"/>
            </g>
        </svg> <ng-content></ng-content></span>
    </div>
    `, styles: ["@charset \"UTF-8\";:host{display:block;font-size:14px;color:#646464}:host:after{clear:both;content:\"\\a0\";display:block;height:0;line-height:0;visibility:hidden;zoom:1}file-upload-icon{float:left;width:30px;height:36px;margin:0 10px 0 0}.file-info{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.remove-btn{font-size:12px;cursor:pointer}.remove-btn svg{display:inline-block;vertical-align:-20%;height:18px;width:18px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FileUploadService }]; }, propDecorators: { index: [{
                type: Input
            }], file: [{
                type: Input
            }], control: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQtbGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lwbGFiL25neC1maWxlLXVwbG9hZC9zcmMvbGliL2NvbXBvbmVudHMvZmlsZS1saXN0L2ZpbGUtdXBsb2FkLWxpc3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUE4QmpELE1BQU0sT0FBTywyQkFBMkI7SUFXcEMsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDeEQsQ0FBQztJQUVNLFVBQVUsQ0FBQyxJQUFVO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxhQUFhLENBQUMsSUFBWTtRQUM5QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7d0hBcEJRLDJCQUEyQjs0R0FBM0IsMkJBQTJCLDJIQXhCMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXFCVDsyRkFHUSwyQkFBMkI7a0JBMUJ2QyxTQUFTOytCQUNJLHVCQUF1QixZQUN2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBcUJUO3dHQU1NLEtBQUs7c0JBRFgsS0FBSztnQkFJQyxJQUFJO3NCQURWLEtBQUs7Z0JBSUMsT0FBTztzQkFEYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGaWxlVXBsb2FkQ29udHJvbCB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY29udHJvbC5jbGFzcyc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlsZS11cGxvYWQuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBgZmlsZS11cGxvYWQtbGlzdC1pdGVtYCxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZmlsZS11cGxvYWQtaWNvbiBbZmlsZV09XCJmaWxlXCI+PC9maWxlLXVwbG9hZC1pY29uPlxyXG4gICAgPGRpdiBjbGFzcz1cImZpbGUtaW5mb1wiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsZS1uYW1lXCI+e3sgZmlsZS5uYW1lIH19PC9zcGFuPiAoe3sgY2FsY3VsYXRlU2l6ZSggZmlsZS5zaXplICkgfX0pXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJmaWxlLWJ1dHRvbnNcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInJlbW92ZS1idG5cIiAoY2xpY2spPVwicmVtb3ZlRmlsZShmaWxlKVwiPlxyXG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCA5NiA5NlwiPlxyXG4gICAgICAgICAgICA8Zz5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDAuNSw2Ni44VjM5LjNjMC0wLjQtMC4xLTAuNy0wLjQtMC45UzM5LjYsMzgsMzkuMywzOGgtMi41Yy0wLjQsMC0wLjcsMC4xLTAuOSwwLjRcclxuICAgICAgICAgICAgICAgICAgICBzLTAuNCwwLjUtMC40LDAuOXYyNy41YzAsMC40LDAuMSwwLjcsMC40LDAuOXMwLjUsMC40LDAuOSwwLjRoMi41YzAuNCwwLDAuNy0wLjEsMC45LTAuNFM0MC41LDY3LjEsNDAuNSw2Ni44eiBNNTAuNSw2Ni44VjM5LjNcclxuICAgICAgICAgICAgICAgICAgICBjMC0wLjQtMC4xLTAuNy0wLjQtMC45UzQ5LjYsMzgsNDkuMywzOGgtMi41Yy0wLjQsMC0wLjcsMC4xLTAuOSwwLjRzLTAuNCwwLjUtMC40LDAuOXYyNy41YzAsMC40LDAuMSwwLjcsMC40LDAuOXMwLjUsMC40LDAuOSwwLjRcclxuICAgICAgICAgICAgICAgICAgICBoMi41YzAuNCwwLDAuNy0wLjEsMC45LTAuNFM1MC41LDY3LjEsNTAuNSw2Ni44eiBNNjAuNSw2Ni44VjM5LjNjMC0wLjQtMC4xLTAuNy0wLjQtMC45UzU5LjYsMzgsNTkuMywzOGgtMi41XHJcbiAgICAgICAgICAgICAgICAgICAgYy0wLjQsMC0wLjcsMC4xLTAuOSwwLjRzLTAuNCwwLjUtMC40LDAuOXYyNy41YzAsMC40LDAuMSwwLjcsMC40LDAuOXMwLjUsMC40LDAuOSwwLjRoMi41YzAuNCwwLDAuNy0wLjEsMC45LTAuNFxyXG4gICAgICAgICAgICAgICAgICAgIFM2MC41LDY3LjEsNjAuNSw2Ni44eiBNMzkuMywyOGgxNy41bC0xLjktNC42Yy0wLjItMC4yLTAuNC0wLjQtMC43LTAuNEg0MS44Yy0wLjMsMC4xLTAuNSwwLjItMC43LDAuNEwzOS4zLDI4eiBNNzUuNSwyOS4zdjIuNVxyXG4gICAgICAgICAgICAgICAgICAgIGMwLDAuNC0wLjEsMC43LTAuNCwwLjlTNzQuNiwzMyw3NC4zLDMzaC0zLjh2MzdjMCwyLjItMC42LDQtMS44LDUuNlM2Niw3OCw2NC4zLDc4SDMxLjhjLTEuNywwLTMuMi0wLjgtNC40LTIuM3MtMS44LTMuNC0xLjgtNS41XHJcbiAgICAgICAgICAgICAgICAgICAgVjMzaC0zLjhjLTAuNCwwLTAuNy0wLjEtMC45LTAuNHMtMC40LTAuNS0wLjQtMC45di0yLjVjMC0wLjQsMC4xLTAuNywwLjQtMC45czAuNS0wLjQsMC45LTAuNGgxMi4xbDIuNy02LjVjMC40LTEsMS4xLTEuOCwyLjEtMi41XHJcbiAgICAgICAgICAgICAgICAgICAgczItMSwzLjEtMWgxMi41YzEsMCwyLjEsMC4zLDMuMSwxczEuNywxLjUsMi4xLDIuNWwyLjcsNi41aDEyLjFjMC40LDAsMC43LDAuMSwwLjksMC40Uzc1LjUsMjguOSw3NS41LDI5LjN6XCIvPlxyXG4gICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgPC9zdmc+IDxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBzdHlsZVVybHM6IFtgLi9maWxlLXVwbG9hZC1saXN0LWl0ZW0uY29tcG9uZW50LnNjc3NgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZExpc3RJdGVtQ29tcG9uZW50IHtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIGluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBmaWxlOiBGaWxlO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgY29udHJvbDogRmlsZVVwbG9hZENvbnRyb2w7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWxlVXBsb2FkU2VydmljZTogRmlsZVVwbG9hZFNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRmlsZShmaWxlOiBGaWxlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250cm9sLnJlbW92ZUZpbGUoZmlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZVNpemUoc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgIHJldHVybiB0aGlzLmZpbGVVcGxvYWRTZXJ2aWNlLmZvcm1hdFNpemUoc2l6ZSk7XHJcbiAgICB9XHJcbn0iXX0=