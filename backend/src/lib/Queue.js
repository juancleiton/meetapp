import Bee from 'bee-queue';
import SubscriptionMail from '../app/jobs/SubscriptionMail';
import redisConfig from '../config/redis';

const jobs = [SubscriptionMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  // Esse jobs ta chamando o SubscriptionMail.
  // Esse key e handle estao no SubscriptionMail.js
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // queue = SubscriptionMail
  // Adicionar novos trabalhos dentro de cada fila.
  // Cada vez que um email for disparado colocar esse job dentro da fila pra ele ser processado,
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Vai ficar processando em tempo real
  // Pegando todos os jobs da aplicacao e armazenando eles na variaveis this.queues = {}.
  // Dentro do this.queus = {}. Armazena a fila que possui a conexao com o bando nao relacional o redis.
  // E armazena tambem o metodo o handle, processa o job, e manda email e vai fazer qualquer tarefa que precise ser em background.
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      // Escutar erros
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
