import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Posts = new Mongo.Collection('posts');

//Stories.schema = new SimpleSchema({
//    title: {type: String},
//    content: {type: String},
//});
//
//Stories.attachSchema(Stories.schema);
