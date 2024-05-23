const { Client } = require('pg');
const inquirer = require('inquirer');

async function main() {
  const client = new Client({
    host: 'localhost',
    database: 'employee_db',
    user: 'postgres',
    password: 'bentlee',
    port: 5432, // This is the default port for PostgreSQL
  });

  await client.connect();

  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role', 
        'Exit'
      ],
    });

    switch (action) {
      case 'View all departments':
        await viewAllDepartments(client);
        break;
      case 'View all roles':
        await viewAllRoles(client);
        break;
      case 'View all employees':
        await viewAllEmployees(client);
        break;
      case 'Add a department':
        await addDepartment(client);
        break;
      case 'Add a role':
        await addRole(client);
        break;
      case 'Add an employee':
        await addEmployee(client);
        break;
      case 'Update an employee role':
        await updateEmployeeRole(client);
        break;
      case 'Exit':
        await client.end();
        return;
    }
  }
}

async function viewAllDepartments(client) {
  const res = await client.query('SELECT * FROM department');
  console.table(res.rows);
}

async function viewAllRoles(client) {
  const res = await client.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  console.table(res.rows);
}

async function viewAllEmployees(client) {
  const res = await client.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `);
  console.table(res.rows);
}

async function addDepartment(client) {
  const { name } = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:',
  });
  await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Added ${name} to the database`);
}

async function addRole(client) {
  const departments = await client.query('SELECT * FROM department');
  const departmentChoices = departments.rows.map(({ id, name }) => ({ name, value: id }));
  
  const { title, salary, department_id } = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the name of the role:',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary of the role:',
    },
    {
      name: 'department_id',
      type: 'list',
      message: 'Select the department:',
      choices: departmentChoices,
    },
  ]);
  
  await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log(`Added ${title} to the database`);
}

async function addEmployee(client) {
  const roles = await client.query('SELECT * FROM role');
  const roleChoices = roles.rows.map(({ id, title }) => ({ name: title, value: id }));
  
  const employees = await client.query('SELECT * FROM employee');
  const managerChoices = employees.rows.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
  managerChoices.unshift({ name: 'None', value: null });

  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the employee’s first name:',
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the employee’s last name:',
    },
    {
      name: 'role_id',
      type: 'list',
      message: 'Select the role:',
      choices: roleChoices,
    },
    {
      name: 'manager_id',
      type: 'list',
      message: 'Select the manager:',
      choices: managerChoices,
    },
  ]);

  await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  console.log(`Added ${first_name} ${last_name} to the database`);
}

async function updateEmployeeRole(client) {
  const employees = await client.query('SELECT * FROM employee');
  const employeeChoices = employees.rows.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
  
  const roles = await client.query('SELECT * FROM role');
  const roleChoices = roles.rows.map(({ id, title }) => ({ name: title, value: id }));

  const { employee_id, role_id } = await inquirer.prompt([
    {
      name: 'employee_id',
      type: 'list',
      message: 'Select the employee:',
      choices: employeeChoices,
    },
    {
      name: 'role_id',
      type: 'list',
      message: 'Select the new role:',
      choices: roleChoices,
    },
  ]);

  await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log('Updated employee role');
}

main().catch(console.error);