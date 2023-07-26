const mongoose = require("mongoose")

const User = require("./User")

const Resume = require("./Resume")

const JobDescription = require("./JobDescription")

const NewResume = require("./NewResume")

const NewCoverLetter = require("./NewCoverLetter")

const GalleryImage = require("./galleryImage")

module.exports = { User, Resume, JobDescription, NewResume, NewCoverLetter }
