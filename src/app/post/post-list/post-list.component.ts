import { Component, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Post } from "src/app/shared/models/post.model";
import { PostService } from "../post.service";
import { AuthService } from "src/app/auth/auth.service";
import { DialogService } from "src/app/shared/dialog.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  private posts: Array<Post> = [];

  @Input() keyword: string | undefined;
  @Input() searchField: string | undefined;

  filteredPosts: Post[] = this.posts;
  availableCats: string[] = [];

  isLoggedIn: boolean = false;

  protected userUID: string = '';

  constructor(private _authService: AuthService, private _router: Router, private _dialogService: DialogService,
    private _postService: PostService, private cdr: ChangeDetectorRef) {
    this.posts = this._postService.getAllPosts();

    console.log(this.posts);

    this._authService.isUserReady()
      .subscribe(() => {
        this.userUID = this._authService.isLoggedIn() ? this._authService.user!.uid : '';
        this.isLoggedIn = this._authService.isLoggedIn();
      });
  }

  ngOnInit() {
    this.availableCats = this.getAvailableCategories();

    this.filteredPosts = this.posts;
    if (this.keyword !== undefined) {
      this.filteredPosts = this._postService.filterPostsByTitle(this.keyword);
    }
  }

  deletePost(postId: string, postCreator: string): void {
    if (this._authService.isLoggedIn() && this._authService.user?.uid !== postCreator) {
      return;
    }

    this._dialogService.openConfirmationDialog(postId, 'Delete Post.', 'Are you sure you want to delete this post?')
      .subscribe((result) => {
        if (result === 'confirmed') {
          // User confirmed the action, perform deletion

          this._postService.deletePost(postId);

          this.posts = this.posts.filter(post => post.id !== postId);

          this.cdr.detectChanges();
        }
      });
  }

  editPost(postId: string) {
    this._router.navigateByUrl('/edit-post/' + postId);
  }

  getAvailableCategories(): string[] {
    let availableCats: string[] = [];

    this.posts.map((post) => {
      if (post.category != null && !availableCats.includes(post.category.toString())) {
        availableCats.push(post.category);
      }
    });

    return availableCats;
  }

  filterPostsByCategory(category: string | -1): void {
    if (category == -1) {
      this.filteredPosts = this.posts;
      return;
    }
    this.filteredPosts = this.posts.filter((post) => post.category === category);
  }

  filterPostsByCurrentUser() {
    this.filteredPosts = this.posts.filter((post) => post.creator.uid === this._authService.user?.uid);
  }
}
