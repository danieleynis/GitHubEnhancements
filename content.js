chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg !== 'update')
    return;
  
  prefill_pr();
  update_pr_links();
});

function prefill_pr() {
  chrome.storage.sync.get({
    prefillText: '',
  }, function (items) {
    $('#pull_request_body').val(items.prefillText);
  });
}

function update_pr_links() {
  let mergeInto = $('#partial-discussion-header > ' +
    'div.TableObject.gh-header-meta > ' +
    'div.TableObject-item.TableObject-item--primary > ' +
    'span.commit-ref.css-truncate.user-select-contain.expandable.base-ref');

  let mergeFrom = $('#partial-discussion-header > ' +
    'div.TableObject.gh-header-meta > ' +
    'div.TableObject-item.TableObject-item--primary > ' +
    'span.commit-ref.css-truncate.user-select-contain.expandable.head-ref');

  if (mergeInto.length === 0 || mergeFrom.length === 0)
    return;

  let mergeIntoText = [];
  mergeInto.children().each(function () {
    mergeIntoText.push($(this).text());
  });

  let mergeFromText = [];
  mergeFrom.children().each(function () {
    mergeFromText.push($(this).text());
  });

  let mergeIntoFrag = mergeInto.attr('title').split(':');
  let mergeFromFrag = mergeFrom.attr('title').split(':');

  let mergeIntoHref = '/' + mergeIntoFrag[0] + '/tree/' + mergeIntoFrag[1];
  let mergeFromHref = '/' + mergeFromFrag[0] + '/tree/' + mergeFromFrag[1];

  mergeInto.html(`<a href="${mergeIntoHref}">${mergeIntoText.join(':')}</a>`);
  mergeFrom.html(`<a href="${mergeFromHref}">${mergeFromText.join(':')}</a>`);
}