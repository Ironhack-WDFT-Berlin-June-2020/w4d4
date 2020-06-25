const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/promise-all', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Student = mongoose.model('Student', { firstName: String });
const City = mongoose.model('City', { name: String });

const promise1 = Student.insertMany([{ firstName: 'Alice' }, { firstName: 'Bob' }]);
const promise2 = City.insertMany([{ name: 'Madrid' }, { name: 'Barcelona' }, { name: 'Paris' }]);

Promise.all([promise1, promise2]).then(values => {
    console.log('Data inserted');
    console.log(values);
    mongoose.connection.close();
}
).catch(err => {
    console.log(err);
});
// close the connection after both inserts
