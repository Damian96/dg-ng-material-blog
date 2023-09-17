import { Injectable } from '@angular/core';
import { CommentTreeNode, Comment } from "./comment.models";
import * as store from "store";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private _commentsMap: Map<string, CommentTreeNode>;

  constructor() {
    this._commentsMap = this.loadMapFromLocalStorage();

    // console.log(this._commentsMap);
  }

  addComment(comment: Comment): CommentTreeNode {
    let commentTree: CommentTreeNode;
    if (!this._commentsMap.has(comment.postId)) {
      commentTree = new CommentTreeNode(null, [comment], comment.postId);
      this._commentsMap.set(comment.postId, commentTree);
    } else {
      commentTree = this._commentsMap.get(comment.postId);
      commentTree.addComment(comment);
    }
    this.saveMapToLocalStorage();
    return commentTree;
  }

  deleteComment(comment: Comment): boolean {
    const result = this._commentsMap.delete(comment.postId);
    this.saveMapToLocalStorage();
    return result;
  }

  /* Search */
  findCommentsForPost(postid: string): CommentTreeNode | false {
    if (this._commentsMap.has(postid)) {
      const result = this._commentsMap.get(postid);
      let treeNode = new CommentTreeNode(null, [], postid);
      if (typeof result === 'string') {
        treeNode = CommentTreeNode.fromJSON(result);
      }
      this._commentsMap.set(postid, treeNode);
      return treeNode;
    } else {
      return false;
    }
  }

  /* Local Storage Operations */
  saveMapToLocalStorage(): void {
    try {
      const serializedData = JSON.stringify(Array.from(this._commentsMap.entries()));
      store.set('materialBlogComments', serializedData);
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  }

  loadMapFromLocalStorage<CommentTreeNode>(): Map<string, CommentTreeNode> | null {
    try {
      const serializedData = store.get('materialBlogComments', JSON.stringify([[]]));
      if (serializedData !== null) {
        const dataArray = JSON.parse(serializedData) as [string, CommentTreeNode][];
        return new Map<string, CommentTreeNode>(dataArray);
      }
    } catch (error) {
      console.error("Error loading data from local storage:", error);
    }
    return new Map<string, CommentTreeNode>();
  }

}
