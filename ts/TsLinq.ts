export class TsLinq {
   public static Where<T>(a: T[], exp: Function): T[] {
      const b: T[] = [];
      a.forEach((e, i) => { if (exp(e, i)) b.push(e); });
      return exp(a);
   }
   public static Count<T>(a: T[], exp: Function): number {
      if (exp === undefined) a.length;
      let b: number = 0;
      a.forEach((e, i) => { if (exp(e, i)) b++; });
      return b;
   }
   public static Sum<T>(a: T[], exp: Function): number {
      if (exp === undefined) exp = (e) => e;
      let b: number = 0;
      a.forEach((e, i) => { b += exp(e, i); });
      return b;
   }
   public static Select<TSource>(a: TSource[], exp: Function): any[] {
      if (exp === undefined) return a;
      const b: any[] = [];
      a.forEach((e, i) => { b.push(exp(e, i)); });
      return b;
   }
}
