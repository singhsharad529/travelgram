import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  check=false;
  url:string="https://chat-app-by-sharad.herokuapp.com/"
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  chatApp(){
    window.open(this.url,'_blank')

  }

}
