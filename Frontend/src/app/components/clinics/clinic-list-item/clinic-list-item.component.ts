import { Component, Input, OnInit } from '@angular/core';
import { Clinic } from 'src/app/data-objects/data-objects.module';

@Component({
  selector: 'app-clinic-list-item',
  templateUrl: './clinic-list-item.component.html',
  styleUrls: ['./clinic-list-item.component.css']
})
export class ClinicListItemComponent implements OnInit {

  @Input() clinic: Clinic = Clinic.getDefault();

  constructor() { }

  ngOnInit(): void {
  }

}
