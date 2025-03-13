

export class GoogleUser{
      constructor(obj){
            this.sub = BigInt(obj.sub);
            this.name = String(obj.name || "");
            this.given_name = String(obj.given_name || "");
            this.picture = String(obj.picture || "");
            this.email = String(obj.email || "");
            this.email_verified = Boolean(obj.email_verified || false);
      }
}
