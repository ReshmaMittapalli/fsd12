const express = require("express");

const app = express();
const PORT = 3002;

// Set EJS as view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ===============================
// PART A - USERS
// ===============================

app.get("/users", (req, res) => {

    const users = [
        {
            name: "John Doe",
            email: "john@example.com",
            age: 25
        },
        {
            name: "Jane Smith",
            email: "jane@example.com",
            age: 30
        }
    ];

    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>User List</title>
        </head>
        <body>

            <h1>User List</h1>
            <hr>
    `;

    if (users.length === 0) {

        html += `
            <h3>No users available.</h3>
        `;

    } else {

        html += `<ol>`;

        users.forEach(user => {
            html += `
                <li>
                    ${user.name}
                    (${user.email}) -
                    ${user.age} years
                </li>
            `;
        });

        html += `
            </ol>
            <h3>Total users: ${users.length}</h3>
        `;
    }

    html += `
            <br>
            <a href="/register">Go to Registration</a>

        </body>
        </html>
    `;

    res.send(html);
});


// ===============================
// PART B - REGISTRATION FORM
// ===============================

app.get("/register", (req, res) => {

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Registration Form</title>
        </head>

        <body>

            <h1>Registration Form</h1>
            <hr>

            <form action="/register" method="POST">

                <label>Name:</label>
                <br>
                <input type="text" name="name">
                <br><br>

                <label>Email:</label>
                <br>
                <input type="email" name="email">
                <br><br>

                <label>Age:</label>
                <br>
                <input type="number" name="age">
                <br><br>

                <button type="submit">
                    Register
                </button>

            </form>

            <br>

            <a href="/users">View Users</a>

        </body>
        </html>
    `);
});


// ===============================
// PROCESS FORM
// ===============================

app.post("/register", (req, res) => {

    const { name, email, age } = req.body;

    // Validation
    if (
        !name ||
        !email ||
        !age ||
        name.trim() === "" ||
        email.trim() === "" ||
        age.toString().trim() === ""
    ) {

        return res.send(`
            <!DOCTYPE html>
            <html>

            <body>

                <h1 style="color:red;">
                    Error
                </h1>

                <p>
                    All fields are required.
                </p>

                <a href="/register">
                    Go Back
                </a>

            </body>

            </html>
        `);
    }


    // Success page
    res.send(`
        <!DOCTYPE html>
        <html>

        <head>
            <title>Registration Successful</title>
        </head>

        <body>

            <h1 style="color:green;">
                Registration Successful!
            </h1>

            <hr>

            <p>
                <strong>Name:</strong>
                ${name}
            </p>

            <p>
                <strong>Email:</strong>
                ${email}
            </p>

            <p>
                <strong>Age:</strong>
                ${age}
            </p>

            <br>

            <a href="/register">
                Register Another User
            </a>

            <br><br>

            <a href="/users">
                View User List
            </a>

        </body>

        </html>
    `);
});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
