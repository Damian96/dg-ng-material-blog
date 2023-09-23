import { Component, Input, SimpleChanges } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import { Post, PostPriorityQueue, sortingAlgos } from "src/app/post/post.model";
import { DialogService } from "src/app/shared/dialog.service";
import * as AuthActions from "../../auth/ngrx/actions/auth.action";
import * as fromUser from "../../auth/ngrx/selectors/user.selector";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  private _posts: Array<Post> = [];

  @Input() keyword: string | undefined;
  @Input() searchField: string | undefined;

  filteredPosts: Post[] = this._posts;
  availableCats: string[] = [];

  isLoggedIn: boolean = false;

  userId$: Observable<string | null>;

  protected userUID: string = '';
  protected userEmail: string = '';

  private _postsQueue: PostPriorityQueue;

  sortingAlgos: Array<{ value: sortingAlgos, title: string }> = [
    {
      value: 'titleAsc',
      title: 'Title Asc ⬆️',
    },
    {
      value: 'titleDesc',
      title: 'Title Desc ⬇️',
    },
    {
      value: 'dateCreatedAsc',
      title: 'Date Posted Asc ⬆️',
    },
    {
      value: 'dateCreatedDesc',
      title: 'Date Posted Desc ⬇️',
    },
  ];

  constructor(private _store: Store,
    private _router: Router,
    private _dialogService: DialogService,
    private _postService: PostService
  ) {
    this._posts = this._postService.getAllPosts();
    this._postsQueue = new PostPriorityQueue(this._posts, 'titleAsc');
  }

  ngOnInit() {
    this.availableCats = this.getAvailableCategories();
    this.filteredPosts = this._posts;

    this._store.select(AuthActions.login)
      .subscribe(() => {
        this.isLoggedIn = true;
      }).unsubscribe();

    this._store.select(AuthActions.logout)
      .subscribe(() => {
        this.isLoggedIn = false;
      }).unsubscribe();

    (this.userId$ = this._store.select(fromUser.selectUserId))
      .subscribe((uid: string) => {
        this.userUID = uid;
      }).unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['keyword'] || changes['searchField']) {
      this.updateFilteredPosts();
    }
  }

  updateFilteredPosts(): void {
    if (this.keyword !== undefined) {

      switch (this.searchField) {
        case 'title':
          this.filteredPosts = this._postService.filterPostsByTitle(this.keyword);
          break;
        case 'author':
          this.filteredPosts = this._postService.filterPostsByAuthor(this.keyword);
          break;
        default:
      }
    } else {
      this.filteredPosts = this._posts;
    }
  }

  deletePost(eventData: { postId: string; postCreatorUid: string }): void {
    if (this.isLoggedIn && this.userUID !== eventData.postCreatorUid) {
      return;
    }

    this._dialogService.openConfirmationDialog(eventData.postId, 'Delete Post.', 'Are you sure you want to delete this post?')
      .subscribe((result) => {
        if (result === 'confirmed') {
          // User confirmed the action, perform deletion
          this._postService.deletePost(eventData.postId);

          let index = this._posts.findIndex((post) => {
            return post.id === eventData.postId;
          });
          if (index !== -1) {
            this._posts.splice(index, 1);
          }
        }
      });
  }

  editPost(postId: string): void {
    this._router.navigateByUrl('/edit-post/' + postId);
  }

  getAvailableCategories(): string[] {
    let availableCats: string[] = [];

    this._posts.map((post) => {
      if (post.category != null && !availableCats.includes(post.category.toString())) {
        availableCats.push(post.category);
      }
    });

    return availableCats;
  }

  filterPostsByCategory(category: string | -1): void {
    if (category == -1) {
      this.filteredPosts = this._posts;
      return;
    }
    this.filteredPosts = this._posts.filter((post) => post.category === category);
  }

  filterPostsByCurrentUser() {
    this.filteredPosts = this._posts.filter((post) => post.creator.uid === this.userUID);
  }

  onSortSelect(event: MatSelectChange) {
    this.filteredPosts = this._postsQueue.sort(event.value as sortingAlgos);
  }
}
