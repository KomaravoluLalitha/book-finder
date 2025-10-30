import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query.trim())}`
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 10)); // show top 10 results
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-6">
    <h1 className="text-4xl font-bold mb-6 text-blue-600">📚 Book Finder</h1>

    {/* Search Form */}
    <form onSubmit={searchBooks} className="mb-8 flex gap-3">
      <input
        type="text"
        placeholder="Search by book title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-3 rounded-lg w-72 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>

    {/* Conditional Rendering for Loading or Book List */}
    {loading ? (
      <p className="text-lg text-gray-600">Loading...</p>
    ) : books.length > 0 ? (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* 🔽🔽🔽 UPDATE THIS WHOLE SECTION WITH YOUR NEW MAP CODE 🔽🔽🔽 */}
        {books.map((book, index) => {
          const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : book.isbn && book.isbn.length > 0
            ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`
            : "https://via.placeholder.com/150x220?text=No+Cover";

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 flex flex-col items-center"
            >
              <img
                src={coverUrl}
                alt={book.title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150x220?text=No+Cover";
                }}
                className="w-40 h-56 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-center">
                {book.title || "No title"}
              </h2>
              <p className="text-gray-600 text-center">
                Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Year: {book.first_publish_year || "N/A"}
              </p>
            </div>
          );
        })}
      </div>
    ) : (
      <p className="text-gray-500 mt-4">No books found. Try another title!</p>
    )}
  </div>
);

};

export default App;
