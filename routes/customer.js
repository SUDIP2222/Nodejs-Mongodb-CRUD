/**
 * Created by sudip sarker on 8/25/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var customer = mongoose.model('customers');

router.get('/', function(req, res) {
    customer.find(function(err, data){
        console.log(data)
        res.render(
            'index',
            {title : 'Customers', customers : data}
        );
    });
});

router.get('/create', function(req, res) {
    res.render(
        'create',
        {title : 'Create'}
    );
});

router.post('/', function(req, res) {
    req.assert('name', 'Name is required').notEmpty();
    req.assert('email', 'A valid email is required').isEmail();
    req.assert('address', 'Address is required').notEmpty();
    req.assert('phone', 'Phone Number is required').notEmpty();

    var errors = req.validationErrors();

    if( !errors){
        new customer({
            name : req.body.name.toLowerCase(),
            email : req.body.email,
            address : req.body.address,
            phone : req.body.phone
        }).save(function(err, data) {
            console.log(data)
            res.redirect('/customers');
        });

    }
    else{
        res.render(
            'create',
            {
                title : 'Create',
                errors: errors
            }

        );
        console.log(errors);
    }



});

router.get('/:id/edit', function(req, res) {
   // res.send('Just a test');
    var query = {"_id": req.params.id};
    customer.findOne(query, function(err, data){
        console.log(data)
        res.render(
            'edit',
            {title : 'Edit ' + data.name, customer : data}
        );
    });
});

router.put('/:id', function(req, res) {
    var query = {"_id": req.params.id};
    req.assert('name', 'Name is required').notEmpty();
    req.assert('email', 'A valid email is required').isEmail();
    req.assert('address', 'Address is required').notEmpty();
    req.assert('phone', 'Phone Number is required').notEmpty();

    var errors = req.validationErrors();
    if( !errors) {
        var update = {
            name: req.body.name.toLowerCase(),
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone
        };
        var options = {new: true};
        customer.findOneAndUpdate(query, update, options, function (err, data) {
            console.log(data)
            res.redirect('/customers');
        });
    }
    else{

        var query = {"_id": req.params.id};
        customer.findOne(query, function(err, data){
            console.log(data)
            res.render(
                'edit',
                {
                    title : 'Edit ' + data.name,
                    customer : data,
                    errors: errors,
                }
            );
        });
        console.log(errors);

    }
});

router.get('/:id', function(req, res) {
    var query = {"_id": req.params.id};
    customer.findOneAndRemove(query, function(err, data){
        console.log(data)
        res.redirect('/customers');
    });

});
router.get('/name/search', function(req, res) {
    console.log(req.query["search"]);
    var query = {"name": new RegExp( req.query["search"].toLowerCase())};
    customer.find(query, function(err, data){
        console.log(data)
        res.render(
            'search',
            {title : 'Search', customers : data}
        );

    });
});

module.exports = router;

