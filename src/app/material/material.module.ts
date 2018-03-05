import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule,MatSelectModule, MatOptionModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatDialogModule, MatCardModule, MatInputModule, MatIconModule, MatSidenavModule, MatNavList, MatMenuModule, MatListModule, MatTabsModule, MatFormFieldModule } from '@angular/material'
@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCardModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatListModule,
        MatTableModule,
        MatTabsModule, 
        MatFormFieldModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCardModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatListModule,
        MatTableModule,
        MatTabsModule,
        MatFormFieldModule
    ]
  })

  export class MaterialModule { }