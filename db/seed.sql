USE employee_db;

INSERT INTO department (id, name) VALUES
(1, 'Sales'),
(2, 'Engineering');

INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Sales Lead', 100000, 1),
(2, 'Software Engineer', 120000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Doe', 2, 1);