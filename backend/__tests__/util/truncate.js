import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: { cascade: true },
        force: true,
      });
    })
  );
}

// Ta pegando todos os models e destruindo
// truncate - forcar a exclusao de todos os registros da tabela
// force - forcar remocao caso algum relacionamento esteja bloqueando
