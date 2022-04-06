import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tool-button',
  templateUrl: './tool-button.component.html',
  styleUrls: ['./tool-button.component.css']
})
export class ToolButtonComponent implements OnInit {

  @Input() displayLabels: boolean = false;
  @Input() showTextOnHover: boolean = true;
  @Input() labelText: string = '';
  @Input() iconHref: string = '';
  @Input() submitsFormName: string = '';
  @Input() iconHeight: number = 14;
  @Input() iconWidth: number = 14;

  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  mouseEnter(args: any) {
    if(this.showTextOnHover) {
      this.displayLabels = true;
    }
  }

  mouseLeave(args: any) {
    if(this.showTextOnHover) {
      this.displayLabels = false;
    }
  }



}
