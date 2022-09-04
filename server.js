'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { default: mongoose } = require('mongoose');

const app = express();
app.use(cors());
const mongoose = require ('mongoose');

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/books/', {useNewUrlParser: true, 
useUnifiedTopology: true});


const books = new mongoose.Schema({
  title: String,
  discreption: String,
  status: String
});

const Kitten = mongoose.model('Kitten', books);
async function seedData(){
  const firstBook = new Kitten({
    title: "THE GRAPES OF WRATH BY JOHN STEINBECK",
    discreption: "Like Faulkner, Steinbeck was a big believer in using quotations for his book titles. The one for 1939’s The Grapes of Wrath comes from a stanza in The Battle Hymn of the Republic, written in 1862 by the abolitionist and suffragist Julia Ward Howe.",
    status: "Available"
  })
  const secondtBook = new Kitten({
    title: "NO COUNTRY FOR OLD MEN BY CORMAC MCCARTHY",
    discreption: "This 2005 novel is another one borrowed from a W.B. Yeats poem, specifically Sailing to Byzantium, first published in 1928",
    status: "Available"
  })
  const thirdBook = new Kitten({
    title: "THIS SIDE OF PARADISE BY F. SCOTT FITZGERALD",
    discreption: "Fitzgerald employed a poem by World War I poet Rupert Brooke, Tiare Tahiti, to name his debut 1920 novel This Side of Paradise.",
    status: " Not Available"
  })

  await firstBook.save();
  await secondtBook.save();
  await thirdBook.save();

}

//http://localhost:3001/getBooks/
app.get('/getBooks', getBookHandler);

// http://localhost:3010/
app.get("/", (request,response) => {
  res.send("Hi from the home route");
})
app.get('/test', (request, response) => {

  response.send('test request received')

})

function getBookHandler(request, response){
  Kitten.find({}, (err, result) => {
    if(err){
      console.log(err)
    }
    else{
      console.log(result);
      response.send(result);
    }
  })
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
