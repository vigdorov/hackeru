// Task: Create a function-constructor "Student". Function should have
//       the following methods:
//       - Adding, deleting, updating marks
//       - Set phone, e-mail and name
//       - Output message about current student

let Student = function(fname, lname, pname, email) {

  this.fname = fname || null;
  this.lname = lname || null;
  this.pname = pname || null;
  this.email = email || null;
  this.contactPhone = {
    country: null,
    region:  null,
    number:  null,
  };

  // Average rating is updated after each change of the scores array.
  let average = function(array) {
    let sum = array.reduce( (acc, curr) => acc + curr );
    return Math.round( sum / array.length );
  };
  this.averageRating = 0;
  this.marks = [];

  // Method accepts any numbers of parameters, objects and one-dimensional arrays
  this.addMark = (...arg) => {
    if (arg.length > 0) {
      for (let i in arg) {
        if (typeof arg[i] === 'object') {
          for (let j in arg[i]) {
            this.marks.push( arg[i][j] );
          }
        } else {
          this.marks.push( arg[i] );
        }
      }
    }
    this.averageRating = average( this.marks );
  };

  this.removeMark = (index) => {
    this.marks.splice(index, 1);
    this.averageRating = average( this.marks );
  };

  this.updateMark = (mark, index) => {
    this.marks.splice(index, 1, mark);
    this.averageRating = average( this.marks );
  };

  this.setPhone = value => {
    this.contactPhone.country = value.country;
    this.contactPhone.region  = value.region;
    this.contactPhone.number  = value.number;
  };

  this.setMail = value => {
    this.email = value;
  };

  this.setName = (fname, lname, pname) => {
    this.fname = fname;
    this.lname = lname;
    this.pname = pname;
  };

  this.printStudent = () => {
    let msg = 'Name student: ';
    msg += this.fname + ' ' + this.lname + ' ' + this.pname;
    msg += ', contact telephone: ';
    msg += '+' + this.contactPhone.country;
    msg += '-' + this.contactPhone.region;
    msg += '-' + this.contactPhone.number;
    msg += ', email: ' + this.email;
    msg += ', average rating: ' + this.averageRating;
    console.log( msg );
  };
};

let user3 = new Student('Snow', 'John', 'Don\'t know', 'john@mail.net');
user3.printStudent();
user3.addMark([2, 5, 1], 2, [3, 5, 1], 5, {first: 4, last: 3});
user3.setName('Brown', 'David', 'Log');
user3.setMail('brown2000@mail.com');
user3.setPhone({country: '7', region: '456', number: '345-34-34'});
user3.printStudent();
