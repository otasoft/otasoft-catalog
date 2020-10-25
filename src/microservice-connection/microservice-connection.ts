import { Transport } from '@nestjs/microservices';

export const catalogMicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [
      `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_NODENAME}:${process.env.RABBITMQ_FIRST_HOST_PORT}/${process.env.RABBITMQ_DEFAULT_VHOST}`,
    ],
    queue: 'catalog_queue',
    queueOptions: {
      durable: false,
    },
  },
};
