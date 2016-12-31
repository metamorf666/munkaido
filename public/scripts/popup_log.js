$('#btnLog').on('click', function (e) {
  e.preventDefault()
  //let $modal = $('.modal')
  //const hasModal = 0
//
  //if (hasModal) {
  //  $modal.modal('show')
  //  return
 // } else {
    $modal = $(`
      <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="loginModal">
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">Log</div>
            <div class="modal-body">
              <div class="alert alert-danger"></div>
              <div class="form-area"></div>
            </div>
          </div>
        </div>
      </div>
    `)

    const $formContainer = $modal.find('.form-area')
    const $errorContainer = $modal.find('.alert').hide()

     const url3 = ''+ $(this).attr('href')
    const url = '/ajax' + $(this).attr('href');
     const url2 =url3.substring(0, url3.lastIndexOf("/"));

    $formContainer.load(url3+' form', function() {
      $modal.modal('show')
      const $loginForm = $modal.find('form')
      $loginForm.on('submit', function (e) {
        e.preventDefault()
        $errorContainer.hide()
        const data = $(this).serializeArray()
        Promise.resolve(
          $.ajax({
            url: url,
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
          })
        ).then(json => {
            $('#logUl').load(url2+' #logUl', function () {
              $modal.modal('hide')
            })
        })
      })
    })
  //}
})