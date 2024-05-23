// View all departments
function viewAllDepartments() {
    return client.query('SELECT * FROM departments;');
  }
  
  // View all roles
  function viewAllRoles() {
    return client.query('SELECT * FROM roles;');
  }
  
  // View all employees
  function viewAllEmployees() {
    return client.query('SELECT * FROM employees;');
  }
  
  // Add a department
  function addDepartment(name) {
    return client.query('INSERT INTO departments (name) VALUES ($1) RETURNING *;', [name]);
  }
  
  // Add a role
  function addRole(title, salary, department_id) {
    return client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;', [title, salary, department_id]);
  }
  
  // Add an employee
  function addEmployee(first_name, last_name, role_id, manager_id) {
    return client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;', [first_name, last_name, role_id, manager_id]);
  }
  module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee
  };