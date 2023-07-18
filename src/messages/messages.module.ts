import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { messageSchema, payloadSchema, Message, VoltMessage } from './schema/message.schema';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: messageSchema,
      },
      {
        name: VoltMessage.name,
        schema: payloadSchema,
      },
    ])
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService]
})
export class MessagesModule {}
