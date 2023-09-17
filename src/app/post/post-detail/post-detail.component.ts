import { Component } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";
import { CommentsService } from "src/app/comments/comments.service";
import { PostService } from "../post.service";
import { Post } from "../post.model";
import { ActivatedRoute } from "@angular/router";
import { Comment, CommentTreeNode, TreeNodeData } from "src/app/comments/comment.models";

import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from "@angular/cdk/tree";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {

  post: Post;
  finishedLoading: boolean = false;
  comments: Comment[];

  dataSource: MatTreeFlatDataSource<CommentTreeNode, TreeNodeData>;
  treeControl: FlatTreeControl<TreeNodeData>;
  treeFlattener: MatTreeFlattener<CommentTreeNode, TreeNodeData>;

  constructor(private _authService: AuthService,
    private _postsService: PostService,
    private _route: ActivatedRoute,
    private _commentService: CommentsService) {
  }
}
