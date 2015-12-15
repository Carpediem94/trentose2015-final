/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */

var SantaModel = {
  
  /* Initializes the model with a list of requests, 
  * and sets the first one as the current one 
  */
  init : function(list){
    this.list = list;
    this.current = 0;
    this.point = 0;
  },

  /* It moves "current" to the next request */
  next : function (){
    this.current++;
    console.log(this.current);
  },

  /* Returns the current request. 
  * If all requests have been processed (there is no current one), it returns null 
  */
  getCurrentRequest : function () {
    var request = {
      question: this.list[this.current].question,
      options: this.list[this.current].options
    }
    if (request !== undefined) {
      return request;
    } else {
      return null;
    }
  },  

  /* Packs the given item if it fulfills the current request.       
  * returns 1 if the given item fulfills the request (= answer)
  * returns 0 if the given item does not fulfill the request
  */
  pack : function(item) {
    var answ = item;
    if(answ === this.list[this.current].answer) {
      return 1;
    } else {
      return 0;
    } 
  }      
  
};

var octopus = {
  init: function() {
    SantaModel.init(requests);
    viewQuestion.init();
    viewQuestion.item();
  },
  
  getRequest: function() {
    var request = SantaModel.getCurrentRequest();
    if(request === null) {
      viewQuestion.answer();
    } else {
      return request;  
    }
    
  },
  
  getCheck: function() {
    var check = SantaModel.list
  },

  current: function() {
    SantaModel.next();
  },
  
  point: function(item) {
    var correct = SantaModel.pack(item);
    if (correct===1) {
      SantaModel.point++;
    }
  },
  
  getPoint: function() {
    return SantaModel.point;
  },
  
  getCurrent: function() {
    return SantaModel.current;
  }
  
};

var viewQuestion = {
  init: function() {
    this.question = $('.question');
    this.option = $('.question-items');
    this.render();
  },
  
  render: function() {
    this.question.empty();
    var question = octopus.getRequest();
    this.question.append(question.question);
    
    //this.option.empty();
    for(var i=0; i<question.options.length; i++) {
      this.option.append('<li>' + question.options[i] + '</li>');
    }
  },
  
  item: function() {
    $('li').click(function() {
      octopus.current();
      var current = octopus.getCurrent();
      if(current>2) {
        viewQuestion.answer();
      } else {
        octopus.point("yes");
        viewQuestion.render();  
      }
      
    })
  },
  
  answer: function() {
    this.question.empty();
    this.option.empty();
    $('.result').append("Total points: " + octopus.getPoint());
  }
  
};

$(document).ready(function(){
  octopus.init();
});