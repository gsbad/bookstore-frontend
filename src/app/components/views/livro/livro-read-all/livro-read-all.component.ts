import { Component } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrl: './livro-read-all.component.css'
})
export class LivroReadAllComponent {

  displayedColumns: string[] = ['id', 'nome', 'livros', 'acoes']
  
  id_cat: String = ''

  livros: Livro[] = []



  constructor(private service: LivroService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.findAll();
  }


  findAll(): void{
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.livros = resposta;
      console.log(this.livros)
    })
  }

}