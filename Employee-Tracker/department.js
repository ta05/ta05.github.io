class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    addQuery() {
        return `INSERT INTO department VALUES (${this.id}, "${this.name}")`;
    }
}

Department.prototype.viewQuery = function () {
    return `SELECT * FROM department`;
}

module.exports = Department;