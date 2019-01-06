import { Injectable } from '@angular/core';
import { FormGroup, FormControl,Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase:AngularFireDatabase) { }

  employeeList: AngularFireList<any>;

  //definionwanie property

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),

      fullName:new FormControl('', Validators.required),
      description: new FormControl('',Validators.required),
      developer: new FormControl('',Validators.required),
      dateOfDep: new FormControl(''),
      substiute: new FormControl(''),
      user:  new FormControl(''),
      userContact: new FormControl(''),
      password: new FormControl(''),
      tools: new FormControl(''),
      isInUse: new FormControl(''), 
      isReplace: new FormControl(''),
      whichElementReplaced: new FormControl(),
      pathDependency: new FormControl(''),
      manual: new FormControl(''),
      companyName: new FormControl(''),

  });

  initializeFormGroup()
  {
    this.form.setValue({ 
      $key: null,
     
      fullName:'',
      description: '',
      developer: '',
      dateOfDep: '',
      substiute: '',
      user: '',
      userContact: '',
      password: '',
      tools: '',
      isInUse: '', 
      isReplace: '',
      whichElementReplaced: '',
      pathDependency: '',
      manual: '',
      companyName: '',


    });
    
  };


  getEmployees()
  {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employee)
  {
      this.employeeList.push(
        { 
            fullName:  employee.fullName,
           
        
        });
  }

  updateEmployee(employee)
  {
    this.employeeList.update(employee.$key,
      {
        fullName:  employee.fullName,
        description:  employee.description,
        developer:  employee.developer,
        dateOfDep:  employee.dateOfDep,
        substiute:  employee.substiute,
        user:  employee.user,
        userContact:  employee.userContact,
        password:  employee.password,
        tools:  employee.tools,
        isInUse:  employee.isinUse, 
        isReplace:  employee.isReplace,
        whichElementReplaced:  employee.whichElementReplaced,
        pathDependency:  employee.pathDependency,
        manual:  employee.manual,
        companyName:  employee.companyName,
      }
      );
  }

  deleteEmployee($key: string)
  {
    this.employeeList.remove($key);
  }

  populateForm(employee)
  {
    this.form.setValue(_.omit(employee,'passwords'));
  }

}
