import enMessage from "./en";
import ptMessage from "./pt";

export default class message {
  language: string;
  total: number;
  taxes: number;
  constructor(language: string, total: number, taxes: number) {
    this.language = language;
    this.total = total;
    this.taxes = taxes;
  }
  fiscalMessage() {
    if (this.language === "pt") {
      return ptMessage(this.total, this.taxes)
    }
    if (this.language === "en") {
      return enMessage(this.total, this.taxes)
    }
  }
}
