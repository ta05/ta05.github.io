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

module.exports = Department;