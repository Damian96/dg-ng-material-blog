export class Like {
  id: string;
  userId: string;
  postId: string;
  timestamp: Date;

  constructor(userId: string, postId: string) {
    this.id = this.generateUniqueId();
    this.userId = userId;
    this.postId = postId;
    this.timestamp = new Date();
  }

  private generateUniqueId(): string {
    // Generate a unique ID here (you can use a library like uuid or a custom method)
    // For simplicity, let's assume we're using a simple counter as an example.
    return `like_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }
}
