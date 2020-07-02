class Employee {
    constructor(id, first, last, roleId, managerId) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.roleId = roleId;
        this.managerId = managerId;
    }

    addQuery() {
        return `INSERT INTO employee VALUES (?, ?, ?, ?, ?)`;
    }

    getValues() {
        return [this.id, this.first, this.last, this.roleId, this.managerId];
    }
}

Employee.prototype.viewQuery = `SELECT * FROM employee`;

Employee.prototype.updateQuery = `UPDATE employee SET ? WHERE ?`;


module.exports = Employee;