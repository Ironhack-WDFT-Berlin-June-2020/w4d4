

const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// make a connection to mongo - 'mongodb://localhost/NAMEOFTHEDATABASE'
// if the database doesn't exist it gets created
mongoose.connect('mongodb://localhost/mongoose-intro')
    .then(x => {
        console.log('Connected to Mongo');
    })
    .catch(err => {
        console.log('Error connecting to Mongo', err);
    });

// with callback
//  mongoose.connect('mongodb://localhost/mongoose-intro', (err) => {
//     if (!err) console.log('Connected')
//     else console.log('ERROR', err)
// })

// const catSchema = mongoose.Schema({
//     name: String,
//     lives: Number
// });

// const Cat = mongoose.model('Cat', catSchema);

// Cat.create({ name: 'kitty' }).then(catFromDB => {
//     console.log(`A new cat was created: ${catFromDB}`);
// }).catch(err => {
//     console.log(err);
// });

// Cat.find().then(cat => {
//     console.log(cat);
// });

// Cat.findById(id) -> returns the document with an id field matching the given ObjectId
// Cat.findById('mongoObjId').then(cat => {
//     console.log(cat);
// });

// finds the first document that matches the search query
// Cat.findOne({ name: 'kitty' });

// updates the first document matching the given query 
// and merge the changes onto the fields of that document
// Cat.updateOne({ age: 9 }, { name: "Garfield II", hungry: true })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// Cat.updateMany(query, changes) -> updates all documents matching the given query and apply the changes to these documents
// Cat.updateMany({ age: 9 }, { age: 18, hungry: true })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// find element with this id and update
// Cat.findByIdAndUpdate('id890890', { name: 'foo' });

// deletes the first document that matches the query
// Cat.deleteOne({ hungry: true }).then(result => {
//     console.log(result);
// });

// deletes the document matching the id
// Cat.deleteById('id439028');

// deletes all documents that match the query 
// Cat.deleteMany({ name: "Foo" }).then(result => {
//     console.log(result);
// });

// gets an array and inserts all the items in the database
// Cat.insertMany([{ name: 'foo' }, { name: 'bar' }]);

// a more complex schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        set: value => {
            return value
                .split(' ')
                .map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
                .join(' ')
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 120
    },
    hobbies: [String],
    address: Object,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            message: 'Email must be lowercase',
            validator: value => {
                if (value.toLowerCase() === value && value.includes('@')) return true;
                else return false;
            }
        }
    }
});

const User = mongoose.model('User', userSchema);

User.create({ name: 'alice miller', email: 'johndoe@gmail.com' }).then(
    user => {
        console.log(user);
        // close the connection
    }
).catch(err => {
    console.log(err);
});

// here i can't close the connection