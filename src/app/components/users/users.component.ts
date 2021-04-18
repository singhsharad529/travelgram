import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() user;
  newUser:any;
  newId=null;
  constructor(
    private auth:AuthService,
    private db:AngularFireDatabase,
    private router:Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

  userDetails(){
    
      this.db.object(`/users/${this.newId}`)
      .valueChanges()
      .subscribe((newUser)=>{
       
        this.newUser = newUser;
        console.log(newUser);
       
      })
      
      
     
  }

  findUser(id){
    this.newId = id;
    console.log(this.newId);
    this.userDetails();
    
    this.router.navigateByUrl('/');
    
  }

}
