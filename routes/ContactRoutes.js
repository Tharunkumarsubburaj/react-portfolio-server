const express = require('express');
const { fetchContacts, createContacts, updateContacts, deleteContacts } = require('../controller/ContactController');
const router = express.Router();


router.get('/', fetchContacts);
router.post('/', createContacts);
router.put('/:id', updateContacts);
router.delete('/:id', deleteContacts);

module.exports = router;