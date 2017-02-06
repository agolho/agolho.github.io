
$.ajax({
    url: "https://api.tumblr.com/v2/blog/ysfbekts.tumblr.com/posts/text?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&notes_info=true",
    jsonp: "callback",
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
      $(".blog-items").html("");
      for (i=0;i<5;i++){
        banksy(data["response"]["posts"][i]["title"],data["response"]["posts"][i]["body"].substring(0,800)+'...<br>Read it on Tumblr',data["response"]["posts"][i]["short_url"],data["response"]["posts"][i]["date"]);
      }
    },error: function (){
      console.log("shame");
      $(".blog-items").html('<div class="flex-item post-content">Blog is not feeling well, I am substituting for them.<p>Send Complaints to <a href="https://twitter.com/ysfbekts">@ysfbekts</a>.</p></div>');
    },
    xhrFields: {
      withCredentials: false
    }
  });
function banksy(title,post,url,date){
 $(".blog-items").append('<a href="'+url+'"><div class="flex-item"><h3>'+title+'</h3><div class="post-content"><p>'+post+'</p><p class="post-date">'+date+'</p></div></div></a>');
}
