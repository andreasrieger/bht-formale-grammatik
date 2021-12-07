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
    S: "$Z | $B | $C ",
    B: "($C)",
    C: "$Z$O$S",
    Z: "0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9",
    O: "+ | - | * | /"
};

const
    Z = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    O = ['+', '-', '*', '/']
    ;

const eL = 5; // expression length
let counter = 0;


/**
 * Helper method to return the smallest value of an array
 * 
 * @param {*} array 
 * @returns 
 */
Array.min = (array) => {
    return Math.min.apply(Math, array);
};


/**
 * Helper method to return the largest value of an array
 * 
 * @param {*} array 
 * @returns 
 */
Array.max = (array) => {
    return Math.max.apply(Math, array);
};


/**
 * Returning a random operator from $O or a random digit from $Z 
 * 
 * @param {*} arr 
 * @returns 
 */
const randomValue = (arr) => {
    if (arr == O) {
        const min = 0;
        const max = arr.length - 1;
        return O[Math.floor(Math.random() * (max - min + 1)) + min];
    } else {
        const min = Math.ceil(Array.min(arr));
        const max = Math.floor(Array.max(arr));
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};


/**
 * Returning an expression consisting of a single digit or 
 * a combination of operands and operators
 * 
 * @param {*} expression 
 * @returns 
 */
const A = (expression) => {
    while (counter < eL - 1) {
        counter += 1;

        /**
         * recursion without calling method C
         */
        /*
        if (counter + 1 < eL) {
            expression = A(B(expression + randomValue(O) + randomValue(Z)));
        } else {
            expression = A(expression + randomValue(O) + randomValue(Z));
        }
        */

        /**
         * calling method C without recursion
         */
        expression = A((counter + 1 < eL) ? B(C(expression)) : C(expression));
    }
    return expression;
};


/**
 * Returning a given expression in round brackets / parantheses
 * 
 * @param {*} expression 
 * @returns 
 */
const B = (expression) => {
    return `(${expression})`;
}

/**
 * Returning a given expression expanded by an additional operator and operand 
 * 
 * @param {*} expression 
 * @returns 
 */
const C = (expression) => {
    return expression + randomValue(O) + randomValue(Z);
};


/**
 * Calling the A method and logging its result
 */
console.log(A(randomValue(Z)))
