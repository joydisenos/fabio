import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
  }

  mail(mail)
{
  console.log('peticion http');

  return this.http.get('https://fabio.joydisenos.com.ve/mail.php?asunto=' + mail.asunto + ' App&mensaje=' + mail.mensaje);
   
}

}
