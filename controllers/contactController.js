//@desc GET ALL CONTACTS
//@route GET /api/contacts
//@access public

const getContacts = (req, res) => {
    res.json({msg: "GET CONTACTS"})
}

//@desc GET CONTACT
//@route GET /api/contact/:id
//@access public

const getContact = (req, res) => {
    res.json({msg: `GET CONTACT ${req.params.id}`})
}

//@desc CREATE CONTACT
//@route GET /api/contacts
//@access public

const createContact = (req, res) => {
    res.json({msg: "CREATE CONTACT"})
}

//@desc EDIT CONTACT
//@route GET /api/contact/:id
//@access public

const editContact = (req, res) => {
    res.json({msg: `EDIT CONTACT ${req.params.id}`})
}

//@desc DELETE CONTACT
//@route GET /api/contacts/:id
//@access public

const deleteContact = (req, res) => {
    res.json({msg: `DELETE CONTACT ${req.params.id}`})
}

module.exports = {getContacts, getContact, createContact, editContact, deleteContact}