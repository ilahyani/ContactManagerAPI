const asyncHandler = require("express-async-handler")
const contacts = require("../models/contactModel")

//@desc GET ALL CONTACTS
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
    const contactsTable = await contacts.find();
    res.json(contactsTable)
})

//@desc GET CONTACT
//@route GET /api/contact/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
    try {
        const contact = await contacts.findById(req.params.id)
        if (!contact) {
            res.status(404)
            throw new Error("Contact does not exist")
        }
        res.json(contact)
    } catch (e) {
        res.status(404)
        throw new Error("Contact does not exist")
    }
})

//@desc CREATE CONTACT
//@route GET /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const newContact = await contacts.create(req.body)
    res.json(newContact)
})

//@desc EDIT CONTACT
//@route GET /api/contact/:id
//@access public

const editContact = asyncHandler(async (req, res) => {
    try {
        const contact = await contacts.findById(req.params.id)
        if (!contact) {
            res.status(404)
            throw new Error("Contact does not exist")
        }
        const updatedContact = await contacts.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updatedContact)
    } catch (e) {
        res.status(404)
        throw new Error("Contact does not exist")
    }
})

//@desc DELETE CONTACT
//@route GET /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await contacts.findById(req.params.id)
        if (!contact) {
            res.status(404)
            throw new Error("Contact does not exist")
        }
        const updatedContact = await contacts.findByIdAndDelete(req.params.id)
        res.json("Contact Deleted")
    } catch (e) {
        res.status(404)
        throw new Error("Contact does not exist")
    }
})

module.exports = { getContacts, getContact, createContact, editContact, deleteContact }