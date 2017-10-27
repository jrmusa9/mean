import { Component, OnInit } from '@angular/core';
import {ExamServiceService} from './../exam-service.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(
    private _service: ExamServiceService,
    private _router: Router
  ) { }

  session = this._service.session
  private products;
  private winner1;
  private winner2;
  private winner3;
  

  getHighestBids(data){
    console.log('all bids at resulst',data)
    var user1=data[0];
    var user2=data[0];
    var user3=data[0];
    for(let i of data){
      if(Number(i.bid1.amount) > Number(user1.bid1.amount)){
        user1 = i
      }
      if(Number(i.bid2.amount) > Number(user2.bid2.amount)){
        user2 = i
      }
      if(Number(i.bid3.amount) > Number(user3.bid3.amount)){
        user3 = i
      }
    }
    this.winner1 = user1
    this.winner2 = user2
    this.winner3 = user3

  }


  startBid(){
    this._service.deleteAllBids()
    .then(data => {
      this._router.navigateByUrl('/dashboard')
    })
    .catch(err => console.log(err));



  }
  

  logOut(){
    this._service.session = null
    this._service.deleteAllBids()
    .then(data => {
      this._router.navigateByUrl('/')
    })
    .catch(err => console.log(err));

  }

  ngOnInit() {
    this.products = this._service.products
    if(this._service.session == null){
      this._router.navigateByUrl('/')
    }

    //GET ALL BIDS
    this._service.getAllBids()
    .then(data => {
      this.getHighestBids(data)
    })
    .catch(err => console.log(err));

  }

}
