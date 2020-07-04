class Employee {
    constructor(id, first, last, roleId, managerId) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.roleId = roleId;
        this.managerId = managerId;
    }

    getValues() {
        return [this.id, this.first, this.last, this.roleId, this.managerId];
    }
}

Employee.prototype.addQuery = `INSERT INTO employee VALUES (?, ?, ?, ?, ?)`;

Employee.prototype.viewQuery = `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, concat(m.first_name, " ", m.last_name) as manager FROM employee e LEFT JOIN employee m ON(e.manager_id = m.id) INNER JOIN role r ON(e.role_id = r.id) INNER JOIN department d ON(r.department_id = d.id)`;

Employee.prototype.updateQuery = `UPDATE employee SET ? WHERE CONCAT(first_name, " ", last_name) = ?`;

Employee.prototype.deleteQuery = `DELETE FROM employee WHERE ?`;


module.exports = Employee;