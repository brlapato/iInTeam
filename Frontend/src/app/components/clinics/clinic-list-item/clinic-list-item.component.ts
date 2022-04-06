import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clinic } from 'src/app/data-objects/data-objects.module';

@Component({
  selector: 'app-clinic-list-item',
  templateUrl: './clinic-list-item.component.html',
  styleUrls: ['./clinic-list-item.component.css']
})
export class ClinicListItemComponent implements OnInit {

  @Input() clinic: Clinic = Clinic.getDefault();
  @Output() editClinic = new EventEmitter<Clinic>();
  

  public detailsVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onEditClicked() {
    this.editClinic.emit(this.clinic);
  }

  public onToggleExpand() {
    this.detailsVisible = !this.detailsVisible;
  }

  public displayExpandButton(): boolean {
    return (this.clinic.preClinicNotes != null && this.clinic.preClinicNotes.length > 0) ||
           (this.clinic.postClinicNotes != null && this.clinic.postClinicNotes.length > 0) ||
           (this.clinic.assistantCoach1 != null && this.clinic.assistantCoach1.length > 0) ||
           (this.clinic.assistantCoach2 != null && this.clinic.assistantCoach2.length > 0) ||
           (this.clinic.assistantCoach3 != null && this.clinic.assistantCoach3.length > 0) ||
           (this.clinic.assistantCoach4 != null && this.clinic.assistantCoach4.length > 0)
  } 

}
