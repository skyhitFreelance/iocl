const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

app.use(express.json());
app.use(
  cors()
);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
const initializeDatabase = () => {
  db.connect((err) => {
    if (err) {
      console.error("Failed to connect to the database:", err);
      return;
    }
    console.log("Connected to the MySQL database.");
  });
};

initializeDatabase();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "No token provided, authorization denied." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

// --- 1. User Registration Endpoint ---
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(insertQuery, [username, password], (err, results) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ error: "Failed to register user." });
    }
    res.status(201).json({ message: "User registered successfully." });
  });
});

// --- 2. User Login Endpoint ---
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const userQuery = "SELECT * FROM users WHERE username = ?";
  db.query(userQuery, [username], (err, results) => {
    if (err) {
      console.error("Error fetching user from the database:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json({ message: "Login successful", token });
  });
});

// --- 3. Search Suggestions Endpoint ---
app.get("/petrol-stations/suggestions", (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  const suggestionQuery = `
    SELECT id, ro_name AS name, address, latitude, longitude
    FROM petrol_stations
    WHERE ro_name LIKE ? OR address LIKE ?
  `;
  const params = [`%${query}%`, `%${query}%`];

  db.query(suggestionQuery, params, (err, results) => {
    if (err) {
      console.error("Error fetching suggestions:", err);
      return res.status(500).json({ error: "Failed to fetch suggestions." });
    }
    res.status(200).json(results);
  });
});


// --- 4. Search Petrol Stations with Pagination ---
// app.get("/petrol-stations/search", (req, res) => {
//     let { latitude, longitude, radius, page = 1, pageSize = 10 } = req.query;
  
//     // Validate and parse inputs
//     latitude = parseFloat(latitude);
//     longitude = parseFloat(longitude);
//     radius = radius ? parseFloat(radius) : null; // Allow radius to be null
//     page = parseInt(page);
//     pageSize = parseInt(pageSize);
  
//     if (isNaN(latitude) || isNaN(longitude) || isNaN(page) || isNaN(pageSize)) {
//       return res.status(400).json({
//         error: "Invalid input. Latitude, longitude, page, and pageSize must be valid numbers.",
//       });
//     }
  
//     // Calculate offset for pagination
//     const offset = (page - 1) * pageSize;
  
//     // Adjust query based on whether radius is provided
//     let radiusQuery = `
//         SELECT id, ro_name AS name, address, latitude, longitude, fo_mobile as mobile, pin_code as pincode,
//           (6371 * acos(
//             cos(radians(?)) * cos(radians(latitude)) *
//             cos(radians(longitude) - radians(?)) +
//             sin(radians(?)) * sin(radians(latitude))
//           )) AS distance
//         FROM petrol_stations
//     `;
//     const params = [latitude, longitude, latitude];
  
//     if (radius) {
//       radiusQuery += ` HAVING distance <= ?`;
//       params.push(radius);
//     }
  
//     radiusQuery += ` ORDER BY distance LIMIT ? OFFSET ?;`;
//     params.push(pageSize, offset);
  
//     // Execute the query
//     db.query(radiusQuery, params, (err, results) => {
//       if (err) {
//         console.error("Error fetching petrol stations:", err);
//         return res.status(500).json({ error: "Failed to fetch petrol stations." });
//       }
//       res.status(200).json({
//         data: results,
//         pagination: { page: page, pageSize: pageSize, total: results.length },
//       });
//     });
//   });

// important one - future implementation
// app.get("/petrol-stations/search", (req, res) => {
//     let { latitude, longitude, page = 1, pageSize = 10 } = req.query;
  
//     latitude = parseFloat(latitude);
//     longitude = parseFloat(longitude);
//     page = parseInt(page);
//     pageSize = parseInt(pageSize);
  
//     if (isNaN(latitude) || isNaN(longitude) || isNaN(page) || isNaN(pageSize)) {
//       return res.status(400).json({
//         error: "Invalid input. Latitude, longitude, page, and pageSize must be valid numbers.",
//       });
//     }
  
//     const offset = (page - 1) * pageSize;
  
//     let countQuery = `
//         SELECT COUNT(*) AS total
//         FROM petrol_stations
//     `;
//     let mainQuery = `
//         SELECT id, ro_name AS name, address, latitude, longitude, fo_mobile as mobile, pin_code as pincode
//         FROM petrol_stations
//         ORDER BY id ASC
//         LIMIT ? OFFSET ?;
//     `;
  
//     // First query: Get total count
//     db.query(countQuery, [], (err, countResults) => {
//       if (err) {
//         console.error("Error fetching count:", err);
//         return res.status(500).json({ error: "Failed to fetch petrol stations count." });
//       }
//       const total = countResults[0]?.total || 0;
  
//       // Second query: Get paginated results
//       db.query(mainQuery, [pageSize, offset], (err, results) => {
//         if (err) {
//           console.error("Error fetching petrol stations:", err);
//           return res.status(500).json({ error: "Failed to fetch petrol stations." });
//         }
//         res.status(200).json({
//           data: results,
//           pagination: { page: page, pageSize: pageSize, total: total },
//         });
//       });
//     });
//   });
  
app.get("/petrol-stations/search", (req, res) => {
  const { query = "default", page = 1, pageSize = 10 } = req.query;
  // Ensure `page` and `pageSize` are integers
  const currentPage = parseInt(page, 10) || 1;
  const currentPageSize = parseInt(pageSize, 10) || 10;
  const offset = (currentPage - 1) * currentPageSize;

  console.log("Query Params:", { query, currentPage, currentPageSize, offset });

  let countQuery, mainQuery, params;

  if (query === "default") {
    countQuery = `SELECT COUNT(*) AS total FROM petrol_stations;`;
    mainQuery = `
      SELECT id, ro_name AS name, address, latitude, longitude, fo_mobile AS mobile, pin_code AS pincode
      FROM petrol_stations
      ORDER BY id ASC
      LIMIT ? OFFSET ?;
    `;
    params = [currentPageSize, offset];
  } else {
    countQuery = `
      SELECT COUNT(*) AS total
      FROM petrol_stations
      WHERE ro_name LIKE ? OR address LIKE ?;
    `;
    mainQuery = `
      SELECT id, ro_name AS name, address, latitude, longitude, fo_mobile AS mobile, pin_code AS pincode
      FROM petrol_stations
      WHERE ro_name LIKE ? OR address LIKE ?
      ORDER BY id ASC
      LIMIT ? OFFSET ?;
    `;
    const queryParam = `%${query}%`;
    params = [queryParam, queryParam, currentPageSize, offset];
  }

  // Fetch the total count of records
  db.query(countQuery, params.slice(0, 2), (err, countResults) => {
    if (err) {
      console.error("Error fetching count:", err);
      return res.status(500).json({ error: "Failed to fetch petrol stations count." });
    }
    const total = countResults[0]?.total || 0;

    if (total === 0) {
      console.log("No data found for the given query.");
      return res.status(200).json({
        data: [],
        pagination: { page: currentPage, pageSize: currentPageSize, total },
      });
    }

    // Fetch the paginated results
    db.query(mainQuery, params, (err, results) => {
      if (err) {
        console.error("Error fetching petrol stations:", err);
        return res.status(500).json({ error: "Failed to fetch petrol stations." });
      }
      res.status(200).json({
        data: results,
        pagination: { page: currentPage, pageSize: currentPageSize, total },
      });
    });
  });
});


// --- 5. Add Petrol Station (Requires Authentication) ---
app.post("/petrol-stations", verifyToken, (req, res) => {
    const {
      do_name,
      fo_name,
      fo_email,
      fo_mobile,
      ro_code,
      sa_name,
      ro_name,
      ssr,
      district,
      address,
      pin_code,
      latitude,
      longitude,
      pan_number,
      gstin,
      ro_email,
      mobile_number,
    } = req.body;
  
    if (!do_name || !ro_name || !address || !latitude || !longitude || !district) {
      return res.status(400).json({ error: "Required fields are missing." });
    }
  
    const insertQuery = `
      INSERT INTO petrol_stations (
        do_name, fo_name, fo_email, fo_mobile, ro_code, sa_name, ro_name, ssr,
        district, address, pin_code, latitude, longitude, pan_number, gstin, ro_email, mobile_number
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
  
    const params = [
      do_name,
      fo_name || null,
      fo_email || null,
      fo_mobile || null,
      ro_code || null,
      sa_name || null,
      ro_name,
      ssr || null,
      district,
      address,
      pin_code || null,
      parseFloat(latitude),
      parseFloat(longitude),
      pan_number || null,
      gstin || null,
      ro_email || null,
      mobile_number || null,
    ];
  
    db.query(insertQuery, params, (err, results) => {
      if (err) {
        console.error("Error inserting petrol station:", err);
        return res.status(500).json({ error: "Failed to add petrol station." });
      }
      res.status(201).json({ message: "Petrol station added successfully.", id: results.insertId });
    });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
