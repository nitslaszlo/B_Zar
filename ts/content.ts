import * as http from "http";
import * as url from "url"; // űrlapokhoz, input kiolvasás
import * as fs from "fs"; // file-kezelés
import { Kód } from "./Kod";
import { TsLinqHandler } from "./TsLinq";

export class Content {

    Content(req: http.ServerRequest, res: http.ServerResponse): void {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<p>Hello TypeScript!</p>");

        const k: Array<Kód> = new Array<Kód>();
        fs.readFileSync("abc.txt").toString().split("\n")
            .forEach(x => k.push(new Kód(x)));
        res.write("2. feladat: Kérem a zár kódszámát: ");
        const zárKód: string = "239451";
        res.write("3. feladat: A nyitó kódszámok sorai: "
            + new TsLinqHandler(k).Where(x => x.K === zárKód)
            .ToArray().join(" "));
        var ism = k.Where(x => x.IsmétlésVan);
        Console.WriteLine(ism.Count() == 0 ? "4. feladat: nem volt ismétlődő számjegy" : "4. feladat: Az első ismétlődést tartalmazó próbálkozás sorszáma: " + ism.First().Ssz);
        Console.WriteLine("5. feladat: Egy {0} hosszú kódszám: {1}", zárKód.length, Kód.Generál(zárKód.length));
        File.WriteAllText("siker.txt", k.Aggregate("", (c, g) => c += g.K + g.Minősít(zárKód) + "\n"));
        Console.ReadKey();


        res.end();
    }
}

