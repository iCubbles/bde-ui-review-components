(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   *
   * Access the Cubbles-Component-Model:
   * > Access slot values:
   * slot 'a': this.getA(); | this.setA(value)
   */
  CubxPolymer({
    is: 'review-input',

    handleSubmit: function (event) {
      // Don't send the form
      event.preventDefault();

      // Set output slot
      this.setText(this.$.textInput.value);

      // empty the form
      event.target.reset();
    }
  });
}());
