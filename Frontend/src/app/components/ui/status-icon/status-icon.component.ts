import { flatten } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.css']
})
export class StatusIconComponent implements OnInit {

  @Input() statusIconSettings: StatusIconSettings = new StatusIconSettings();

  constructor() { }

  ngOnInit(): void {
  }

  

}


export class StatusIconSettings {
  public savingVisible: boolean = false;
  public successVisible: boolean = false;
  public errorVisible: boolean = false;
  public message: string = "";

  public static setSaving(statusIconSettings: StatusIconSettings) {
    statusIconSettings.successVisible = false;
    statusIconSettings.errorVisible = false;
    statusIconSettings.savingVisible = true;
    statusIconSettings.message = "Saving...";
  }

  public static setSuccess(statusIconSettings: StatusIconSettings) {
    statusIconSettings.successVisible = true;
    statusIconSettings.errorVisible = false;
    statusIconSettings.savingVisible = false;
    statusIconSettings.message = "Save Successful";
  }

  public static setError(statusIconSettings: StatusIconSettings) {
    statusIconSettings.successVisible = false;
    statusIconSettings.errorVisible = true;
    statusIconSettings.savingVisible = false;
    statusIconSettings.message = "Error encountered while saving";
  }

  public static clearStatus(statusIconSettings: StatusIconSettings ) {
    statusIconSettings.successVisible = false;
    statusIconSettings.errorVisible = false;
    statusIconSettings.savingVisible = false;
    statusIconSettings.message = "";
  }
}
