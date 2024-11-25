import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  team = [
    {
      name: 'Aquiles Sobra',
      role: 'Lead Veterinarian',
      description:
        'Specialized in small animal care with over 10 years of experience.',
      image:
        'https://www.unimagdalena.edu.co/Content/Personas/Persona_acohen@unimagdalena.edu.co/imagen-20241001161254_018.jpg',
    },
    {
      name: 'Wil Zuleta',
      role: 'Pet Care Specialist',
      description:
        'Certified professional with expertise in animal behavior and training.',
      image: 'https://github.com/Orionwilx.png',
    },
    {
      name: 'Carola Olivares',
      role: 'Animal Caretaker',
      description:
        'Passionate about animal welfare with 5 years of shelter experience.',
      image: 'https://github.com/Caro-ov.png',
    },
  ];
}
