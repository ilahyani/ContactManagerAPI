const router = require("express").Router()
const validateTokenHandler = require("../middleware/validateTokenHandler")
const { getContacts,
    getContact,
    createContact,
    editContact,
    deleteContact } = require("../controllers/contactController")

router.use(validateTokenHandler)
router.route("/").get(getContacts).post(createContact)
router.route("/:id").get(getContact).put(editContact).delete(deleteContact)

module.exports = router