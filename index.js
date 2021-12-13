/**
 * Lösung zur unten gestellten Aufgabe
 * 
 * @author Andreas Rieger, s82456@bht-berlin.de
 * Date: 2021-12-13
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
    S: "S: $Z | $B | $C | $D ",
    B: "B: ($C) | ($D)",
    C: "C: $Z$O$S",
    D: "D: $S$O$Z",
    Z: "Z: rand [0-9]",
    O: "O: rand ['+', '-', '*', '/']"
};

const
    Z = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    O = ['+', '-', '*', '/'],
    T = []
    ;

// const eL = 10; // expression length
let eL = 0;
let counter = 0;
let prevExpression = 0;


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
const randomZ = (caller) => {
    const min = Math.ceil(Array.min(Z));
    const max = Math.floor(Array.max(Z));
    const digit = Math.floor(Math.random() * (max - min + 1)) + min;
    T.push({ rule: 'Z', val: digit, caller: caller })
    return digit;
};


/**
 * This method is returning a random operator from $O
 * 
 * @returns a random operator from $O array
 */
const randomO = (caller) => {
    const min = 0;
    const max = O.length - 1;
    const operator = O[Math.floor(Math.random() * (max - min + 1)) + min];
    T.push({ rule: 'O', val: operator, caller: caller });
    return operator;
};


/**
 * Returning an expression consisting of a single digit or 
 * a combination of operands and operators
 * 
 * @param {*} expression 
 * @returns the arithmetical expression with the defined length
 */
const A = (expression) => {
    if (expression === undefined) {
        expression = randomZ('C');
        T.push({ rule: 'A', val: expression });
    }
    if (counter == 1) {
        T.push(expression);
        T.push({ rule: 'A', val: expression.val });
    }
    if (counter > 1) {
        // console.log(prevExpression + " => " + expression['val'])
        T.push({ rule: 'B', val: prevExpression });
        T.push(expression);
        T.push({ rule: 'A', val: expression.val });
    }
    while (counter + 1 < eL) {
        expression = (counter == 0) ? expression : expression['val'];
        prevExpression = (counter < 1) ? expression : B(expression);
        counter += 1;
        if (counter < 2) A(C(prevExpression))
        else (Math.random() < 0.5) ? A(C(prevExpression)) : A(D(prevExpression));
    }
};


/**
 * Returning a given expression in round brackets / parantheses
 * 
 * @param {*} expression 
 * @returns a given expression in round brackets / parantheses
 */
const B = (expression) => {
    return `(${expression})`;
};


/**
 * Returning a given expression expanded by an additional 
 * operator and operand on the right side
 * 
 * @param {*} expression 
 * @returns a new expression
 */
const D = (expression) => {
    expression = expression + randomO('D') + randomZ('D');
    return { rule: 'D', val: expression };
};


/**
 * Returning a given expression expanded by an additional 
 * operator and operand on the left side
 * @param {*} expression 
 * @returns a new expression
 */
const C = (expression) => {
    expression = randomZ('C') + randomO('C') + expression;
    return { rule: 'C', val: expression };
};


/**
 * Method to highlight the active output element.
 * 
 * @param {*} cardId 
 * @param {*} colorScheme 
 */
const activeCard = (cardId, colorScheme) => {
    const highlightColor = (colorScheme) ? ("alert-" + colorScheme) : "alert-success";
    const nodes = document.querySelectorAll("." + highlightColor);
    for (let i = 0, l = nodes.length; i < l; i++) {
        if (nodes[i].id != "onSuccessOutput") nodes[i].classList.remove(highlightColor);
    }
    document.getElementById(cardId).classList.add(highlightColor);
};


/**
 * Method to highlight the active output element.
 * 
 * @param {*} ruleCard 
 */
const activeRule = (ruleCard) => {
    const highlightColor = "alert-primary";
    const nodes = document.querySelectorAll("." + highlightColor);
    for (let i = 0, l = nodes.length; i < l; i++) {
        nodes[i].classList.remove(highlightColor);
    }
    document.getElementById(ruleCard).classList.add(highlightColor);
}


/**
 * Method to disable new input during app runtime.
 */
const disableRange = () => {
    document.getElementById("customRange").setAttribute("disabled", "");
    const controlButtons = document.querySelectorAll(".output-control");
    for (let i = 0, l = controlButtons.length; i < l; i++) {
        controlButtons[i].removeAttribute("disabled");
    }
};


/**
 * Method to re-enable new input after app reset.
 */
const enableRange = () => {
    document.getElementById("customRange").removeAttribute("disabled");
    const controlButtons = document.querySelectorAll(".output-control");
    for (let i = 0, l = controlButtons.length; i < l; i++) {
        controlButtons[i].setAttribute("disabled", "");
    }
};


/**
 * Method to toggle the start/reset button
 * 
 * @param {*} state 
 */
const toggleStartResetButton = (state) => {
    const button = document.getElementById("startResetButton");
    if (state == "active") {
        button.classList.remove("active");
        button.classList.replace("btn-primary", "btn-outline-warning")
        button.innerText = "Reset";
        button.setAttribute("data-bs-toggle", "tooltip");
        button.setAttribute("data-bs-placement", "top");
        button.setAttribute("title", "Ausgabe unterbrechen und Anwendung zurücksetzen.");
    } else {
        button.classList.add("active");
        button.classList.replace("btn-outline-warning", "btn-primary")
        button.innerText = "Start";
        button.setAttribute("data-bs-toggle", "tooltip");
        button.setAttribute("data-bs-placement", "top");
        button.setAttribute("title", "Arithmetischen Ausdruck erzeugen und Anwendung starten.");
    }
}


/**
 * Resetting all text output
 */
const resetOutputText = () => {
    const textNodes = document.querySelectorAll(".output-text");
    for (let i = 0, l = textNodes.length; i < l; i++) {
        textNodes[i].innerText = "";
    }
};


/**
 * Resetting active elements
 */
const resetActiveCard = () => {
    const nodes = document.querySelectorAll(".alert-success");
    for (let i = 0, l = nodes.length; i < l; i++) {
        nodes[i].classList.remove("alert-success");
    }
};


/**
 * Creating a check mark icon
 * @param {*} check 
 * @returns <i> element with check mark icon
 */
const checkMark = (check) => {
    const iconNode = document.createElement("i");
    const icon = (check) ? "bi bi-check-lg text-success" : "bi bi-x text-danger";
    iconNode.setAttribute("class", icon);
    return iconNode;
};


/**
 * Method to control the object output and display
 * 
 * @param {*} iterator 
 * @param {*} currentRule 
 * @param {*} caller 
 */
const nextStep = (iterator, currentRule, caller) => {
    if (iterator == 0) {
        document.getElementById("aKey").innerText = "A => ";
        document.getElementById("aText").innerText = T[iterator].val;
        activeCard("aCard", "success");
    }

    if (currentRule == 'Z') {
        if (caller == 'C') {
            document.getElementById(caller.toLowerCase() + currentRule.toLowerCase() + "Text").innerText = T[iterator].val;
            activeCard(caller.toLowerCase() + currentRule.toLowerCase() + "Card", "success");
        } else {
            document.getElementById(caller.toLowerCase() + currentRule.toLowerCase() + "Text").innerText = T[iterator].val;
            activeCard("d" + currentRule.toLowerCase() + "Card", "success");
        }
    }

    if (currentRule == 'O') {
        if (caller == 'C') {
            document.getElementById(caller.toLowerCase() + currentRule.toLowerCase() + "Text").innerText = T[iterator].val;
            activeCard(caller.toLowerCase() + currentRule.toLowerCase() + "Card", "success");
        }
        else {
            document.getElementById(caller.toLowerCase() + currentRule.toLowerCase() + "Text").innerText = T[iterator].val;
            activeCard("d" + currentRule.toLowerCase() + "Card", "success");
        }
    }

    if (currentRule == 'C') {
        document.getElementById(currentRule.toLowerCase() + "Text").innerText = T[iterator].val;
        activeCard(currentRule.toLowerCase() + "Card", "success");
    }

    if (currentRule == 'D') {
        document.getElementById(currentRule.toLowerCase() + "Text").innerText = T[iterator].val;
        activeCard(currentRule.toLowerCase() + "Card", "success");
    }

    if (currentRule == 'B') {
        document.getElementById("aKey").innerText = "B => ";
        document.getElementById("aText").innerText = T[iterator].val;
        activeCard("aCard", "success");
    }

    if (currentRule == 'A') {
        document.getElementById("aKey").innerText = "A => ";
        document.getElementById("aText").innerText = T[iterator].val;
        activeCard(currentRule.toLowerCase() + "Card", "success");
    }

    if (currentRule == 'A' && iterator == T.length - 1) {
        document.getElementById("aText").appendChild(checkMark(true))
    }

    if (currentRule != 'A') activeRule(currentRule.toLowerCase() + "Rule");
};


/**
 * Method to start the object output and display with time delay
 * 
 * @param {*} delay 
 */
const nextStepAutoRun = (delay) => {
    for (let i = 0, l = T.length; i < l; i++) {
        setTimeout(
            (y) => {
                nextStep(y, T[y].rule, T[y].caller)
            },
            i * delay * 1000,
            i
        );
    }
};


/**
 * Method to display the generated expression in front end.
 * 
 * @param {*} expression 
 */
const onSuccessOutput = (expression) => {
    const wrapper = document.getElementById("onSuccess");
    const newMessage = document.createElement("div");
    newMessage.setAttribute("id", "onSuccessOutput");
    newMessage.setAttribute("class", "alert alert-success");
    newMessage.setAttribute("role", "alert");
    newMessage.innerText = "Glückwunsch, ein neuer Ausdruck wurde erstellt: " + expression;
    wrapper.appendChild(newMessage);
}


/**
 * Init general frontend interaction options
 */
document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("eLOutput").innerText = document.getElementById("customRange").value;

    document.getElementById("customRange").addEventListener("input", () => {
        document.getElementById("eLOutput").innerText = document.getElementById("customRange").value;
    })

    document.getElementById("startResetButton").addEventListener("click", () => {
        if (document.getElementById("startResetButton").classList.contains("active")) {
            // start state
            eL = document.getElementById("customRange").value;
            A();
            activeRule("sRule");
            toggleStartResetButton("active");
            disableRange();
            onSuccessOutput(T[T.length - 1].val);
            console.log(eL)
            console.log(T)
        } else {
            // reset state
            toggleStartResetButton("reset");
            setTimeout(resetOutputText, 1);
            setTimeout(resetActiveCard, 1);
            T.length = 0;
            eL = 0;
            counter = 0;
            prevExpression = 0;
            enableRange();
            document.getElementById("onSuccessOutput").remove();
        }
    })


    let i = -1;

    document.getElementById("prevButton").addEventListener("click", () => {
        if (i > 0) {
            i--;
            console.log(T[i])
            nextStep(i, T[i].rule, T[i].caller)
        }
    })

    document.getElementById("nextButton").addEventListener("click", () => {
        if (i + 1 < T.length) {
            i++;
            console.log(T[i])
            nextStep(i, T[i].rule, T[i].caller)
        }
    })

    document.getElementById("1s").addEventListener("click", () => {
        nextStepAutoRun(1);
    });
    document.getElementById("2s").addEventListener("click", () => {
        nextStepAutoRun(2);
    });
    document.getElementById("4s").addEventListener("click", () => {
        nextStepAutoRun(4);
    });


});