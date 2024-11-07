import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './other.page.html',
  styleUrl: './other.page.scss',
})
export default class OtherPage {
  title = 'other'
}
