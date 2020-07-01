class Employee {
    constructor(id, title, salary, deptId) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.deptId = deptId
    }

    addQuery() {
        return `INSERT INTO role VALUES (${this.id}, "${this.title}", ${this.salary}, ${this.deptId})`;
    }
}

Employee.prototype.viewQuery = function () {
    return `SELECT * FROM role`;
}

module.exports = Employee;