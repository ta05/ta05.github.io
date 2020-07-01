class Employee {
    constructor(id, first, last, roleId, managerId) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.roleId = roleId;
        this.managerId = managerId;
    }

    addQuery() {
        return `INSERT INTO employee VALUES (${this.id}, "${this.first}", "${this.last}", ${this.roleId}, ${this.managerId})`;
    }
}

Employee.prototype.viewQuery = function () {
    return `SELECT * FROM employee`;
}

module.exports = Employee;