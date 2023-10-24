const express = require("express");
const path = require("path");
const cors = require('cors');
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(cors());

const dbPath = path.join(__dirname, "seats.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/", async (request, response) => {
  const getQuery = `
    SELECT
      *
    FROM
      book_seats`;
  const seatsArray = await db.all(getQuery);
  response.send(seatsArray);


  app.put("/:seatId/", async (request, response) => {
    const { seatId } = request.params;
    console.log(seatId)
    const updateSeat = `
      UPDATE
        book_seats
      SET
       seat_available = "no"
      WHERE
        seat_id = ${seatId};`;
    await db.run(updateSeat);
    response.send("Booked Successfully");
  });
});