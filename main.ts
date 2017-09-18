
// Url for testing:
// <project-folder>/cadastroProduto/?titulo=Las%20Vegas&preco=5000&imagePath=images/vegas.jpg&titulo=Bay%20Area,%20SF&preco=6000&imagePath=images/sf-bay.jpg&titulo=Lake%20City&preco=3500&imagePath=images/lake.jpg
file:///U:/LTP4/Projetos/cadastroProduto/index.html?titulo=Las%20Vegas&preco=5000&imagePath=images/vegas.jpg&titulo=Bay%20Area,%20SF&preco=6000&imagePath=https://chrismartinphotography.files.wordpress.com/2012/02/the-ramparts-above-amethyst-lake-c2a9-2012-christopher-martin-2457.jpg&titulo=Lake%20City&preco=3500&imagePath=images/lake.jpg&titulo=San%20Fransisco,%20CA&preco=5600&imagePath=http://www.trailfinders.com/tailormadehotels.nsf/l19/3E9952CEA5CD2FA980256E47005FBF7F/$FILE/TF76177.jpg
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

  pesquisar (){

    let searchBar:HTMLInputElement = <HTMLInputElement> document.getElementById("searchBar");
    let search:string = searchBar.value;
    let result = [];
    for (let viagem of this._viagens){
      if (search.includes(viagem.titulo)){
        console.log("Achei!")
      }
    }
  }
}

let listaViagens:ListaViagens = new ListaViagens();
