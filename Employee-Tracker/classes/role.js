class Role {
    constructor(id, title, salary, deptId) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.deptId = deptId
    }

    getValues() {
        return [this.id, this.title, this.salary, this.deptId];
    }
}

Role.prototype.addQuery = `INSERT INTO role SELECT ?, ?, ?, id FROM department WHERE ?`;

Role.prototype.viewQuery = `SELECT r.id, r.title, r.salary, d.name as department FROM role r INNER JOIN department d ON(r.department_id = d.id)`;

Role.prototype.deleteQuery = `DELETE FROM role WHERE ?`;

module.exports = Role;