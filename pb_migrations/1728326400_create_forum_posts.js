migrate(
  (db) => {
    const collection = new Collection({
      id: "8n8jv99jpvxqvba",
      created: "2025-10-07 00:00:00.000Z",
      updated: "2025-10-07 00:00:00.000Z",
      name: "forum_posts",
      type: "base",
      system: false,
      schema: [
        {
          id: "placeid",
          name: "placeId",
          type: "text",
          system: false,
          required: true,
          presentable: true,
          unique: false,
          options: {
            min: 2,
            max: 120,
            pattern: "",
          },
        },
        {
          id: "author",
          name: "authorName",
          type: "text",
          system: false,
          required: false,
          presentable: true,
          unique: false,
          options: {
            min: 0,
            max: 120,
            pattern: "",
          },
        },
        {
          id: "content",
          name: "content",
          type: "text",
          system: false,
          required: true,
          presentable: true,
          unique: false,
          options: {
            min: 5,
            max: 2000,
            pattern: "",
          },
        },
      ],
      indexes: [
        "CREATE INDEX `idx_forum_posts_place` ON `forum_posts` (`placeId`)",
        "CREATE INDEX `idx_forum_posts_created` ON `forum_posts` (`created`)",
      ],
      listRule: "",
      viewRule: "",
      createRule: "",
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("8n8jv99jpvxqvba");

    return dao.deleteCollection(collection);
  }
);
