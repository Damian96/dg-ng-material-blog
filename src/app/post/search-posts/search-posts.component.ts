import { Component } from '@angular/core';
import { PostService } from "../post.service";
import { Post } from "src/app/post/post.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { searchFieldValidator } from "src/app/shared/validators/search.validators";

@Component({
  selector: 'app-search-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.scss']
})
export class SearchPostsComponent {

  posts: Post[] = [];
  postResults: Post[] = [];
  isSearching: boolean = false;
  hasSearched: boolean = false;

  searchPostForm: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required, Validators.minLength(3)]),
    field: new FormControl('', [Validators.required, searchFieldValidator()])
  });

  constructor() { }


  onSubmit(): void {
    this.isSearching = true;

    if (this.searchPostForm.invalid) {
      return;
    }

    this.isSearching = false;
    this.hasSearched = true;
  }

  onReset(): void {
    this.isSearching = false;
    this.hasSearched = false;
  }
}
