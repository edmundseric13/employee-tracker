INSERT INTO departments (name)
VALUES ('Sales'), ('Engineering'), ('HR');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Manager', 80000, 1), ('Software Engineer', 90000, 2), ('HR Manager', 70000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Bob', 'Johnson', 3, 1);