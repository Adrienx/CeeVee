# Project Name: CeeVee

## Description

CeeVee is an AI powered resume and cover letter tailor that is built using that MERN stack and utilizes OpenAI's GPT-4 AI model. It enables users to generate customized resumes and cover letters based on their existing documents and a specific job description.

## Proposed Features

1. Users can create an account and authenticate to their own user account. This user account will store users' resumes, cover letters, job descriptions, and tailored resumes and cover letters. (CRUD)
2. Users will be able to generate a tailored resume and cover letter based on their existing documents and a specific job description.
3. Users will be able to download the generated documents in word format.
4. The generated documents will be formatted based on industry best practices for resumes and cover letters.

## ERD

User
| - userID
| - firstName
| - lastName
| - email
| - password

Resume
| - resumeID
| - userID
| - title
| - description
| - body

CoverLetter
| - coverLetterID
| - userID
| - title
| - description
| - body

JobDescription
| - jobDescriptionID
| - userID
| - title
| - description
| - body

TailoredResume
| - tailoredResumeID
| - userID
| - resumeID
| - jobDescriptionID
| - title
| - body

TailoredCoverLetter
| - tailoredCoverLetterID
| - userID
| - coverLetterID
| - jobDescriptionID
| - title
| - body

## Component Hierarchy Structure

App
├── Header
├── Nav
└── Main
├── Home
├── UserLogin
├── UserProfile
│ ├── UserInfo
│ ├── UserSettings
│ ├── ChangeEmail
│ └── ChangePassword
├── ResumeInput
├── CoverLetterInput
├── JobDescriptionInput
├── GenerateDocument
│ ├── TailoredResume
│ └── TailoredCoverLetter
└── Documents
├── ResumeList
├── CoverLetterList
├── JobDescriptionList
├── TailoredResumeList
└── TailoredCoverLetterList

## Technologies

- MongoDB
- Express
- React (created with Create React App)
- Node.js
- Bootstrap
- OpenAI's GPT-4

## Future Updates

- Support for PDF download format.
- More advanced and specific tailoring instructions.
- Utilize DAll-E-2 API to allow users to generate a career map based on their generated documents.
- Ability for users to save multiple versions of their resumes and cover letters.

## Getting Started

Visit our deployed site [here](TBD) and check out our Trello board [here](TBD).

## Run Locally

1. Clone this repository.
2. Install the required packages for both client and server-side using npm install.
3. Use npm start in both the client and server directories to start both servers.
