const asyncHandler = require("express-async-handler")

//@desc GET ALL CONTACTS
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
    res.json({ msg: "GET CONTACTS" })
})

//@desc GET CONTACT
//@route GET /api/contact/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
    res.json({ msg: `GET CONTACT ${req.params.id}` })
})

//@desc CREATE CONTACT
//@route GET /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
    console.log("request", req.body)
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    res.json({ msg: "CREATE CONTACT" })
})

//@desc EDIT CONTACT
//@route GET /api/contact/:id
//@access public

const editContact = asyncHandler(async (req, res) => {
    res.json({ msg: `EDIT CONTACT ${req.params.id}` })
})

//@desc DELETE CONTACT
//@route GET /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    res.json({ msg: `DELETE CONTACT ${req.params.id}` })
})

module.exports = { getContacts, getContact, createContact, editContact, deleteContact }