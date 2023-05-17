import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {messageSchema, Message} from './schema/message.schema'
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: messageSchema,
      },
    ])
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService]
})
export class MessagesModule {}
