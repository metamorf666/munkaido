
$('.modal').on('shown.bs.modal', function () {
    $(this).find('form').validator('destroy').validator()
    });

$('#btnAddUser').on('click', function (e) {
  e.preventDefault()

  let $modal = $('.modal')
  const hasModal = $modal.length


  if (hasModal) {
    $modal.modal('show')
    return
  } else {
    $modal = $(`
      <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="loginModal" data-toggle="validator">
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">Belépés</div>
            <div class="modal-body">
              <div class="alert alert-danger"></div>
              <div class="form-area" data-toggle="validator"></div>
            </div>
          </div>
        </div>
      </div>
    `)

    const $formContainer = $modal.find('.form-area')
    const $errorContainer = $modal.find('.alert').hide()

    $formContainer.load('/addUser form', function() {
      $modal.modal('show')
      const $loginForm = $modal.find('form')
      $loginForm.on('submit', function (e) {
        e.preventDefault()
        $errorContainer.hide()
        const data = $(this).serializeArray()
        Promise.resolve(
          $.ajax({
            url: '/ajax/addUser',
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
          })
        ).then(json => {
          if (json.success) {
              $modal.modal('hide')
          } else {
            $errorContainer.text('Hibás adatok!').show()
          }
        })
      })
    })
  }
})