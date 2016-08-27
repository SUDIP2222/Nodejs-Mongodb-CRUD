/**
 * Created by sudip sarker on 8/25/2016.
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Customer = new Schema(
    {
        name : String,
        address:String,
        email:String,
        phone:String
    }

);

mongoose.model('customers', Customer);

mongoose.connect('mongodb://localhost/customer');

