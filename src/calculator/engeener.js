function ECalculator(){
    _this = this;
    /**
     * formula string
     */
    this.formulaString = '';



    /**
     * some kind of history
     */
    this.actors = [];


    /**
     * 
     */
    this.result = null;

    /**
     * just container for complex numbers
     */
    this.numCell = '';

    /**
     * add number to result
     */
    this.plusAction = function(firstActor, secondActor) {
        return firstActor + secondActor;
    }

    /**
     * 
     */
    this.minusAction = function(firstActor, secondActor) {
        return firstActor - secondActor;
    }

    /**
     * 
     */
    this.multiAction = function(firstActor, secondActor) {
        return firstActor * secondActor;
    }

    /**
     * 
     */
    this.delimiterAction = function(firstActor, secondActor) {
        return firstActor / secondActor;
    } 
    
    /**
     * 
     */
    this.sqrtAction = function(firstActor, secondActor) {
        secondActor = secondActor ? secondActor : 2 ;
        return Math.pow(firstActor, 1/secondActor);
    }

    /**
     * 
     */
    this.lnAction = function(firstActor) {
        return Math.log(firstActor);
    }

    /**
     * 
     */
    this.factorialAction = function(firstActor) {
        var res = 1;
        for(var i = 1; i <= firstActor; i++) {
            res = res * i;
        }
        return res;
    }

    /**
     * 
     */
    this.powAction = function(firstActor, secondActor){
        secondActor = secondActor ? secondActor : 2 ;

        return Math.pow(firstActor, secondActor);
    }



    /**
     * show results in field
     */
    this.displayResult = function() {
        document.getElementById('formula').innerHTML = this.actors.join(' ');
        document.getElementById('result').innerHTML = this.result;
    }

    /**
     * reset numCell
     */
    this.clearNumCell = function() {
        this.numCell = '';
    }

    /**
     * if more than one digit in number
     */
    this.updateNumCell = function(symbol) {
        this.numCell += symbol;
        this.displayResult();
        document.getElementById('formula').innerHTML = document.getElementById('formula').innerHTML + this.numCell;
    }

    /**
     * 
     */
    this.pushNumCellToActors = function() {
        if(this.numCell && parseFloat(this.numCell)) {
            this.actors.push( parseFloat(this.numCell) );
            this.numCell = '';
        }
    }

    /**
     * initiate calculator
     */
    this.init = function() {
        /**
         * attach number button click
         */
        var num_btns = document.getElementsByClassName('number');
        if(num_btns && num_btns.length) {
            for(var i = 0; i < num_btns.length; i++) {
                num_btns[i].addEventListener('click', function (event) {
                    var btn = event.target;
                    // get text for btn
                    var text = btn.childNodes[0].data;
                    _this.updateNumCell(text);
                });
            }
        }

        /**
         * attach math actions button click
         */
        var act_btns = document.getElementsByClassName('m_action');
        if(act_btns && act_btns.length) {
            for(var i=0; i < act_btns.length; i++) {
                act_btns[i].addEventListener('click',  function(event) {
                    var btn = event.target;
                    var text = btn.childNodes[0].data;
                    _this.mathAction(text);
                });
            }
        }
    }
    /**
     * @returns boolean true if last history record was math action
     */
    this.checkLastHistoryIsAction = function() {
        if(!this.actors || !this.actors.length) {
            return false;
        } else {
            var lastAct = this.actors[ this.actors - 1 ];
            return this.availableHandlers.hasOwnProperty( lastAct );
        }
    }

    /**
     * 
     */
    this.mathAction = function( action ) {
        
        this.pushNumCellToActors();

        if(this.checkLastHistoryIsAction()) {
            // rewrite last action with new one
            this.actors[ this.actors.length - 1 ] = action;
        } else {
            this.actors.push(action);
        }
        this.calculate();

    }

    /**
     * 
     */
    this.availableHandlers = {
        '+' : this.plusAction,      // calc summ
        '-' : this.minusAction,     // calc diff
        '*' : this.multiAction,     // multiply action
        '/' : this.delimiterAction, // delimiter action
        '√' : this.sqrtAction,      // sqrt
        'ln': this.lnAction,        // ln
        'n!': this.factorialAction, 
        'x^2' : this.powAction,



    };
    // actions, requires 2 parameters  
    this.twoActorsActions = {
        '+': '',    
        '-': '',
        '*': '',
        '/': '',
    };


    /**
     * 
     */
    this.calculate = function () {
        if (this.numCell && this.numCell != '') {
            this.pushNumCellToActors();
        }
        /** == Simple calculator
        try {
            this.result = eval(this.actors.join(''));
        } catch (e) {

        }
        */
        this.result = this.actors[0];
        
        // first actor is already in result
        for(var i = 1; i < this.actors.length; i++) {
            console.log(i, this.actors[i]);
            if(this.availableHandlers.hasOwnProperty(this.actors[i])) {
                // call math handler
                if(this.twoActorsActions.hasOwnProperty(this.actors[i])) {
                    // use 2 numbers and skip next stage
                    this.result = this.availableHandlers[ this.actors[i] ](this.result, this.actors[++i]);
                } else {
                    this.result = this.availableHandlers[ this.actors[i] ](this.result);
                }
                
            }
        }






        console.log(this.actors, this.result)

        this.displayResult();
    }

    this.reset = function() {
        this.actors = [];
        this.result = 0;
        this.displayResult();
    }

  
}
export default ECalculator;