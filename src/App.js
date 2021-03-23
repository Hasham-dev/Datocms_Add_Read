import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
const { SiteClient } = require("datocms-client");
const client = new SiteClient("8205432be590c07a7225d669b4391e");

const GET_AUTHORS = gql`
  query MyQuery {
    allAuthors {
      authorName
      id
    }
  }
`;

const GET_BOOKS = gql`
  query MyQuery {
    allBooks {
      bookName
      available
      authorName {
        authorName
        id
      }
    }
  }
`;
function App() {
  const [authorName, setAuthorName] = useState("");
  const [bookName, setBookName] = useState("");
  const { error, data, loading } = useQuery(GET_AUTHORS);
  const { data: dataB } = useQuery(GET_BOOKS);

  async function addAuthor() {
    const records = await client.items.create({
      itemType: "616386",
      author_name: authorName,
    });
    console.log(records);
  }

  async function addBook() {
    const records = await client.items.create({
      itemType: "616387",
      book_name: bookName,
      available: true,
      author_name: "25548854",
    });
    console.log(records);
  }

  console.log({ data });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="App">
      <div>
        <h1>Add Author</h1>
        <input type="text" onChange={(e) => setAuthorName(e.target.value)} />
        <button onClick={addAuthor}>Add Author</button>
      </div>

      <div>
        <h1>Add Books</h1>
        <input type="text" onChange={(e) => setBookName(e.target.value)} />
        <button onClick={addBook}>Add BookName</button>
      </div>

      <h1>All Authors</h1>
      <ul>
        {data?.allAuthors?.map(({ authorName, id }) => (
          <li key={id}>{authorName}</li>
        ))}
      </ul>

      <h1>All Books</h1>
      <ul>
        {dataB?.allBooks?.map(({ bookName, available, authorName : { authorName }, id }) => (
          <li key={id}>{bookName} | <b>author name:</b> {authorName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
