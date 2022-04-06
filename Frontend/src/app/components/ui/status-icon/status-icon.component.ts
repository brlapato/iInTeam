import { flatten } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.css']
})
export class StatusIconComponent implements OnInit {

  @Input() savingVisible: boolean = false;
  @Input() successVisible: boolean = false;
  @Input() errorVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  

}
