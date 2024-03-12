import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrl: './categoria-read.component.css'
})
export class CategoriaReadComponent {

  categorias: Categoria[] = []

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes']

  constructor(private service: CategoriaService , private router: Router){}

  ngOnInit(): void {
    this.findAll()
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      //console.log(resposta)
      this.categorias = resposta
    })
  }

  navegarParaCategoriaCreate(){
    this.router.navigate(["categorias/create"])
  }


}

