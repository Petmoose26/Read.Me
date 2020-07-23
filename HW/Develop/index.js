const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

userPrompts();

function userPrompts() {
  const questions = [
    {
      type: "input",
      message: "Enter your badge link",
      name: "badge",
    },
    {
      type: "input",
      message: "Enter your Project Name",
      name: "title",
    },
    {
      type: "input",
      message: "Give us a description",
      name: "description",
    },
    {
      type: "input",
      message: "Input your table of contents",
      name: "content",
    },
    {
      type: "input",
      message: "What installation package are you using ?",
      name: "installation",
    },
    {
      type: "input",
      message: "What is your usage ?",
      name: "usage",
    },
    {
      type: "input",
      message: "what is the licensing ?",
      name: "license",
    },
    {
      type: "input",
      mesage: "Who is the contributor",
      name: "contributing",
    },
    {
      type: "input",
      message: "Any tests ?",
      name: "test",
    },
    {
      type: "input",
      message: "what is your GitHub username ?",
      name: "username",
    },
    {
      type: "input",
      message: "What is the email to your GitHub account ?",
      name: "email",
    },
  ];

  inquirer.prompt(questions).then(async (answers) => {
    const { data } = await axios.get(
      `https://api.github.com/users/${answers.username}`
    );
    console.log(data);

    const readMe = `
#  ${answers.title}

## Badge
    ![user badge](${answers.badge})
    
## Description
    ${answers.description}

## Content
    ${answers.content}

## Installation
    ${answers.installation}

## Usage
    ${answers.usage}

## License
    ${answers.license}

## Contributing
    ${answers.contributing}

## Test
    ${answers.test}

## GitHub Avatar
    ![user profile](${data.avatar_url})
    `;
    fs.writeFileSync("README.md", readMe);
  });
}
