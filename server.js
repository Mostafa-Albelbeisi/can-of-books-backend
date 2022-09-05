"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const { default: mongoose } = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const books = new mongoose.Schema({
  title: String,
  discreption: String,
  status: String,
});

const Kitten = mongoose.model("books", books);
async function seedData() {
  const firstBook = new Kitten({
    title: "THE GRAPES OF WRATH BY JOHN STEINBECK",
    discreption:
      "Like Faulkner, Steinbeck was a big believer in using quotations for his book titles. The one for 1939’s The Grapes of Wrath comes from a stanza in The Battle Hymn of the Republic, written in 1862 by the abolitionist and suffragist Julia Ward Howe.",
    status: "Available",
  });
  const secondtBook = new Kitten({
    title: "NO COUNTRY FOR OLD MEN BY CORMAC MCCARTHY",
    discreption:
      "This 2005 novel is another one borrowed from a W.B. Yeats poem, specifically Sailing to Byzantium, first published in 1928",
    status: "Available",
  });
  const thirdBook = new Kitten({
    title: "THIS SIDE OF PARADISE BY F. SCOTT FITZGERALD",
    discreption:
      "Fitzgerald employed a poem by World War I poet Rupert Brooke, Tiare Tahiti, to name his debut 1920 novel This Side of Paradise.",
    status: " Not Available",
  });

  await firstBook.save();
  await secondtBook.save();
  await thirdBook.save();
}
// seedData();

//http://localhost:3001/getBooks/
app.get('/getBooks', getBooksHandler);
app.post('/addBooks', addBooksHandler);
app.delete('deleteBooks/:id', deleteBooksHandler);

// http://localhost:3010/
app.get("/", (request, response) => {
  response.send("Hi from the home route");
});
app.get("/test", (request, response) => {
  response.send("test request received");
});

//here get books
function getBooksHandler(request, response) {
  Kitten.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      response.json(result);
    }
  });
}

//here add Books
async function addBooksHandler(request, response) {
  console.log(request.body);
  const { bookTitle, bookDiscreption, bookStatus } = request.body;
  await Kitten.create({
    title: bookTitle,
    discreption: bookDiscreption,
    status: bookStatus,
  });

  Kitten.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      response.json(result);
    }
  });
}

function deleteBooksHandler(request, response) {
  const booksID = request.params.id;
  Kitten.deleteOne({ _id: booksID }, (err, result) => {
    Kitten.find({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        response.send(result);
      }
    });
  });
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));

//http:localhost:3001

// async function addBookHandler(request, response) {
//   console.log(request.body);
//   const { cTitle, cDiscreption, cStatus } = request.body;
//   await Kitten.create({
//     title: cTitle,
//     discreption: cDiscreption,
//     status: cStatus,
//   });

//   Kitten.find({}, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       response.json(result);
//     }
//   });
// }

// function deleteCatHandler(request, response){
//   const bookId = request.params.id;
//   Kitten.deleteOne({_id: bookId}, (err, result) =>{

//     Kitten.find({}, (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         response.send(result);
//       }
//     });
//   })
// }
