const mongoose = require("mongoose")
const db = require("../db")
const User = require("../models/User")
const Resume = require("../models/Resume")
const CoverLetter = require("../models/CoverLetter")
const JobDescription = require("../models/JobDescription")
const NewResume = require("../models/NewResume")
const NewCoverLetter = require("../models/NewCoverLetter")

// seed the database
const seedDB = async () => {
  // Delete all existing Users, Resumes, CoverLetters, JobDescriptions, NewResumes, NewCoverLetters
  await User.deleteMany({})
  await Resume.deleteMany({})
  await CoverLetter.deleteMany({})
  await JobDescription.deleteMany({})
  await NewResume.deleteMany({})
  await NewCoverLetter.deleteMany({})

  // Create two new users
  const user1 = new User({
    firstName: "User1",
    lastName: "Last1",
    email: "user1@user.com",
    password: "password1",
  })
  const user2 = new User({
    firstName: "User2",
    lastName: "Last2",
    email: "user2@user.com",
    password: "password2",
  })

  // Save the new users to the database
  await user1.save()
  await user2.save()

  // Create some dummy data for resumes, cover letters, and job descriptions
  const resume1 = new Resume({
    userID: user1._id,
    title: "Resume 1",
    description: "This is user1's resume",
    body: "Experience: ...",
  })

  const coverLetter1 = new CoverLetter({
    userID: user1._id,
    title: "Cover Letter 1",
    description: "This is user1's cover letter",
    body: "I am interested in...",
  })

  const jobDescription1 = new JobDescription({
    userID: user1._id,
    title: "Job Description 1",
    description: "Software Developer at XYZ",
    body: "Responsibilities: Developing software...",
  })

  // Save resumes, cover letters, and job descriptions to the database
  await resume1.save()
  await coverLetter1.save()
  await jobDescription1.save()

  // Create tailored (new) resumes and cover letters for user1
  const newResume1 = new NewResume({
    userID: user1._id,
    jobDescriptionID: jobDescription1._id,
    title: "New " + resume1.title,
    description: "New resume created from " + resume1.title,
    body: resume1.body,
  })

  const newCoverLetter1 = new NewCoverLetter({
    userID: user1._id,
    jobDescriptionID: jobDescription1._id,
    title: "New " + coverLetter1.title,
    description: "New cover letter created from " + coverLetter1.title,
    body: coverLetter1.body,
  })

  // Save new resumes and cover letters to the database
  await newResume1.save()
  await newCoverLetter1.save()
}

seedDB().then(() => {
  db.close()
})
