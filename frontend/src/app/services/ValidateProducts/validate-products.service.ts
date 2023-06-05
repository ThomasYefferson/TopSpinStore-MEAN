import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateProductsService {

  constructor() {
    this.Form
  }

  Form = {
    Codigo: {
      // Numbers:
      Numbers: /\d/,
    },
    Name: {
      // Special Characters:
      SpecialCharacters: /[!-/:-@\[-`\{-~¿¡°]/,
      // Numbers:
      Numbers: /\d/,
      // Multi-Space characters:
      MultiSpace: /[\s]{2,}/,
    },
    Quantity: {
      // Numbers:
      Numbers: /\d/,
    },
    Price: {
      // Numbers:
      Numbers: /\d/,
    },
    Caregory: {
    },
    Color: {
    },
    FechaV: {
    },
    Description: {
    }
  }

  /*****************************************************************************************/
  /*****************************      CODIGO VALIDATE          *****************************/
  /*****************************************************************************************
   * ValidateCC: Validate the Codigo field
   * @param Codigo : string | number
   * @returns [{ state: boolean, message: string }]
   * state: false (error) || true (success)
   * message: "<error description>" (state:false) || "" (state:true)
   */
  ValidateCodigo(Codigo: string | number): { state: boolean, message: string } {
    var msn: string = ""

    if (typeof (Codigo) == "number") {
      Codigo = Codigo.toString();
    }

    if (Codigo.trim() == "" || Codigo.trim() == null || Codigo.trim() == undefined) {
      msn += 'The Codigo number is required.'
    }
    else {
      if (!this.Form.Codigo.Numbers.test(Codigo.trim()) == true) {
        msn += "Remove non-Numeric characters."
      }

      if (this.Form.Codigo.Numbers.test(Codigo.trim()) == true && (6 >= Codigo.trim().length || Codigo.trim().length >= 9)) {
        if (msn != "") { msn += "\n" }
        msn += "Write 8 to 20 numerical digits."
      }
    }
    if (msn == "") {
      return { state: true, message: msn }
    } else {
      return { state: false, message: msn }
    }
  }

  /*****************************************************************************************/
  /*********************************    NAME VALIDATE  *************************************/
  /*****************************************************************************************
   * ValidateName: Validate the Name or Lastname
   * @param Name String input variable
   * @param Type Type of field to validate: 'Name' (default) || 'Lastname'.
   * @returns [{ state: boolean, message: string }]
   * state: false (error) || true (success)
   * message: "<error description>" (state:false) || "" (state:true)
   */
  ValidateName(Name: string): { state: boolean, message: string } {
    var msn: string = ""

    // This field is required.
    if (Name.trim() == "" || Name.trim() == null || Name.trim() == undefined) {
      msn += `The Name is required.`
    }
    else {
      // The field contain many spaces between names.
      if (this.Form.Name.MultiSpace.test(Name.trim()) == true) {
        msn += `Delete multi-spaces between Namess.`
      }

      // The field must not contain numbers.
      if (this.Form.Name.Numbers.test(Name.trim()) == true) {
        if (msn != "") { msn += "\n" }
        msn += `The Names mustn't contain numbers.`
      }

      // The field must not contain name(s) of more than 15 characters.
      if (Math.max(...Name.trim().split(' ').map(p => p.length)) > 15) {
        if (msn != "") { msn += "\n" }
        msn += `Delete words longer than 15 characters.`
      }

      // The field must not contain name(s) of less than 3 characters.
      if (Math.min(...Name.trim().split(' ').map(p => p.length)) < 3) {
        if (msn != "") { msn += "\n" }
        msn += `Remove words of less than 3 characters`
      }

      // The name must not contain special characters..
      if (this.Form.Name.SpecialCharacters.test(Name.trim()) == true) {
        if (msn != "") { msn += "\n" }
        msn += `Remove special characters from the Names.`
      }
    }

    if (msn == "") {
      return { state: true, message: msn }
    } else {
      return { state: false, message: msn }
    }
  }

  /*****************************************************************************************/
  /*****************************       QUANTITY VALIDATE       *****************************/
  /*****************************************************************************************
   * ValidateCC: Validate the ID field
   * @param Quantity : string | number
   * @returns [{ state: boolean, message: string }]
   * state: false (error) || true (success)
   * message: "<error description>" (state:false) || "" (state:true)
   */
  ValidateQuantity(Quantity: string | number): { state: boolean, message: string } {
    var msn: string = ""

    if (typeof (Quantity) == "number") {
      Quantity = Quantity.toString();
    }

    if (Quantity.trim() != "" || Quantity.trim() != null || Quantity.trim() != undefined) {
      msn += 'The Quantity number is required.'
    }
    else {
      if (!this.Form.CC.Numbers.test(Quantity.trim()) == true) {
        msn += "Remove non-Numeric characters."
      }

      if (this.Form.CC.Numbers.test(Quantity.trim()) == true && (8 > Quantity.trim().length || Quantity.trim().length > 12)) {
        if (msn != "") { msn += "\n" }
        msn += "Write 8 to 20 numerical digits."
      }
    }
    if (msn == "") {
      return { state: true, message: msn }
    } else {
      return { state: false, message: msn }
    }
  }

    /*****************************************************************************************/
  /*****************************       Price VALIDATE       *****************************/
  /*****************************************************************************************
   * ValidateCC: Validate the ID field
   * @param Price : string | number
   * @returns [{ state: boolean, message: string }]
   * state: false (error) || true (success)
   * message: "<error description>" (state:false) || "" (state:true)
   */
  ValidatePrice(Price: string | number): { state: boolean, message: string } {
    var msn: string = ""

    if (typeof (Price) == "number") {
      Price = Price.toString();
    }

    if (Price.trim() != "" || Price.trim() != null || Price.trim() != undefined) {
      msn += 'The Price is required.'
    }
    else {
      if (!this.Form.Price.Numbers.test(Price.trim()) == true) {
        msn += "Remove non-Numeric characters."
      }

      if (this.Form.Price.Numbers.test(Price.trim()) == true && (8 > Price.trim().length || Price.trim().length > 12)) {
        if (msn != "") { msn += "\n" }
        msn += "Write 8 to 20 numerical digits."
      }
    }
    if (msn == "") {
      return { state: true, message: msn }
    } else {
      return { state: false, message: msn }
    }
  }



  /*****************************************************************************************/
  /*****************************      DUE DATE VALIDATE        *****************************/
  /*****************************************************************************************
   * ValidateDate: Validate date field
   * @param FechaV string
   * @returns { state: boolean, message: string }
   * state: false (error) || true (success)
   * message: "<error description>" (state:false) || "" (state:true)
   */
  // ValidateDate(FechaV: string): { state: boolean, message: string } {
  //   var msn: string = ""

  //   var Today = new Date();//Fecha actual del sistema

  //   var YearToday = Today.getFullYear();
  //   var MonthToday = Today.getMonth();
  //   var DayToday = Today.getDate();

  //   var DifferenceDays:number = Math.floor((x - y) / (1000 * 60 * 60 * 24));


  //   var first = '01/15/2019';
  //   var second = 'January 15, 2020';

  //   var x:any = new Date(FechaV);
  //   var y:any = new Date();

  //   seconds = milliseconds/1000
  //   minutes = seconds/60
  //   hours = minutes/60
  //   Days = hours/24

  //   const DiffDays = Math.floor((x - y) / (1000 * 60 * 60 * 24));



  //   if (YearFechaV < YearToday) {
  //     alert("The product to introduce has already expired");
  //   }
  //   else {
  //     if (YearFechaV == YearToday && MonthFechaV < MonthToday) {
  //       alert("The product to introduce has already expired");
  //     }
  //     else {
  //       if (YearFechaV == YearToday && MonthFechaV == MonthToday && DayFechaV < DayToday) {
  //         alert("The product to introduce has already expired");
  //       }
  //       else {
  //         if (YearFechaV == YearToday && MonthFechaV == MonthToday && DayFechaV == DayToday) {
  //           alert("Product expires today");
  //         }
  //         else {
  //           alert("La fecha introducida es posterior a Hoy");
  //         }
  //       }
  //     }
  //   }
  // }
}
