use business_db;

INSERT INTO department
VALUES
    (1, "Human Resources"),
    (2, "Sales"),
    (3, "Product"),
    (4, "Marketing"),
    (5, "IT"),
    (6, "Finance"),
    (7, "Accounting");

INSERT INTO `role`
VALUES
    (21, "Sales Associate", 30000, 2),
    (22, "Senior Sales Associate", 35000, 2),
    (23, "Sales Manager", 42500, 2),
    (72, "Senior Accountant", 65000, 7),
    (73, "Accountant Manager", 72000, 7),
    (34, "Product Manager", 68000, 3),
    (35, "Product Director", 80000, 3),
    (56, "IT Director", 125000, 5),
    (61, "Financial Analyst", 125000, 6),
    (63, "Strategy & Rate Director", 130000, 6),
    (64, "FP&A Director", 117000, 6);

INSERT INTO employee
VALUES
    (293, "Boston", "Miller", 22, 228),
    (228, "Susie", "Norris", 23, null),
    (312, "Maria", "Young", 34, 307),
    (555, "Xavier", "James", 56, 504),
    (604, "Frederick", "Gordon", 61, 670),
    (670, "Annais", "Blakey", 63, 625),
    (662, "Valerie", "McDonalds", 64, 625);