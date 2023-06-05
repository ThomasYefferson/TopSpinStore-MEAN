import { Component } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  Maps: boolean;

  SocialRed = [
    { Name: "whatsapp", Link: "https://wa.me/573168704626/?text=Hello,%20I%20need%20more%20information%20about%20your%20products." },
    { Name: "facebook", Link: "" },
    { Name: "twitter", Link: "" },
    { Name: "google", Link: "" },
    { Name: "instagram", Link: "" },
    { Name: "linkedin", Link: "" },
    { Name: "github", Link: "" },
  ]

  FootMenu = [
    { Name: 'Blades', Router: '/blades' },
    { Name: 'Rubbers', Router: '/rubbers' },
    { Name: 'Balls', Router: '/balls' },
    { Name: 'Tables & Nets', Router: '/tables' },
  ]

  constructor() {
    this.Maps = false;
  }

  MapsView(View: boolean) {
    $(document).ready(function () {
      $('#').click(function () {
          var a = $(this);
          $(this).addClass('.active');
      });
  });
    this.Maps = View;
  }

}
