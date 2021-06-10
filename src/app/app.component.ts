import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IFlash } from './flash.model'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild("flashForm", { static: true })
  flashForm!: NgForm;


  // Esta bindeado con el form
  flash = {
    question: '',
    answer: ''
  }


  title = 'ng-flashcards';

  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: true,
    id: getRandomNumber()
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
  },
  {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
  },
  {
    question: 'Question 4',
    answer: 'Answer 4',
    show: false,
    id: getRandomNumber(),
  },
  {
    question: 'Question 5',
    answer: 'Answer 5',
    show: false,
    id: getRandomNumber(),
  }
  ];

  trackByFlashId(index: IFlash["id"], flash: IFlash) {
    console.log("trackByFlashId");
    return flash.id;
  }
  editing = false;
  editingId: number = 0;

  handleDelete(id: number) {
    const flashId = this.flashs.map(function(e) {return e.id;}).indexOf(id);
     this.flashs.splice(flashId, 1)
    console.log("borrando", id);
  }

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    // TODO: We will add editing logic after adding the form
    console.log("editando aaa", id);
  }

  handleRememberedChange({ id, flag }: any) {
    let flash: any;
    flash = this.flashs.find(flash => flash.id === id);
    flash.remembered = flag;
    console.log("cambiando1");
  }
  cambiarCartita(id: number) {
    console.log("entro handleTogglecard")
    let flash: any;
    flash = this.flashs.find(flash => flash.id === id);
    flash.show = !flash.show;

    console.log("entras===?")
  }


  handleSubmit(): void{
    console.log("entro a submit?")
    let x = getRandomNumber();
    let cartita = {
       question: this.flash.question,
        answer: this.flash.answer,
        show: false,
        id: getRandomNumber(),
    }
    this.flashs.push(cartita);
    this.handleClear();
  }


  handleClear(){
    this.flash = {
      question:'',
      answer:''
    };
    this.flashForm.reset();
  }

  handleUpdate(){
    const flash = this.flashs.find(flash =>
      flash.id === this.editingId);
      flash!.question = this.flash.question;
      flash!.answer = this.flash.answer;
      this.handleCancel();
  }

  handleCancel(){
    this.editing = false;
    this.editingId = -999;
    this.handleClear();
  }

}




function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}
