using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

namespace Erettsegi32_Zár
{
    class Kód
    {
        public string K { get; set; } //kód
        public string Ssz { get; set; } //sorszám
        static int Db = 0;

        public Kód(string sor)
        {
            K = sor;
            Ssz = (++Db).ToString();
        }

        public bool IsmétlésVan
        {
            get { return K.Distinct().Count() != K.Length;}
        }

        public string Minősít(string próba)
        {
            if (K.Length != próba.Length) return " hibás hossz";
            return Eltérés(próba) ? " sikeres" : " hibás kódszám"; 
        }

        public static string Generál(int hossz)
        {
            Random r = new Random();
            HashSet<char> h = new HashSet<char>();
            while (h.Count != hossz) h.Add((char)r.Next(48, 58));
            return h.Aggregate("", (c, n) => c + n);
        }

        public bool Eltérés(string proba) //6. feladat (OOP elvek végett módosított fejjel)
        {
            bool egyezik = K.Length == proba.Length;
            if (egyezik)
            {
                int elteres = (int)K[0] - (int)proba[0];
                for (int i = 1; i < K.Length; i++)
                {
                    int aktElteres = (int)K[i] - (int)proba[i];
                    int diff = elteres - aktElteres;
                    if (diff % 10 != 0) egyezik = false;
                }
            }
            return egyezik;
        }
    }

    class Zar
    {
        static void Main(string[] args)
        {
            List<Kód> k = new List<Kód>(); //1. feladat
            foreach (var i in File.ReadAllLines("ajto.txt")) k.Add(new Kód(i));

            Console.WriteLine("2. feladat: Kérem a zár kódszámát: ");
            //string zárKód = Console.ReadLine();
            string zárKód = "239451";

            Console.WriteLine(k.Where(x => x.K == zárKód).Aggregate("3. feladat: A nyitó kódszámok sorai: ", (c, n) => c + ' ' + n.Ssz));

            var ism = k.Where(x => x.IsmétlésVan);
            Console.WriteLine(ism.Count() == 0 ? "4. feladat: nem volt ismétlődő számjegy" :
            "4. feladat: Az első ismétlődést tartalmazó próbálkozás sorszáma: " + ism.First().Ssz);

            Console.WriteLine("5. feladat: Egy {0} hosszú kódszám: {1}", zárKód.Length, Kód.Generál(zárKód.Length));

            File.WriteAllText("siker.txt", k.Aggregate("", (c, g) => c += g.K + g.Minősít(zárKód) + "\n")); //7. feladat

            Console.ReadKey();
        }
    }
}
