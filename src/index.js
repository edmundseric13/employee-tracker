const { Client } = require('pg');
const inquirer = require('inquirer');

async function main() {
  const client = new Client({
    // your config here
  });

  await client.connect();

  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
    });

    switch (action) {
      case 'View all departments':
        // query and log departments
        break;
      case 'View all roles':
        // query and log roles
        break;
      case 'View all employees':
        // query and log employees
        break;
      case 'Add a department':
        // prompt for info and add department
        break;
      case 'Add a role':
        // prompt for info and add role
        break;
      case 'Add an employee':
        // prompt for info and add employee
        break;
      case 'Update an employee role':
        // prompt for info and update employee
        break;
      case 'Exit':
        await client.end();
        return;
    }
  }
}

main().catch(console.error);