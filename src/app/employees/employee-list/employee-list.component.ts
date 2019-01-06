import { NotificationService } from './../../shared/notification.service';
import { EmployeeComponent } from './../employee/employee.component';
import { DepartmentService } from './../../shared/department.service';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatSort, MatPaginator } from '@angular/material'
import { MatDialog, MatDialogConfig } from "@angular/material"

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService ,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName','email','mobile','city','departmentName','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    
    // this.service.getEmployees().subscribe(
    //   list => {
    //       let array = list.map(item => {
    //         let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
    //       return  {
    //         $key: item.key,
    //         departmentName,
    //         ...item.payload.val()
    //       };
         
    //   });
    //   this.listData = new MatTableDataSource(array);
    //   this.listData.sort = this.sort;
    //   this.listData.paginator = this.paginator;
    // });


    this.service.getEmployees().subscribe(
      list => {
          let array = list.map(item => {
          return  {
            $key: item.key,           
            ...item.payload.val()
          };
         
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });



  }

  onSearchClear()
  {
    this.searchKey =  "";
    this.applyFilter();
  }

  applyFilter()
  {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate()
  {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width ="60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }


  onEdit(row)
  {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width ="60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onDelete($key)
  {
    if(confirm('Czy chcesz usunąć ten rekord?'))
      {
        this.service.deleteEmployee($key);
        this.notificationService.warn('! Usunięto rekord')
      };
  }
}
