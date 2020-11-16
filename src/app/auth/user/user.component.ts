import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from './../../shared/service/data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  @ViewChild('profilePicClick', {static: true}) profilePicClick: ElementRef<HTMLElement>;

  fileData:any ;
  userHobbiesList: any;
  userDetails: any;
  userAgeDetails: any;
  checkBoxData : any;
  profileCreated: any;
  isEditPhotoClicked: boolean = false;

  constructor(private _dataService: DataService,
              private _router:Router) { }

  ngOnInit() {
    this._dataService.myProfileCurrentData.subscribe( res => {
      if(res) {
        this.profileCreated = true;
        this.fileData = res.fileData;
        this.userHobbiesList = res.interestArray;
        this.userDetails = res.profileCreateFormGroup;
        this.checkBoxData = res.checkBoxData;
      }

      else {
        alert('Please complete the user profile and come back!You will be navigated to Profile creation page!');
        this._router.navigateByUrl('/auth/profile-create')
      }

    })
  }

  editPhotoClick(){
    this.isEditPhotoClicked = true;
    let htmlelement:HTMLElement = this.profilePicClick.nativeElement;
    htmlelement.click();
  }
  
  fileUpload(fileInput: any){
    this.fileData = fileInput.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
        this.fileData = event.target.result;
    }
    reader.readAsDataURL(fileInput.target.files[0]);
  }
   
  updateProfile(){
    const edituserProfile = {
      'fileData' : this.fileData,
      'interestArray': this.userHobbiesList,
      'userDetails' : this.userDetails,
      'checkBoxData': this.checkBoxData
    }
    this._dataService.changeDataService(edituserProfile);

  }
  userAgreed() {
    alert("Profile created.....")
  }
}
