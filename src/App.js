import React, { createElement } from 'react';
import coins from './img/coin.png';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      qtdMoeda: "",
      moedaSelecionada: "",
      dados: []
    };
    this.qtdMoeda = this.qtdMoeda.bind(this);
    this.moedaCambio = this.moedaCambio.bind(this);
  }

  componentDidMount() {
    const url_base = 'https://economia.awesomeapi.com.br/all';
    fetch(url_base)
      .then((response) => response.json())
      .then((data) => this.setState({dados: Object.values(data)}));
  }

  qtdMoeda(event){
    this.setState({qtdMoeda: event.target.value});
  }

  moedaCambio(event){
    this.setState({moedaSelecionada: event.target.value})
  }

  conversaoMoeda(qtd, moeda){
    var result = "";
    var temp = this.state.dados;
    temp.forEach(element => {
      if (element.code == moeda){
        result = qtd * parseFloat(element.bid);
        result = result.toFixed(2);
      }
    });
    return result;
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="title">
            <img src={coins}/>
            <h1>
              Conversor em Reais
            </h1>
          </div>
          <div id="areaCoin">
            <div id="coinValue">
              <p>R$: {this.conversaoMoeda(this.state.qtdMoeda, this.state.moedaSelecionada)}</p>
            </div>
          </div>
        </header>
        <div>
          <p>
          valor: <input type="text" id="moeda1" value={this.state.qtdMoeda} onChange={this.qtdMoeda}/>
            <label for="moeda1">  Moeda: </label>
            <select name="moeda1" id="moedas" value={this.state.moedaSelecionada} onChange={this.moedaCambio}>
              <option value="Selecione">Selecione</option>
              <option value="USD">Dólar Americano</option>
              <option value="EUR">Euro</option>
              <option value="BTC">Bitcoin</option>
              <option value="LTC">Litecoin</option>
              <option value="ETH">Ethereum</option>
              <option value="XRP">Ripple</option>
            </select>
          </p>
        </div>
        <div className="footer">
          <a href="https://economia.awesomeapi.com.br/all" target="_blank">API utilizada</a>
        </div>
      </div>
    );
  }
}

export default App;