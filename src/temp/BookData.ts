interface BookInterface {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

export const bookData: BookInterface[] = [
  {
    id: "1",
    title: "Deep Work",
    author: "Cal Newport",
    price: 928,
    image: "https://images-na.ssl-images-amazon.com/images/I/81p6L5Y3tTL.jpg",
  },
  {
    id: "2",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    price: 699,
    image: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    price: 850,
    image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
  },
  {
    id: "4",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: 499,
    image: "https://images-na.ssl-images-amazon.com/images/I/71k+0G5+z3L.jpg",
  },
  {
    id: "5",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: 550,
    image: "https://images-na.ssl-images-amazon.com/images/I/81uK6EvYl5L.jpg",
  },
  {
    id: "6",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    price: 699,
    image: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
  },
];
