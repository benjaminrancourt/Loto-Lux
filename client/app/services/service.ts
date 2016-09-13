export class Service {
  protected url: string;
  private SEPARATEUR: string = '/';

  constructor(url: string) {
    this.url = url;
  }

  protected construireURL(vars: string[]): string {
    let variables: string[] = [this.url].concat(vars);
    return this.concatener(variables);
  }

  private concatener(vars: string[]): string {
    return vars.filter((n) => n !== undefined && n !== null).join(this.SEPARATEUR);
  }
}
