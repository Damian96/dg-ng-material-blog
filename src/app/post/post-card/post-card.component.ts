import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Post } from "src/app/post/post.model";
import { LikeService } from "src/app/likes/like.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {

  @Input() post: Post;
  @Input() userUID: string = '';

  likes: number;

  @Output() editClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteClicked: EventEmitter<{ postId: string; postCreatorUid: string }> =
    new EventEmitter<{ postId: string; postCreatorUid: string }>();

  constructor(private _likeService: LikeService) { }

  ngOnInit() {
    this.likes = this._likeService.getPostLikes(this.post);
  }

  onEditClicked(): void {
    this.editClicked.emit(this.post.id);
  }

  onDeleteClicked(): void {
    this.deleteClicked.emit({ postId: this.post.id, postCreatorUid: this.post.creator.uid });
  }

  onLikeClicked(post: Post): void {
    if (!this._likeService.isLikedByUser(post)) {
      this._likeService.likePost(post);
      this.likes++;
    } else if (this.likes > 0) {
      this._likeService.unlikePost(post);
      this.likes--;
    }
  }
}
