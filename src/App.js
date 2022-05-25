import { Component } from "react";
import Buscador from "./componentes/Buscador";
import Resultado from "./componentes/Resultado";

class App extends Component {

state = {
  termino : '', 
  imagenes : [],
  pagina : ''
}

scroll = () => {
  const elemento = document.querySelector('.jumbotron');
  elemento.scrollIntoView('smooth', 'start');
}

paginaAnterior = () => {
    //lectura del state página actual
    let pagina = this.state.pagina;

    //Si la página es 1, no ir atrás.
    if(pagina === 1) return null;  
    //Sumar uno a la página actual
    pagina -= 1;
    //Agregar cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarAPI();
      this.scroll();
    });
}
paginaSiguiente = () => {
  //lectura del state página actual
  let pagina = this.state.pagina;

  //Sumar uno a la página actual
  pagina += 1;

  //Agregar cambio al state
  this.setState({
    pagina
  }, () => {
    this.consultarAPI();
    this.scroll();
  });
}

consultarAPI = () => {
  const termino = this.state.termino;
  const pagina = this.state.pagina;
  const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${termino}&per_page=10
    &page=${pagina}`;

  //console.log(url);
  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => this.setState({ imagenes : resultado.hits}))
}

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarAPI();
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imágenes</p>

          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div class="row justify-content-center">
          <Resultado
              imagenes = {this.state.imagenes}
              paginaAnterior = {this.paginaAnterior}
              paginaSiguiente = {this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;