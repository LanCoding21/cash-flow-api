/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    email: {
      type: "VARCHAR(255)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "TEXT",
      notNull: true,
    },
    full_name: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
