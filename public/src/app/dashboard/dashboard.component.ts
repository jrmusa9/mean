import { Component, OnInit } from '@angular/core';
import {ExamServiceService} from './../exam-service.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _service: ExamServiceService,
    private _router: Router
  ) { }
  
  session = this._service.session
  private products;
  private bid = {
    bid1 :{ amount:0, product:'MacBook'},
    bid2 :{ amount:0, product:'Watch'},
    bid3 :{ amount:0, product:'Car' },
    _userName:''
}

  private allBids;


  bidding(){
    this.bid._userName = this._service.session
    this._service.createNewBid(this.bid)
    .then(data => {
      this.allBids = data
      console.log('all bids', data)
    })
    .catch(err => console.log(err));
    this.bid = {
      bid1 :{ amount:0, product:'MacBook'},
      bid2 :{ amount:0, product:'Watch'},
      bid3 :{ amount:0, product:'Car' },
      _userName:''
  }
  }

  endBid(){
    this._router.navigateByUrl('/result')
  }
  
  logOut(){
    this._service.session = null
    this._router.navigateByUrl('/')
  }
  
  ngOnInit() {
    this.products = this._service.products
    if(this._service.session == null){
      this._router.navigateByUrl('/')
    }
    this._service.getAllBids()
    .then(data => {
      this.allBids = data
      console.log('all bids', data)
    })
    .catch(err => console.log(err));
  }
}