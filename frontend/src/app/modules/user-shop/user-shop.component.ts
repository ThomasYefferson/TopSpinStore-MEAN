import { Component, OnInit } from '@angular/core';
import { Market, Products, UserSession } from 'src/app/interfaces/store-interfaces';
import { MessagesService } from 'src/app/services/Messages/messages.service';
import { RequestMarketService } from 'src/app/services/RequestMarket/request-market.service';
import { RequestUsersService } from 'src/app/services/RequestUsers/request-users.service';

@Component({
  selector: 'app-user-shop',
  templateUrl: './user-shop.component.html',
  styleUrls: ['./user-shop.component.css']
})
export class UserShopComponent implements OnInit {

  Amount: string = ""
  ListMarket: any[] = []
  UserSession: [UserSession] = [{ User_id: "", Name: "" }]

  constructor(private RequestUser: RequestUsersService,
    private RequestMarket: RequestMarketService,
    private Message: MessagesService) { }

  ngOnInit() {
      this.RequestUser.ViewCookie().then((response: any) => {
        if (response.state == true) {
          this.RequestMarket.LoadMyMarket(response.clave.UserId).then((Market: any) => {
            console.log(Market.data)
            this.ListMarket = Market.data;
          })
        } else {
          this.UserSession = [{ User_id: '', Name: '', Rol: '' }]
        }
      })
  }

  LoadMyMartket() {
    this.RequestUser.ViewCookie().then((response: any) => {
      if (response.state == true) {
        this.RequestMarket.LoadMyMarket(response.clave.UserId).then((Market: any) => {
          console.log(Market.data)
          this.ListMarket = Market.data;
          console.log(this.ListMarket[0].Quantity)
        })
      } else {
        this.UserSession = [{ User_id: '', Name: '', Rol: '' }]
      }
    })
  }

  DeleteItem(Id: string) {
    this.VerCookies()
    this.RequestMarket.DeleteItem({
      User_id: this.UserSession[0].User_id,
      _id: Id,
    }).then((response: any) => {
      if (response.state == true) {
        this.Message.MessageOne('Deleted!', 'The product has been successfully removed.', 'center', 'success', 1000, false)
      }
    })
  }
  SubMyMartket(Id: string) {
    this.VerCookies()
    this.RequestMarket.SubMyMartket({
      User_id: this.UserSession[0].User_id,
      _id: Id,
    }).then((response: any) => { })
  }
  AddMyMartket(Product_id: string) {
    this.VerCookies()
    this.RequestMarket.AddMarket({
      User_id: this.UserSession[0].User_id,
      Product_id: Product_id,
    }).then((response: any) => { })
  }

  VerCookies() {
    this.RequestUser.ViewCookie().then((response: any) => {
      if (response.state == true) {
        this.UserSession = [{
          User_id: response.clave.User_id,
          Name: response.clave.Name,
          Rol: response.clave.Rol
        }]
      } else {
        this.UserSession = [{ User_id: '', Name: '', Rol: '' }]
      }
    })
  }

}
