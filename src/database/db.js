import Dexie from 'dexie';

const db = new Dexie('FilmesDB');

db.version(1).stores({
  filmes: '++id, nome, estilo, status',
});

db.version(2).stores({
  filmes: '++id, nome, *estilo, *status',
});

db.open().catch((err) => {
  console.error(err.stack || err);
});

export default db;