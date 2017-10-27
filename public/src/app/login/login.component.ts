import { Component, OnInit } from '@angular/core';
import {User} from './../user'
import {ExamServiceService} from './../exam-service.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user = new User();

  constructor(
    private _service : ExamServiceService,
    private _router:Router
  ) { }


  createUser(){
    console.log('from login form',this.user)
    this._service.createUser(this.user)
    .then(data => {
      this._service.session = data.name;
      this._router.navigateByUrl(`/dashboard`)
    })
    .catch(err => console.log(err));

  }


  ngOnInit() {
  }

}
