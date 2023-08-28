import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule
  ]
})
export class TransactionsModule { }
