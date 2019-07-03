var db = require("../models");

module.exports = function (app) {
    // this route should find all contacts in the table and display them as JSON
    app.get("/api/contacts", function (req, res) {
        db.Contact.findAll({
            //order by last name then first name
        }).then(function (contacts) {
            res.json(contacts);

        })
    });

    // this route should add a new contact to the table
    app.post("/api/contacts", function (req, res) {

        let { firstName, lastName, contactType, phoneNumber, emailAddress } = req.body; // object destructoring 

        let newContact = {
            firstName,
            lastName,
            contactType,
            phoneNumber: phoneNumber || null, 
            emailAddress: emailAddress || null
        }
        db.Contact.create(newContact).then(function (contact) {
            // added contact [first name] [last name]
            console.log(`Added contact ${contact.firstName} ${contact.lastName}`); //back end
            res.json({ id: contact.id }) //front end
        });
    });

    // this route should delete a contact from the table, if the id matches the ':id' url param
    app.delete("/api/contacts/:id", function (req, res) {
        db.Contact.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (contact) {
            //deleted contact with id [id];
            console.log(`Deleted contact with id ${contact.id}`);
            res.end();
        })

    });
}
