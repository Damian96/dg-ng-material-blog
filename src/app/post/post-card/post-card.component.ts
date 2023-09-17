import { Component, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Post } from "src/app/post/post.model";
import { LikeService } from "src/app/likes/like.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CommentsService } from "src/app/comments/comments.service";
import { Comment, CommentTreeNode } from "src/app/comments/comment.models";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {

  @Input() post: Post;
  @Input() userEmail: string = '';
  @Input() userUID: string = '';

  likeCount: number;
  comments: Comment[];

  @Output() editClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteClicked: EventEmitter<{ postId: string; postCreatorUid: string }> =
    new EventEmitter<{ postId: string; postCreatorUid: string }>();

  postCommentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  constructor(private _likeService: LikeService,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _commentService: CommentsService) { }

  ngOnInit() {
    this.likeCount = this._likeService.getPostLikes(this.post);

    const result = this._commentService.findCommentsForPost(this.post.id);
    if (result && result.hasOwnProperty('comments')) {
      this.comments = result.comments;
    } else if (typeof result === 'string') {
      this.comments = CommentTreeNode.fromJSON(result).comments;
    } else {
      this.comments = [];
    }
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
      this.likeCount++;
    } else if (this.likeCount > 0) {
      this._likeService.unlikePost(post);
      this.likeCount--;
    }
  }

  onCommentDelete(needle: Comment): void {
    let index = this.comments.findIndex((comment) => {
      return comment.cid == needle.cid;
    });

    this.comments.splice(index, 1);
    this._commentService.deleteComment(needle);
  }

  isCommentAuthor(useremail: string, comment: Comment): boolean {
    return comment.useremail === useremail;
  }

  onSubmit(): void {
    if (this.postCommentForm.invalid) {
      return;
    }

    const comment = new Comment(this._authService.user.email,
      this.post.id,
      this.postCommentForm.get('comment').value);

    const commentTree = this._commentService.addComment(comment);

    this.comments = commentTree.comments;
    this.onReset();
  }

  onReset(): void {
    this.postCommentForm.reset();
  }
}
