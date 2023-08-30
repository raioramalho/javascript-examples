import jwt_decode from 'jwt-decode';

export interface IUsuario {
  CODUSU: number;
  UUID: string;
  AUTORIZACAO: string;
  EMAIL: string;
  STATUS: string;
  CODPES: number;
  CODEMP: number;
  USUINC: number | null;
  USUALT: number | null;
  DATAINC: string;
  DATAALT: string;
  PESSOA: {
    CODPES: number;
    UUID: string;
    NOME: string;
    SOBRENOME: string;
    CPF: string;
    TELEFONE: string;
    GENERO: string;
    USUINC: number | null;
    USUALT: number | null;
    DATAINC: string;
    DATAALT: string;
  };
  EMPRESA: {
    CODEMP: number;
    UUID: string;
    NOMEFANTAZIA: string;
    RAZAOSOCIAL: string;
    CNPJ: string;
    CODPES: number | null;
    USUINC: number | null;
    USUALT: number | null;
    DATAINC: string;
    DATAALT: string;
  };
  USUARIOCLIENTE: {
    CODCLI: number;
    UUID: string;
    CODUSU: number;
    NOMEFANTAZIA: string;
    RAZAOSOCIAL: string;
    CNPJ: string;
    EMAIL: string;
    TELEFONE: string;
    CODEMP: number;
    USUINC: number | null;
    USUALT: number | null;
    DATAINC: string;
    DATAALT: string;
  }[];
  ACESSOS: {
    CODEMP: number;
    EMPRESA: {
      NOMEFANTAZIA: string;
      RAZAOSOCIAL: string;
      CNPJ: string;
    }
  }[];
  iat: number;
  exp: number;
}



const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDT0RVU1UiOjIsIlVVSUQiOiI3YmIyMzBhNS0zMTEyLTRiMDgtOTk2OC03YTNmYjMxYTgzYmQiLCJBVVRPUklaQUNBTyI6IkRFU0VOVk9MVkVET1IiLCJDT0RFWFRFUk5PIjpudWxsLCJFTUFJTCI6ImFsYW4ucmFtYWxob0B0aGlua2xpZmUuY29tLmJyIiwiU1RBVFVTIjoiQVRJVk8iLCJDT0RQRVMiOjYsIkNPREVNUCI6MSwiVVNVSU5DIjoxLCJVU1VBTFQiOjIsIkRBVEFJTkMiOiIyMDIzLTA4LTA4VDA0OjM3OjUxLjY4NFoiLCJEQVRBQUxUIjoiMjAyMy0wOC0xN1QxMjoyNzo0Mi42ODVaIiwiUEVTU09BIjp7IkNPRFBFUyI6NiwiVVVJRCI6IjA3YTg0MjI3LTcyNzAtNDVkNS1iNmY1LTI3NGJhNTZhZWI4MSIsIk5PTUUiOiJBbGFuIiwiU09CUkVOT01FIjoiUmFtYWxobyIsIkNQRiI6IjEzNzIyMDM3OC0xMyIsIlRFTEVGT05FIjoiMjE5ODMxMTA0OTgiLCJHRU5FUk8iOiJNQVNDVUxJTk8iLCJVU1VJTkMiOjEsIlVTVUFMVCI6MiwiREFUQUlOQyI6IjIwMjMtMDgtMDhUMDQ6Mzc6NTEuNjg0WiIsIkRBVEFBTFQiOiIyMDIzLTA4LTE3VDEyOjI3OjQyLjY4NVoifSwiRU1QUkVTQSI6eyJDT0RFTVAiOjEsIlVVSUQiOiI0YzQ4YzdlNS1iMDBlLTRkNWMtYWJhOC1mMmUwZDk5NDUxNWYiLCJOT01FRkFOVEFaSUEiOiJUSElOS0xJRkUiLCJSQVpBT1NPQ0lBTCI6IlRISU5LTElGRSBTT0xVw4fDg08gVEVDTk9Mw5NHSUNBIFBBUkEgTyBGVVRVUk8iLCJDTlBKIjoiMzkuODIwLjg4My8wMDAxLTExIiwiQ09EUEVTIjpudWxsLCJVU1VJTkMiOm51bGwsIlVTVUFMVCI6bnVsbCwiREFUQUlOQyI6IjIwMjMtMDgtMDhUMDQ6MzA6NTIuOTk4WiIsIkRBVEFBTFQiOiIyMDIzLTA4LTA4VDA0OjM2OjE5Ljg0M1oifSwiVVNVQVJJT0NMSUVOVEUiOltdLCJBQ0VTU09TIjpbeyJDT0RFTVAiOjEsIkVNUFJFU0EiOnsiTk9NRUZBTlRBWklBIjoiVEhJTktMSUZFIiwiUkFaQU9TT0NJQUwiOiJUSElOS0xJRkUgU09MVcOHw4NPIFRFQ05PTMOTR0lDQSBQQVJBIE8gRlVUVVJPIiwiQ05QSiI6IjM5LjgyMC44ODMvMDAwMS0xMSJ9fV0sImlhdCI6MTY5MzIzODAwMiwiZXhwIjoxNjkzMjU5NjAyfQ.2V-Hiq7MF3ry_SzJDCH6upBeztJPbZi_K6vN15qlA-I";
const token: IUsuario = jwt_decode(jwt);

const CODEMP = 0;
let acessos: any[] = [];

const acesso = token.ACESSOS.forEach((element) => {
  if (element.CODEMP === CODEMP) {
    acessos.push(element);
  }
})


if (acessos.length <= 0) {
  throw new Error('Invalid access token');
}

