// Task 2: CRUD Operations
// Find all books in a specific genre (Fiction)
Db.books.find({ genre: "Fiction" });

// Find books published after a certain year (1925)
db.books.find({ published_year : {$gt : 1925} });

// Find books by a specific author 
db.books.find({ author : "Paulo Coelho" });

// Update the price of a specific book
db.books.updateOne(
    { title : "The Hobbit" },
    { $set : {price : 15.08 } }
    );

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" }); 



// TTask 3: Advanced Queries
// Write a query to find books that are both in stock and published after 2010
db.books.find(
    { in_stock : true,
    published_year : { $gt :2010 } }
    );

// Use projection to return only the title, author, and price fields in your queries
db.books.find(
  {},
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
);

// Sorting to display books by price (Ascending)
db.books.find().sort({ price: 1 });

// Sorting to display books by price (Descending)
db.books.find().sort({ price: -1 });

//Using the limit and skip methods to implement pagination (5 books per page)
db.books.find().skip((pageNumber - 1) * 5).limit(5);
// Example: pageNumber = 2
db.books.find().skip(5).limit(5);



// Task 4: Aggregation Pipeline
// Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre", averagePrice: { $avg: "$price" }  
    }
  }
]);

// Author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  },
  {
    $limit: 1
  }
]);

// Grouping books by publication decade and counting them
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $substr: [{ $toString: "$published_year" }, 0, 3] },
          "0s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);



// Task 5: Indexing
// Creating an index on the title field for faster searches
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Use the explain() method to demonstrate the performance improvement with your indexes
db.books.find({ author: "Harper Lee", published_year: 1960 }).explain("executionStats");