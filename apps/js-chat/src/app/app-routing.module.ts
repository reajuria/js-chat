import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';

const routes: Routes = [{ path: '', component: ConversationPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
