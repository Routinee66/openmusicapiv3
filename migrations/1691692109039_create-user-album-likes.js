exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // Unique constraint
  pgm.addConstraint('user_album_likes', 'unique_user_id_and_album_id', 'UNIQUE(user_id, album_id)');

  // Foreign Key user_id
  pgm.addConstraint('user_album_likes', 'fk_user_album_likes_playlist', {
    foreignKeys: {
      columns: 'user_id',
      references: 'playlists(id)',
      onDelete: 'cascade',
    },
  });

  // Foreign Key album_id
  pgm.addConstraint('user_album_likes', 'fk_user_album_likes_songs', {
    foreignKeys: {
      columns: 'album_id',
      references: 'songs(id)',
      onDelete: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};
