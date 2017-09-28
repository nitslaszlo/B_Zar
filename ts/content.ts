﻿import * as http from "http";
import * as url from "url"; // űrlapokhoz, input kiolvasás
import * as fs from "fs"; // file-kezelés
import { Kód } from "./Kod";
import { TsLinqHandler } from "./TsLinq";

export class Content {

    Content(req: http.ServerRequest, res: http.ServerResponse): void {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<p>Hello TypeScript!</p>");

        const k: Array<Kód> = new Array<Kód>();
        Kód.ResetSorszam();
        fs.readFileSync("ajto.txt").toString().split("\n")
            .forEach(x => k.push(new Kód(x.trim())));
        res.write("2. feladat: Kérem a zár kódszámát: ");
        const zárKód: string = "239451";
        res.write("3. feladat: A nyitó kódszámok sorai: "
            + new TsLinqHandler(k).Where(x => x.K === zárKód).Select(x => x.Ssz).ToArray().join(" "));
        const ism: any = new TsLinqHandler(k).Where(x => x.IsmétlésVan);
        res.write((ism.Count() === 0 ? ("4. feladat: nem volt ismétlődő számjegy") :
            ("4. feladat: Az első ismétlődést tartalmazó próbálkozás sorszáma: " + ism.First().Ssz)));
        res.write( "5. feladat: Egy " + zárKód.length.toString() +" hosszú kódszám: " + Kód.Generál(zárKód.length));
        fs.writeFileSync("siker.txt", new TsLinqHandler(k).Select(x=> x.k + x.Minősít(zárKód) ).ToArray().join("\n") );
        res.end();
    }
}

