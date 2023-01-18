import Status from '@/models/Status';

const getStatus = (statuses: Status[], text: string) => {
  return statuses.find(status => {
    return text.match(new RegExp(`Изменил\\(а\\) статус .* на «${status.title}»`));
  });
};

export { getStatus };
