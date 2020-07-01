class Role {
    constructor(id, title, salary, deptId) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.deptId = deptId
    }

    addQuery() {
        return `INSERT INTO role VALUES (?, ?,?, ?)`;
    }

    getValues() {
        return [this.id, this.title, this.salary, this.deptId];
    }
}

Role.prototype.viewQuery = `SELECT * FROM role`;

module.exports = Role;