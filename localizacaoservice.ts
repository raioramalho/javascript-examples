interface Coordenada {
  lat: number;
  lon: number;
}

export class LocalizacaoService {
    private grausParaRadianos(graus: number): number {
      return graus * Math.PI / 180;
    }
  
    private calcularDistanciaHaversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
      const raioTerra = 6371; // Raio da Terra em quilômetros
      const dLat = this.grausParaRadianos(lat2 - lat1);
      const dLon = this.grausParaRadianos(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.grausParaRadianos(lat1)) * Math.cos(this.grausParaRadianos(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distancia = raioTerra * c; // Distância em quilômetros
      return distancia;
    }
  
    public encontrarPontoMaisProximo(latAtual: number, lonAtual: number, pontos: Coordenada[]): Coordenada | null {
      if (pontos.length === 0) return null;
  
      let pontoMaisProximo = pontos[0];
      let menorDistancia = this.calcularDistanciaHaversine(latAtual, lonAtual, pontos[0].lat, pontos[0].lon);
  
      for (let i = 1; i < pontos.length; i++) {
        const distancia = this.calcularDistanciaHaversine(latAtual, lonAtual, pontos[i].lat, pontos[i].lon);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          pontoMaisProximo = pontos[i];
        }
      }
  
      return pontoMaisProximo;
    }
  }