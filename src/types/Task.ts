import CronTab from './CronTab'
import Message from './Message'
import Chat from './Chat'

type Task = {
    pk: number,
    name: string,
    chat: Chat,
    message: Message,
    cronTab: CronTab,
    chat_id: number,
    message_id: number,
    crontab_id: number,
}

export default Task;