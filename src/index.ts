import Dexie from "dexie"

const sayHello = (name: string) : string => {
    return `Hello ${name}!`
  }
  
console.log(sayHello('TS!2ddfadfs'));

interface IFriend {
  id?: number;
  name?: string;
  age?: number;
}

//
// Declare Database
//
class FriendDatabase extends Dexie {
  friends: Dexie.Table<IFriend, number> | undefined;

  constructor() {
      super("FriendsDatabase");
      this.version(1).stores({
          friends: "++id,name,age"
      });
  }
}

var db = new FriendDatabase();

//
// Manipulate and Query Database
//
if(db.friends !== undefined) {
  db.friends.add({name: "Josephine", age: 21}).then((value)=>{
    if(db.friends !== undefined) return db.friends.where("age").below(25).toArray();
    const frend:IFriend = {};
    return [frend];
  }).then(youngFriends => {
    alert ("My young friends: " + JSON.stringify(youngFriends));
  }).catch(e => {
    alert("error: " + e.stack || e);
  });
}