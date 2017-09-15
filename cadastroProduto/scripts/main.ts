
// Url for testing:
// <project-folder>/cadastroProduto/?titulo=Las%20Vegas&preco=5000&imagePath=images/vegas.jpg&titulo=Bay%20Area,%20SF&preco=6000&imagePath=images/sf-bay.jpg&titulo=Lake%20City&preco=3500&imagePath=images/lake.jpg

class Viagem {

  constructor(private _titulo:string, private _preco:number, private _imagePath:string){}

  get titulo (){
    return this._titulo;
  }

  set titulo (titulo:string){
    this._titulo = titulo;
  }

  get preco (){
    return this._preco;
  }

  set preco (preco:number){
    this._preco = preco;
  }

  get imagePath (){
    return this._imagePath;
  }

  set imagePath (imagePath:string){
    this._imagePath = imagePath;
  }
}

class ListaViagens {

  private _viagens:Viagem[] = [];

  novoCard (viagem:Viagem){
    let cardRow = document.getElementById("cardRow");
    let template = 
    `
      <div class="col-md-4">
        <div class="card" style="width:18rem;">
          <img class="card-img-top" src="${viagem.imagePath}" alt="Card image cap">
          <div class="card-body">
            <h4 class="card-title">${viagem.titulo}</h4>
            <p class="card-text">Preço: <strong>R$ ${viagem.preco}</strong></p>
          </div>
        </div>
      </div>
    `
    cardRow.insertAdjacentHTML('afterbegin', template);

  }
  adicionar (form){
    let titulo:string = form.elements.titulo.value;
    let preco:number = parseFloat(form.elements.preco.value);
    let imagePath:string = form.elements.imagem.value;
    let viagem:Viagem = new Viagem(titulo,preco,imagePath);
    this._viagens.push(viagem);
    this.novoCard(viagem);
    form.reset();

    let url:string = "";
    if (window.location.search == ""){
      url +="?";
    }else{
      url +="&";
    }
    url +=`titulo=${titulo}&preco=${preco}&imagePath=${imagePath}`;
    window.location.href += url;
  }
  loadUrl(){
    let urlParams:URLSearchParams = new URLSearchParams(window.location.search);

    if (urlParams.toString() != ""){
      let titulos:string[] = urlParams.getAll("titulo");
      let precos:any[]  = urlParams.getAll("preco");
      let imagePath:string[] = urlParams.getAll("imagePath");

      for (let i in titulos){
        let viagem:Viagem = new Viagem(titulos[i],parseFloat(precos[i]),imagePath[i])
        this._viagens.push(viagem);
        this.novoCard(viagem);
      }

    }
  }

}

let listaViagens:ListaViagens = new ListaViagens();