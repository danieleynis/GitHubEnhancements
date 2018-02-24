chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg !== 'update')
    return;
  
  let mergeInto = $('#partial-discussion-header > ' +
    'div.TableObject.gh-header-meta > ' +
    'div.TableObject-item.TableObject-item--primary > ' +
    'span:nth-child(2) > ' +
    'span');

  let mergeFrom = $('#partial-discussion-header > ' +
    'div.TableObject.gh-header-meta > ' +
    'div.TableObject-item.TableObject-item--primary > ' +
    'span.commit-ref.css-truncate.user-select-contain.expandable.head-ref > ' +
    'span');

  if (mergeInto.length === 0 || mergeFrom.length === 0)
    return;

  let mergeIntoFrag = mergeInto.parent().attr('title').split(':');
  let mergeFromFrag = mergeFrom.parent().attr('title').split(':');

  let mergeIntoHref = '/' + mergeIntoFrag[0] + '/tree/' + mergeIntoFrag[1];
  let mergeFromHref = '/' + mergeFromFrag[0] + '/tree/' + mergeFromFrag[1];    

  mergeInto.html(`<a href="${mergeIntoHref}">${mergeIntoFrag[1]}</a>`);
  mergeFrom.html(`<a href="${mergeFromHref}">${mergeFromFrag[1]}</a>`);
});