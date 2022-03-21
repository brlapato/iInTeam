import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-buttons',
  templateUrl: './edit-buttons.component.html',
  styleUrls: ['./edit-buttons.component.css']
})
export class EditButtonsComponent implements OnInit {

  @Input() canSwitchEditMode: boolean = true;
  @Input() isEditing: boolean = true;
  @Input() isSaving: boolean = true;
  @Input() displayLabels: boolean = true;
  @Input() saveSubmitsForm: string = '';

  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Output() cancelClick: EventEmitter<any> = new EventEmitter();
  @Output() saveClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
