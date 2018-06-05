$(document).ready(function () {
  $('select').select2({
    language: "es"
  });
  
  $('select[multiple]').select2({
    placeholder: 'Seleccione un cargo...',
    allowClear: true,
    language: "es"
  });

  
});
