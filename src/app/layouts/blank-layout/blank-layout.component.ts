import { Component } from '@angular/core';
import { NavBlankComponent } from "../../component/nav-blank/nav-blank.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [NavBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

}
