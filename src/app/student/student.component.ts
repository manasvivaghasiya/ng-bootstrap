import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  userForm! : FormGroup
userData : any = []
// userhobbies : any = []
userHobbies : any = []
  constructor(private fb : FormBuilder , private httpclient : HttpClient) {
    this.userForm = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      gender : [''],
      age : ['', Validators.required],
      city : [''],
      id : []
    });
   }

  ngOnInit(): void {
   this.getdetails()
  }
  // hobbies
  hobbiesChanged($event : any){
    const value = $event.target.value;
    if(this.userHobbies.find((a: any)=> a === value)){
     this.userHobbies = this.userHobbies.filter((a: any)=> a !== value)
    }
    else{
      this.userHobbies.push(value)
    }
  }
 
// save data
saveData(){
  if(this.userForm.value.id){
    this.updateData();
  }
  else{
    this.addData();
  }
  if(!this.userForm.valid){
    return
  }
}

// get details
getdetails(){
  this.httpclient.get(`${environment.apiProduct}/student/get`)
  .subscribe((res:any)=>{
    this.userData = res.data
  });
}

// editData
editData(payload:any){
  this.userForm.patchValue({
    firstName : payload.firstName,
    lastName : payload.lastName,
    gender : payload.gender,
    age : payload.age,
    city : payload.city,
    id : payload._id,
  });
  if(payload.hobbies){
    this.userHobbies = payload.hobbies.split(',')
  }
}

// add data
addData(){
  const payload = {
    "firstName" : this.userForm.value.firstName,
    "lastName" : this.userForm.value.lastName,
    "gender" : this.userForm.value.gender,
    "age" : this.userForm.value.age,
    "city" : this.userForm.value.city,
    "id" : this.userForm.value.id,
    "hobbies" : this.userHobbies.join(',')
  }
  this.httpclient.post(`${environment.apiProduct}/student/add`,payload)
  .subscribe((res:any)=>{
    if(res.isSuccess){
      this.getdetails()
      this.userForm.reset()
      this.userHobbies = []
    }
    else{
      alert(res.message)
    }
  });
}
//btnclick
btnclick(){
  
}
// update data
updateData(){
  const payload = {
    "firstName" : this.userForm.value.firstName,
    "lastName" : this.userForm.value.lastName,
    "gender" : this.userForm.value.gender,
    "age" : this.userForm.value.age,
    "city" : this.userForm.value.city,
    "id" : this.userForm.value.id,
    "hobbies" : this.userHobbies.join(',')
  }
  this.httpclient.post(`${environment.apiProduct}/student/update`,payload)
  .subscribe((res:any)=>{
    if(res.isSuccess){
      this.getdetails()
      this.userForm.reset()
      this.userHobbies = []
    }
    else{
      alert(res.message)
    }
  });
}


// deleteData
deleteData(id: any){
  this.httpclient.delete(`${environment.apiProduct}/student/delete?id=${id}`)
  .subscribe((res:any)=> {
    this.getdetails();
  });
}
}
