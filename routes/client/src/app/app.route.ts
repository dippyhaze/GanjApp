
// ng ROUTES && COMPONENTS //
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
import { WelcomeComponent } from './home/welcome/welcome.component';


export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'welcome', component: WelcomeComponent }
    
]