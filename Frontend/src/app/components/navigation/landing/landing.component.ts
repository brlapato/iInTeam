import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private router: Router,
    public auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.auth.playerId$.subscribe(
      (playerId:number | null) => {
        if (playerId) {
          this.router.navigate(['dashboard']);
        } else {
          // new player
        }
      }
    );
  }

}
