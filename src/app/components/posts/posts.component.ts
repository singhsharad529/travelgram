import { Component, OnInit,Input ,OnChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { faShareSquare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';



//TODO: bug in updating the changes

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit ,OnChanges {

  @Input() post;
  faShareSquare=faShareSquare;
  faThumbsDown=faThumbsDown;
  faThumbsUp=faThumbsUp;

  uid = null;
  upvote = 0;
  downvote=0;
  constructor(
    private db:AngularFireDatabase,
    private auth:AuthService

  ) {
    this.auth.getUser().subscribe((user)=>{
      this.uid = user?.uid;
    })
   }

  ngOnInit(): void {
  }

  ngOnChanges():void{
    if(this.post.vote){
      Object.values(this.post.vote).map((val:any)=>{
        if(val.upvote){
          this.upvote +=1;
        }
        if(val.downvote){
          this.downvote +=1;
        }
      })
    }

  }

  upvotePost(){
    console.log("upvoting");
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      upvote :1,
    })
  }


  downvotePost(){
    console.log("downvoting");
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote :1,
    })
  }

  getInstaUrl(){
    return `https://instagram.com/${this.post.instaId}`;
  }
}
