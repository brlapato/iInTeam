import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthenticationService) { }

  ngOnInit(): void {
  }

}
