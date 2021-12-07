/**
 * Aufgabenstellung:  
 * 
 * Erzeugen Sie mit Hilfe eine Grammatik zufällige arithmetische Ausdrücke
 * über einstelligen natürlichen Zahlen mit den Operanden "+,-,*,/" und 
 * beliebig geschachtelten runden Klammeren, z.B.: 
 * 
 * 2*(3*(4+7)-9) oder 9+2 
 * 
 * oder (3) oder nur 7 sind gültig, 
 * 
 * ungültig sind 12 oder () oder (+3) oder -1. 
 * 
 * Nutzen Sie die folgenden Abkürzungen: 
 * A = Ausdruck, 
 * O = Operator = + | - | * | / ,
 * Z = Zahl/Ziffer = 0 | 1| 2| ... | 9.
 * 
 * 
 * Anwendung und Abgabe: 
 * 
 * Es wird eine Web-Anwendung erstellt, siehe Kursplan.
 * 
 * 
 * Visualisierung: 
 * 
 * Die Generierung der Ausdrücke mittels der Grammatik wird schrittweise angezeigt. 
 * Dabei soll (z.B. durch farbliche Hervorhebung) ersichtlich sein welche Regel angewandt wird,
 * und was sich dadurch im bisher erzeugten Ausdruck verändert hat (vorher -> nachher). 
 * Sie können dabei mit HTML-Text [und CSS] als Darstellung arbeiten.
 * 
 * 
 * Interaktion: 
 * 
 * (1) Über einen Button können zufällige Ausdrücke generiert werden. 
 * (2) Die Erzeugung an Hand der Produktionsregeln kann schrittweise nachvollzogen und 
 *      alternativ automatisch animiert werden. 
 * (3) Die Animationsgeschwindigkeit ist einstellbar. 
 * (4) Die Länge des zu erzeugenden Ausdrucks ist einstellbar.
 * 
 */

// Das hier hat eine Kommilitonin im Forum gepostet.
// Das sind aber "nur" Strings - nichts was man sinnvoll im Code verwenden könnte (my 2 ¢).
// Ich verstehe zwar die Regel, habe aber keine Ahnung, wie man das in ausführbaren code 
// giesst und suche nach einer Anregung.

const cgRules = {
    start: "$Z | $B | $A ",
    A: "($B)",
    B: "$Z$O$start",
    Z: "0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9",
    O: "+ | - | * | /"
};

const
    start = ['Z', 'B', 'A'],
    // A = runA(),
    // B = runB(),
    Z = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    O = ['+', '-', '*', '/']
    ;

const eL = 1;

Array.min = (array) => {
    return Math.min.apply(Math, array);
};

Array.max = (array) => {
    return Math.max.apply(Math, array);
};

const randomValue = (arr) => {
    const min = Math.ceil(Array.min(arr));
    const max = Math.floor(Array.max(arr));
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const express = (arr) => {
    console.log(randomValue(arr))
};


const runA = () => { };
const runB = () => { };

(() => {
    if (eL == 1) console.log(randomValue(Z))
})();