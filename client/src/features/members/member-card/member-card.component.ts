import { Component, input } from '@angular/core';
import { Member } from '../../../types/Member';
import { RouterLink } from "@angular/router";
import { AgePipe } from '../../../core/pipes/age.pipe';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink,AgePipe],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  member = input.required<Member>();
}
