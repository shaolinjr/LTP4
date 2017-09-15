// Url for testing:
// <project-folder>/cadastroProduto/?titulo=Las%20Vegas&preco=5000&imagePath=images/vegas.jpg&titulo=Bay%20Area,%20SF&preco=6000&imagePath=images/sf-bay.jpg&titulo=Lake%20City&preco=3500&imagePath=images/lake.jpg
var Viagem = /** @class */ (function () {
    function Viagem(_titulo, _preco, _imagePath) {
        this._titulo = _titulo;
        this._preco = _preco;
        this._imagePath = _imagePath;
    }
    Object.defineProperty(Viagem.prototype, "titulo", {
        get: function () {
            return this._titulo;
        },
        set: function (titulo) {
            this._titulo = titulo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viagem.prototype, "preco", {
        get: function () {
            return this._preco;
        },
        set: function (preco) {
            this._preco = preco;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viagem.prototype, "imagePath", {
        get: function () {
            return this._imagePath;
        },
        set: function (imagePath) {
            this._imagePath = imagePath;
        },
        enumerable: true,
        configurable: true
    });
    return Viagem;
}());
var ListaViagens = /** @class */ (function () {
    function ListaViagens() {
        this._viagens = [];
    }
    ListaViagens.prototype.novoCard = function (viagem) {
        var cardRow = document.getElementById("cardRow");
        var template = "\n      <div class=\"col-md-4\">\n        <div class=\"card\" style=\"width:18rem;\">\n          <img class=\"card-img-top\" src=\"" + viagem.imagePath + "\" alt=\"Card image cap\">\n          <div class=\"card-body\">\n            <h4 class=\"card-title\">" + viagem.titulo + "</h4>\n            <p class=\"card-text\">Pre\u00E7o: <strong>R$ " + viagem.preco + "</strong></p>\n          </div>\n        </div>\n      </div>\n    ";
        cardRow.insertAdjacentHTML('afterbegin', template);
    };
    ListaViagens.prototype.adicionar = function (form) {
        var titulo = form.elements.titulo.value;
        var preco = parseFloat(form.elements.preco.value);
        var imagePath = form.elements.imagem.value;
        var viagem = new Viagem(titulo, preco, imagePath);
        this._viagens.push(viagem);
        this.novoCard(viagem);
        form.reset();
        var url = "";
        if (window.location.search == "") {
            url += "?";
        }
        else {
            url += "&";
        }
        url += "titulo=" + titulo + "&preco=" + preco + "&imagePath=" + imagePath;
        window.location.href += url;
    };
    ListaViagens.prototype.loadUrl = function () {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.toString() != "") {
            var titulos = urlParams.getAll("titulo");
            var precos = urlParams.getAll("preco");
            var imagePath = urlParams.getAll("imagePath");
            for (var i in titulos) {
                var viagem = new Viagem(titulos[i], parseFloat(precos[i]), imagePath[i]);
                this._viagens.push(viagem);
                this.novoCard(viagem);
            }
        }
    };
    return ListaViagens;
}());
var listaViagens = new ListaViagens();
