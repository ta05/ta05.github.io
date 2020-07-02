class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    addQuery() {
        return `INSERT INTO department VALUES (?,?)`;
    }

    getValues() {
        return [this.id, this.name];
    }
}

Department.prototype.viewQuery = `SELECT * FROM department`;

Department.prototype.deleteQuery = `DELETE FROM department WHERE ?`;

Department.prototype.viewSalaryQuery = `SELECT SUM(salary) AS "Department Salary" FROM employee e LEFT JOIN role r ON (e.role_id = r.id) LEFT JOIN department d ON (r.department_id = d.id) WHERE ?`;

module.exports = Department;