import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

user:any;
posts=[];
 
 
 
 constructor(
  private db:AngularFireDatabase,
  private toastr:ToastrService,
  private auth:AuthService
) { 
  //getting the user
  this.auth.getUser().subscribe((user)=>{
    this.db.object(`/users/${user.uid}`)
    .valueChanges()
    .subscribe((user)=>{
    //  console.log(user);
      this.user = user;
    })
  });

   //grab all posts from database;
   db.object('/posts')
   .valueChanges()
   .subscribe((obj)=>{
     if(obj){
       this.posts=Object.values(obj).sort((a,b)=>
        b.date-a.date);
        
     }
     else{
       toastr.error("No posts to display");
      
     }
   })

  




    }

  ngOnInit(): void {
  }

  editProfile(id){
    console.log(id);
    console.log(this.user);
  }

}
