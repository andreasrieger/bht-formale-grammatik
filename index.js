const
    Z = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    O = ['+', '-', '*', '/'],
    K = ['(', ')'],
    A = [0]
    ;

let counter = 0;

Array.min = (array) => {
    return Math.min.apply(Math, array);
};

Array.max = (array) => {
    return Math.max.apply(Math, array);
};

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

const randomCount = () => {
    return randomValue([1, 5]);
};

function daRule() {
    const randInt = randomCount();
    const operatorCount = randInt - 1;
    let i = 0, j = 0;
    const arr = [];
    while (i < randInt) {
        arr.push(randomValue(Z));
        if (j < operatorCount) {
            arr.push(randomValue(O));
            j++;
        }
        i++;
    }
    return arr.join('');
}

const newTerm = (term) => {
    if (term == 0) {
        const arr = [];
        arr.push(randomValue(Z));
        arr.push(randomValue(O));
        arr.push(randomValue(Z));
        return arr.join('');
    } else {
        const randomBoolean = Math.random() < 0.5;
        if (randomBoolean) {
            return randomValue(Z) + randomValue(O).toString() + term;
        } else {
            return term + randomValue(O).toString() + randomValue(Z);
        }
    }
};


/**
 * General function initialization when the document is loaded
 */
document.addEventListener("DOMContentLoaded", function (event) {
    // console.log("DOM fully loaded and parsed");
    console.log(A[A.length - 1].toString()) // content of A

    document.getElementById("prevButton").addEventListener("click", () => {
        if (counter > 0) {
            counter -= 1;
            console.log(A[counter].toString())
        }
    })

    document.getElementById("nextButton").addEventListener("click", () => {

        if (counter < A.length - 1) {
            counter += 1;
            console.log(A[counter].toString())
        } else {
            A.push(newTerm(A[A.length - 1]));
            counter += 1;
            console.log(A[counter].toString())
        }
    })
});