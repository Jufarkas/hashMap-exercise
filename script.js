// the 'key' is what the hash function takes as an input
// we don't access the bucket with the 'key', we access it with the hashCode we get FROM the 'key'
// hash maps can use data types such as numbers, strings, objects; we use strings for this exercise

class Node {
    constructor(data, value, next){
     this.data = data;
     this.value = value;
     this.next = next;
    }
}


class HashMap {

    constructor(){
     this.array = new Array(16); // create new Array and set to size 16: [0 - 15] (works with our modulo that we do on our hashCode, as 'num' % 16 will always return a num between 0 to 15)
     this.currentLength = 0;
    }

    hash(key){ // takes a (key) and produces a hash code (DONE)
     let hashCode = 0; // start with an empty hash code
     const primeNumber = 31; // can be any prime number; stay away from numbers close to 2
     
     for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
     }

     return hashCode;
    }

    set(key, value){ // will set the value to the specific 'key'; first arg is 'key', second is a value that is assigned to this 'key' (DONE)
     let hashCode = this.hash(key); // get hashCode for 'key' word
     let arrIndex = hashCode % 16; // get array[index] for the new item we're adding
    
     if(!this.array[arrIndex]){ // if array[index] is empty
      this.array[arrIndex] = new Node(key, value, null); // this will be added and become the 'head' Node
      this.currentLength++;
     } else {
      let current = this.array[arrIndex]; 
      
      while(current != null){ // while 'something' exists
        if(current.data === key){ // if the 'data' property in this spot matches the 'key' being input
            current.value = value; // update the value
            return;
        }
        if(current.next === null){ // if the next property is 'null', we're at the end of the LL
            current.next = new Node(key, value, null); // add new Node at the end of the LL
            this.currentLength++;
            return;
        }
        current = current.next;
        // current will just keep becomming 'current.next.next.next' as it traverses through, looking for our 'if' statements to get out
      }
     }
    }
    
    get(key){ // returns the value that is assigned to the 'key'. If not found: return null (DONE)
     let hashCode = this.hash(key); // get hashCode for 'key' word
     let arrIndex = hashCode % 16; // get array[index]
     let current = this.array[arrIndex];

     if(!current){ // if the index (current) is empty return null
        return null;
     }
     while(current != null){ // if the index isn't empty, start looking in the linked list
      if(current.data === key){
        return current.value;
      } else if (current.next === null) {
        return null;
      }
      current = current.next;
     }
     return;
    }

    has(key){ // returns true or false if the key is in the hash map or not (DONE)
     let hashCode = this.hash(key); // get hashCode for 'key' word
     let arrIndex = hashCode % 16; // get array[index]
     let current = this.array[arrIndex];
   
     if(!current){
        return false;
     }
     while(current != null){
      if(current.data === key){
        return true;
      } else if (current.next === null) {
        return false;
      }
      current = current.next;
     }
     return;
    }

    remove(key){ // if the key is in the hash map, remove it and return true, if it isn't, return false (DONE)
     let hashCode = this.hash(key); // get hashCode for 'key' word
     let arrIndex = hashCode % 16; // get array[index]
     let current = this.array[arrIndex];
     let previous;
     if(!current){ // if current doesn't exist, easy, return false
      return false;
     } else if (current.data === key && current.next === null){ // if it does exist, and nothing comes after it, easy, yeet it
      this.array.splice(arrIndex, 1);
      this.currentLength--;
      return true;
     } else { // otherwise
      if(current.data === key){ // if it makes it this far, current.
       this.array[arrIndex] = current.next;
       this.currentLength--;
       return true;
      }
      while(current.data != key){
       previous = current; // previous equals array[index]
       current = current.next; // current is now the next item in the Linked List
      } // once current.data === key, kick out of loop
      previous.next = current.next;
      this.currentLength--;
      return true;
     }
    }

    length(){ // returns number of stored keys in the hash map (DONE)
     return this.currentLength;
    }

    clear(){ // removes all entries in the hash map (DONE)
     this.array = new Array(16);
     this.currentLength = 0;
     return "All entries removed";
    }

    keys(){ // returns an array containing the 'keys' inside the hash map (DONE)
     // need to grab all the .data values
     let allKeys = []; // need array for keys
     for (let i = 0; i < this.array.length; i++) { // go through each item in the array
      let current = this.array[i];
      while (current) { // as long as current isn't null, push the data key
        allKeys.push(current.data);
        current = current.next; // if there is no current.next, it will make current 'null' and it will break out of our loop, and continue along the array indexes
      }
     }
     return allKeys;
    }

    values(){ // returns an array containing the 'values' inside the hash map (DONE)
     let allKeys = [];
     for (let i = 0; i < this.array.length; i++) {
      let current = this.array[i];
      while (current) {
        allKeys.push(current.value);
        current = current.next;
      }
     }
     return allKeys;
    }

    entries(){ // returns an array that contains each key/value pair. Ex: [[firstKey, firstValue], [secondKey, secondValue]] (DONE)
     let allKeys = [];
     for (let i = 0; i < this.array.length; i++) {
      let current = this.array[i];
      while (current) {
        allKeys.push([`${current.data}, ${current.value}`]);
        current = current.next;
      }
     }
     return allKeys;
    }
}

let hash = new HashMap();

hash.set("Billy", "The Billster");

hash.set("Jamm", "Test One");     // same hashCode
hash.set("Bill", "Test Two");     // same hashCode
hash.set("Pho", "Test Three");    // same hashCode
hash.set("Pho", "Test ThreerhT"); // same hashCode and 'key' (to test replacing values)


// console.log(hash.has("Bib"));   // returns false, as it doesn't exist yet
// console.log(hash.get("Bib"));   // returns null, as it doesn't exist yet
// console.log(hash.get("Benny")); // returns null, as it doesn't exist yet
hash.set("Bib", "Bibby");
hash.set("Benny", "Weasel");
// console.log(hash.has("Bib"));   // returns true, as it exists now
// console.log(hash.get("Bib"));   // returns 'Bibby' as it exists now
// console.log(hash.get("Benny")); // returns 'Weasel', as it exists now

// console.log(hash.length());

// console.log(hash.remove("Jamm"));
// console.log(hash.remove("Bill"));

// console.log(hash.entries());
// console.log(hash.keys());
// console.log(hash.values());

// console.log(hash.clear());