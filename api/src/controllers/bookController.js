// import mongoose from "mongoose";
import Book from "../models/bookModel.js";
// const MONGO_URI = process.env.MONGODB_URI;

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// const bookDescriptions = {
//   "67d02fc19fffc6770468e178":
//     "Step into the opulent world of Jay Gatsby, where lavish parties mask lost love and disillusionment in the American Dream. 'The Great Gatsby' is a haunting portrait of wealth, ambition, and heartache in the Roaring Twenties.",
//   "67d02fc19fffc6770468e179":
//     "A prophetic masterpiece, '1984' explores a totalitarian future where surveillance is constant, truth is manipulated, and individuality is crushed. Orwell’s chilling vision remains more relevant than ever.",
//   "67d02fc19fffc6770468e17a":
//     "Harper Lee’s Pulitzer-winning novel is a powerful exploration of morality, justice, and innocence in a racially divided American South, seen through the eyes of young Scout Finch.",
//   "67d02fc19fffc6770468e17b":
//     "Dive into the vast, unforgiving sea with Captain Ahab as he pursues the legendary white whale. 'Moby-Dick' is a philosophical and thrilling epic of obsession, fate, and the human condition.",
//   "67d02fc19fffc6770468e17c":
//     "In this timeless romance, Jane Austen weaves a witty, sharp, and heartfelt tale of pride, prejudice, and love between the spirited Elizabeth Bennet and the enigmatic Mr. Darcy.",
//   "67d02fc19fffc6770468e17d":
//     "A defining voice of post-war adolescence, 'The Catcher in the Rye' follows Holden Caulfield’s raw and rebellious journey through grief, alienation, and the search for authenticity.",
//   "67d02fc19fffc6770468e17e":
//     "A vision of the future that is disturbingly utopian, 'Brave New World' imagines a society where pleasure replaces purpose and conformity is engineered—challenging what it means to be human.",
//   "67d02fc19fffc6770468e17f":
//     "Join Bilbo Baggins on an unexpected adventure filled with dragons, treasure, and courage. 'The Hobbit' is a whimsical yet profound tale that set the foundation for modern fantasy.",
//   "67d02fc19fffc6770468e180":
//     "Bleak, poetic, and deeply moving, 'The Road' follows a father and son traversing a post-apocalyptic wasteland, bound by love and hope in a world stripped of both.",
//   "67d02fc19fffc6770468e181":
//     "In a society where books are burned and free thought is forbidden, 'Fahrenheit 451' is a fiery indictment of censorship and a celebration of knowledge, memory, and resistance.",
//   "67e1413457a080ec79ea2b26":
//     "In contrast to his dystopian works, Huxley's 'Island' envisions a serene utopia shaped by mindfulness, science, and compassion—an island society that dares to imagine a better world.",
//   "67e1413457a080ec79ea2b27":
//     "A mythic and majestic collection of tales that breathe life into the history of Middle-earth, 'The Silmarillion' is Tolkien’s grand vision of creation, corruption, and eternal struggle.",
//   "67e1413457a080ec79ea2b2b":
//     "Set aboard a British naval vessel, 'Billy Budd, Sailor' is a tragic meditation on justice, innocence, and the crushing weight of duty and fate within rigid systems.",
//   "67e1413457a080ec79ea2b24":
//     "With wit and warmth, 'Sense and Sensibility' explores love, loss, and the delicate balance between emotion and logic through the contrasting lives of Elinor and Marianne Dashwood.",
//   "67e1413457a080ec79ea2b28":
//     "Fitzgerald’s introspective debut captures the reckless romance, ambition, and disillusionment of post–World War I youth navigating a world of shifting ideals and uncertain futures.",
//   "67e1413457a080ec79ea2b2c":
//     "A lyrical journey across time and space, 'The Martian Chronicles' blends science fiction and social commentary to chronicle humanity’s colonization—and haunting of—Mars.",
//   "67e1413457a080ec79ea2b25":
//     "In this elegant, introspective work, Salinger delves into spiritual longing, intellectual despair, and family bonds through the voices of the brilliant yet fragile Glass siblings.",
//   "67e1413457a080ec79ea2b2a":
//     "Set decades after 'Mockingbird,' this controversial sequel reveals a very different Atticus Finch, forcing readers to confront the complexities of morality, change, and legacy.",
//   "67e1413457a080ec79ea2b29":
//     "Brutal and poetic, 'Blood Meridian' is a harrowing odyssey across the American West, laying bare the savagery of expansion and the philosophical void behind unrelenting violence.",
//   "67e1413457a080ec79ea2b2d":
//     "A deceptively simple fable that lays bare the mechanics of political manipulation and oppression, 'Animal Farm' is Orwell’s enduring critique of power and revolution gone wrong.",
// };

// const addDescriptions = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     let updatedCount = 0;

//     for (const [id, description] of Object.entries(bookDescriptions)) {
//       const result = await Book.findByIdAndUpdate(id, { description });
//       if (result) updatedCount++;
//     }

//     console.log(`✅ Updated ${updatedCount} books with new descriptions.`);
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Error updating descriptions:", error);
//     process.exit(1);
//   }
// };

// addDescriptions();
