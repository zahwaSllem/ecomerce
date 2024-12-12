import { Component } from '@angular/core';
import { NavAuthComponent } from "../../component/nav-auth/nav-auth.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavAuthComponent, RouterOutlet, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
