import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VrTemplateComponent } from './vr-template/vr-template.component';

const routes: Routes = [{
  path: '', component: VrTemplateComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
