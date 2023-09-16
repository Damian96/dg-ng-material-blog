import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Post } from "src/app/shared/models/post.model";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {


  @Input() post: Post;
  @Input() userUID: string = '';

  @Output() editClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteClicked: EventEmitter<{ postId: string; postCreatorUid: string }> =
    new EventEmitter<{ postId: string; postCreatorUid: string }>();

  onEditClicked(): void {
    this.editClicked.emit(this.post.id);
  }

  onDeleteClicked(): void {
    this.deleteClicked.emit({ postId: this.post.id, postCreatorUid: this.post.creator.uid });
  }
}
