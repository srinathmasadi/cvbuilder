import { Router } from '@angular/router';
import {ResumeService} from '../../resume.service'
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormArray } from '@angular/forms';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css'],
})
export class ResumeBuilderComponent implements OnInit {
  resumeForm = new FormGroup({
    fullname: new FormControl(''),
    position: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl(''),
    skills: new FormControl(''),
    profile: new FormControl(''),
    linkedin: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    languages: new FormControl(''),
    objective: new FormControl(''),
    experience: new FormArray([new FormControl('')]),
    project: new FormArray([new FormControl('')]),
    certification: new FormArray([new FormControl('')]),
    education: new FormArray([new FormControl('')]),
  });

  constructor(private _resumeService: ResumeService, private _router: Router) {}

  ngOnInit(): void {
    this._resumeService.getResumeData().subscribe(
      (res) => {
        const exp = JSON.parse(JSON.stringify(res)).experience;
        console.log(exp.length);
        for (let i = 0; i < exp.length - 1; i++) {
          this.onAddExperience();
        }

        const pro = JSON.parse(JSON.stringify(res)).project;
        for (let i = 0; i < pro.length - 1; i++) {
          this.onAddProject();
        }

        const cer = JSON.parse(JSON.stringify(res)).certification;
        for (let i = 0; i < cer.length - 1; i++) {
          this.onAddCertifiction();
        }

        const edu = JSON.parse(JSON.stringify(res)).education;
        for (let i = 0; i < edu.length - 1; i++) {
          this.onAddEducation();
        }

        this.resumeForm.patchValue({
          fullname: JSON.parse(JSON.stringify(res)).fullname,
          position: JSON.parse(JSON.stringify(res)).position,
          email: JSON.parse(JSON.stringify(res)).email,
          mobile: JSON.parse(JSON.stringify(res)).mobile,
          address: JSON.parse(JSON.stringify(res)).address,
          skills: JSON.parse(JSON.stringify(res)).skills,
          profile: JSON.parse(JSON.stringify(res)).profile,
          linkedin: JSON.parse(JSON.stringify(res)).linkedin,
          facebook: JSON.parse(JSON.stringify(res)).facebook,
          instagram: JSON.parse(JSON.stringify(res)).instagram,
          languages: JSON.parse(JSON.stringify(res)).languages,
          objective: JSON.parse(JSON.stringify(res)).objective,
          experience: JSON.parse(JSON.stringify(res)).experience,
          project: JSON.parse(JSON.stringify(res)).project,
          certification: JSON.parse(JSON.stringify(res)).certification,
          education: JSON.parse(JSON.stringify(res)).education,
        });
      },
      (err) => console.error(err)
    );
  }

  get experienceControls() {
    return (<FormArray>this.resumeForm.get('experience')).controls;
  }

  get projectControls() {
    return (<FormArray>this.resumeForm.get('project')).controls;
  }

  get certificationControls() {
    return (<FormArray>this.resumeForm.get('certification')).controls;
  }

  get educationControls() {
    return (<FormArray>this.resumeForm.get('education')).controls;
  }

  onAddExperience() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('experience')).push(control);
  }

  onAddProject() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('project')).push(control);
  }

  onAddCertifiction() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('certification')).push(control);
  }

  onAddEducation() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('education')).push(control);
  }

  onRemoveExperience() {
    (<FormArray>this.resumeForm.get('experience')).removeAt(
      this.experienceControls.length - 1
    );
  }

  onRemoveProject() {
    (<FormArray>this.resumeForm.get('project')).removeAt(
      this.projectControls.length - 1
    );
  }

  onRemoveCertification() {
    (<FormArray>this.resumeForm.get('certification')).removeAt(
      this.certificationControls.length - 1
    );
  }

  onRemoveEducation() {
    (<FormArray>this.resumeForm.get('education')).removeAt(
      this.educationControls.length - 1
    );
  }

  generateResume() {
    // console.log(this.resumeForm.value);
    this._resumeService.setResumeData(this.resumeForm.value).subscribe(
      (res) => {
        console.log(res);
        this._router.navigate(['/template']);
      },
      (err) => console.error(err)
    );
  }
}
