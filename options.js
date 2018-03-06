$(function () {
  restore_options();
  $('#save').on('click', function () {
    save_options();
  });
});

function save_options() {
  let prefillText = $('#prefill').val();
  chrome.storage.sync.set({
    prefillText: prefillText,
  }, function () {
    $('#status').text('Options saved...');
    setTimeout(function () {
      $('#status').text('');
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    prefillText: '',
  }, function (items) {
    $('#prefill').val(items.prefillText);
  });
}