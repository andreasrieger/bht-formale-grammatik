/**
 * Lösung zur unten gestellten Aufgabe
 * 
 * @author Andreas Rieger, s82456@bht-berlin.de
 * Date: 2021-12-08
 * 
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

const rules = {
    S: "$Z | $B | $C | $D ",
    B: "($C)",
    C: "$Z$O$S",
    D: "$S$O$Z"
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
 * @returns the smallest value of an array
 */
Array.min = (array) => {
    return Math.min.apply(Math, array);
};


/**
 * Helper method to return the largest value of an array
 * 
 * @param {*} array 
 * @returns the largest value of an array
 */
Array.max = (array) => {
    return Math.max.apply(Math, array);
};


/**
 * This method is returning a random digit from $Z
 * 
 * @returns a random digit from $Z array
 */
const randomDigit = () => {
    const min = Math.ceil(Array.min(Z));
    const max = Math.floor(Array.max(Z));
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 * This method is returning a random operator from $O
 * 
 * @returns a random operator from $O array
 */
const randomOperator = () => {
    const min = 0;
    const max = O.length - 1;
    return O[Math.floor(Math.random() * (max - min + 1)) + min];
};


/**
 * Returning an expression consisting of a single digit or 
 * a combination of operands and operators
 * 
 * @param {*} expression 
 * @returns the arithmetical expression with the defined length
 */
const A = (expression) => {
    while (counter < eL - 1) {
        counter += 1;
        if (Math.random() < 0.5) {
            expression = A((counter + 1 < eL) ? B(C(expression)) : C(expression));
        } else expression = A((counter + 1 < eL) ? B(D(expression)) : D(expression));
    }
    return expression;
};


/**
 * Returning a given expression in round brackets / parantheses
 * 
 * @param {*} expression 
 * @returns a given expression in round brackets / parantheses
 */
const B = (expression) => {
    return `(${expression})`;
}

/**
 * Returning a given expression expanded by an additional 
 * operator and operand on the right side
 * 
 * @param {*} expression 
 * @returns a new expression
 */
const C = (expression) => {
    return expression + randomOperator() + randomDigit();
};


/**
 * Returning a given expression expanded by an additional 
 * operator and operand on the left side
 * @param {*} expression 
 * @returns a new expression
 */
const D = (expression) => {
    return randomDigit() + randomOperator() + expression;
};


/**
 * Calling the A method and logging its result
 */
console.log(A(randomDigit()))
