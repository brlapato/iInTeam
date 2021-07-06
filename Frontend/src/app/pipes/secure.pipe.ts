import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,private auth:AuthService) { }

  transform(url: string): Observable<SafeUrl> {
      
      return this.http
          .get(url, { headers:{Authorization: `Bearer ${localStorage.access_token}`}, responseType: 'blob' })
          .pipe(map((val: any) => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));
  }

}
