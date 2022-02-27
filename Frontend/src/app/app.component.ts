import { Component } from '@angular/core';
import { UserInfo } from 'src/app/data-objects/data-objects.module';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iInTeam';

  userInfo:UserInfo = new UserInfo("","","","",0);

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getUserInfo().subscribe(
      (response:UserInfo) => {
        this.userInfo = response;
        this.auth.setUserInfoCache(this.userInfo);
      }
    )

  }
}
