import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateCategoryService {

  constructor() { }

  Form = {
    Name: {
      // Special Characters:
      SpecialCharacters: /[!-/:-@\[-`\{-~¿¡°]/,
      // Numbers:
      Numbers: /\d/,
      // Multi-Space characters:
      MultiSpace: /[\s]{2,}/,
      // Plural English end Y:
      PluralY: /([b-df-hj-np-tv-z])(?=y)/i,
      // Plural English end “-ss”, “-x”, “-ch”, “-sh:
      PluralSCHX:/(sh|ch|x|ss)$/i,
    },
  }
}
