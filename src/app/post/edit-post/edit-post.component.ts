import { Component } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";
import { PostService } from "../post.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Post, categoryTypeArray, categoryValidator } from "src/app/shared/models/post.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent {

  finishedLoading: boolean = false;
  post: Post | undefined;
  categoryTypes: string[] = categoryTypeArray;

  editPostForm: FormGroup = new FormGroup({});

  constructor(private _authService: AuthService, private _postsService: PostService, private _router: Router, private _snackBar: MatSnackBar, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.post = this._postsService.getPostById(params['id']);

      this.editPostForm = new FormGroup({
        title: new FormControl(this.post!.title, [Validators.required, Validators.minLength(5)]),
        content: new FormControl(this.post!.content, [Validators.required, Validators.minLength(10)]),
        category: new FormControl(this.post!.category, [Validators.required, categoryValidator()])
      });


      this.finishedLoading = true;
    });
  }

  onSubmit(): void {
    if (this.editPostForm!.invalid) {
      return;
    }

    this.post!.title = this.editPostForm!.get('title')?.value;
    this.post!.content = this.editPostForm!.get('content')?.value;
    this.post!.category = this.editPostForm!.get('category')?.value;
    this.post!.updatedAt = new Date();

    this._postsService.updatePost(this.post!);
    this._snackBar.open('Your post has been updated', 'Go to Blog Home', {
      duration: 5000,
    }).afterDismissed().subscribe(() => {
      this._router.navigateByUrl('/post-list');
    })

  }
}
