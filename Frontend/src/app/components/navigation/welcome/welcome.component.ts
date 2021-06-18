import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserInfo } from 'src/app/data-objects/data-objects.module';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  userInfo:UserInfo = new UserInfo("","","","",0);
  playerId:string | null = "";

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    console.log("get player id...")
    this.auth.playerId$.subscribe(
      (next:string | null) => {
        console.log('received player id')
        this.playerId = next;
      }
    )
    
  }

}
