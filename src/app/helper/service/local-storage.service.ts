// import { Injectable } from '@angular/core';
// import { Storage } from "@ionic/storage";
// @Injectable({
//   providedIn: 'root'
// })
// export class LocalStorageService {
//   task: any = {};
//   comments: any = {};
//   tempChat = [];
//   conversation: any = {};
//   contacts: any = {};
//   userProfile = {};

//   constructor(public storage: Storage) { }

//   set(key: string, value: any) {
//     //value = CryptoJS.AES.encrypt(JSON.stringify(value), passphrase).toString();
//     this.storage.set(key, value);
//   }

//   async get(key: string) {
//     return this.storage.get(key).then((result) => {
//       console.log(result);
//       return result;
//     });
//   }

//   updateUserProfile(u: User) {
//     let temObj = {};
//     let id = String(u.id);
//     temObj[id] = u;
//     if (this.userProfile[id] !== undefined) {
//       delete this.userProfile[id];
//     }
//     this.userProfile = Object.assign(temObj, this.userProfile);
//   }


//   async setUserProfile(user: User[]) {
//     if (user.length) {
//       let taskData = user.reduce((obj, item) => {
//         this.updateUserProfile(item);
//         return obj;
//       }, {});
//       await this.set('userProfile', this.userProfile);
//     }
//   }



//   updateTask(task: Task) {
//     let temObj = {};
//     temObj[task._id] = task;
//     if (this.task[task._id] !== undefined) {
//       delete this.task[task._id];
//     }
//     this.task = Object.assign(temObj, this.task);
//   }

//   async setTask(task: Task[]) {
//     let taskArray = Array.isArray(task) ? task : [task];
//     console.log('incomming Task', taskArray)
//     if (taskArray.length) {
//       let taskData = taskArray.reduce((obj, item) => {
//         obj[item._id] = item;
//         this.updateTask(item);
//         return obj;
//       }, {});
//       await this.set('Task', this.task);
//     }
//   }

//   updateComment(comment: TaskComment) {
//     let temObj = {};
//     temObj[comment._id] = comment;
//     if (this.comments[comment._id] !== undefined) {
//       delete this.comments[comment._id];
//     }
//     this.comments = Object.assign(temObj, this.comments);
//   }

//   updateCoversation(con: Conversation) {
//     let temObj = {};
//     temObj[con._id] = con;
//     if (this.conversation[con._id] !== undefined) {
//       delete this.conversation[con._id];
//     }
//     this.conversation = Object.assign(temObj, this.conversation);
//   }

//   updateUserContact(con: Contact) {
//     let temObj = {};
//     temObj[con.pid] = con;
//     if (this.contacts[con.pid] !== undefined) {
//       delete this.contacts[con.pid];
//     }
//     this.contacts = Object.assign(temObj, this.contacts);
//   }


//   async setUserComments(comment) {
//     let commentArray: TaskComment[] = Array.isArray(comment) ? comment : [comment];
//     console.log('incomming comments  ', commentArray)
//     if (comment.length) {
//       let commentsData = commentArray.reduce((obj, item) => {
//         obj[item._id] = item;
//         this.updateComment(item);
//         return obj;
//       }, {});
//       console.log('set UserComments', commentsData, this.comments);
//       await this.set('userComments', this.comments);
//     }
//   }

//   async setUserConversation(conv: Conversation[]) {
//     console.log('incomming conversation  ', conv)
//     if (conv.length) {
//       let convData = conv.reduce((obj, item) => {
//         obj[item._id] = item;
//         this.updateCoversation(item);
//         return obj;
//       }, {});
//       console.log('set conversation', this.conversation);
//       await this.set('Conversations', this.conversation);
//     }
//   }

//   async setUserContacts(conv: Contact[]) {
//     console.log('incomming conversation  ', conv)
//     if (conv.length) {
//       let convData = conv.reduce((obj, item) => {
//         obj[item.pid] = item;
//         this.updateUserContact(item);
//         return obj;
//       }, {});
//       console.log('set Contact', this.contacts);
//       await this.set('Contacts', this.contacts);
//     }
//   }

//   async setPushToken(token) {
//     await this.set('pushToken', token);
//   }

//   async getPushToken() {
//     return await this.get('pushToken') || '';
//   }

//   async setAds(token) {
//     await this.set('ads', token);
//   }

//   async getAds() {
//     return await this.get('ads') || {};
//   }

//   getConversationById(id) {
//     return this.conversation[id] || {};
//   }

//   async getComments() {
//     return this.comments = await this.get('userComments') || {};
//   }

//   async getTemComments() {
//     return await this.get('tempComments') || {};
//   }

//   async getTask() {
//     return this.task = await this.get('Task') || {};
//   }

//   async getConversation() {
//     return this.conversation = await this.get('Conversations') || {};
//   }

//   async getUserProfile() {
//     return this.userProfile = await this.get('userProfile') || {};
//   }

//   getUserProfileById(userId) {
//     return this.userProfile[userId] || {};
//   }

//   async clearStorage() {
//     await this.storage.clear();
//   }

//   async remove(key: string) {
//     return await this.storage.remove(key);
//   }

// }
