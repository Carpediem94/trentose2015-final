/* Remember that blanket will only work with brackets live preview */
/* Try to maximise the coverage of the SantaModel object */

describe("Santa", function() {

  it("should not undefined", function() {  
    var question = SantaModel.getCurrentRequest();
    expect(question).not.toBeUndefined();
  });
  
  it("should not undefined", function() {  
    var question = SantaModel.getCurrentRequest();
    expect(question).not.toBeNull();
  });
  
  it("should fail answer", function() {
    var answer = SantaModel.pack("yes");
    expect(answer).toBe(0);
  });
 
});
