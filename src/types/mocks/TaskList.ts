import { Task } from '..';

const taskList: Array<Task> = [
  {
    pk: 13,
    name: 'Task one',
    chat: {
      pk: 111,
      chat_id: 'c876235487126354923765419273654',
      name: 'chat with the first name',
      updated_at: '4 March, 2021',
    },
    cronTab: {
      pk: 11,
      name: 'chronTab One',
      minute: '1,2,3,4',
      hour: '4,5,6',
      day_of_week: '1,2,3',
      day_of_month: '3,4',
      month_of_year: '5,6',
    },
    message: {
      pk: 3,
      title: 'Message3',
      message_text: 'this message has the third key',
      updated_at: '16 May, 2021',
    },
    chat_id: 111,
    message_id: 3,
    crontab_id: 11,
  },
  {
    pk: 26,
    name: 'Task one',
    chat: {
      pk: 222,
      chat_id: 'asdfhgsdfyqe8573648756',
      name: 'chat with the second name',
      updated_at: '8 September, 2021',
    },
    cronTab: {
      pk: 22,
      name: 'chronTab Three',
      minute: '8,9,10',
      hour: '4,5,6',
      day_of_week: '1,2,3',
      day_of_month: '3,4',
      month_of_year: '5,6',
    },
    message: {
      pk: 2,
      title: 'Message2',
      message_text: 'this message has the one key',
      updated_at: '2 April, 2021',
    },
    chat_id: 222,
    message_id: 2,
    crontab_id: 22,
  },
  {
    pk: 6,
    name: 'Task one',
    chat: {
      pk: 333,
      chat_id: '8943756239casvrq3987501298573',
      name: 'chat with the third name',
      updated_at: '12 December, 2021',
    },
    cronTab: {
      pk: 33,
      name: 'chronTab Two',
      minute: '4,5,6,7',
      hour: '4,5,6',
      day_of_week: '1,2,3',
      day_of_month: '3,4',
      month_of_year: '5,6',
    },
    message: {
      pk: 1,
      title: 'Message3',
      message_text: 'this message has the third key',
      updated_at: '16 May, 2021',
    },
    chat_id: 333,
    message_id: 1,
    crontab_id: 33,
  },
]

export default taskList;