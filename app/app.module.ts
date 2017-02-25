import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { Home }  from './home/home';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ Home ],
  bootstrap: [ Home ],
  providers: [
    { provide: 'Window',  useValue: window }
  ],
})
export class AppModule {


  public constructor()
  {
  }


}
