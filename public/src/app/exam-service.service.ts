import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class ExamServiceService {

  constructor(
    private _http: Http
  ) { }

  session;
  products = [
    'MacBook',
    'Porsche 911',
    'Gold Watch',
  ];

  bids = [{
      amount:0,
      product:'',
      _userName: '',
    }]


  oneQuestion;
  allUsers;


  //RECEIVES USER FROM LOGIN COMPONENT
  //SENDS REQUEST TO SERVER AND RETURNS DATA TO LOGIN COMPONENT
  createUser(user){
    console.log('at service Create User',user)
    return this._http.post('/users', user)
    .map((response: Response) => response.json())
    .toPromise();
  }

  createNewBid(bid){
    console.log('at service, question',bid)
    return this._http.post('/newBid', bid)
    .map((response: Response) => response.json())
    .toPromise();
  }

  createAnswer(answer){
    console.log('at service, answer',answer)
    return this._http.post('/answer', answer)
    .map((response: Response) => response.json())
    .toPromise();
  }


  getQuestions (){
    return this._http.get('/getQuestions')
    .map((response: Response) => response.json())
    .toPromise();
  }

  getOneQuestion(questionId){

    return this._http.get('/getOneQuestion/'+questionId)
    .map((response: Response) => response.json())
    .toPromise();
  }

  deleteAllBids(){
    return this._http.delete('/deleteAllBids')
      .map((response: Response) => response.json())
      .toPromise();
  }


  getAllBids(){
    return this._http.get('/getAllBids')
    .map((response: Response) => response.json())
    .toPromise();
  }


}
