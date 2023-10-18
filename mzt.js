if (window.location.pathname.startsWith('/mzt')) {
  let nextId = window.location.pathname.split('/')[2]
  let api = `https://api.jandan.net/api/v1/comment/list/108629${nextId ? `?start_id=${nextId}` : ''}`
  fetch(chrome.runtime.getURL('template.html')).then(r => r.text()).then(html => {
    fetch(api).then(r => r.json()).then(json => json.data)
      .then(data => {
        let content = data.map(item => `
             <li id="comment-${item.id}">
                        <div>
                            <div class="row">
                                <div class="author"><strong
                                        class="">${item.author}</strong> <br>
                                    <small>${timeSince(item.date)} ago</small>
                                </div>
                                <div class="text"><span class="righttext"><a href="/t/${item.id}">${item.id}</a></span>
                                    ${item.images.map(img => `
                                        <p><a href="${ img.full_url }"
                                          target="_blank" class="view_img_link">[查看原图]</a><br/><img ${ img.url.endsWith(".gif") ? `org_src=${ img.full_url.replace('http:', 'https:') }` : '' }
                                            src="${ img.url.replace('http:', 'https:') }"/></p> 
                                    `)}
                                </div>
                                <div class="jandan-vote">
                            <span class="comment-report-c">
                                <a title="举报" href="javascript:;" class="comment-report" data-id="${item.id}">[举报]</a>
                            </span>
                                    <span class="tucao-like-container">
                            <a title="圈圈/支持" href="javascript:;" class="comment-like like" data-id="${item.id}"
                               data-type="pos">OO</a> [<span>${item.vote_positive}</span>]
                            </span>
                                    <span class="tucao-unlike-container">
                            <a title="叉叉/反对" href="javascript:;" class="comment-unlike unlike" data-id="${item.id}"
                               data-type="neg">XX</a> [<span>${item.vote_negative}</span>]

                            </span>
                                </div>
                            </div>
                        </div>
                    </li>
      `).join(" ")
        html = html.replace("<content/>", content)
        html = html.replaceAll("{{next_page_id}}", data[data.length - 1].id)
        return html
      })
      .then(str => {    document.getElementsByTagName("html")[0].innerHTML = html; window.buildPlayer(); })
    document.title = "妹子图"
    document.getElementsByTagName("html")[0].innerHTML = html
  });
}


function timeSince(dateStr) {
  const date = new Date(dateStr)
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}