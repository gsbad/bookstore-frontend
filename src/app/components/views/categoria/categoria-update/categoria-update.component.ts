import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrl: './categoria-update.component.css'
})
export class CategoriaUpdateComponent implements OnInit{

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void{
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria = resposta
      //console.log(this.categoria)
    }
  )}
  update():void{
    this.service.update(this.categoria).subscribe((resposta) => {
      this.service.mensagem("Categoria modificada com sucesso!")
      this.router.navigate(['categorias'])
    }, err => {
      for(let i = 0; i < err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].fieldMessage)
      }
    })
  }

  cancelar():void{
    this.router.navigate(['categorias']);
  }

}