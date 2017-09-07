import { Mongo } from 'meteor/mongo'


class CommentsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const id = super.insert(doc, callback);
    return id
  }
}

export const Comments = new CommentsCollection('comments');
