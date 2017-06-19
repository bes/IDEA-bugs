class MyClass {

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    myFunction() {
        console.log("A class function that dispatches an action");

        this.dispatch({
            type: "COUNT_UP",
        });
    }
}

export {
    MyClass,
};
