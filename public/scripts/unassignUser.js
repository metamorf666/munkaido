function ajaxDelete(url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.ajax({
      url,
      method: 'GET',
      dataType: 'json',
      headers
    })
  )
}



$('.unassign').on('click', function (e) {
  e.preventDefault()
        //const url3 = ''+ $(this).attr('href')
        const url = '/ajax' + $(this).attr('href');
        //const url2 =url3.substring(0, url3.lastIndexOf("/"));
        // /ajax/recipe/3/delete
        ajaxDelete(url)
          .then(data => {
            //$('.userRow').load(url2+' .userRow', function () {
            //  console.log("lefut")
           // })
           $(this).parent().parent().parent().parent().remove();
          })
          .catch(xhr => {
            $('.help-block').text(xhr.responseText)
          })
})