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
