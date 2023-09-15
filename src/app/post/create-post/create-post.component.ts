import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators, } from "@angular/forms";
import { PostService } from "../post.service";
import { Post, categoryTypeArray, categoryValidator } from "src/app/shared/models/post.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  categoryTypes: Array<string> = categoryTypeArray;

  constructor(private _postService: PostService, private _snackBar: MatSnackBar, private _router: Router) { };

  createPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    content: new FormControl('', [Validators.required, Validators.minLength(10)]),
    category: new FormControl('', [Validators.required, categoryValidator()])
  });


  onSubmit(): void {
    if (!this.createPostForm.valid) {
      return;
    }

    const newPost = new Post(null, this.createPostForm.get('title')?.value, this.createPostForm.get('content')?.value);
    this._postService.addPost(newPost);

    this._snackBar.open(`Your post has been successfully created with id ${newPost.id}!`, 'OK');
    this._router.navigateByUrl('/post-list');
  }
}
