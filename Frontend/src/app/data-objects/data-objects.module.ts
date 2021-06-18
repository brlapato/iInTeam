import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DataObjectsModule {

 }


 export class Player {
  constructor (
    public playerId: number,
    public firstName: string,
    public lastName: string
  ) {}
}
  
 export class UserInfo {
    constructor (
      public userName: String,
      public firstName: String,
      public lastName: String,
      public email: String,
      public playerId: number
    ) {}
    }  
    
