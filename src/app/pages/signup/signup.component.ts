import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

import { finalize  } from "rxjs/operators";
//firebase
import { AngularFireStorage } from "@angular/fire/storage";

import { AngularFireDatabase } from "@angular/fire/database";

 
import { v4 as uuidv4 } from "uuid";

//broser-image resizer
import { readAndCompressImage } from "browser-image-resizer";
import { imageConfig } from 'src/utils/config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  picture:string="../../../assets/profile_image.png";
  uploadPercent:number=null;

  constructor(
    private auth:AuthService,
    private router:Router,
    private db: AngularFireDatabase,
    private storage:AngularFireStorage,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    const { email,password,username,country,bio,name,whatsappno}= f.form.value;
    //furture sanitization - do here

    this.auth.signUp(email,password)
    .then((res)=>{
      console.log(res);
      const {uid}=res.user;
      this.db.object(`/users/${uid}`)
      .set({
        id:uid,
        name:name,
        email:email,
        instaUserName:username,
        bio:bio,
        picture: this.picture,
        country:country,
        password:password,
        whatsapp:whatsappno
      })
    })
    .then(()=>{
      this.router.navigateByUrl('/');
      this.toastr.success('SignUp success');
    })
    .catch((err)=>{
      this.toastr.error("SignUP Failed")
    })

  }


  async uploadFile(event){
    const file=event.target.files[0];
   
    let resizedImage= await readAndCompressImage(file,imageConfig);

    const filePath= file.name; // rename the image with uuid

    const fileRef = this.storage.ref(filePath);

    const task= this.storage.upload(filePath,resizedImage);

    task.percentageChanges().subscribe((precentage)=>{
      this.uploadPercent = precentage;
    });

    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          this.picture=url;
          this.toastr.success("image upload success");
        })
      })
    )
    .subscribe();


  }

}
