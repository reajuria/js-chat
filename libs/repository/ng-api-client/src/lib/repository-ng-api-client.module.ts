import { NgModule } from '@angular/core';
import { CommandClientModule } from './command';
import { ConversationClientModule } from './conversation';
import { MessageClientModule } from './message';
import { RoomClientModule } from './room';
import { UserClientModule } from './user';

@NgModule({
  imports: [
    CommandClientModule,
    ConversationClientModule,
    MessageClientModule,
    RoomClientModule,
    UserClientModule,
  ],
})
export class RepositoryNgApiClientModule {}
