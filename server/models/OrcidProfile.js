const mongoose = require('mongoose');

const orcidProfileSchema = new mongoose.Schema({
    orcidId: { type: String, required: true, unique: true },
    person: { type: Object, required: true },
    educations: { type: Object, required: true },
    works: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OrcidProfile', orcidProfileSchema);
