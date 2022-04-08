import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  closeResult = '';
  studentList:any;
  studentData!:FormGroup;
  editInfo!: any;
  couponForm: any;
  studentId: any;

  constructor(private modalService: NgbModal,private http:HttpClient,  private fb: FormBuilder,) { }

  ngOnInit(): void {
  this.getStudent()
  this.studentData= this.fb.group({
    firstName:[''],
    lastName:[''],
    hobbies:[''],
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
    debugger
    this.http.get(`${environment.apiProduct}/student/get`).subscribe((res:any)=>{
      this.studentList = res.data
      console.log(this.studentList)
    })
  }

  deleteStudent(id:string){
    debugger
    this.http.delete(`${environment.apiProduct}/student/delete?id=${id}`)
    .subscribe((res:any)=>{
     
        alert('data SuccessFully delete')
        this.getStudent()
        
        console.log(res);
    });
  }

  addStudent(){
    debugger
    if(this.studentId){
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
    this.http.post(`${environment.apiProduct}/student/update`,this.studentData.value)
    .subscribe((res:any)=>{
      alert('data Successfully update');
      this.getStudent();
      this.studentData.reset();
    })
  }

  // editStudent(dataStudent:any){
  //   this.editInfo = this.studentData
  //   this.studentData = dataStudent
  // }

  editStudent(data:any){
    debugger
  //  let firstName = this.studentData.get('firstName')?.value
  this.studentId = data.id;
  // this.studentData.value.get ('firstName').setValue(data.firstName);
  let firstName = this.studentData.value.get('firstName')?.value;
   this.studentData.value.setValue(firstName);
  }

}

