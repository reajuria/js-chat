import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { RepositoryNgApiClientModule } from '@js-chat/ng-api-client';
import {
  COMMAND_REPOSITORY,
  CONVERSATION_REPOSITORY,
  MESSAGE_REPOSITORY,
  ROOM_REPOSITORY,
  USER_REPOSITORY,
} from '@js-chat/repository';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ConfigurationService } from './services/configuration.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RepositoryNgApiClientModule,
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    ConversationPageComponent,
    RegisterPageComponent,
  ],
  providers: [
    {
      provide: COMMAND_REPOSITORY,
      useFactory: (configuration: ConfigurationService) => {
        return configuration.clients.command;
      },
      deps: [ConfigurationService],
    },
    {
      provide: CONVERSATION_REPOSITORY,
      useFactory: (configuration: ConfigurationService) => {
        return configuration.clients.conversation;
      },
      deps: [ConfigurationService],
    },
    {
      provide: MESSAGE_REPOSITORY,
      useFactory: (configuration: ConfigurationService) => {
        return configuration.clients.message;
      },
      deps: [ConfigurationService],
    },
    {
      provide: ROOM_REPOSITORY,
      useFactory: (configuration: ConfigurationService) => {
        return configuration.clients.room;
      },
      deps: [ConfigurationService],
    },
    {
      provide: USER_REPOSITORY,
      useFactory: (configuration: ConfigurationService) => {
        return configuration.clients.user;
      },
      deps: [ConfigurationService],
    },
  ],
})
export class AppModule {}
