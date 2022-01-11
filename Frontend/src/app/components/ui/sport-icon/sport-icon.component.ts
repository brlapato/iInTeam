import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sport-icon',
  templateUrl: './sport-icon.component.html',
  styleUrls: ['./sport-icon.component.css']
})
export class SportIconComponent implements OnInit {

  @Input() sport: string = "";
  @Input() iconSize: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
