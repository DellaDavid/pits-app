import { Router } from '@angular/router';
import { DataService } from './../../shared/service/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {


  profileCreateFormGroup: FormGroup;
  data: any;
  interestArray: any = [];
  fileData: File = null;
  previewUrl:any = null;
  isCheckboxCheckedorNot: any;
  isInterestIPFocused: boolean = false;
  
  constructor(
    private _formBuilder : FormBuilder,
    private _router: Router,
    private _dataService : DataService) { 
  }

  ngOnInit() {
    this.profileCreateFormGroup = this._formBuilder.group({
      'fname' : ['', Validators.pattern('^[a-zA-Z0-9]{1,20}$')],
      'lName' : ['', Validators.pattern('^[a-zA-Z0-9]{1,20}$')],
      'age' : ['', Validators.required],
      'email' : ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      'number' : ['', Validators.pattern("^[0-9]{1,10}$")],
      'state' : ['', Validators.required],
      'country' : ['', Validators.required],
      'address' : ['', Validators.required],
      'interest' : ['', Validators.required]
    })

    this._dataService.myProfileCurrentData.subscribe( res => {
      if(res){
        this.fileData = res.fileData;
        this.interestArray = res.interestArray;
        this.isCheckboxCheckedorNot = res.checkBoxData;
        this.profileCreateFormGroup.setValue({
          fname: res.userDetails.fname, 
          lName: res.userDetails.lName,
          age: res.userDetails.age,
          email: res.userDetails.email,
          number: res.userDetails.number,
          state: res.userDetails.state,
          country: res.userDetails.country,
          address: res.userDetails.address,
          interest: res.userDetails.interest,
        });
      }
    })
  }

  interestAdd(){
    this.interestArray.splice(0,0,this.profileCreateFormGroup.controls.interest.value);
    // this.profileCreateFormGroup.controls.interest.reset();
  }

  delete(index : any) {
    this.interestArray.splice(index, 1);
  }
  
  
  fileUpload(fileInput: any){
    this.fileData = fileInput.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
        this.fileData = event.target.result;
    }
    reader.readAsDataURL(fileInput.target.files[0]);
  }

  checkBoxEdit(event) {
    this.isCheckboxCheckedorNot = event.target.checked;
  }

  onIPFocus(flag) {
    this.isInterestIPFocused = flag;
  }

  submit(){
    if(this.isInterestIPFocused) return ;

    const dataArray = {
      'interestArray' : this.interestArray,
      'profileCreateFormGroup' : this.profileCreateFormGroup.value,
      'fileData': this.fileData ,
      'checkBoxData' : this.isCheckboxCheckedorNot
    }

    this._dataService.changeDataService(dataArray);
    this._router.navigateByUrl('/auth/user');
  }

}
