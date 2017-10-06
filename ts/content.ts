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

        res.write("<br />2. feladat: Kérem a zár kódszámát: ");
        //const zárKód: string = "239451";
        const zárKód: string = url.parse(req.url, true).searchParams.get("zarkod"); // <string> or null
        if (zárKód === null) {
            res.write("<form method="GET"><input type="text" name="zarkod"/></form>");
            res.end();
            return;
        }
        res.write(zárKód);

        res.write("<br />3. feladat: A nyitó kódszámok sorai: " + new TsLinqHandler(k).Where(x => x.K === zárKód)
            .Select(x => x.Ssz).ToArray().join(" "));
            + new TsLinqHandler(k)
        const ism: any = new TsLinqHandler(k).Where(x => x.IsmétlésVan);

        res.write((ism.Count() === 0 ? ("4. feladat: nem volt ismétlődő számjegy") :
            ("<br />4. feladat: Az első ismétlődést tartalmazó próbálkozás sorszáma: " + ism.First().Ssz)));

        res.write( "<br />5. feladat: Egy " + zárKód.length.toString() +" hosszú kódszám: " + Kód.Generál(zárKód.length));
        //fs.writeFileSync("siker.txt", new TsLinqHandler(k).Select(x=> x.k + x.Minősít(zárKód) ).ToArray().join("\n") );

        res.end();
    }
}

