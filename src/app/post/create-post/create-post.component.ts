import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators, } from "@angular/forms";
import { PostService } from "../post.service";
import { Post, categoryTypeArray, categoryValidator } from "src/app/shared/models/post.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { FileRenderPipe } from "src/app/pipes/file-render.pipe";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  categoryTypes: Array<string> = categoryTypeArray;

  constructor(private _authService: AuthService,
    private _postService: PostService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _renderFilePipe: FileRenderPipe
  ) { };

  createPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    content: new FormControl('', [Validators.required, Validators.minLength(10)]),
    category: new FormControl('', [Validators.required, categoryValidator()]),
    image: new FormControl({ selectedFile: null })
  });


  onFileSelected(file: File | false): void {
    if (file instanceof File) {
      this.createPostForm.get('image').setValue(file);
    } else {
      this.createPostForm.get('image').setErrors({ invalidFile: true });
    }
  }

  onSubmit(): void {
    if (!this.createPostForm.valid) {
      return;
    }

    this._renderFilePipe.transform(this.createPostForm.get('image').value)
      .then((dataUrl) => {
        const newPost = new Post(
          null,
          this._authService.user!,
          this.createPostForm.get('title')?.value,
          this.createPostForm.get('content')?.value,
          this.createPostForm.get('category')?.value,
          dataUrl,
        );
        this._postService.addPost(newPost);

        this._snackBar.open(`Your post has been successfully created with id ${newPost.id}!`, 'OK');
        this._router.navigateByUrl('/post-list');
      });
  }
}
