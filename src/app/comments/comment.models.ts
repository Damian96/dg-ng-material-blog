import { User } from "firebase/auth";
import { Post } from "../post/post.model";

export class Comment {
  useremail: string;
  postId: string;
  content: string = '';
  createdAt: number = new Date().getTime();

  constructor(useremail: string, postId: string, content: string) {
    this.useremail = useremail;
    this.postId = postId;
    this.content = content;
  }
}

export interface TreeNodeData {
  id: string;
  name: string;
  children?: TreeNodeData[];
}

export class CommentTreeNode {
  public parent: CommentTreeNode | null;
  public children: CommentTreeNode[] = [];
  public comments: Comment[] = []; // An array to store comments

  constructor(parent: CommentTreeNode | null, comments: Comment[] = [], postId: string = null) {
    this.parent = parent;
    this.comments = comments;
    if (this.parent) this.parent.children.push(this);
  }

  // const jsonRepresentation = rootNode.toJSON();
  toJSON(): string {
    const json = {
      comments: this.comments,
      children: this.children.map(child => child.toJSON()),
    };
    return JSON.stringify(json);
  }

  static fromJSON(jsonString: string, parent: CommentTreeNode | null = null): CommentTreeNode {
    const json = JSON.parse(jsonString);
    const comments = json.comments || [];

    const node = new CommentTreeNode(parent, comments);

    if (json.children && Array.isArray(json.children)) {
      for (const childJSON of json.children) {
        CommentTreeNode.fromJSON(JSON.stringify(childJSON), node);
      }
    }

    return node;
  }

  // Method to add a comment to this node
  addComment(comment: Comment): void {
    this.comments.push(comment);
  }

  // Method to remove a comment from this node by index
  removeComment(index: number): void {
    if (index >= 0 && index < this.comments.length) {
      this.comments.splice(index, 1);
    }
  }

  // Method to edit a comment by index
  editComment(index: number, newComment: Comment): void {
    if (index >= 0 && index < this.comments.length) {
      this.comments[index] = newComment;
    }
  }
}
