import { Injectable } from '@nestjs/common';
import { Message } from './message';
import { MessageDto } from './Message.dto';

@Injectable()
export class MessagesService {
	private messages: Message[] = [
		{
			id: 1,
			text: 'Primeira mensagem'
		},
		{
			id: 2,
			text: 'Segunda mensagem'
		}
	];

	findAll () {
		return this.messages.filter(Boolean);
	}

	/**
	 * Na controller, o catch não funcionará se não for uma Promise,
	 * então, a função abaixo deverá ser async.
	 */
	async findById (id: number) {
		const message = this.messages.find((msg) => msg?.id === id);

		if (!message) {
			throw Error(`Message with ID '${id}' not found!`);
		}

		return message;
	}

	create (messageDto: MessageDto) {
		const id = this.messages.length + 1;
		const message: Message = {
			id,
			...messageDto,
		};

		this.messages.push(message);

		return message;
	}

	async update (id: number, messageDto: MessageDto) {
		const index = this.messages.findIndex((message) => message?.id === id);

		if (index < 0) {
			throw Error(`Message with ID '${id}' not found!`);
		}

		const message: Message = {
			id,
			...messageDto,
		};

		this.messages[index] = message;

		return message;
	}

	async delete (id: number) {
		const index = this.messages.findIndex((message) => message?.id === id);

		if (index < 0) {
			throw Error(`Message with ID '${id}' not found!`);
		}

		delete this.messages[index];

		return true;
	}
}
