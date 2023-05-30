const asyncHandler = require("express-async-handler")
const contacts = require("../models/contactModel")

//@desc GET ALL CONTACTS
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
    const contactsTable = await contacts.find({user_id: req.user.id});
    res.json(contactsTable)
})

//@desc GET CONTACT
//@route GET /api/contact/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
    try {
        const contact = await contacts.findById(req.params.id)
        if (!contact) {
            res.status(404)
            throw new Error("Contact does not exist")
        }
        if (contact.user_id.toString() !== req.user.id) {
            res.status(403)
            throw new Error("Forbidden")
        }
        res.json(contact)
    } catch (e) {
        res.status(404)
        throw new Error(e)
    }
})

//@desc CREATE CONTACT
//@route GET /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const newContact = await contacts.create({
        name: name,
        email: email,
        phone: phone,
        user_id: req.user.id
    })
    res.json(newContact)
})

//@desc EDIT CONTACT
//@route GET /api/contact/:id
//@access private

const editContact = asyncHandler(async (req, res) => {
    try {
        const contact = await contacts.findById(req.params.id)
        if (!contact) {
            res.status(404)
            throw new Error("Contact does not exist")
        }
        if (contact.user_id.toString() !== req.user.id) {
            res.status(403)
            throw new Error("Forbidden")
        }
        const updatedContact = await contacts.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updatedContact)
    } catch (e) {
        res.status(404)
        throw new Error(e)
    }
})

//@desc DELETE CONTACT
//@route GET /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await contacts.findById(req.params.id)
        if (!contact) {
            res.status(404)
            throw new Error("Contact does not exist")
        }
        if (contact.user_id.toString() !== req.user.id) {
            res.status(403)
            throw new Error("Forbidden")
        }
        await contacts.deleteOne({_id: req.params.id})
        res.json("Contact Deleted")
    } catch (e) {
        res.status(404)
        throw new Error(e)
    }
})

module.exports = { getContacts, getContact, createContact, editContact, deleteContact }