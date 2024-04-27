const algoliasearch = require("algoliasearch");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = client.initIndex("books");

module.exports = {
  async afterCreate(event) {
    if (event.result.publishedAt) {
      setTimeout(async () => {
        const book = await buildIndexObject(event.result.id);
        createIndexableBook(book);
      }, 5000);
    }
  },

  async afterUpdate(event) {
    if (event.result.publishedAt) {
      setTimeout(async () => {
        const book = await buildIndexObject(event.result.id);
        index
          .getObject(event.result.id)
          .then(({ results }) => {
            if (results) {
              updateIndexableBook(book);
            } else {
              createIndexableBook(book);
            }
          })
          .catch(() => {
            createIndexableBook(book);
          });
      }, 5000);
    } else deleteIndexableBook(event);
  },

  afterDelete(event) {
    deleteIndexableBook(event);
  },
};

function updateIndexableBook(book) {
  index
    .partialUpdateObject(book)
    .then((param) => {
      console.log("book updated in index", param);
    })
    .catch((err) => {
      console.error(err);
    });
}

function createIndexableBook(book) {
  index
    .saveObject(book)
    .then((param) => {
      console.log("book created in index", param);
    })
    .catch((err) => {
      console.error(err);
    });
}

function deleteIndexableBook(event) {
  index
    .deleteObject(event.result.id)
    .then((param) => {
      console.log("book deleted from index", param);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function buildIndexObject(bookId) {
  const book = await strapi.entityService.findOne("api::book.book", bookId, {
    populate: "*",
  });
  return {
    objectID: book.id,
    title: book.Title,
    slug: book.Slug,
    description: book.Description?.filter(
      (item) => item.type === "paragraph"
    ).reduce(
      (desc, item) =>
        desc + item.children.reduce((text, item) => `${text} ${item.text}`, ""),
      ""
    ),
    ageGroup: book.AgeGroup,
    type: book.Type,
    genre: book.Genre?.Title,
    coverUrl: book.Images[0].url,
    series: book.Series?.Name,
    scriptWriters: book.ScriptWriters?.map((item) => item.Name),
    artists: book.Artists?.map((item) => item.Name),
    publisher: book.Publisher?.Name,
  };
}
