angular
    .module('app')
    .directive('windowManipulation', windowManipulation);

function windowManipulation(){
  var directive = {
    restrict: 'A',
    link: link
  };
  return directive;
  
  function link(){
    
  }
}

function WindowManipulationController(){
  
}