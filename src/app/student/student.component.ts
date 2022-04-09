import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { debug } from 'console';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  showModal: any
  closeResult = '';
  studentList:any;
  studentData!:FormGroup;
  editInfo!: any;
  studentId: any;
  hobbies = ["sports", "playing", "music", "reading"];
  studentInfo: any;
  constructor(private modalService: NgbModal,private http:HttpClient,  private fb: FormBuilder,) { }

  ngOnInit(): void {
  this.getStudent()
  this.studentData= this.fb.group({
    firstName:[''],
    lastName:[''],
    // hobbies:[''],
    hobbies   : this.fb.array(["sports","playing"]),
    gender:[''],
    city:[''],
    age:[''],


  });

  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(){

  }
  getStudent(){
    this.http.get(`${environment.apiProduct}/student/get`).subscribe((res:any)=>{
      this.studentList = res.data
    })
  }

  deleteStudent(id:string){
    this.http.delete(`${environment.apiProduct}/student/delete?id=${id}`)
    .subscribe((res:any)=>{
     this.studentInfo = null
        alert('data SuccessFully delete')
        this.getStudent()
    });
  }

  addStudent(){
    debugger
    if(this.studentInfo){
      this.updateStudent()
    }
     this.http.post(`${environment.apiProduct}/student/add`,this.studentData.value)
     .subscribe((res:any)=>{
      alert('data successfully add');
     this.getStudent();
     this.studentData.reset();
     
    });
  
  }

  updateStudent(){
    debugger
      this.http.post(`${environment.apiProduct}/student/update`,{
        ...this.studentInfo,
        id:this.studentInfo.id,
        ...this.studentData.value,
      })
    .subscribe((res:any)=>{
      this.studentInfo=null
      alert('data Successfully update');
      this.getStudent();
      this.studentData.reset();
    });
  }

  // editStudent(dataStudent:any){
  //   this.editInfo = this.studentData
  //   this.studentData = dataStudent
  // }

  // editStudent(data:any){
  //   debugger
  //  let firstName = this.studentData.get('firstName')?.value
  // this.studentId = data.id;
  // this.studentData.value.get ('firstName').setValue(data.firstName);
  // let firstName = this.studentData.value.get('firstName')?.value;
  //  this.studentData.value.setValue(firstName);
  // }

  editStudent(dataStudent:any){
    // this.studentInfo = null;
    debugger
    this.studentInfo = dataStudent
    console.log(this.studentList);
    var result = this.studentList.filter((x: { _id: any; }) => x._id == this.studentInfo);
    console.log(result);
    let first_name = result[0].firstName;
    let last_name = result[0].lastName;
    let hobbies_name = result[0].hobbies;
    let gender_name = result[0].gender;
    let city_name = result[0].city;
    let age = result[0].age;
    // console.log(first_name);
    console.log(hobbies_name,age,gender_name);
    // let first_name = this.studentData.get('firstName')?.value;
    // let last_name = this.studentData.get('lastName')?.value;
    this.studentData.patchValue({
      firstName:first_name,
      lastName:last_name,
      hobbies:hobbies_name,
      gender:gender_name,
      city:city_name,
      age:age

      
      // lastName:dataStudent.lastName,
      // hobbies:dataStudent.hobbies,
      // gender:dataStudent.gender,
      // city:dataStudent.city,
      // age:dataStudent.age,

 })
  // this.studentData.value.get ('firstName').setValue(dataStudent.firstName);
  // this.studentData.value.setValue(dataStudent.firstName);

  }
}

// export interface dataStudent{
//   firstName:string;
//   lastName:string;
//   hobbies:string;
//   gender:string;
//   city:string;
//   age:string;
//   _id:string;
// }

